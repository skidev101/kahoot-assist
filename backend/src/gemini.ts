import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

if (!genAI) throw new Error("AI not configured yet")

export async function solveQuestion(
  question: string,
  answers: string[],
  hints?: string
): Promise<{ answerIndex: number; confidence: number }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    const prompt = `
    You are a smart Bible study assistant answering a multiple-choice question.

    Question:
    ${question}


    Hints:
    ${hints ? hints : "No hints"}

    Answers:
    ${answers.map((a, i) => `${i}: ${a}`).join("\n")}

    Rules:
    - Choose the most likely correct answer
    - If unsure, return answerIndex = -1
    - Respond ONLY in JSON

    Output format:
    {
      "answerIndex": number,
      "confidence": number
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON returned by model");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("error from ai", err);

    // Return safe default so frontend never crashes
    return { answerIndex: -1, confidence: 0 };
  }
}
