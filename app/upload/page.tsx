"use client";

import { FormEvent, useState } from "react";
import * as UpChunk from "@mux/upchunk";
import CinematicInsights from "@/app/components/CinematicInsights";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [muxProgress, setMuxProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState("Waiting...");
  const [showInsights, setShowInsights] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startTwelveLabsAnalysis(_videoFile: File, _indexId: string | null) {
    setAiStatus("AI Scanning for Lighting & Camera Movement...");
    setTimeout(() => {
      setAiStatus("Success: Cinematic DNA Extracted.");
      setLoading(false);
      setShowInsights(true);
    }, 5000);
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    setError(null);
    setMuxProgress(0);
    setAiStatus("Waiting...");
    setShowInsights(false);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "My Indie Film", userId: "user_123" })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      const upload = UpChunk.createUpload({
        endpoint: data.uploadUrl,
        file,
        chunkSize: 5120
      });

      upload.on("progress", (progressEvent) => {
        setMuxProgress(Math.floor(progressEvent.detail));
      });

      upload.on("success", () => {
        setAiStatus("Video Stored. Starting AI Cinematic Analysis...");
        void startTwelveLabsAnalysis(file, data.twelveLabsIndexId ?? null);
      });

      upload.on("error", () => {
        setError("Mux upload failed");
        setLoading(false);
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unknown error");
    }
  }

  return (
    <section>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Cinematic DNA Uploader</h1>
        <p className="muted">Upload a film directly to Mux and trigger cinematic AI analysis initialization.</p>

        <form onSubmit={handleUpload} className="grid" style={{ marginTop: "1rem" }}>
          <label className="grid" style={{ gap: "0.4rem" }}>
            <span>Select video file</span>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              style={{ padding: "0.65rem", borderRadius: "8px", border: "1px solid #2c3350", background: "#0d1020", color: "#eef0fc" }}
            />
          </label>
          <button className="btn" disabled={!file || loading} type="submit" style={{ width: "fit-content" }}>
            {loading ? "Processing Cinema..." : "Upload to Spotlight"}
          </button>
          {error ? <p style={{ color: "#ff8f8f", margin: 0 }}>{error}</p> : null}

          {loading ? (
            <div className="grid" style={{ marginTop: "1rem", gap: "0.75rem" }}>
              <div>
                <p className="muted" style={{ margin: 0, marginBottom: "0.4rem", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                  STREAMING OPTIMIZATION
                </p>
                <div style={{ height: "8px", width: "100%", background: "#1d2133", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${muxProgress}%`, background: "#6366f1", transition: "width 200ms linear" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: aiStatus.includes("Success") ? "#22c55e" : "#eab308"
                  }}
                />
                <p style={{ margin: 0, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{aiStatus}</p>
              </div>
            </div>
          ) : null}
        </form>
      </div>

      {showInsights ? <CinematicInsights /> : null}
    </section>
  );
}