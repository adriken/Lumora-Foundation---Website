import { useState, useEffect } from "react";

export default function Nav({ activePage, setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const pages = ["Home", "About", "Missions", "Impact", "Stories", "Donate", "Contact"];

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      {/* ── LOGO ── */}
      <div
        className="nav-logo"
        onClick={() => setPage("Home")}
      >
        Lumora<span>.</span>
      </div>

      {/* ── LINKS ── */}
      <div className="nav-links">
        {pages.map(p => (
          <a
            key={p}
            href="#"
            onClick={e => { e.preventDefault(); setPage(p); }}
          >
            {p}
          </a>
        ))}
        <a
          href="#"
          className="nav-cta"
          onClick={e => { e.preventDefault(); setPage("Donate"); }}
        >
          Donate Now
        </a>
      </div>
    </nav>
  );
}