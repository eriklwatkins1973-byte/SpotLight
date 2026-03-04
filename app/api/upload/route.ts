import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { TwelveLabs } from "twelvelabs-js";
import { z } from "zod";
import { env, hasRequiredEnv } from "@/lib/env";

const uploadSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  userId: z.string().optional()
});

const muxClient = hasRequiredEnv(["MUX_TOKEN_ID", "MUX_TOKEN_SECRET"])
  ? new Mux({
      tokenId: env.MUX_TOKEN_ID,
      tokenSecret: env.MUX_TOKEN_SECRET
    })
  : null;

const tlClient = hasRequiredEnv(["TWELVE_LABS_API_KEY"])
  ? new TwelveLabs({ apiKey: env.TWELVE_LABS_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    uploadSchema.parse(await request.json());

    if (!muxClient) {
      return NextResponse.json(
        { error: "Missing Mux credentials. Add MUX_TOKEN_ID and MUX_TOKEN_SECRET." },
        { status: 503 }
      );
    }

    const upload = await muxClient.video.uploads.create({
      new_asset_settings: {
        playback_policy: ["public"],
        video_quality: "plus"
      },
      cors_origin: "*"
    });

    void tlClient;

    const indexId = env.TWELVELABS_DEFAULT_INDEX_ID ?? null;

    return NextResponse.json({
      uploadUrl: upload.url,
      uploadId: upload.id,
      twelveLabsIndexId: indexId,
      message: "Infrastructure ready for cinematic upload"
    });
  } catch (error) {
    console.error("Upload Initialization Error:", error);
    return NextResponse.json({ error: "Failed to initialize upload" }, { status: 500 });
  }
}