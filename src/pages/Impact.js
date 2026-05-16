// ════════════════════════════════════════════════════════════════════
//  Impact.js
// ════════════════════════════════════════════════════════════════════
import { Counter, FadeIn } from "../components/utils";

export default function Impact() {
  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <div className="impact-bg">
          <FadeIn>
            <div className="impact-header">
              <div className="section-tag">Accountability</div>
              <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", textAlign: "center" }}>
                Impact You Can <em>Measure.</em><br />Trust You Can <em>Verify.</em>
              </h1>
              <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
                We believe impact without evidence is just intent. Every metric below is independently audited.
              </p>
            </div>
          </FadeIn>

          <div className="impact-grid">
            {[
              { icon: "🍽️", num: 142000, suf: "+", label: "Total Meals Distributed",      sub: "Since 2019 across 47 communities" },
              { icon: "👩‍💻", num: 3800,   suf: "+", label: "Girls Trained in Tech",         sub: "Coding, AI, digital literacy" },
              { icon: "🏫", num: 7,       suf: "",  label: "Innovation Labs Built",          sub: "Solar-powered, rural schools" },
              { icon: "🎓", num: 280,     suf: "+", label: "Full Scholarships Awarded",      sub: "STEM university placements" },
              { icon: "🌍", num: 47,      suf: "",  label: "Communities Reached",            sub: "Across 8 Kenyan counties" },
              { icon: "🤝", num: 12,      suf: "",  label: "NGO & UN Partnerships",          sub: "WFP, UNICEF & bilateral donors" },
              { icon: "💧", num: 23,      suf: "",  label: "Water Systems Installed",        sub: "Rainwater harvesting infrastructure" },
              { icon: "📊", num: 94,      suf: "%", label: "Scholarship Retention",          sub: "Industry-leading program completion" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="impact-card">
                  <span className="impact-icon">{c.icon}</span>
                  <div className="impact-num"><Counter end={c.num} suffix={c.suf} /></div>
                  <div className="impact-label">{c.label}</div>
                  <div className="impact-sub">{c.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Fund allocation */}
        <section className="section">
          <FadeIn>
            <div className="section-tag">Financial Transparency</div>
            <h2 className="section-h2">Where Your Money <em>Goes</em></h2>
            <p className="section-body" style={{ marginBottom: 48 }}>
              Lumora maintains a best-in-class overhead ratio. 87 cents of every dollar reaches direct program delivery.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 20 }}>
            {[
              { pct: "52%", label: "Food Relief & Distribution",         color: "var(--ember)" },
              { pct: "35%", label: "Tech Education & Scholarships",       color: "var(--sage)" },
              { pct: "8%",  label: "Infrastructure & Innovation Labs",    color: "var(--ember-glow)" },
              { pct: "5%",  label: "Admin, Reporting & Compliance",       color: "var(--sand-dim)" },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: "2.8rem", fontWeight: 800, color: f.color, marginBottom: 12 }}>{f.pct}</div>
                  <div style={{ height: 4, borderRadius: 2, background: f.color, opacity: 0.3, marginBottom: 16 }} />
                  <div style={{ fontSize: "0.875rem", color: "var(--sand)", fontWeight: 500, lineHeight: 1.5 }}>{f.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="section" style={{ paddingTop: 0 }}>
          <FadeIn>
            <div className="section-tag">Our Journey</div>
            <h2 className="section-h2">Five Years of <em>Milestones</em></h2>
          </FadeIn>
          <div className="timeline">
            {[
              { year: "2019", event: "Lumora Founded",            detail: "Registered in Nairobi. First food relief operation in Turkana, reaching 200 families with emergency packages during severe drought." },
              { year: "2020", event: "First Coding Bootcamp",     detail: "Launched pilot cohort of 40 girls in Nairobi's Mathare Valley. 38 completed. 12 went on to university STEM programs." },
              { year: "2021", event: "UN Partnership & Scale",    detail: "Partnered with WFP and UNICEF. Expanded food relief to 5 counties. Reached 50,000 meals distributed milestone." },
              { year: "2022", event: "Innovation Labs Launch",    detail: "Opened first 3 solar-powered Innovation Labs in Marsabit, Kilifi, and Garissa counties during Kenya's worst drought in 40 years." },
              { year: "2023", event: "3,000 Girls Milestone",     detail: "Surpassed 3,000 girls trained in technology. Launched full university scholarship program with 4 Kenyan universities." },
              { year: "2024–25", event: "Global Recognition",    detail: "Recognized by African Union for innovation in humanitarian technology. Expanded to 8 counties. 142,000+ meals delivered." },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-dot">{i + 1}</div>
                  <div className="timeline-content">
                    <div className="timeline-year">{t.year}</div>
                    <div className="timeline-event">{t.event}</div>
                    <div className="timeline-detail">{t.detail}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="partners-section" style={{ maxWidth: "100%", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag" style={{ textAlign: "center" }}>Our Partners</div>
              <h2 className="section-h2" style={{ textAlign: "center" }}>Organizations That <em>Believe With Us</em></h2>
            </FadeIn>
            <div className="partners-row">
              {["UN World Food Programme","UNICEF Kenya","Google.org","Microsoft Philanthropies","African Development Bank","Kenya Red Cross","Safaricom Foundation","Bill & Melinda Gates Foundation"].map((p, i) => (
                <div key={i} className="partner-pill">{p}</div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}