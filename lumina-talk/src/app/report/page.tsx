"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, RotateCcw, Volume2 } from "lucide-react";
import { IconButton, Button } from "@/components/ui/Button";
import { MetricBar } from "@/components/ui/Progress";
import { GlassCard } from "@/components/ui/GlassCard";
import { MeshGradient } from "@/components/ui/MeshGradient";

const mockFeedback = {
  overallBand: 7.5,
  session: 204,
  focus: "Fluency & Coherence",
  dimensions: {
    fluency: 8.0,
    lexical: 7.5,
    grammar: 7.0,
    pronunciation: 7.5,
    content: 8.0
  },
  comparisons: [
    {
      original: "I live in a city which is very big and has much people...",
      improved: "I reside in a bustling metropolis which is densely populated...",
      band: 8.0
    },
    {
      original: "The weather is good, I like it.",
      improved: "The climate is quite pleasant, and I particularly enjoy the mild temperatures.",
      band: 8.5
    }
  ],
  suggestions: [
    "Use more sophisticated vocabulary like 'metropolis' instead of 'big city'",
    "Avoid common grammatical errors with countable/uncountable nouns",
    "Practice using discourse markers to improve fluency",
    "Work on sentence variety - mix simple and complex structures"
  ]
};

export default function ReportPage() {
  const handleBack = () => {
    console.log("Go back");
  };

  const handleReplay = () => {
    console.log("Replay session");
  };

  const handleExport = () => {
    console.log("Export report");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshGradient delay={-15} />
      
      <div className="relative z-10 h-full overflow-y-auto px-6 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start mb-12 lg:mb-16 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-4">
              <IconButton onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </IconButton>
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-glow">
                  Practice Insight
                </h2>
                <div className="flex flex-wrap gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                  <span>Session #{mockFeedback.session}</span>
                  <span>•</span>
                  <span>Focus: {mockFeedback.focus}</span>
                </div>
              </div>
            </div>

            <motion.div
              className="glass p-6 lg:p-8 rounded-[2.5rem] flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl font-black mb-2 tracking-tighter">
                {mockFeedback.overallBand}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">
                Overall Band
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <GlassCard>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                  Polished Comparison
                </h4>
                <div className="space-y-6">
                  {mockFeedback.comparisons.map((comparison, index) => (
                    <motion.div
                      key={index}
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-red-400 uppercase font-black mb-3 tracking-widest flex items-center gap-2">
                          You said:
                          <button className="p-1 rounded hover:bg-white/10 transition-all">
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-400 italic">
                          "{comparison.original}"
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="text-[10px] text-green-400 uppercase font-black mb-3 tracking-widest">
                          AI Suggestion (Band {comparison.band}+):
                        </div>
                        <p className="text-gray-100">
                          "{comparison.improved}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                  Key Suggestions
                </h4>
                <div className="space-y-4">
                  {mockFeedback.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-300">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <GlassCard>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">
                  Dimensions
                </h4>
                <div className="space-y-5">
                  <MetricBar label="Fluency" value={mockFeedback.dimensions.fluency} />
                  <MetricBar label="Lexical" value={mockFeedback.dimensions.lexical} />
                  <MetricBar label="Grammar" value={mockFeedback.dimensions.grammar} />
                  <MetricBar label="Pronunciation" value={mockFeedback.dimensions.pronunciation} />
                  <MetricBar label="Content" value={mockFeedback.dimensions.content} />
                </div>
              </GlassCard>

              <GlassCard>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                  Actions
                </h4>
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-center"
                    onClick={handleReplay}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Replay Session
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-center"
                    onClick={handleExport}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </GlassCard>

              <GlassCard className="bg-green-500/5 border-green-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    Great Progress!
                  </div>
                  <p className="text-xs text-gray-400">
                    You&apos;re 0.5 bands away from your target score of 8.0
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
