import { FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────────
// Uncomment after saving images to src/images/

// import storyFeatured  from "../images/story-featured.jpg";
// import story2         from "../images/story-2.jpg";
// import story3         from "../images/story-3.jpg";
// import story4         from "../images/story-4.jpg";
// import story5         from "../images/story-5.jpg";

const stories = [
  {
    cat:      "Food Relief",
    title:    "72 Hours in Marsabit: Inside a Lumora Emergency Response",
    type:     "read",
    featured: true,
    // image: storyFeatured,   ← uncomment after importing
  },
  {
    cat:   "Tech Education",
    title: "From Herder's Daughter to Software Engineer",
    type:  "watch",
    // image: story2,
  },
  {
    cat:   "Community",
    title: "How One Village Built Its Own Water System",
    type:  "read",
    // image: story3,
  },
  {
    cat:   "Scholar Profile",
    title: "Halima's First App Tracks Water for 3,000 People",
    type:  "watch",
    // image: story4,
  },
  {
    cat:   "Impact Report",
    title: "2024 Annual Impact: The Numbers Behind the Change",
    type:  "read",
    // image: story5,
  },
];

export default function Stories() {
  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <section className="section">
          <FadeIn>
            <div className="section-tag">Media & Stories</div>
            <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
              The Faces<br />Behind the <em>Numbers.</em>
            </h1>
            <p className="section-body">
              Data tells you what happened. Stories tell you why it matters.
              Watch, read, and feel the impact of Lumora's work.
            </p>
          </FadeIn>
        </section>

        {/* ── Featured video ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }}>

              {/* ── FEATURED VIDEO ──
                  OPTION A — YouTube embed:
                    Replace the placeholder div below with:
                    <div style={{ position:'relative', paddingTop:'56.25%' }}>
                      <iframe
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                        allowFullScreen title="Lumora Foundation Documentary"
                      />
                    </div>

                  OPTION B — Vimeo embed:
                    <div style={{ position:'relative', paddingTop:'56.25%' }}>
                      <iframe
                        src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
                        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                        allowFullScreen title="Lumora Foundation Documentary"
                      />
                    </div>

                  OPTION C — Local video file:
                    1. Save video to public/videos/documentary.mp4
                    2. Replace placeholder with:
                       <video controls style={{ width:'100%', display:'block' }} poster="/images/video-poster.jpg">
                         <source src="/videos/documentary.mp4" type="video/mp4" />
                       </video>
              ── */}
              <div style={{
                aspectRatio: "16/9", background: "linear-gradient(135deg, var(--card), var(--deep))",
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16,
              }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--ember)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", cursor: "pointer" }}>▶</div>
                <div style={{ fontSize: "0.8rem", color: "var(--sand-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Paste YouTube / Vimeo embed here
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--sand-dim)", opacity: 0.5 }}>
                  OR save video to public/videos/documentary.mp4
                </div>
              </div>

              <div style={{ padding: "32px 40px" }}>
                <div className="section-tag">Featured Documentary</div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>
                  The Girls Who Refused to Be Forgotten
                </div>
                <p style={{ color: "var(--sand-dim)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  An 8-minute documentary following three Lumora scholars from Turkana County as they
                  navigate family pressure, drought, and a first laptop — and build apps that change
                  their communities.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Stories grid ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div className="section-tag">Field Stories</div>
            <h2 className="section-h2">Read. Watch. <em>Feel.</em></h2>
            <p style={{ color: "var(--sand-dim)", fontSize: "0.875rem", marginBottom: 8 }}>
              Save story images to src/images/ using the filenames shown on each card.
            </p>
          </FadeIn>

          <div className="stories-grid">
            {stories.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`story-card${s.featured ? " featured" : ""}`}>

                  {/* ── STORY CARD IMAGE ──
                      CURRENT: dark placeholder
                      TO ADD YOUR PHOTO:
                        1. Save to src/images/story-featured.jpg (etc.)
                        2. Uncomment import at top of file
                        3. Replace the placeholder div below with:
                           <img src={s.image} alt={s.title} className="story-real-img" />
                  ── */}
                  <div className="story-img-placeholder" style={{ minHeight: s.featured ? 540 : 260 }}>
                    <div style={{ margin: "auto", textAlign: "center", opacity: 0.4 }}>
                      <div style={{ fontSize: "2rem" }}>📷</div>
                      <div style={{ fontSize: "0.65rem", color: "var(--sand-dim)", marginTop: 6 }}>
                        story-{s.featured ? "featured" : i + 1}.jpg
                      </div>
                    </div>
                  </div>

                  {s.type === "watch" && <div className="play-btn">▶</div>}
                  <div className="story-overlay">
                    <div className="story-cat">{s.cat}</div>
                    <div className="story-title">{s.title}</div>
                    <div className="story-read">{s.type === "watch" ? "▶ Watch Story" : "→ Read Story"}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Upload area ── */}
        <section style={{ padding: "60px 40px", background: "var(--panel)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="section-tag">Content Library</div>
              <h2 className="section-h2">Add New <em>Content</em></h2>
              <p className="section-body" style={{ marginBottom: 40 }}>
                Add photos to src/images/, videos to public/videos/, and update the stories array in Stories.js.
              </p>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16 }}>
              {[
                { icon: "📷", label: "Add Photos → src/images/" },
                { icon: "🎬", label: "Add Videos → public/videos/" },
                { icon: "💬", label: "Add Testimonial → Home.js" },
                { icon: "📄", label: "Add Report → public/reports/" },
              ].map((u, i) => (
                <div key={i} style={{
                  background: "var(--card)", border: "2px dashed var(--border)",
                  borderRadius: 16, padding: 32, textAlign: "center",
                  fontSize: "0.8rem", color: "var(--sand-dim)", lineHeight: 1.6,
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>{u.icon}</div>
                  {u.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}