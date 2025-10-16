import { z } from "zod";

// Study Buddy schemas
export const studyRequestSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  topic: z.string().min(1, "Topic is required"),
  action: z.enum(["explain", "questions", "mcqs", "lessonPlan"])
});

export type StudyRequest = z.infer<typeof studyRequestSchema>;

// Text Tools schemas
export const summarizeRequestSchema = z.object({
  text: z.string().min(1, "Text is required")
});

export const emailRequestSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  keyPoints: z.string().min(1, "Key points are required")
});

export const toneShiftRequestSchema = z.object({
  text: z.string().min(1, "Text is required"),
  tone: z.enum(["Formal", "Casual", "Confident", "Friendly", "Persuasive"])
});

export type SummarizeRequest = z.infer<typeof summarizeRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;
export type ToneShiftRequest = z.infer<typeof toneShiftRequestSchema>;

// Code Helper schema
export const codeRequestSchema = z.object({
  code: z.string().min(1, "Code or description is required")
});

export type CodeRequest = z.infer<typeof codeRequestSchema>;

// Creative Corner schema
export const creativeRequestSchema = z.object({
  ingredients: z.string().min(1, "Ingredients are required")
});

export type CreativeRequest = z.infer<typeof creativeRequestSchema>;

// Travel Planner schema
export const travelRequestSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  duration: z.string().min(1, "Duration is required"),
  interests: z.string().optional()
});

export type TravelRequest = z.infer<typeof travelRequestSchema>;

// Image Generator schema
export const imageRequestSchema = z.object({
  prompt: z.string().min(1, "Image description is required")
});

export type ImageRequest = z.infer<typeof imageRequestSchema>;

// Generic AI response
export interface AIResponse {
  content: string;
}

export interface ImageResponse {
  url: string;
}
