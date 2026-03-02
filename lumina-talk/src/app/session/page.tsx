"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { LiquidOrb, OrbControlButton } from "@/components/ui/LiquidOrb";
import { MeshGradientStatic } from "@/components/ui/MeshGradient";
import { Mic, Pause, Square, Loader2 } from "lucide-react";
import { useAudioRecorder, useSession } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function EnhancedSessionPage() {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Could you describe the place where you grew up?"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { 
    isRecording, 
    audioBlob, 
    startRecording, 
    stopRecording, 
    transcribe 
  } = useAudioRecorder();
  
  const { 
    sessionId, 
    messages, 
    isLoading, 
    startSession, 
    sendMessage, 
    endSession 
  } = useSession();

  useEffect(() => {
    startSession({
      userId: "demo-user",
      type: "ielts",
      part: 1,
      topic: "Hometown",
    });
  }, [startSession]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setCurrentQuestion(lastMessage.content);
      }
    }
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = async () => {
    await startRecording();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = async () => {
    await stopRecording();
    setIsProcessing(true);
    
    try {
      const transcription = await transcribe();
      await sendMessage(transcription);
    } catch (error) {
      console.error("Error processing audio:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndSession = async () => {
    const evaluation = await endSession();
    if (evaluation) {
      router.push(`/report?session=${sessionId}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshGradientStatic />
      
      <div className="relative z-10 h-full min-h-screen flex flex-col items-center justify-between py-12 lg:py-20 px-6">
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4">
            IELTS Part 1 • Hometown
          </div>
          <h3 className="text-xl lg:text-3xl font-light leading-relaxed">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : (
              `"${currentQuestion}"`
            )}
          </h3>
        </motion.div>

        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LiquidOrb 
            isListening={isRecording && !isPaused} 
            isSpeaking={false}
            size="lg"
            showWaveform={true}
          />
          
          {!isRecording && !isProcessing && (
            <motion.button
              className="mt-8 w-20 h-20 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
              onClick={handleStart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="w-8 h-8" />
            </motion.button>
          )}

          {isProcessing && (
            <div className="mt-8 flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm text-gray-400">Processing your response...</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isRecording && (
            <>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-8 font-bold">
                {isPaused ? "PAUSED" : "AI is listening..."}
              </div>
              <div className="flex items-center space-x-8 lg:space-x-12">
                <OrbControlButton 
                  icon="pause" 
                  onClick={handlePause}
                />
                <div className="text-center">
                  <div className="text-4xl font-light font-mono">
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="text-[10px] text-gray-600 font-bold tracking-tighter mt-1 uppercase">
                    Elapsed Time
                  </div>
                </div>
                <OrbControlButton 
                  icon="stop" 
                  onClick={handleStop}
                  variant="danger"
                />
              </div>
            </>
          )}

          {!isRecording && !isProcessing && messages.length > 2 && (
            <motion.button
              className="mt-8 px-6 py-3 rounded-full glass text-sm font-semibold hover:bg-white/10 transition-all"
              onClick={handleEndSession}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              End Session & View Report
            </motion.button>
          )}

          {!isRecording && !isProcessing && messages.length <= 2 && (
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-4">
                Tap the microphone to start speaking
              </div>
              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                AI Coach Ready
              </div>
            </div>
          )}
        </motion.div>

        {messages.length > 1 && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4 max-h-48 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                Conversation Transcript
              </div>
              <div className="space-y-2">
                {messages.slice(-4).map((msg, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      msg.role === "user" ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    <span className="font-semibold uppercase text-[10px] mr-2">
                      {msg.role}:
                    </span>
                    {msg.content.substring(0, 150)}
                    {msg.content.length > 150 ? "..." : ""}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
