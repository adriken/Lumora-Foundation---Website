export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* ── Brand ── */}
        <div>
          <div className="footer-logo">Lumora<span>.</span></div>
          <div className="footer-tagline">
            Nourishing bodies. Empowering minds. Transforming a nation —
            one meal and one line of code at a time.
          </div>
          <div className="footer-socials">
            {["𝕏", "in", "▶", "📷"].map((s, i) => (
              <a key={i} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>

        {/* ── Organization ── */}
        <div>
          <div className="footer-col-title">Organization</div>
          <div className="footer-links">
            {["About Us", "Our Team", "Core Values", "Annual Reports", "Press & Media"].map((l, i) => (
              <a key={i} href="#" onClick={e => { e.preventDefault(); setPage("About"); }}>{l}</a>
            ))}
          </div>
        </div>

        {/* ── Our Work ── */}
        <div>
          <div className="footer-col-title">Our Work</div>
          <div className="footer-links">
            {["Food Relief", "Tech Education", "Innovation Labs", "Scholarship Program", "Impact Reports"].map((l, i) => (
              <a key={i} href="#" onClick={e => { e.preventDefault(); setPage("Missions"); }}>{l}</a>
            ))}
          </div>
        </div>

        {/* ── Get Involved ── */}
        <div>
          <div className="footer-col-title">Get Involved</div>
          <div className="footer-links">
            {[
              { label: "Donate", page: "Donate" },
              { label: "Partner With Us", page: "Contact" },
              { label: "Volunteer", page: "Contact" },
              { label: "Corporate CSR", page: "Contact" },
              { label: "Contact", page: "Contact" },
            ].map((l, i) => (
              <a key={i} href="#" onClick={e => { e.preventDefault(); setPage(l.page); }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 Lumora Foundation. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
