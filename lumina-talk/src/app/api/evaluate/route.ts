import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

const EVALUATION_PROMPT = `You are an IELTS Speaking evaluation analyst. Analyze the following conversation transcript based on the IELTS Speaking Band Descriptors.

Criteria (Score 1.0 - 9.0):
1. Fluency & Coherence: Evaluate hesitation, self-correction, and use of discourse markers
2. Lexical Resource: Evaluate range and precision of vocabulary. Identify "Basic" vs "Advanced" usage
3. Grammatical Range & Accuracy: Detect tense errors, sentence structure variety
4. Pronunciation: Rate clarity based on text clues and rhythm patterns
5. Content Depth: Does the response address the prompt fully?

Output Format: JSON only. Include "Corrected_Version" for every major error found.

Example output:
{
  "overallBand": 7.5,
  "dimensions": {
    "fluency": 8.0,
    "lexical": 7.5,
    "grammar": 7.0,
    "pronunciation": 7.5,
    "content": 8.0
  },
  "polishedComparison": [
    {
      "original": "user's actual words",
      "improved": "better expression",
      "band": 8.0
    }
  ],
  "suggestions": [
    "Specific improvement suggestion 1",
    "Specific improvement suggestion 2"
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const openai = getOpenAI();
    const { transcript, part, topic } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: EVALUATION_PROMPT },
        {
          role: "user",
          content: `Evaluate this IELTS Part ${part} conversation about "${topic}":\n\n${transcript}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const evaluation = JSON.parse(response.choices[0].message.content || "{}");

    return NextResponse.json({
      evaluation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Evaluation API error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate session" },
      { status: 500 }
    );
  }
}
