import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spotlight",
  description: "AI-driven indie film discovery platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container" style={{ padding: "1.25rem 0" }}>
          <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              Spotlight
            </Link>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/upload">Uploader</Link>
              <Link href="/scout">Scout Dashboard</Link>
            </div>
          </nav>
        </header>
        <main className="container" style={{ paddingBottom: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}