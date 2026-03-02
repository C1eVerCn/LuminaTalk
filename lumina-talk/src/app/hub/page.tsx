"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { motion } from "framer-motion";
import { Trophy, Map, ChevronRight, LogOut } from "lucide-react";
import { GlassCardLarge } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/Progress";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

function HubContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleIELTSEnter = () => {
    router.push("/ielts");
  };

  const handleDailyEnter = () => {
    console.log("Enter daily scenarios");
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshGradient delay={-5} />
      
      <div className="relative z-10 h-full px-6 lg:px-20 py-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Training Hub
            </h2>
            <p className="text-gray-500">
              Welcome back, <span className="text-white">{user.name}</span>. 
              Ready for your {user.targetScore} target?
            </p>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass px-4 py-2 rounded-xl flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium">AI Coach Online</span>
            </div>
            <button
              className="glass p-2 rounded-xl hover:bg-white/10 transition-all"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </motion.div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCardLarge 
              hover
              onClick={handleIELTSEnter}
              className="border-white/20"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4">IELTS Examiner</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Systematic mock tests for Part 1, 2, & 3 with official scoring criteria.
              </p>
              <div className="space-y-4 mb-10">
                <ProgressBar 
                  progress={user.progress} 
                  label="Progress to Goal"
                  showPercentage
                />
              </div>
              <div className="flex items-center text-sm font-semibold group-hover:gap-4 gap-2 transition-all">
                ENTER PATHWAY <ChevronRight className="w-4 h-4" />
              </div>
            </GlassCardLarge>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCardLarge hover onClick={handleDailyEnter}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Real-world Context</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Immersive survival English for coffee shops, taxis, and business social.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <div className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  12 Scenarios
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Slang Mode
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Native Speed
                </div>
              </div>
              <div className="flex items-center text-sm font-semibold group-hover:gap-4 gap-2 transition-all">
                BROWSE MAP <ChevronRight className="w-4 h-4" />
              </div>
            </GlassCardLarge>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">{user.stats.sessions}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">
              Sessions
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">{user.stats.hours.toFixed(1)}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">
              Hours
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">{user.stats.streak}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">
              Streak
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">#{user.stats.rank}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">
              Rank
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HubPage() {
  return (
    <ProtectedRoute>
      <HubContent />
    </ProtectedRoute>
  );
}
