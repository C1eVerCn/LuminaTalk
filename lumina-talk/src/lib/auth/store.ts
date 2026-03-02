import { User } from "./types";

const users = new Map<string, User>();
const sessions = new Map<string, string>();

export function findUserByEmail(email: string): User | undefined {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

export function findUserById(id: string): User | undefined {
  return users.get(id);
}

export function createUser(userData: Omit<User, "id" | "createdAt" | "stats" | "preferences" | "memory" | "progress" | "currentScore">): User {
  const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const user: User = {
    id,
    email: userData.email,
    name: userData.name,
    password: userData.password,
    targetScore: userData.targetScore || 7.5,
    currentScore: 6.5,
    progress: 0,
    createdAt: new Date().toISOString(),
    stats: {
      sessions: 0,
      hours: 0,
      streak: 0,
      rank: Math.floor(Math.random() * 1000) + 1,
    },
    preferences: {
      accent: "british",
      difficulty: "medium",
    },
    memory: {
      interests: [],
      commonErrors: [],
      improvementAreas: [],
    },
  };

  users.set(id, user);
  return user;
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function createSession(userId: string): string {
  const token = `token-${Date.now()}-${Math.random().toString(36).substr(2, 32)}`;
  sessions.set(token, userId);
  return token;
}

export function validateSession(token: string): string | undefined {
  return sessions.get(token);
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

export function updateUser(userId: string, updates: Partial<User>): User | undefined {
  const user = users.get(userId);
  if (!user) return undefined;

  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  users.set(userId, updatedUser);
  return updatedUser;
}

export function sanitizeUser(user: User): Omit<User, "password"> {
  const { password: _, ...sanitized } = user;
  return sanitized;
}
