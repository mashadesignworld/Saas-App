import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors,  voices  } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (
  voice: string, 
  style: string, 
  topic: string, 
  subject: string
) => {
  const voiceId =
    voices[voice as keyof typeof voices]?.[
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: `Edify-${subject}`,
    firstMessage: `Hi there. I'm ready to dive into ${topic} with you. Shall we start with the core concepts?`,
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
      smartFormat: true, 
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.5,
      similarityBoost: 0.8,
      style: 0.2,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o",
      // Move timeout logic here if your SDK supports it in model, 
      // otherwise, let Vapi handle defaults to avoid the red line.
      messages: [
        {
          role: "system",
          content: `
            You are an elite tutor for Edify. Subject: ${subject}. Topic: ${topic}.
            Guidelines:
            1. No markdown. No special characters.
            2. Use commas for natural pauses in speech.
            3. After explaining a concept, ask a short question to check understanding.
            4. Keep responses under 40 words for a natural voice flow.
            5. Current Tone: ${style}.
          `,
        },
      ],
    },
    // If these still show red lines, your SDK version expects them 
    // inside an 'assistant' object or via the Vapi Dashboard instead.
    // Try removing them to clear the error:
    // maxDurationSeconds: 3600, 
  };

  return vapiAssistant;
};