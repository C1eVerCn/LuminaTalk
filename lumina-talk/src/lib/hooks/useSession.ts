"use client";

import { useState, useCallback } from "react";
import { 
  createSession, 
  updateSession, 
  sendChatMessage, 
  evaluateSession 
} from "@/lib/api";
import { Message } from "@/lib/api";

interface UseSessionReturn {
  sessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  startSession: (params: {
    userId: string;
    type: "ielts" | "daily";
    part?: 1 | 2 | 3;
    topic?: string;
  }) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  endSession: () => Promise<any>;
}

export function useSession(): UseSessionReturn {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionParams, setSessionParams] = useState<any>(null);

  const startSession = useCallback(async (params: {
    userId: string;
    type: "ielts" | "daily";
    part?: 1 | 2 | 3;
    topic?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessages([]);

      const result = await createSession(params);
      setSessionId(result.sessionId);
      setSessionParams(params);

      const welcomeMessage: Message = {
        role: "assistant",
        content: `Welcome to IELTS Part ${params.part}. Let's begin with the topic of "${params.topic}". ${params.part === 1 ? "I'll ask you some questions about this topic. Please answer each question as fully as you can." : ""}`,
        timestamp: new Date().toISOString(),
      };

      setMessages([welcomeMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start session");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId || !sessionParams) {
      setError("No active session");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const userMessage: Message = {
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      await updateSession(sessionId, { message: userMessage });

      const result = await sendChatMessage({
        messages: [...messages, userMessage],
        part: sessionParams.part,
        topic: sessionParams.topic,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.message,
        timestamp: result.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      await updateSession(sessionId, { message: assistantMessage });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, sessionParams, messages]);

  const endSession = useCallback(async () => {
    if (!sessionId || !sessionParams) {
      setError("No active session");
      return null;
    }

    try {
      setIsLoading(true);

      const transcript = messages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n\n");

      const evaluation = await evaluateSession({
        transcript,
        part: sessionParams.part,
        topic: sessionParams.topic,
      });

      await updateSession(sessionId, { 
        endTime: new Date().toISOString() 
      });

      return evaluation.evaluation;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to end session");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, sessionParams, messages]);

  return {
    sessionId,
    messages,
    isLoading,
    error,
    startSession,
    sendMessage,
    endSession,
  };
}
