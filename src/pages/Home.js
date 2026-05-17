import { Counter, FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
import aboutPhoto from "../images/about-team.jpg";

function openImpactReport() {
  window.open("/impact-report.html", "_blank", "noopener,noreferrer");
}

export default function Home({ setPage }) {
  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <div className="hero-tag">Kenya · Est. 2021 · Registered NGO</div>
          <h1 className="hero-h1">
            When a Girl Learns to Code,<br />
            <em>a Nation Learns to Rise.</em>
          </h1>
          <p className="hero-sub">
            The Lumora Foundation ends hunger and ignites futures across Kenya —
            through emergency food relief and transformative technology education
            for girls who deserve a chance to lead the world.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>♥ Donate Today</a>
            <a href="#" className="btn-secondary" onClick={e => { e.preventDefault(); setPage("Missions"); }}>Our Mission →</a>
            <a href="#" className="btn-ghost" onClick={e => { e.preventDefault(); setPage("Stories"); }}>▶ Watch Stories</a>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" />Scroll</div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <div className="stats-strip">
        {[
          { num: 142000, suf: "+", label: "Meals Delivered" },
          { num: 3800,   suf: "+", label: "Girls Trained in Tech" },
          { num: 47,     suf: "",  label: "Communities Reached" },
          { num: 12,     suf: "",  label: "Partner Organizations" },
          { num: 94,     suf: "%", label: "Scholarship Retention Rate" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num"><Counter end={s.num} suffix={s.suf} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══ ABOUT OVERVIEW ══ */}
      <section className="section">
        <div className="about-grid">
          <FadeIn>
            <div className="section-tag">Who We Are</div>
            <h2 className="section-h2">Built on Crisis.<br />Driven by <em>Purpose.</em></h2>
            <p className="section-body" style={{ marginBottom: 24 }}>
              Lumora Foundation was born from witnessing the painful intersection of two crises:
              children sleeping hungry in rural Kenya, and brilliant girls denied the future
              they deserve simply because they are girls.
            </p>
            <p className="section-body" style={{ marginBottom: 36 }}>
              We don't just provide food and devices. We dismantle the systems of inequality
              that created these crises — one meal, one line of code, one transformed life at a time.
            </p>
            <div className="values-grid">
              {[
                { icon: "🌿", title: "Radical Transparency", desc: "Every dollar traced. Every impact reported. No exceptions." },
                { icon: "⚡", title: "Systems Thinking",     desc: "We address root causes, not symptoms, of poverty and exclusion." },
                { icon: "🌍", title: "African Leadership",   desc: "Built by Africans, for Africa — with global ambition." },
              ].map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* about-team.jpg */}
            <img
              src={aboutPhoto}
              alt="Lumora Foundation team"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 20, display: "block" }}
            />
          </FadeIn>
        </div>
      </section>

      {/* ══ WHY KENYA ══ */}
      <div className="why-kenya">
        <div className="why-kenya-inner">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="section-tag">The Context</div>
              <h2 className="section-h2">Why Kenya? Why <em>Now?</em></h2>
              <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
                Kenya sits at a critical inflection point — constrained by hunger, inequality,
                and a digital gender gap that costs the economy billions.
              </p>
            </div>
          </FadeIn>
          <div className="why-kenya-grid">
            {[
              { n: "01", title: "36% Food Insecurity",         body: "Over 17 million Kenyans face food insecurity. ASAL regions experience near-permanent drought with children as the primary victims of acute malnutrition." },
              { n: "02", title: "Girls Left Behind in STEM",   body: "Kenyan girls represent only 31% of STEM graduates. Cultural barriers, early marriage, and poverty systematically remove them from the digital economy." },
              { n: "03", title: "Africa's Largest Youth Pop.", body: "By 2050, 1 in 4 people on Earth will be African. Kenya's demographic dividend is only unlocked if its young women are educated, fed, and empowered." },
              { n: "04", title: "The $1 Trillion Opportunity", body: "Africa's digital economy is projected to reach $1 trillion by 2050. Without girls, that economy will only ever be half-built." },
              { n: "05", title: "Climate-Driven Displacement", body: "Successive droughts, intensified by climate change, are displacing rural Kenyan families at rates unseen since the 2011 famine." },
              { n: "06", title: "Kenyan Girls Are Ready",      body: "Given the tools, Kenyan girls consistently outperform global peers in coding bootcamps and STEM assessments. The potential is there. The access is not." },
            ].map((w, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="why-card">
                  <div className="why-num">{w.n}</div>
                  <div className="why-title">{w.title}</div>
                  <div className="why-body">{w.body}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ══ VISION QUOTE ══ */}
      <section className="section" style={{ paddingBottom: 60 }}>
        <FadeIn>
          <div className="vision-banner">
            <div className="vision-quote">
              "We are not building a charity. We are building the infrastructure of a transformed
              Kenya — one that is fed, educated, and led by the women the world underestimated."
            </div>
            <div className="vision-attr">— Lumora Foundation, Founding Charter 2021</div>
          </div>
        </FadeIn>
      </section>

      {/* ══ IMPACT CARDS + REPORT BUTTON ══ */}
      <section className="section" style={{ paddingTop: 60 }}>
        <FadeIn>
          <div className="section-tag">Impact at a Glance</div>
          <h2 className="section-h2">Numbers That <em>Move People.</em></h2>
        </FadeIn>
        <div className="impact-grid" style={{ marginTop: 48 }}>
          {[
            { icon: "🍽️", num: 142000, suf: "+", label: "Meals Distributed",    sub: "Across 47 communities in 8 counties" },
            { icon: "👩‍💻", num: 3800,   suf: "+", label: "Girls Trained",        sub: "In coding, AI, and digital literacy" },
            { icon: "🎓", num: 280,     suf: "+", label: "Scholarships Awarded", sub: "Full & partial STEM scholarships" },
            { icon: "🤝", num: 12,      suf: "",  label: "NGO Partnerships",     sub: "UN, WFP, and bilateral partners" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="impact-card">
                <span className="impact-icon">{c.icon}</span>
                <div className="impact-num"><Counter end={c.num} suffix={c.suf} /></div>
                <div className="impact-label">{c.label}</div>
                <div className="impact-sub">{c.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              onClick={openImpactReport}
              style={{
                background: "var(--ember)", color: "var(--obsidian)", border: "none",
                borderRadius: 100, padding: "16px 36px", fontFamily: "var(--ff-body)",
                fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 10, transition: "all .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ember-glow)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ember)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              📊 View Full Impact Report 2025
            </button>
            <div style={{ marginTop: 14, fontSize: "0.8rem", color: "var(--sand-dim)" }}>
              Independently audited · 2021–2025 · Opens in a new tab
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testimonials-section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-tag" style={{ textAlign: "center" }}>Voices of Change</div>
            <h2 className="section-h2" style={{ textAlign: "center" }}>The Humans <em>Behind the Numbers</em></h2>
          </FadeIn>
          <div className="testimonials-grid">
            {[
              { q: "Before Lumora, I thought computers were for boys in cities. Now I am teaching Python to my younger sister. I want to build apps that help Kenyan farmers predict droughts.", name: "Amina W.", role: "Tech Scholar, Turkana County", init: "A", color: "var(--ember)" },
              { q: "We had not eaten properly for three weeks when Lumora arrived. They didn't just bring food — they sat with us, they listened, they treated us with dignity. That is rare.", name: "Joseph M.", role: "Community Elder, Marsabit", init: "J", color: "var(--sage)" },
              { q: "As an impact investor, I've reviewed hundreds of African NGOs. Lumora's transparency, model, and measurable outcomes are genuinely world-class. This is where capital creates change.", name: "Dr. Priya N.", role: "Impact Investor, London", init: "P", color: "var(--ember-glow)" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-text">{t.q}</div>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, var(--sage-dim))` }}>
                      {t.init}
                    </div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <div className="newsletter">
        <div className="newsletter-h">Stay Connected to the Mission</div>
        <div className="newsletter-sub">Monthly impact reports, field stories, and urgent updates — directly to your inbox.</div>
        <div className="newsletter-form">
          <input className="newsletter-input" placeholder="your@email.com" type="email" />
          <button className="newsletter-btn">Subscribe</button>
        </div>
      </div>
    </>
  );
}
