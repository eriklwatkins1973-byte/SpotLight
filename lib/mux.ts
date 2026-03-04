import { randomUUID } from "node:crypto";
import { env, hasRequiredEnv } from "@/lib/env";

export async function registerMuxAsset(sourceUrl: string) {
  if (!hasRequiredEnv(["MUX_TOKEN_ID", "MUX_TOKEN_SECRET"])) {
    return { videoId: `mock_${randomUUID()}`, playbackId: null, sourceUrl };
  }

  const credentials = Buffer.from(`${env.MUX_TOKEN_ID}:${env.MUX_TOKEN_SECRET}`).toString("base64");
  const response = await fetch("https://api.mux.com/video/v1/assets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`
    },
    body: JSON.stringify({
      input: sourceUrl,
      playback_policy: ["public"]
    })
  });

  if (!response.ok) {
    return { videoId: `mock_${randomUUID()}`, playbackId: null, sourceUrl };
  }

  const data = (await response.json()) as {
    data?: { id?: string; playback_ids?: Array<{ id?: string }> };
  };
  return {
    videoId: data.data?.id ?? `mux_${randomUUID()}`,
    playbackId: data.data?.playback_ids?.[0]?.id ?? null,
    sourceUrl
  };
}