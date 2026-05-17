import { FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
import officePhoto  from "../images/about-office.jpg";
import founderPhoto from "../images/founder-aisha.jpg";
import jamesPhoto   from "../images/team-james.jpg";
import fatumaPhoto  from "../images/team-fatuma.jpg";
import markPhoto    from "../images/team-mark.jpg";

export default function About() {
  return (
    <>
      <div style={{ paddingTop: 80, background: "var(--deep)" }}>
        {/* ══ STORY SECTION ══ */}
        <section className="section">
          <FadeIn>
            <div className="section-tag">Our Story</div>
            <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
              Born from Urgency.<br /><em>Built for Transformation.</em>
            </h1>
          </FadeIn>
          <div className="about-grid" style={{ marginTop: 60 }}>
            <FadeIn>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 24 }}>
                Lumora Foundation was founded in 2021 in Nairobi, Kenya, after our founders
                spent years working in rural relief operations and watching the same pattern
                repeat: communities receiving food aid but not the tools to escape hunger
                permanently; girls receiving basic education but being excluded from the
                digital economy reshaping the world.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 24 }}>
                The name "Lumora" is derived from the Latin <em>lumen</em> (light) and the
                Swahili <em>mora</em> (rising slowly but surely) — a deliberate reflection
                of our philosophy: sustainable, dignified, lasting change.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 36 }}>
                Today, Lumora operates across 8 Kenyan counties, partners with 12 international
                organizations, and has directly transformed the lives of over 146,000 Kenyans
                through food relief, technology education, and community resilience programmes.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[{ num: "2021", label: "Founded, Nairobi" }, { num: "8", label: "Counties Active" }, { num: "146K+", label: "Lives Touched" }].map((m, i) => (
                  <div key={i} style={{ background: "var(--panel)", borderRadius: 16, padding: "24px 28px", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: "2rem", fontWeight: 800, color: "var(--ember)" }}>{m.num}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--sand-dim)", marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              {/* about-office.jpg */}
              <img
                src={officePhoto}
                alt="Lumora Foundation office and team"
                style={{ width: "100%", minHeight: 480, objectFit: "cover", borderRadius: 20, display: "block" }}
              />
            </FadeIn>
          </div>
        </section>
      </div>

      {/* ══ MISSION & VISION ══ */}
      <section style={{ background: "var(--panel)", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { tag: "Our Mission", title: "Nourish. Educate. Empower.", body: "To eliminate acute hunger among vulnerable Kenyan communities while providing transformative technology education to girls — building a generation of female leaders equipped to solve Africa's hardest problems." },
              { tag: "Our Vision",  title: "A Kenya Where No Girl is Left Behind.", body: "We envision a Kenya — and by extension, an Africa — where every child is fed, every girl has access to world-class education, and the digital economy is built by the very communities it was meant to serve." },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 40 }}>
                  <div className="section-tag">{m.tag}</div>
                  <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--cream)", marginBottom: 16, lineHeight: 1.25 }}>{m.title}</h3>
                  <p style={{ color: "var(--sand-dim)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>{m.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section className="section">
        <FadeIn>
          <div className="section-tag">Core Values</div>
          <h2 className="section-h2">What We Stand For</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>
          {[
            { icon: "🔍", title: "Radical Transparency",       desc: "We publish full financial reports, impact audits, and field data. Donors always know exactly where every dollar goes." },
            { icon: "🌱", title: "Dignity-First Aid",          desc: "Food relief delivered without conditions, shame, or political agenda. Communities are partners, not recipients." },
            { icon: "⚡", title: "Technology as Liberation",   desc: "We believe access to coding, AI, and digital tools is a human right — especially for girls in underserved communities." },
            { icon: "🤝", title: "Community Ownership",        desc: "Programmes are designed with, not for, communities. Local leaders drive every initiative from inception." },
            { icon: "📊", title: "Evidence-Driven",            desc: "Every programme is measured, evaluated, and iterated. Good intentions are not enough — results are our currency." },
            { icon: "🌍", title: "Global Vision, Local Roots", desc: "We think at a global scale while staying deeply embedded in the specific contexts and needs of each community." },
          ].map((v, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="value-card" style={{ padding: 28 }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 16 }}>{v.icon}</div>
                <div style={{ fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--sand-dim)", lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ LEADERSHIP ══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <FadeIn>
          <div className="section-tag">Our Leadership</div>
          <h2 className="section-h2">The People <em>Behind the Work</em></h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginTop: 48 }}>
          {[
            { name: "Dr. Aisha Kamau",  role: "Executive Director & Co-Founder", img: founderPhoto },
            { name: "James Ochieng",    role: "Director of Field Operations",     img: jamesPhoto   },
            { name: "Fatuma Hassan",    role: "Head of Girl Child Programmes",    img: fatumaPhoto  },
            { name: "Dr. Mark Waweru",  role: "Chief Partnership Officer",        img: markPhoto    },
          ].map((l, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", transition: "transform .3s" }}>
                {/* Real headshot photos */}
                <img
                  src={l.img}
                  alt={l.name}
                  style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "top", display: "block" }}
                />
                <div style={{ padding: 24 }}>
                  <div style={{ fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>{l.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--ember)", fontWeight: 500 }}>{l.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
