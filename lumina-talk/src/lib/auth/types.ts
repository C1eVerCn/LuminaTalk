export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  targetScore: number;
  currentScore: number;
  progress: number;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    sessions: number;
    hours: number;
    streak: number;
    rank: number;
  };
  preferences: {
    accent: "british" | "american" | "australian";
    difficulty: "easy" | "medium" | "hard";
  };
  memory: {
    interests: string[];
    commonErrors: string[];
    improvementAreas: string[];
  };
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, "password">;
  token?: string;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  targetScore?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
