"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, GraduationCap, MapPin, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const dailyQuotes = [
  { quote: "Words are the mirrors of the mind.", author: "John Ray" },
  { quote: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
  { quote: "Language is the road map of a culture.", author: "Rita Mae Brown" },
  { quote: "To have another language is to possess a second soul.", author: "Charlemagne" }
];

const passwordRequirements = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "One uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "One lowercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "One number" }
];

export default function WelcomePage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [targetScore, setTargetScore] = useState("7.5");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [quote] = useState(dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]);

  const { user, isLoading, error, login, register, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/hub");
    }
  }, [user, router]);

  useEffect(() => {
    clearError();
    setLocalError(null);
  }, [mode, clearError]);

  const validateForm = (): boolean => {
    if (!email || !password) {
      setLocalError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return false;
    }

    if (mode === "signup") {
      if (!name || name.length < 2) {
        setLocalError("Name must be at least 2 characters long");
        return false;
      }

      if (password !== confirmPassword) {
        setLocalError("Passwords do not match");
        return false;
      }

      const failedRequirements = passwordRequirements.filter(req => !req.test(password));
      if (failedRequirements.length > 0) {
        setLocalError("Password does not meet all requirements");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let success = false;
    if (mode === "signin") {
      success = await login(email, password);
    } else {
      success = await register(email, password, name, parseFloat(targetScore));
    }

    if (success) {
      router.push("/hub");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <MeshGradient />
      
      <div className="relative z-10 w-full max-w-7xl">
        <nav className="flex justify-between items-center mb-24">
          <div className="text-2xl font-bold tracking-tighter uppercase">LuminaTalk</div>
          <div className="text-xs tracking-[0.3em] text-gray-500 uppercase">Est. 2024</div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-6 block">
              Daily Inspiration
            </span>
            <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-8">
              {quote.quote}
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed border-l border-gray-800 pl-6">
              — {quote.author}
            </p>
            
            <motion.div 
              className="mt-12 flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border border-black bg-gradient-to-br from-gray-300 to-gray-500" />
                <div className="w-8 h-8 rounded-full border border-black bg-gradient-to-br from-gray-400 to-gray-600" />
              </div>
              <span className="text-xs text-gray-500">Join 12,402 learners today</span>
            </motion.div>

            <div className="mt-16 grid grid-cols-4 gap-4">
              {[
                { icon: Home, label: "Hometown" },
                { icon: Briefcase, label: "Work" },
                { icon: GraduationCap, label: "Study" },
                { icon: MapPin, label: "Travel" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="glass rounded-2xl p-4 flex flex-col items-center justify-center grayscale-filter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <item.icon className="w-6 h-6 mb-2 text-gray-400" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="shadow-2xl">
              <div className="flex mb-8">
                <button
                  className={`flex-1 pb-4 text-sm font-semibold border-b-2 transition-all ${
                    mode === "signin" 
                      ? "border-white text-white" 
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                  onClick={() => setMode("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`flex-1 pb-4 text-sm font-semibold border-b-2 transition-all ${
                    mode === "signup" 
                      ? "border-white text-white" 
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                  onClick={() => setMode("signup")}
                >
                  Create Account
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-5">
                    {mode === "signup" && (
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}

                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-9 text-gray-500 hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {mode === "signup" && (
                      <>
                        <Input
                          label="Confirm Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 block">
                            Target IELTS Score
                          </label>
                          <div className="flex gap-2">
                            {["6.5", "7.0", "7.5", "8.0", "8.5"].map((score) => (
                              <button
                                key={score}
                                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                                  targetScore === score
                                    ? "bg-white text-black"
                                    : "bg-white/5 border border-white/10 hover:border-white/30"
                                }`}
                                onClick={() => setTargetScore(score)}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 block">
                            Password Requirements
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {passwordRequirements.map((req, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-2 text-xs ${
                                  req.test(password) ? "text-green-400" : "text-gray-500"
                                }`}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                {req.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {displayError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        {displayError}
                      </motion.div>
                    )}

                    <Button 
                      className="w-full mt-4" 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {mode === "signin" ? "Signing In..." : "Creating Account..."}
                        </span>
                      ) : (
                        mode === "signin" ? "Start Journey" : "Create Account"
                      )}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-center text-xs text-gray-500 mb-4">
                  Or continue with
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1 text-xs">
                    Google
                  </Button>
                  <Button variant="secondary" className="flex-1 text-xs">
                    Apple
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
