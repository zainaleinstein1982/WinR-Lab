import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "dummy-key",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for Hypit.ai viral video script generation & pitch refinement
  app.post("/api/generate-script", async (req, res) => {
    try {
      const { prompt, formatType, tone } = req.body;

      const systemInstruction = `You are an expert mobile app growth hacker and viral content producer specializing in RevenueCat Shipaton 2026. 
You are helping generate word-anchored script variants for the Noise platform using Hypit.ai.
Format types: 1 = "The Unexpected Income Reveal", 2 = "Live Habit Duel / Rage Bait", 3 = "The Replit Agent Build Speedrun".
Tone: ${tone || 'High-energy, authentic, disruptive'}.
Return a JSON object with:
- title: string
- hookWords: string[] (first 5 words for word-anchored editing)
- fullScript: string (formatted with [Visual/B-Roll], [Dialogue], [Sound Effect cues])
- hypitCommand: string (cli command representation)
- projectedConversionRate: string`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt || "Generate a viral video script variant for Noise platform targeting monetization & habit building.",
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const text = response.text || "{}";
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to generate script",
        fallback: {
          title: "The $10k Replit + RevenueCat Blueprint",
          hookWords: ["How", "I", "Built", "This", "App"],
          fullScript: "[Visual: Screen recording of Replit Agent building app in 45s]\n[Dialogue: 'How I shipped a paying SaaS in 3 hours using Replit Agent and RevenueCat.']\n[Sound Effect: Cash register ding]",
          hypitCommand: "hypit run --format=income_reveal --variants=50 --audio=noise_trending_04",
          projectedConversionRate: "14.2%"
        }
      });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
