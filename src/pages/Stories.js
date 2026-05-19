import { useState } from "react";
import { FadeIn } from "../components/utils";

// ─── FULL STORY CONTENT ───────────────────────────────────────────────────────
const FULL_STORIES = {
  marsabit: {
    cat: "Food Relief", title: "72 Hours in Marsabit: Inside a Lumora Emergency Response",
    date: "March 2024 · Marsabit County, Northern Kenya", readTime: "8 min read",
    body: [
      { type: "lead", text: "The call came at 4:47 a.m. on a Tuesday. A satellite drought-monitoring alert had flagged Marsabit County — Kenya's largest county by area, stretching 70,000 square kilometres of semi-desert — as having crossed the critical threshold for acute food insecurity. In the villages around Turbi and Moyale, families had been surviving on one meal a day for three weeks. Some for longer." },
      { type: "section", heading: "Hour Zero: The Alert", text: "James Ochieng, Lumora's Director of Field Operations, was on the phone with his county coordinator within minutes. The protocol is precise: a drought severity score above 7.2 triggers an automatic Rapid Response deployment. Marsabit had scored 8.9 — the highest the system had recorded in two years.\n\nBy 6 a.m., the logistics team had activated their pre-positioned warehouse in Isiolo, 280 kilometres south of Marsabit town. Inside: 1,400 emergency food packages, each containing 25kg of maize flour, 5kg of beans, 2 litres of cooking oil, and 1kg of sugar. Enough to sustain a family of five for thirty days. The warehouse exists because of one lesson Lumora learned in its first year: by the time a crisis is visible, it is already three weeks old." },
      { type: "quote", text: "The children's eyes tell you everything before anyone says a word. When we arrived in Turbi, the children didn't run to us the way children usually do. They watched from a distance. That's when you know the situation is serious.", attr: "— James Ochieng, Director of Field Operations, Lumora Foundation" },
      { type: "section", heading: "Hour 14: The Road North", text: "Three trucks departed Isiolo at 8 a.m., each carrying 400 food packages and a four-person field team. The road to Marsabit is paved for the first 120 kilometres, then becomes a corrugated dirt track. Lumora's protocol requires two vehicles to travel together at all times — not just for security, but because a broken-down truck on that road, alone, may not be found for days.\n\nThe convoy arrived in Marsabit town at 3:30 p.m. They were met by Fatuma, Lumora's Marsabit County Coordinator — a local woman who knows every village elder, every women's cooperative chair, and every community health volunteer within a 50-kilometre radius. This is the detail that separates Lumora's model: the people who lead distribution are members of the communities they serve." },
      { type: "section", heading: "Hour 28: The Distribution Begins", text: "By 8 a.m. the next morning, distribution was underway in Turbi. The process is designed around one principle: dignity. There are no queues where people stand in the sun for hours. Instead, Fatuma's network of women's cooperative leaders had pre-registered beneficiaries using a mobile form that feeds into Lumora's field database. Each household receives a printed voucher. They arrive in groups of ten, collect their package, have their voucher scanned, and leave.\n\nA nutritionist from the county health department accompanied the team, screening children under five for acute malnutrition. Of 214 children screened, 31 were in the moderate acute malnutrition range. Six were severe. All six were immediately referred to the county hospital and accompanied there by Lumora's community health volunteer." },
      { type: "stat-row", stats: [{ num: "380", label: "Households reached in Turbi" }, { num: "214", label: "Children screened" }, { num: "6", label: "Severe cases referred to hospital" }, { num: "72 hrs", label: "Alert to distribution" }] },
      { type: "quote", text: "My youngest had not been eating. I was grinding acacia seeds to make something for the children, but it gives them stomach pain. When the food came, my daughter cried. Not sad crying. She said, 'Mama, now we can eat.' I will not forget that day.", attr: "— Halimo, mother of four, Turbi Village, Marsabit County" },
      { type: "section", heading: "Hour 72: What Comes After", text: "By 4 p.m. on the third day, Lumora's teams had distributed 1,380 food packages across five villages — reaching an estimated 6,900 people. The trucks had returned to Isiolo. Every distribution point had been photographed, GPS-tagged, and uploaded. The donor transparency report would be auto-generated within 48 hours.\n\nOf the 1,380 families reached in this deployment, 847 went on to enrol in Lumora's 18-month Community Resilience Programme. As of December 2025, 73% of those families report they have not required emergency food assistance since completing the programme." },
      { type: "closing", text: "That is what 72 hours can set in motion: not just a meal, but the first step toward a family that will never need to wait for a truck again." }
    ]
  },
  water: {
    cat: "Community", title: "How One Village Built Its Own Water System",
    date: "August 2023 · Kargi Village, Marsabit County", readTime: "7 min read",
    body: [
      { type: "lead", text: "For as long as anyone in Kargi could remember, the women of the village had walked. They walked to the dry seasonal riverbed at the edge of the valley — four kilometres there, four kilometres back — carrying yellow jerricans that weighed 25 kilograms when full. They walked before sunrise to avoid the midday heat, and they walked even when the riverbed was nearly dry. They walked every day, because the alternative was not walking." },
      { type: "section", heading: "The Cost of Water", text: "In Kargi, water was not just a physical burden — it was an economic and social one. Girls who spent three to four hours fetching water arrived at school late, or did not arrive at all. Studies across the region consistently find that when the water source is more than one kilometre from home, girls' school attendance drops by up to 40%. In Kargi, where the walk was four kilometres each way, many girls had effectively dropped out — not because of a formal decision, but because the arithmetic of survival left no time for school.\n\nThe women of Kargi had raised this with their village elder, with the county government, and with visiting NGO representatives who had arrived, taken notes, and not returned. By 2023, the village had developed a quiet, bone-deep cynicism about outsiders who came with clipboards." },
      { type: "quote", text: "Many people had come before to look at our water problem. They would ask questions and write things down, and then we would not see them again. I told the women: listen, but don't expect anything. I had been disappointed too many times.", attr: "— Nuria Golicha, Chairwoman, Kargi Women's Cooperative" },
      { type: "section", heading: "A Different Kind of Meeting", text: "What was different about the Lumora visit in April 2023 was that it was not led by Lumora. It was led by Fatuma Hassan, Lumora's Head of Girl Child Programmes, a native of Marsabit County who spoke fluent Borana — the primary language of the Kargi community. Fatuma had spent two days in the village before the formal meeting, sitting with women at the morning water collection, eating with families, listening.\n\nThe formal meeting had seventy-three attendees — more than a third of the village's adult population. Fatuma began not with a presentation, but with a question: 'If you could change one thing about water in this village — one thing — what would it be?' The answers filled two notebooks. But the most common answer was the same: 'We want water here.'\n\nLumora's survey team identified a rocky ridge 600 metres north-east where a 50,000-litre tank could be gravity-fed; a dry seasonal river that, with a subsurface sand dam, could retain water year-round; and a catchment roof on the school building that could fill a 10,000-litre underground cistern during the rainy season." },
      { type: "section", heading: "The Village Builds", text: "The agreement Lumora proposed was unconventional. Lumora would fund materials — cement, pipe, a submersible pump, solar panels, and a controller unit. The construction would be done by the village, under engineer supervision. The village would also elect a five-person Water Management Committee — at least three of whom must be women — trained to maintain the system and manage a small monthly household fee for upkeep.\n\n'We almost said no,' Nuria recalls. 'But Fatuma explained it to us. She said: if we build it, it is ours. If they build it and give it to us, we will not know how to fix it when it breaks. That made sense. We had seen it happen — a motor breaks, nobody knows how to fix it, and you are back to the river.'\n\nConstruction began in June 2023. Forty-seven villagers — twenty-nine of them women — worked six days a week for nine weeks. The sand dam was built by hand, stone by stone, using rock quarried from the ridge 800 metres away. The children painted the cistern cover in yellow and green and wrote their names on the underside before it was sealed." },
      { type: "stat-row", stats: [{ num: "47", label: "Villagers built the system" }, { num: "9 wks", label: "Built in nine weeks" }, { num: "4km", label: "Walk reduced to 0" }, { num: "73%", label: "Increase in girls' attendance" }] },
      { type: "section", heading: "The Day the Water Came", text: "The system was commissioned on a Saturday in September 2023. About 200 people gathered around the distribution standpipe at the centre of the village. Nuria Golicha — Water Management Committee chairwoman — was handed the valve handle.\n\nShe opened it. Water came out. Clean water, gravity-fed from the tank on the ridge above, flowing freely from a standpipe four metres from the village's central meeting place.\n\nThe crowd was quiet for a moment. Then an elderly woman at the back began ululating — the high, wavering sound of Borana celebration — and within seconds the whole crowd had joined her. Children who had never seen running water outside a town ran forward and stuck their hands under the flow, laughing.\n\nNuria cried. She did not try to hide it. 'Forty years,' she said. 'Forty years I have lived in this village and walked to that river. My mother walked. Her mother walked. And now my granddaughters will not walk. That is worth crying for.'" },
      { type: "section", heading: "What Water Made Possible", text: "By December 2023, Kargi Primary School's records showed a 73% increase in female student attendance. The Water Management Committee held its first quarterly account review in January 2024. The monthly fee — KSh 50, approximately 35 US cents per household — had been collected at a 94% rate. The maintenance fund had accumulated enough to replace the pump's filter cartridge and purchase spare parts. Nuria presented the ledger to the village at a public meeting. Every item accounted for. There was applause.\n\nIn February 2024, three girls from Kargi enrolled in Lumora's Innovation Lab in Marsabit town — possible because they now had time in the mornings that had been consumed by the walk. One of them, Doyo, aged 14, was selected for the Lumora Code Academy 2025 cohort. She wants to build water-monitoring software for communities like hers." },
      { type: "closing", text: "Kargi is one village. Kenya has 43,400 of them. But every systems change in history started with one village that decided to believe the problem was solvable — and then solved it." }
    ]
  }
};

