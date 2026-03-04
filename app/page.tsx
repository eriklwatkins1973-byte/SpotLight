import Link from "next/link";

const scoutFilters = ["Neon-Noir", "Handheld", "Natural Lighting", "Steadicam", "Chiaroscuro"];

export default function HomePage() {
  return (
    <section className="grid" style={{ gap: "1.5rem" }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>AI-Driven Indie Film Discovery</h1>
        <p className="muted">
          Spotlight uses multimodal indexing to surface films by cinematic DNA such as lighting, camera movement,
          and aesthetic style.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link className="btn" href="/upload">
            Open Uploader
          </Link>
          <Link className="btn" href="/scout">
            Open Scout Dashboard
          </Link>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>For Filmmakers</h3>
          <p className="muted">Upload shorts and features, get style metadata, and unlock monetization channels.</p>
        </article>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>For Scouts</h3>
          <p className="muted">Filter by technical and aesthetic attributes to find talent in seconds.</p>
        </article>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>For Buyers</h3>
          <p className="muted">Use a serverless-ready pipeline optimized for recurring revenue.</p>
        </article>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Popular Cinematic DNA filters</h3>
        {scoutFilters.map((filter) => (
          <span key={filter} className="pill">
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}