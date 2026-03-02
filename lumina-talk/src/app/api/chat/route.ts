import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

const IELTS_SYSTEM_PROMPT = `You are a certified IELTS examiner conducting a Speaking test. 

Role: Professional IELTS Examiner
Current Part: [Selected Part - 1, 2, or 3]
Tone: Formal but encouraging, uses standard examiner phrases

Guidelines:
1. Ask one question at a time
2. Wait for the candidate's response before proceeding
3. Use follow-up questions to probe deeper (e.g., "Can you elaborate on that?", "Why do you think that is?")
4. For Part 2, provide a cue card topic and allow 1 minute preparation + 2 minutes speaking
5. For Part 3, use "Counter-arguments" (e.g., "Some people argue that..., what's your view?") to test the user's logic
6. Keep track of the conversation context
7. At the end of the session, output [SESSION_END] followed by evaluation

Interaction Rules:
- Always end your turn with a question to maintain flow
- Adapt difficulty based on user's responses
- Note any grammatical errors or vocabulary limitations for later feedback`;

export async function POST(request: NextRequest) {
  try {
    const openai = getOpenAI();
    const { messages, part, topic, settings } = await request.json();

    const systemMessage = {
      role: "system" as const,
      content: `${IELTS_SYSTEM_PROMPT}\n\nCurrent Part: Part ${part}\nTopic: ${topic}\nAccent: ${settings?.accent || "British (RP)"}`,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = response.choices[0].message.content;

    return NextResponse.json({
      message: assistantMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}
