import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase";

const searchSchema = z.object({
  style: z.string().min(1),
  camera: z.string().min(1)
});

const fallbackResults = [
  {
    id: "f1",
    title: "Moonlight Transit",
    brandSafety: 96,
    visualStyle: ["Neon-Noir", "Anamorphic"],
    cinematography: ["Handheld", "Tracking Shot"]
  },
  {
    id: "f2",
    title: "Rooftop Echoes",
    brandSafety: 90,
    visualStyle: ["Natural Lighting", "High-Key"],
    cinematography: ["Steadicam", "Close-up focus"]
  }
];

export async function POST(request: NextRequest) {
  try {
    const payload = searchSchema.parse(await request.json());
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      const local = fallbackResults.filter(
        (item) =>
          item.visualStyle.some((style) => style.toLowerCase().includes(payload.style.toLowerCase())) ||
          item.cinematography.some((camera) => camera.toLowerCase().includes(payload.camera.toLowerCase()))
      );
      return NextResponse.json({ results: local });
    }

    const { data: matchingTags } = await supabase
      .from("cinematic_tags")
      .select("video_id")
      .or(`tag_label.ilike.%${payload.style}%,tag_label.ilike.%${payload.camera}%`)
      .limit(200);

    const videoIds = Array.from(new Set((matchingTags ?? []).map((tag: { video_id: string }) => tag.video_id)));
    if (videoIds.length === 0) {
      return NextResponse.json({ results: [] });
    }

    const { data: videos } = await supabase
      .from("videos")
      .select("id,title")
      .eq("status", "ready")
      .in("id", videoIds)
      .limit(20);

    if (!videos || videos.length === 0) {
      return NextResponse.json({ results: [] });
    }

    const { data: tags } = await supabase
      .from("cinematic_tags")
      .select("video_id,category,tag_label,confidence")
      .in(
        "video_id",
        videos.map((video: { id: string }) => video.id)
      );

    const results = videos.map((video: { id: string; title: string }) => {
      const videoTags = (tags ?? []).filter((tag: any) => tag.video_id === video.id);
      const visualStyle = videoTags
        .filter((tag: any) => tag.category === "lighting" || tag.category === "pacing")
        .map((tag: any) => tag.tag_label);
      const cinematography = videoTags
        .filter((tag: any) => tag.category === "cinematography")
        .map((tag: any) => tag.tag_label);
      const confidenceValues = videoTags
        .map((tag: any) => tag.confidence)
        .filter((value: any) => typeof value === "number") as number[];
      const averageConfidence =
        confidenceValues.length > 0
          ? Math.round((confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length) * 100)
          : 0;

      return {
        id: video.id,
        title: video.title,
        brandSafety: averageConfidence,
        visualStyle,
        cinematography
      };
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Invalid search payload" }, { status: 400 });
  }
}