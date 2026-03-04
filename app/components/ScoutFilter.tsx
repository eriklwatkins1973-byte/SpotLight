"use client";

import { useEffect, useState } from "react";

const FILTER_GROUPS = [
  { name: "Lighting", tags: ["Neon-Noir", "High-Contrast", "Natural", "Chiaroscuro"] },
  { name: "Camera Movement", tags: ["Handheld", "Steadicam", "Dolly Zoom", "Static"] },
  { name: "Genre Sentiment", tags: ["Melancholic", "Tense", "Dreamlike", "Gritty"] }
] as const;

type ScoutFilterProps = {
  onFiltersChange?: (filters: { activeTags: string[]; style: string; camera: string }) => void;
};

export default function ScoutFilter({ onFiltersChange }: ScoutFilterProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setActiveTags((previous) => (previous.includes(tag) ? previous.filter((item) => item !== tag) : [...previous, tag]));
  }

  useEffect(() => {
    const lightingGroup = FILTER_GROUPS.find((group) => group.name === "Lighting");
    const cameraGroup = FILTER_GROUPS.find((group) => group.name === "Camera Movement");
    const style = activeTags.find((tag) => lightingGroup?.tags.includes(tag as never)) ?? "";
    const camera = activeTags.find((tag) => cameraGroup?.tags.includes(tag as never)) ?? "";

    onFiltersChange?.({ activeTags, style, camera });
  }, [activeTags, onFiltersChange]);

  return (
    <aside className="card" style={{ width: "280px", minWidth: "280px", alignSelf: "start", position: "sticky", top: "1rem", maxHeight: "calc(100vh - 2rem)", overflowY: "auto" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ margin: 0, marginBottom: "0.25rem", fontSize: "1.1rem" }}>Industry Scout</h2>
        <p className="muted" style={{ margin: 0, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Aesthetic Search Engine
        </p>
      </div>

      <div className="grid" style={{ gap: "1rem" }}>
        {FILTER_GROUPS.map((group) => (
          <div key={group.name}>
            <h3 className="muted" style={{ fontSize: "0.72rem", marginTop: 0, marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              {group.name}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {group.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  type="button"
                  style={{
                    padding: "0.35rem 0.7rem",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    border: activeTags.includes(tag) ? "1px solid #818cf8" : "1px solid #2f3448",
                    background: activeTags.includes(tag) ? "#4f46e5" : "#121624",
                    color: activeTags.includes(tag) ? "#fff" : "#9aa2c2",
                    cursor: "pointer"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeTags.length > 0 ? (
        <div style={{ marginTop: "1.3rem", padding: "0.8rem", border: "1px solid rgba(129,140,248,0.35)", background: "rgba(79,70,229,0.12)", borderRadius: "12px" }}>
          <p style={{ margin: 0, marginBottom: "0.35rem", color: "#a5b4fc", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Query Active</p>
          <p style={{ margin: 0, color: "#f2f4ff", fontSize: "0.8rem", lineHeight: 1.4 }}>
            Finding films with <span style={{ color: "#818cf8" }}>{activeTags.join(" + ")}</span>...
          </p>
        </div>
      ) : null}
    </aside>
  );
}