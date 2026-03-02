"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Home, Briefcase, GraduationCap, Music, BookOpen, Heart } from "lucide-react";
import { IconButton } from "@/components/ui/Button";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { StepRoadmap, TopicCard } from "@/components/ui/Roadmap";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const ieltsSteps = [
  { id: 1, title: "Part 1", subtitle: "Introduction", active: true },
  { id: 2, title: "Part 2", subtitle: "Cue Card", active: false },
  { id: 3, title: "Part 3", subtitle: "Discussion", active: false }
];

const topics = [
  { icon: Home, title: "Hometown", subtitle: "12 Questions • High Frequency", active: true },
  { icon: Briefcase, title: "Work & Study", subtitle: "8 Questions • Standard", active: false },
  { icon: GraduationCap, title: "Education", subtitle: "10 Questions • High Frequency", active: false },
  { icon: Music, title: "Hobbies", subtitle: "15 Questions • Standard", active: false }
];

export default function IELTSConfigPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [accent, setAccent] = useState("British (RP)");
  const [duration, setDuration] = useState("10 Minutes");

  const handleTopicSelect = (index: number) => {
    setSelectedTopic(index);
  };

  const handleGoLive = () => {
    console.log("Starting IELTS session");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshGradient delay={-10} />
      
      <div className="relative z-10 h-full p-6 lg:p-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center space-x-4 mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <IconButton onClick={() => console.log("Go back")}>
              <ArrowLeft className="w-4 h-4" />
            </IconButton>
            <h2 className="text-2xl lg:text-3xl font-semibold">
              IELTS Pathway Configuration
            </h2>
          </motion.div>

          <StepRoadmap steps={ieltsSteps} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <div className="lg:col-span-2 glass rounded-3xl p-6 lg:p-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                Current Focus: P1 Warm-up
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topics.map((topic, index) => (
                  <TopicCard
                    key={topic.title}
                    icon={<topic.icon className="w-6 h-6" />}
                    title={topic.title}
                    subtitle={topic.subtitle}
                    active={selectedTopic === index}
                    onClick={() => handleTopicSelect(index)}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Preview Questions
                </h5>
                <div className="space-y-3">
                  {[
                    "Could you describe the place where you grew up?",
                    "What do you like most about your hometown?",
                    "How has your hometown changed over the years?"
                  ].map((question, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {question}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 lg:p-8 flex flex-col">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                AI Setting
              </h4>
              <div className="space-y-6 flex-grow">
                <div>
                  <div className="text-[10px] text-gray-400 mb-2 uppercase">
                    Accent
                  </div>
                  <button className="w-full flex justify-between items-center text-sm font-bold p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    {accent} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 mb-2 uppercase">
                    Duration
                  </div>
                  <button className="w-full flex justify-between items-center text-sm font-bold p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    {duration} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 mb-2 uppercase">
                    Difficulty
                  </div>
                  <button className="w-full flex justify-between items-center text-sm font-bold p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    Medium <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Button 
                className="w-full mt-6" 
                onClick={handleGoLive}
              >
                GO LIVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