// ─── Story renderer ────────────────────────────────────────────────────────────
function StoryView({ storyKey, onBack }) {
  const story = FULL_STORIES[storyKey];
  if (!story) return null;
  return (
    <div style={{ paddingTop: 80, background: "var(--obsidian)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 40px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 100, color: "var(--sand-dim)", padding: "8px 20px", fontFamily: "var(--ff-body)", fontSize: "0.82rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ember)"; e.currentTarget.style.color = "var(--sand)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--sand-dim)"; }}>
          ← Back to Stories
        </button>
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 40px 0" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(212,129,58,.1)", border: "1px solid rgba(212,129,58,.3)", color: "var(--ember-glow)", padding: "5px 14px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{story.cat}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--sand-dim)" }}>{story.date}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--sand-dim)" }}>· {story.readTime}</div>
        </div>
        <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "var(--cream)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>{story.title}</h1>
        <div style={{ height: 1, background: "linear-gradient(to right, var(--ember), transparent)", marginBottom: 48, opacity: 0.4 }} />
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 40px 100px" }}>
        {story.body.map((block, i) => {
          if (block.type === "lead") return <p key={i} style={{ fontFamily: "var(--ff-display)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--sand)", lineHeight: 1.75, marginBottom: 36, fontWeight: 400 }}>{block.text}</p>;
          if (block.type === "section") return (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "1.35rem", fontWeight: 700, color: "var(--cream)", marginBottom: 16 }}>{block.heading}</h2>
              {block.text.split("\n\n").map((p, j) => <p key={j} style={{ color: "var(--sand-dim)", fontSize: "1rem", lineHeight: 1.85, fontWeight: 300, marginBottom: 16 }}>{p}</p>)}
            </div>
          );
          if (block.type === "quote") return (
            <div key={i} style={{ background: "linear-gradient(135deg,rgba(212,129,58,.08),rgba(122,170,138,.05))", border: "1px solid rgba(212,129,58,.15)", borderRadius: 16, padding: "32px 36px", margin: "36px 0" }}>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: "3rem", color: "var(--ember)", lineHeight: .6, marginBottom: 16, opacity: .5 }}>"</div>
              <p style={{ fontFamily: "var(--ff-display)", fontSize: "1.15rem", fontStyle: "italic", color: "var(--cream)", lineHeight: 1.6, marginBottom: 16 }}>{block.text}</p>
              <div style={{ fontSize: "0.82rem", color: "var(--sand-dim)" }}>{block.attr}</div>
            </div>
          );
          if (block.type === "stat-row") return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16, margin: "36px 0" }}>
              {block.stats.map((s, j) => (
                <div key={j} style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: "2rem", fontWeight: 800, color: "var(--ember)", lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--sand-dim)", lineHeight: 1.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          );
          if (block.type === "closing") return (
            <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: 36, marginTop: 36 }}>
              <p style={{ fontFamily: "var(--ff-display)", fontSize: "1.15rem", fontStyle: "italic", color: "var(--sage)", lineHeight: 1.7, fontWeight: 600 }}>{block.text}</p>
            </div>
          );
          return null;
        })}
        <div style={{ marginTop: 60, paddingTop: 36, borderTop: "1px solid var(--border)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 100, color: "var(--sand-dim)", padding: "10px 22px", fontFamily: "var(--ff-body)", fontSize: "0.875rem", cursor: "pointer" }}>← Back to Stories</button>
          <a href="#" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 22px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "var(--ember)", color: "var(--obsidian)", borderRadius: 100, fontWeight: 700 }}>♥ Support This Work</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Stories component ────────────────────────────────────────────────────
