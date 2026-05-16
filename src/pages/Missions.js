import { useState } from "react";
import { FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────────
// Uncomment each line after saving the image to src/images/

// import foodHero      from "../images/food-hero.jpg";
// import foodField     from "../images/food-field.jpg";
// import foodResilience from "../images/food-resilience.jpg";
// import techHero      from "../images/tech-hero.jpg";
// import techCoding    from "../images/tech-coding.jpg";
// import techLab       from "../images/tech-lab.jpg";
// import galleryFood1  from "../images/gallery-food-1.jpg";
// import galleryFood2  from "../images/gallery-food-2.jpg";
// import galleryFood3  from "../images/gallery-food-3.jpg";
// import galleryFood4  from "../images/gallery-food-4.jpg";

export default function Missions({ setPage }) {
  const [activeTab, setActiveTab] = useState("food");

  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <section className="section" style={{ paddingBottom: 40 }}>
          <FadeIn>
            <div className="section-tag">Our Work</div>
            <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
              Two Crises.<br /><em>One Mission.</em>
            </h1>
            <p className="section-body">
              Lumora operates at the intersection of food security and digital equity —
              because you cannot code on an empty stomach, and you cannot feed a family
              without economic power.
            </p>
          </FadeIn>
        </section>
      </div>

      {/* ── Tab switcher ── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)", position: "sticky", top: 76, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex" }}>
          <button className={`page-tab${activeTab === "food" ? " active" : ""}`} onClick={() => setActiveTab("food")}>
            🍽️ Humanitarian Food Relief
          </button>
          <button className={`page-tab${activeTab === "tech" ? " active" : ""}`} onClick={() => setActiveTab("tech")}>
            👩‍💻 Girl Child Tech Empowerment
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FOOD RELIEF TAB
          ════════════════════════════════════════ */}
      {activeTab === "food" && (
        <div className="missions-wrapper">

          {/* Crisis context */}
          <div style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">The Crisis</div>
              <h2 className="section-h2">
                Kenya's Hunger Emergency<br /><em>Is Not a News Story. It's a Daily Reality.</em>
              </h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Over 17 million Kenyans — nearly a third of the population — face chronic food
                insecurity. In the Arid and Semi-Arid Lands (ASAL) that make up 80% of Kenya's
                territory, successive droughts have pushed entire communities to the edge. The
                2022 drought was Kenya's worst in 40 years. Children under 5 face acute
                malnutrition rates exceeding 30% in worst-affected counties.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 40 }}>
                But this crisis is not inevitable. It is the product of structural failures —
                inadequate infrastructure, climate change, weak food systems, and decades of
                under-investment in rural communities. Lumora is here to interrupt that cycle.
              </p>
            </FadeIn>
            <div className="mission-stats">
              {[
                { n: "17M+", l: "Kenyans food insecure" },
                { n: "80%",  l: "Of Kenya is ASAL — drought-prone" },
                { n: "30%",  l: "Acute malnutrition, worst counties" },
                { n: "3.5M", l: "Children acutely affected" },
              ].map((s, i) => (
                <div key={i} className="mission-stat">
                  <div className="mission-stat-num">{s.n}</div>
                  <div className="mission-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Block 1: Emergency Response ── */}
          <div className="mission-block">
            <div className="mission-visual">
              {/* ── FOOD RELIEF HERO IMAGE ──
                  CURRENT: placeholder
                  TO ADD YOUR PHOTO:
                    1. Save to src/images/food-field.jpg
                    2. Uncomment: import foodField from "../images/food-field.jpg"
                    3. Replace the div below with:
                       <img src={foodField} alt="Food relief field operation" className="mission-real-img" />
              ── */}
              <div className="mission-img-placeholder">
                <div className="mission-img-icon">🍽️</div>
                <div className="mission-img-label">src/images/food-field.jpg</div>
              </div>
            </div>
            <div className="mission-content">
              <div className="section-tag">Emergency Response</div>
              <h2 className="section-h2">
                Feeding Families<br />Before the Crisis<br /><em>Becomes a Catastrophe</em>
              </h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Our Rapid Response Teams deploy within 72 hours of drought alerts in monitored
                counties. Each response delivers calorie-dense, culturally appropriate food
                packages — enough to sustain a family of 5 for 30 days — alongside clean water
                access and nutritional counseling.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                We partner with local women's cooperatives for distribution, ensuring community
                trust, dignity, and that women control household food access.
              </p>
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>
                Feed a Family — $45/month
              </a>
            </div>
          </div>

          {/* ── Block 2: Resilience ── */}
          <div className="mission-block reverse">
            <div className="mission-visual">
              {/* ── RESILIENCE IMAGE ──
                  Replace with: <img src={foodResilience} alt="Community resilience program" className="mission-real-img" />
              ── */}
              <div className="mission-img-placeholder" style={{ background: "linear-gradient(135deg, #0f1a0f, #1a1208)" }}>
                <div className="mission-img-icon">🌱</div>
                <div className="mission-img-label">src/images/food-resilience.jpg</div>
              </div>
            </div>
            <div className="mission-content">
              <div className="section-tag">Long-Term Resilience</div>
              <h2 className="section-h2">From Relief<br />to <em>Resilience</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Emergency food is a lifeline, not a solution. That's why every Lumora food
                program connects families to our Community Resilience Initiative — teaching
                drought-resistant farming, building rainwater harvesting systems, and training
                local agronomists.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Within 18 months of program entry, 73% of participating families report food
                self-sufficiency. This is how we exit communities with dignity.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Support Resilience Programs</a>
                <a href="#" className="btn-secondary">Download Field Report</a>
              </div>
            </div>
          </div>

          {/* ── Gallery ── */}
          <div style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">Field Gallery</div>
              <h2 className="section-h2">From the <em>Field</em></h2>
              <p style={{ color: "var(--sand-dim)", fontSize: "0.875rem", marginBottom: 32 }}>
                Replace each placeholder with a real field photo (see filenames below).
              </p>
            </FadeIn>

            {/* ── GALLERY GRID ──
                TO ADD PHOTOS:
                  1. Save 8 photos to src/images/ named gallery-food-1.jpg through gallery-food-8.jpg
                  2. Import them all at the top of this file
                  3. Replace each placeholder div with:
                     <img src={galleryFood1} alt="Field photo 1" style={{ width:'100%', aspectRatio:'1', objectFit:'cover', borderRadius:12, display:'block' }} />
            ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {["food-1","food-2","food-3","food-4","food-5","food-6","food-7","food-8"].map((name, i) => (
                <div key={i} style={{
                  aspectRatio: "1",
                  background: "var(--panel)", border: "2px dashed var(--border)",
                  borderRadius: 12, display: "flex", alignItems: "center",
                  justifyContent: "center", flexDirection: "column", gap: 6,
                  fontSize: "0.65rem", color: "var(--sand-dim)", letterSpacing: "0.06em",
                  textTransform: "uppercase", cursor: "pointer",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>📷</span>
                  gallery-{name}.jpg
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          TECH EMPOWERMENT TAB
          ════════════════════════════════════════ */}
      {activeTab === "tech" && (
        <div className="missions-wrapper">

          {/* Challenge context */}
          <div style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">The Challenge</div>
              <h2 className="section-h2">
                Africa's Digital Future<br /><em>Is Being Built Without Women.</em>
              </h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Across Sub-Saharan Africa, women account for fewer than 22% of tech sector
                workers. In Kenya, girls from rural areas face a triple barrier: poverty,
                patriarchal educational norms, and the absence of digital infrastructure.
                Early marriage affects 23% of Kenyan girls. Without intervention at the
                critical ages of 10–18, girls are permanently locked out of the digital economy.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 40 }}>
                The McKinsey Global Institute estimates that closing the gender gap in Africa's
                digital economy could add $316 billion to continental GDP by 2040. Every girl
                we reach is an investment in that future.
              </p>
            </FadeIn>
            <div className="mission-stats">
              {[
                { n: "22%",   l: "Women in African tech" },
                { n: "23%",   l: "Kenyan girls married before 18" },
                { n: "$316B", l: "GDP unlocked by gender-equal digital economy" },
                { n: "94%",   l: "Lumora scholarship retention rate" },
              ].map((s, i) => (
                <div key={i} className="mission-stat">
                  <div className="mission-stat-num">{s.n}</div>
                  <div className="mission-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Block 1: Code Academy ── */}
          <div className="mission-block">
            <div className="mission-visual">
              {/* ── CODING BOOTCAMP IMAGE ──
                  Replace with: <img src={techCoding} alt="Girls coding bootcamp" className="mission-real-img" />
              ── */}
              <div className="mission-img-placeholder" style={{ background: "linear-gradient(135deg, #0d0f1a, #0f1a12)" }}>
                <div className="mission-img-icon">👩‍💻</div>
                <div className="mission-img-label">src/images/tech-coding.jpg</div>
              </div>
            </div>
            <div className="mission-content">
              <div className="section-tag">Lumora Code Academy</div>
              <h2 className="section-h2">12 Weeks.<br /><em>A Career Changed Forever.</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                The Lumora Code Academy is a 12-week immersive coding bootcamp for girls aged
                13–22 from underserved communities. Participants learn Python, web development,
                data analysis, and artificial intelligence basics — using curriculum co-designed
                with Google, Microsoft, and leading Kenyan universities.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Every participant receives a refurbished laptop, data bundle stipend, mentorship
                from a Kenyan tech professional, and a living allowance — eliminating every
                barrier to attendance.
              </p>
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>
                Sponsor a Girl — $120/month
              </a>
            </div>
          </div>

          {/* ── Block 2: Innovation Labs ── */}
          <div className="mission-block reverse">
            <div className="mission-visual">
              {/* ── LAB IMAGE ──
                  Replace with: <img src={techLab} alt="Innovation lab" className="mission-real-img" />
              ── */}
              <div className="mission-img-placeholder" style={{ background: "linear-gradient(135deg, #1a120d, #0d1a15)" }}>
                <div className="mission-img-icon">🏫</div>
                <div className="mission-img-label">src/images/tech-lab.jpg</div>
              </div>
            </div>
            <div className="mission-content">
              <div className="section-tag">Innovation Labs</div>
              <h2 className="section-h2">Building Tomorrow's<br /><em>Innovators Today</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Lumora has established 7 Innovation Labs in rural secondary schools across
                Turkana, Marsabit, Kilifi, and Garissa counties — fully equipped with computers,
                solar power, high-speed internet, and trained female mentors.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Labs are open 7 days a week and serve as community digital hubs — enabling
                women's groups, small business owners, and local governments to access digital
                services and training beyond school hours.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Fund a Lab — $5,000</a>
                <a href="#" className="btn-secondary">Download Lab Report</a>
              </div>
            </div>
          </div>

          {/* ── Success stories ── */}
          <div style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">Success Stories</div>
              <h2 className="section-h2">The Girls Who <em>Changed the Story</em></h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24, marginTop: 40 }}>
              {[
                {
                  name: "Halima A., 19", loc: "Turkana County", emoji: "💻",
                  quote: "I got my first laptop through Lumora. Six months later, I built an app that tracks water sources for my community. Three NGOs now use it.",
                },
                {
                  name: "Grace M., 21", loc: "Kilifi County", emoji: "🎓",
                  quote: "I was about to drop out of school to get married. The Lumora scholarship gave me a reason — and a path — to stay. I'm now studying Computer Science at JKUAT.",
                },
                {
                  name: "Zawadi K., 17", loc: "Garissa County", emoji: "🌟",
                  quote: "My father said girls don't need computers. After I showed him my first website, he told the whole village. Now he drives me to every session.",
                },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="testimonial-card">
                    <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{s.emoji}</div>
                    <div className="testimonial-text">"{s.quote}"</div>
                    <div style={{ fontWeight: 700, color: "var(--cream)", fontSize: "0.9rem" }}>{s.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ember)", marginTop: 4 }}>{s.loc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}