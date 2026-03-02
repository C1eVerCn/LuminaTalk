export interface User {
  id: string;
  name: string;
  email: string;
  targetScore: number;
  currentScore: number;
  progress: number;
  avatar?: string;
}

export interface Session {
  id: string;
  userId: string;
  type: "ielts" | "daily";
  ieltsPart?: 1 | 2 | 3;
  topic?: string;
  scenario?: string;
  startTime: Date;
  endTime?: Date;
  transcript: Message[];
  feedback?: Feedback;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface Feedback {
  overallBand: number;
  dimensions: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
    content: number;
  };
  polishedComparison: {
    original: string;
    improved: string;
    band: number;
  }[];
  suggestions: string[];
}

export interface IELTSTopic {
  id: string;
  part: 1 | 2 | 3;
  category: string;
  title: string;
  questions: string[];
  frequency: "high" | "standard" | "low";
}

export interface DailyScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface AISettings {
  accent: "british" | "american" | "australian";
  duration: number;
  difficulty: "easy" | "medium" | "hard";
}