const STORY_CARDS = [
  { key: "marsabit", cat: "Food Relief",    title: "72 Hours in Marsabit: Inside a Lumora Emergency Response",    excerpt: "When the drought alert fired at 4:47 a.m., Lumora had 72 hours to reach 6,900 people in the most remote corners of Marsabit County.", type: "read", featured: true, readTime: "8 min read" },
  { key: "water",    cat: "Community",      title: "How One Village Built Its Own Water System",                   excerpt: "For forty years, the women of Kargi walked four kilometres to the river every morning. Then, in nine weeks, they built something that ended that walk forever.", type: "read", readTime: "7 min read" },
  { key: null,       cat: "Tech Education", title: "From a Militia child soldier recruiter to an aspiring startup Founder.",                  type: "watch", video: "/videos/scholar.mp4" },
  { key: null,       cat: "Inconsistent Food Supply",title: "Refugee children in Kenya face starvation.",             type: "watch", video: "/videos/aid.mp4" },
  { key: null,       cat: "Impact Report",  title: "2025 Annual Impact: The Numbers Behind the Change",            type: "read" },
];

export default function Stories() {
  const [openStory, setOpenStory] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  if (openStory) return <StoryView storyKey={openStory} onBack={() => setOpenStory(null)} />;

  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <section className="section">
          <FadeIn>
            <div className="section-tag">Media & Stories</div>
            <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>The Faces<br />Behind the <em>Numbers.</em></h1>
            <p className="section-body">Data tells you what happened. Stories tell you why it matters. Read the full accounts from our field teams, communities, and scholars.</p>
          </FadeIn>
        </section>

        {/* ── Featured Documentary Video — documentary.mp4 ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }}>
              <video
                controls
                style={{ width: "100%", display: "block", maxHeight: 560, background: "#000" }}
                poster=""
              >
                <source src="/videos/documentary.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={{ padding: "32px 40px" }}>
                <div className="section-tag">Featured Documentary</div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>The Girls Who Refused to Be Forgotten</div>
                <p style={{ color: "var(--sand-dim)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  An immersive documentary following three Lumora scholars from Kibera slums as they navigate
                  family pressure, insecurity, rape and a donation from code academy — and learn coding to change their futures and better their communities.
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
          </FadeIn>
          <div className="stories-grid">
            {STORY_CARDS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`story-card${s.featured ? " featured" : ""}`}
                  onClick={() => { if (s.key) setOpenStory(s.key); else if (s.video) setPlayingVideo(s.video); }}
                  style={{ cursor: (s.key || s.video) ? "pointer" : "default" }}
                >
                  {/* Video inline player */}
                  {s.video && playingVideo === s.video ? (
                    <video controls autoPlay style={{ width: "100%", minHeight: 260, display: "block", background: "#000" }}>
                      <source src={s.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="story-img-placeholder" style={{
                      minHeight: s.featured ? 540 : 260,
                      background: i === 0 ? "linear-gradient(135deg,#1a0f08,#0f1a10)"
                                : i === 1 ? "linear-gradient(135deg,#081a14,#0d1208)"
                                : "linear-gradient(135deg,var(--card),var(--panel))",
                    }}>
                      <div style={{ margin: "auto", textAlign: "center", opacity: .5, padding: 24 }}>
                        <div style={{ fontSize: "3rem", marginBottom: 8 }}>
                          {s.cat === "Food Relief" ? "🍽️" : s.cat === "Community" ? "💧" : s.cat === "Tech Education" ? "👩‍💻" : s.cat === "Scholar Profile" ? "💻" : "📊"}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "var(--sand-dim)" }}>
                          {s.key ? "Click to read full story" : s.video ? "Click to play video" : ""}
                        </div>
                      </div>
                    </div>
                  )}
                  {s.type === "watch" && playingVideo !== s.video && <div className="play-btn">▶</div>}
                  <div className="story-overlay">
                    <div className="story-cat">{s.cat}</div>
                    <div className="story-title">{s.title}</div>
                    {s.excerpt && s.featured && <p style={{ fontSize: "0.82rem", color: "rgba(232,223,200,.75)", lineHeight: 1.6, marginTop: 8, maxWidth: 380 }}>{s.excerpt}</p>}
                    <div className="story-read">{s.key ? `→ Read Full Story · ${s.readTime}` : s.video ? "▶ Watch Story" : "→ Read Story"}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
