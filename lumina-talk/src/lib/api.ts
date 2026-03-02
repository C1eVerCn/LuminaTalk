const API_BASE = "/api";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  messages: Message[];
  part: number;
  topic: string;
  settings?: {
    accent?: string;
    duration?: number;
    difficulty?: string;
  };
}

export interface EvaluationRequest {
  transcript: string;
  part: number;
  topic: string;
}

export interface SessionRequest {
  userId: string;
  type: "ielts" | "daily";
  part?: 1 | 2 | 3;
  topic?: string;
  scenario?: string;
}

export async function sendChatMessage(request: ChatRequest) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export async function transcribeAudio(audioBlob: Blob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "audio.webm");

  const response = await fetch(`${API_BASE}/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to transcribe audio");
  }

  return response.json();
}

export async function evaluateSession(request: EvaluationRequest) {
  const response = await fetch(`${API_BASE}/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to evaluate session");
  }

  return response.json();
}

export async function createSession(request: SessionRequest) {
  const response = await fetch(`${API_BASE}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  return response.json();
}

export async function getSession(sessionId: string) {
  const response = await fetch(`${API_BASE}/session?id=${sessionId}`);

  if (!response.ok) {
    throw new Error("Failed to get session");
  }

  return response.json();
}

export async function updateSession(sessionId: string, updates: any) {
  const response = await fetch(`${API_BASE}/session`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, ...updates }),
  });

  if (!response.ok) {
    throw new Error("Failed to update session");
  }

  return response.json();
}

export async function createUser(email: string, name: string) {
  const response = await fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function getUser(userId: string) {
  const response = await fetch(`${API_BASE}/user?id=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to get user");
  }

  return response.json();
}

export async function updateUser(userId: string, updates: any) {
  const response = await fetch(`${API_BASE}/user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, updates }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}
