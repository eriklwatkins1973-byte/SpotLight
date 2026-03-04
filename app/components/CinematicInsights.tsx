"use client";

const MOCK_INSIGHTS = [
  { category: "Lighting", label: "Neon-Noir", confidence: 0.98, color: "#22d3ee" },
  { category: "Cinematography", label: "Dolly Zoom", confidence: 0.92, color: "#818cf8" },
  { category: "Pacing", label: "Slow Burn", confidence: 0.85, color: "#fbbf24" },
  { category: "Audio", label: "Ambient Minimalist", confidence: 0.94, color: "#34d399" }
];

export default function CinematicInsights() {
  function downloadMetadata() {
    const payload = {
      generatedAt: new Date().toISOString(),
      source: "mock-twelve-labs",
      cinematicDna: MOCK_INSIGHTS
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "directors-metadata.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card" style={{ marginTop: "1rem", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.35)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Cinematic DNA Profile</h3>
        <span
          style={{
            fontSize: "0.7rem",
            background: "#181a23",
            color: "#a1a6be",
            padding: "0.2rem 0.5rem",
            borderRadius: "8px",
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}
        >
          AI Verified
        </span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
        {MOCK_INSIGHTS.map((insight) => (
          <div key={insight.label} style={{ background: "rgba(0,0,0,0.35)", padding: "0.9rem", borderRadius: "12px", border: "1px solid #24283a" }}>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "#8389a6", margin: 0, marginBottom: "0.3rem" }}>{insight.category}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
              <span style={{ fontSize: "1.05rem", color: insight.color }}>{insight.label}</span>
              <span style={{ fontSize: "0.7rem", color: "#8e94b2", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                {(insight.confidence * 100).toFixed(0)}% Match
              </span>
            </div>
            <div style={{ marginTop: "0.5rem", height: "4px", width: "100%", background: "#232739", borderRadius: "999px" }}>
              <div style={{ height: "100%", width: `${insight.confidence * 100}%`, background: "#5d657f", borderRadius: "999px" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #24283a" }}>
        <button onClick={downloadMetadata} className="btn" style={{ width: "100%", background: "#f4f5fb", color: "#0a0b12", border: "none" }}>
          Download Full Director&apos;s Metadata (.JSON)
        </button>
      </div>
    </div>
  );
}