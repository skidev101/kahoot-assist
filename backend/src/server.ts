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
