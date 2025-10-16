import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  studyRequestSchema, 
  summarizeRequestSchema, 
  emailRequestSchema, 
  toneShiftRequestSchema,
  codeRequestSchema,
  creativeRequestSchema,
  travelRequestSchema,
  imageRequestSchema,
  type StudyRequest,
  type SummarizeRequest,
  type EmailRequest,
  type ToneShiftRequest,
  type CodeRequest,
  type CreativeRequest,
  type TravelRequest,
  type ImageRequest
} from "@shared/schema";
import { generateText, generateImage } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Study Buddy endpoint
  app.post("/api/study", async (req, res) => {
    try {
      const data = studyRequestSchema.parse(req.body) as StudyRequest;
      
      const prompts: Record<StudyRequest['action'], string> = {
        explain: "You are an expert teacher. Clearly explain the topic in a concise, easy-to-understand way with examples.",
        questions: "You are an exam creator. Generate 5 thoughtful short-answer practice questions that test understanding of the topic.",
        mcqs: "You are a test creator. Generate 5 multiple choice questions with 4 options each. At the end, provide an answer key showing the correct answers.",
        lessonPlan: "You are an expert curriculum designer. Create a comprehensive lesson plan including: learning objectives, key concepts to cover, sub-topics breakdown, suggested teaching activities, and practice exercises."
      };

      const userPrompt = `Subject: ${data.subject}\nTopic: ${data.topic}`;
      const content = await generateText(prompts[data.action], userPrompt);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Text summarization endpoint
  app.post("/api/text/summarize", async (req, res) => {
    try {
      const data = summarizeRequestSchema.parse(req.body) as SummarizeRequest;
      
      const systemPrompt = "You are a professional summarizer. Create a concise summary that captures the key points and main ideas of the text. Use bullet points for clarity.";
      const content = await generateText(systemPrompt, data.text);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Email writer endpoint
  app.post("/api/text/email", async (req, res) => {
    try {
      const data = emailRequestSchema.parse(req.body) as EmailRequest;
      
      const systemPrompt = "You are a professional email writer. Compose a clear, well-structured, and professional email based on the topic and key points provided. Include an appropriate greeting, body, and closing.";
      const userPrompt = `Topic/Recipient: ${data.topic}\n\nKey Points:\n${data.keyPoints}`;
      const content = await generateText(systemPrompt, userPrompt);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Tone shift endpoint
  app.post("/api/text/tone-shift", async (req, res) => {
    try {
      const data = toneShiftRequestSchema.parse(req.body) as ToneShiftRequest;
      
      const systemPrompt = `You are an expert editor. Rewrite the following text in a ${data.tone} tone while preserving the core meaning and key information. Make appropriate adjustments to word choice, sentence structure, and style to match the desired tone.`;
      const content = await generateText(systemPrompt, data.text);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Code helper endpoint
  app.post("/api/code", async (req, res) => {
    try {
      const data = codeRequestSchema.parse(req.body) as CodeRequest;
      
      const systemPrompt = "You are an expert programmer and code educator. If given code, explain what it does, how it works, and suggest improvements. If given a description, write clean, well-commented code that solves the problem. Include explanations of your approach.";
      const content = await generateText(systemPrompt, data.code);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Creative corner endpoint (recipe generator)
  app.post("/api/creative", async (req, res) => {
    try {
      const data = creativeRequestSchema.parse(req.body) as CreativeRequest;
      
      const systemPrompt = "You are a creative chef and recipe developer. Create a delicious, practical recipe using the provided ingredients. Include recipe name, ingredients list with measurements, step-by-step instructions, cooking time, and serving suggestions.";
      const userPrompt = `Available ingredients: ${data.ingredients}`;
      const content = await generateText(systemPrompt, userPrompt);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Travel planner endpoint
  app.post("/api/travel", async (req, res) => {
    try {
      const data = travelRequestSchema.parse(req.body) as TravelRequest;
      
      const systemPrompt = "You are an expert travel planner. Create a detailed day-by-day itinerary that includes must-see attractions, recommended restaurants, local experiences, and practical tips. Consider the traveler's interests and the duration of the trip.";
      const userPrompt = `Destination: ${data.destination}\nDuration: ${data.duration}${data.interests ? `\nInterests: ${data.interests}` : ''}`;
      const content = await generateText(systemPrompt, userPrompt);
      
      res.json({ content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  // Image generation endpoint
  app.post("/api/image", async (req, res) => {
    try {
      const data = imageRequestSchema.parse(req.body) as ImageRequest;
      
      const url = await generateImage(data.prompt);
      
      res.json({ url });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
