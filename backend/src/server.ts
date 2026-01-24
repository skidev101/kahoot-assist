import "dotenv/config";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { solveQuestion } from "./gemini.js";

const app: Express = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const PORT = process.env.PORT! || 8000;


// Add this temporarily to your gemini.js or server.js
async function listAvailableModels() {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models?key=something-was-here'
    );
    const data = await response.json();
    console.log('Available models:', data.models?.map((m:any) => m.name));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listAvailableModels();

app.post("/solve", async (req: Request, res: Response) => {
  const { answers, question } = req.body;
  console.log("Incoming request:", { question, answers });

  if (!question || !answers) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const result = await solveQuestion(question, answers);
    console.log("result from ai", result);
    res.json(result);
  } catch (err) {
    console.error("error from ai", err)
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("AI server running on http://localhost:8000");
});
