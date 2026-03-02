import { NextRequest, NextResponse } from "next/server";

const sessions = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const { userId, type, part, topic, scenario } = await request.json();

    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const session = {
      id: sessionId,
      userId,
      type,
      ieltsPart: part,
      topic,
      scenario,
      startTime: new Date().toISOString(),
      transcript: [],
      status: "active",
    };

    sessions.set(sessionId, session);

    return NextResponse.json({
      sessionId,
      session,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID required" },
      { status: 400 }
    );
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return NextResponse.json(
      { error: "Session not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ session });
}

export async function PUT(request: NextRequest) {
  try {
    const { sessionId, message, endTime } = await request.json();

    const session = sessions.get(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (message) {
      session.transcript.push({
        ...message,
        timestamp: new Date().toISOString(),
      });
    }

    if (endTime) {
      session.endTime = endTime;
      session.status = "completed";
    }

    sessions.set(sessionId, session);

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}
