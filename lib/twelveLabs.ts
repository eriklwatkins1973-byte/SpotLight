import { env, hasRequiredEnv } from "@/lib/env";

type CinematicDna = {
  visualStyle: string[];
  cinematography: string[];
  audioSentiment: string[];
  brandSafety: number;
};

const fallbackDna: CinematicDna = {
  visualStyle: ["Neon-Noir", "High-Contrast", "Natural Lighting"],
  cinematography: ["Handheld", "Tracking Shot", "Close-up focus"],
  audioSentiment: ["Melancholic", "Orchestral"],
  brandSafety: 92
};

export async function analyzeVideoWithTwelveLabs(videoUrl: string): Promise<CinematicDna> {
  if (!hasRequiredEnv(["TWELVE_LABS_API_KEY"])) {
    return fallbackDna;
  }

  const response = await fetch("https://api.twelvelabs.io/v1.3/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.TWELVE_LABS_API_KEY!
    },
    body: JSON.stringify({
      video_url: videoUrl,
      model_name: "marengo2.6",
      options: ["visual", "audio"]
    })
  });

  if (!response.ok) {
    return fallbackDna;
  }

  const data = (await response.json()) as {
    visualStyle?: string[];
    cinematography?: string[];
    audioSentiment?: string[];
    brandSafety?: number;
  };

  return {
    visualStyle: data.visualStyle?.length ? data.visualStyle : fallbackDna.visualStyle,
    cinematography: data.cinematography?.length ? data.cinematography : fallbackDna.cinematography,
    audioSentiment: data.audioSentiment?.length ? data.audioSentiment : fallbackDna.audioSentiment,
    brandSafety: typeof data.brandSafety === "number" ? data.brandSafety : fallbackDna.brandSafety
  };
}