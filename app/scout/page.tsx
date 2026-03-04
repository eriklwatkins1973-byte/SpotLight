"use client";

import { FormEvent, useState } from "react";
import ScoutFilter from "@/app/components/ScoutFilter";

type ScoutFilm = {
  id: string;
  title: string;
  brandSafety: number;
  visualStyle: string[];
  cinematography: string[];
};

export default function ScoutPage() {
  const [style, setStyle] = useState("Neon-Noir");
  const [camera, setCamera] = useState("Handheld");
  const [results, setResults] = useState<ScoutFilm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(nextStyle: string, nextCamera: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scout/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: nextStyle, camera: nextCamera })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Search failed");
      }
      setResults(data.results ?? []);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runSearch(style, camera);
  }

  return (
    <section style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <ScoutFilter
        onFiltersChange={async (filters) => {
          const nextStyle = filters.style || style;
          const nextCamera = filters.camera || camera;

          if (filters.style) {
            setStyle(filters.style);
          }
          if (filters.camera) {
            setCamera(filters.camera);
          }

          if (filters.activeTags.length > 0) {
            await runSearch(nextStyle, nextCamera);
          }
        }}
      />

      <div className="grid" style={{ flex: 1 }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Industry Scout Dashboard</h1>
          <p className="muted">Filter by cinematic DNA and shortlist films with strong technical fit and safety scores.</p>

          <form onSubmit={onSearch} className="grid" style={{ marginTop: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <label className="grid" style={{ gap: "0.4rem" }}>
              <span>Visual Style</span>
              <input
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                style={{ padding: "0.65rem", borderRadius: "8px", border: "1px solid #2c3350", background: "#0d1020", color: "#eef0fc" }}
              />
            </label>
            <label className="grid" style={{ gap: "0.4rem" }}>
              <span>Camera Motion</span>
              <input
                value={camera}
                onChange={(event) => setCamera(event.target.value)}
                style={{ padding: "0.65rem", borderRadius: "8px", border: "1px solid #2c3350", background: "#0d1020", color: "#eef0fc" }}
              />
            </label>
            <div style={{ display: "flex", alignItems: "end" }}>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Searching…" : "Run Search"}
              </button>
            </div>
          </form>
          {error ? <p style={{ color: "#ff8f8f" }}>{error}</p> : null}
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {results.map((film) => (
            <article key={film.id} className="card">
              <h3 style={{ marginTop: 0 }}>{film.title}</h3>
              <p className="muted">Brand Safety: {film.brandSafety}</p>
              <div>
                {film.visualStyle.map((tag) => (
                  <span className="pill" key={`${film.id}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                {film.cinematography.map((tag) => (
                  <span className="pill" key={`${film.id}-cam-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}