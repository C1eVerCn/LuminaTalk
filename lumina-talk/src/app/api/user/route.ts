import { NextRequest, NextResponse } from "next/server";

const users = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const user = {
      id: userId,
      email,
      name,
      targetScore: 7.5,
      currentScore: 6.5,
      progress: 0,
      createdAt: new Date().toISOString(),
      stats: {
        sessions: 0,
        hours: 0,
        streak: 0,
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

    users.set(userId, user);

    return NextResponse.json({
      user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID required" },
      { status: 400 }
    );
  }

  const user = users.get(userId);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, updates } = await request.json();

    const user = users.get(userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    users.set(userId, updatedUser);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
