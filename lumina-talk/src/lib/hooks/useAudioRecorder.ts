"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { transcribeAudio } from "@/lib/api";

interface UseAudioRecorderReturn {
  isRecording: boolean;
  audioBlob: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  transcribe: () => Promise<string>;
  error: string | null;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to start recording"
      );
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const transcribe = useCallback(async (): Promise<string> => {
    if (!audioBlob) {
      throw new Error("No audio to transcribe");
    }

    try {
      const result = await transcribeAudio(audioBlob);
      return result.text;
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to transcribe audio"
      );
      throw err;
    }
  }, [audioBlob]);

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    transcribe,
    error,
  };
}
