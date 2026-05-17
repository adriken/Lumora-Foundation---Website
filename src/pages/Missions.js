import { useState } from "react";
import { FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
import foodField      from "../images/food-field.jpg";
import foodResilience from "../images/food-resilience.jpg";
import techCoding     from "../images/tech-coding.jpg";
import techLab        from "../images/tech-lab.jpg";
import gallery1       from "../images/gallery-food-1.jpg";
import gallery2       from "../images/gallery-food-2.jpg";
import gallery3       from "../images/gallery-food-3.jpg";
import gallery4       from "../images/gallery-food-4.jpg";
import gallery5       from "../images/gallery-food-5.jpg";
import gallery6       from "../images/gallery-food-6.jpg";
import gallery7       from "../images/gallery-food-7.jpg";
import gallery8       from "../images/gallery-food-8.jpg";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

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
          <button className={`page-tab${activeTab === "food" ? " active" : ""}`} onClick={() => setActiveTab("food")}>🍽️ Humanitarian Food Relief</button>
          <button className={`page-tab${activeTab === "tech" ? " active" : ""}`} onClick={() => setActiveTab("tech")}>👩‍💻 Girl Child Tech Empowerment</button>
        </div>
      </div>

      {/* ════ FOOD RELIEF TAB ════ */}
      {activeTab === "food" && (
        <div className="missions-wrapper">
          <div style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">The Crisis</div>
              <h2 className="section-h2">Kenya's Hunger Emergency<br /><em>Is Not a News Story. It's a Daily Reality.</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Over 17 million Kenyans face chronic food insecurity. In the Arid and Semi-Arid Lands (ASAL),
                successive droughts have pushed entire communities to the edge. Children under 5 face acute
                malnutrition rates exceeding 30% in the worst-affected counties.
              </p>
            </FadeIn>
            <div className="mission-stats">
              {[{ n: "17M+", l: "Kenyans food insecure" }, { n: "80%", l: "Of Kenya is ASAL — drought-prone" }, { n: "30%", l: "Acute malnutrition, worst counties" }, { n: "3.5M", l: "Children acutely affected" }].map((s, i) => (
                <div key={i} className="mission-stat">
                  <div className="mission-stat-num">{s.n}</div>
                  <div className="mission-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Block 1 — Emergency Response — food-field.jpg */}
          <div className="mission-block">
            <div className="mission-visual">
              <img src={foodField} alt="Lumora food relief field operation" className="mission-real-img" />
            </div>
            <div className="mission-content">
              <div className="section-tag">Emergency Response</div>
              <h2 className="section-h2">Feeding Families<br />Before the Crisis<br /><em>Becomes a Catastrophe</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Our Rapid Response Teams deploy within 72 hours of drought alerts. Each response delivers
                calorie-dense, culturally appropriate food packages — enough to sustain a family of 5 for
                30 days — alongside clean water access and nutritional counselling.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                We partner with local women's cooperatives for distribution, ensuring community trust,
                dignity, and that women control household food access.
              </p>
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Feed a Family — $45/month</a>
            </div>
          </div>

          {/* Block 2 — Resilience — food-resilience.jpg */}
          <div className="mission-block reverse">
            <div className="mission-visual">
              <img src={foodResilience} alt="Community resilience programme" className="mission-real-img" />
            </div>
            <div className="mission-content">
              <div className="section-tag">Long-Term Resilience</div>
              <h2 className="section-h2">From Relief<br />to <em>Resilience</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Emergency food is a lifeline, not a solution. Every Lumora food programme connects families
                to our Community Resilience Initiative — teaching drought-resistant farming, building
                rainwater harvesting systems, and training local agronomists.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Within 18 months of programme entry, 73% of participating families report food
                self-sufficiency. This is how we exit communities with dignity.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Support Resilience Programmes</a>
              </div>
            </div>
          </div>

          {/* Gallery — all 8 gallery-food images */}
          <div style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">Field Gallery</div>
              <h2 className="section-h2">From the <em>Field</em></h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 32 }}>
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Field photo ${i + 1}`}
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 12, display: "block", transition: "transform .3s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════ TECH EMPOWERMENT TAB ════ */}
      {activeTab === "tech" && (
        <div className="missions-wrapper">
          <div style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">The Challenge</div>
              <h2 className="section-h2">Africa's Digital Future<br /><em>Is Being Built Without Women.</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Across Sub-Saharan Africa, women account for fewer than 22% of tech sector workers.
                In Kenya, girls from rural areas face a triple barrier: poverty, patriarchal educational
                norms, and the absence of digital infrastructure. Early marriage affects 23% of Kenyan girls.
              </p>
            </FadeIn>
            <div className="mission-stats">
              {[{ n: "22%", l: "Women in African tech" }, { n: "23%", l: "Kenyan girls married before 18" }, { n: "$316B", l: "GDP unlocked by gender-equal digital economy" }, { n: "94%", l: "Lumora scholarship retention rate" }].map((s, i) => (
                <div key={i} className="mission-stat">
                  <div className="mission-stat-num">{s.n}</div>
                  <div className="mission-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Block 1 — Code Academy — tech-coding.jpg */}
          <div className="mission-block">
            <div className="mission-visual">
              <img src={techCoding} alt="Girls coding bootcamp" className="mission-real-img" />
            </div>
            <div className="mission-content">
              <div className="section-tag">Lumora Code Academy</div>
              <h2 className="section-h2">12 Weeks.<br /><em>A Career Changed Forever.</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                A 12-week immersive coding bootcamp for girls aged 13–22 from underserved communities.
                Participants learn Python, web development, data analysis, and AI fundamentals.
                Every participant receives a laptop, data bundle stipend, and a living allowance.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Curriculum is co-designed with Google, Microsoft, and leading Kenyan universities —
                eliminating every barrier to attendance.
              </p>
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Sponsor a Girl — $120/month</a>
            </div>
          </div>

          {/* Block 2 — Innovation Labs — tech-lab.jpg */}
          <div className="mission-block reverse">
            <div className="mission-visual">
              <img src={techLab} alt="Innovation lab" className="mission-real-img" />
            </div>
            <div className="mission-content">
              <div className="section-tag">Innovation Labs</div>
              <h2 className="section-h2">Building Tomorrow's<br /><em>Innovators Today</em></h2>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 20 }}>
                Lumora has established 7 Innovation Labs in rural secondary schools across Turkana,
                Marsabit, Kilifi, and Garissa counties — fully equipped with computers, solar power,
                high-speed internet, and trained female mentors.
              </p>
              <p className="section-body" style={{ maxWidth: "100%", marginBottom: 32 }}>
                Labs are open 7 days a week and serve as community digital hubs for women's groups,
                small business owners, and local governments.
              </p>
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); setPage("Donate"); }}>Fund a Lab — $5,000</a>
            </div>
          </div>

          {/* Success stories */}
          <div style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">Success Stories</div>
              <h2 className="section-h2">The Girls Who <em>Changed the Story</em></h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24, marginTop: 40 }}>
              {[
                { name: "Halima A., 19", loc: "Turkana County", emoji: "💻", quote: "I got my first laptop through Lumora. Six months later, I built an app that tracks water sources for my community. Three NGOs now use it." },
                { name: "Grace M., 21",  loc: "Kilifi County",  emoji: "🎓", quote: "I was about to drop out of school to get married. The Lumora scholarship gave me a reason — and a path — to stay. I'm now studying Computer Science at JKUAT." },
                { name: "Zawadi K., 17", loc: "Garissa County", emoji: "🌟", quote: "My father said girls don't need computers. After I showed him my first website, he told the whole village. Now he drives me to every session." },
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
