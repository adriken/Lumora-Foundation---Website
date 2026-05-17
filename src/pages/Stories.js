import { useState } from "react";
import { FadeIn } from "../components/utils";

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────────
// import storyFeatured from "../images/story-featured.jpg";
// import story2        from "../images/story-2.jpg";
// import story3        from "../images/story-3.jpg";
// import story4        from "../images/story-4.jpg";
// import story5        from "../images/story-5.jpg";

// ─── FULL STORY CONTENT ───────────────────────────────────────────────────────
const FULL_STORIES = {
  marsabit: {
    cat:   "Food Relief",
    title: "72 Hours in Marsabit: Inside a Lumora Emergency Response",
    date:  "March 2024 · Marsabit County, Northern Kenya",
    readTime: "8 min read",
    hero:  "🍽️",
    body: [
      {
        type: "lead",
        text: "The call came at 4:47 a.m. on a Tuesday. A satellite drought-monitoring alert had flagged Marsabit County — Kenya's largest county by area, stretching 70,000 square kilometres of semi-desert — as having crossed the critical threshold for acute food insecurity. In the villages around Turbi and Moyale, families had been surviving on one meal a day for three weeks. Some for longer."
      },
      {
        type: "section",
        heading: "Hour Zero: The Alert",
        text: "James Ochieng, Lumora's Director of Field Operations, was on the phone with his county coordinator within minutes of receiving the alert. The protocol is precise: a drought severity score above 7.2 triggers an automatic Rapid Response deployment. Marsabit had scored 8.9 — the highest the system had recorded in two years.\n\nBy 6 a.m., the logistics team had activated their pre-positioned warehouse in Isiolo, 280 kilometres south of Marsabit town. Inside that warehouse: 1,400 emergency food packages, each containing 25kg of maize flour, 5kg of beans, 2 litres of cooking oil, and a 1kg bag of sugar. Enough to sustain a family of five for thirty days. The warehouse exists because of one lesson Lumora learned in its first year of operations: by the time a crisis is visible, it is already three weeks old. Pre-positioning is not a luxury — it is the difference between arriving in time and arriving too late."
      },
      {
        type: "quote",
        text: "The children's eyes tell you everything before anyone says a word. When we arrived in Turbi, the children didn't run to us the way children usually do. They watched from a distance. That's when you know the situation is serious.",
        attr: "— James Ochieng, Director of Field Operations, Lumora Foundation"
      },
      {
        type: "section",
        heading: "Hour 14: The Road North",
        text: "Three trucks departed Isiolo at 8 a.m., each carrying 400 food packages and a four-person field team. The road to Marsabit is paved for the first 120 kilometres, then becomes a corrugated dirt track that shakes fillings loose and demands convoy speeds of no more than 40 kilometres per hour. Lumora's protocol requires two vehicles to travel together at all times — not for security, though that matters in a region where banditry is a real risk, but because a broken-down truck on that road, alone, is a truck that may not be found for days.\n\nThe convoy arrived in Marsabit town at 3:30 p.m. They were met by Fatuma, Lumora's Marsabit County Coordinator, a local woman who has lived in the county her entire life and who knows every village elder, every women's cooperative chair, and every community health volunteer within a 50-kilometre radius. This is the detail that separates Lumora's model from that of many other relief organisations: the people who lead distribution are not outsiders. They are members of the communities they serve."
      },
      {
        type: "section",
        heading: "Hour 28: The Distribution Begins",
        text: "By 8 a.m. the next morning, distribution was underway in the village of Turbi. The process is designed around one principle: dignity. There are no queues where people stand in the sun for hours. Instead, Fatuma's network of fifteen women's cooperative leaders — each responsible for a cluster of forty to sixty households — had pre-registered beneficiaries the day before, using a simple mobile form that feeds into Lumora's field database. Each registered household receives a printed voucher. They arrive in groups of ten, collect their package, have their voucher scanned to prevent duplication, and leave.\n\nThe entire distribution for 380 households in Turbi takes four hours. A nutritionist from the Marsabit County health department accompanies the team, screening children under five for acute malnutrition using mid-upper arm circumference (MUAC) measurements. Of the 214 children screened that morning, 31 were found to be in the moderate acute malnutrition range. Six were severe. All six were immediately referred to the county hospital and accompanied there by Lumora's community health volunteer, who stayed until each child was admitted."
      },
      {
        type: "stat-row",
        stats: [
          { num: "380", label: "Households reached in Turbi" },
          { num: "214", label: "Children screened for malnutrition" },
          { num: "6",   label: "Severe cases referred to hospital" },
          { num: "72",  label: "Hours from alert to distribution" },
        ]
      },
      {
        type: "quote",
        text: "My youngest had not been eating. I was grinding acacia seeds to make something for the children, but it gives them stomach pain. When the food came, my daughter cried. Not sad crying. She said, 'Mama, now we can eat.' I will not forget that day.",
        attr: "— Halimo, mother of four, Turbi Village, Marsabit County"
      },
      {
        type: "section",
        heading: "Hour 58: Moving to Moyale",
        text: "The second distribution site was Moyale, a border town straddling Kenya and Ethiopia, where the food crisis had been compounded by an influx of 2,000 cross-border displaced persons fleeing drought on the Ethiopian side. Lumora's mandate is need-based, not citizenship-based. If a family is hungry and registered, they receive food. No documentation required.\n\nDistribution in Moyale was more complex. The community was fragmented — Kenyan residents, Ethiopian refugees, and internally displaced Kenyans from neighbouring Mandera County all competing for resources, and historically in tension with one another. Fatuma spent the evening before distribution in a meeting with all three community group leaders. By morning, a tripartite distribution agreement had been reached: each group would have a designated distribution point, with equal food access. There were no incidents."
      },
      {
        type: "section",
        heading: "Hour 72: What Comes After",
        text: "By 4 p.m. on the third day, Lumora's teams had distributed 1,380 food packages across five villages in Marsabit County — reaching an estimated 6,900 people. The trucks had returned to Isiolo. The database had been updated. The photos and GPS coordinates of every distribution point had been uploaded to the field reporting system. The donor transparency report would be auto-generated within 48 hours.\n\nBut the 72-hour response is only the beginning. Within three weeks of every emergency deployment, Lumora's Community Resilience Team follows up with the same households to begin the longer work: registering families for drought-resistant farming training, connecting them with Kenya's National Drought Management Authority, and — where applicable — initiating the process of installing rainwater harvesting systems. Emergency relief is the first chapter. Self-sufficiency is the whole story.\n\nOf the 1,380 families reached in this Marsabit deployment, 847 went on to enrol in Lumora's 18-month Community Resilience Programme. As of December 2025, 73% of those families report they have not required emergency food assistance since completing the programme.",
      },
      {
        type: "closing",
        text: "That is what 72 hours can set in motion: not just a meal, but the first step toward a family that will never need to wait for a truck again."
      }
    ]
  },

  water: {
    cat:   "Community",
    title: "How One Village Built Its Own Water System",
    date:  "August 2023 · Kargi Village, Marsabit County",
    readTime: "7 min read",
    hero:  "💧",
    body: [
      {
        type: "lead",
        text: "For as long as anyone in Kargi could remember, the women of the village had walked. They walked to the dry seasonal riverbed at the edge of the valley — four kilometres there, four kilometres back — carrying yellow jerricans that weighed 25 kilograms when full. They walked before sunrise, to avoid the midday heat, and they walked even when the riverbed was nearly dry and the water they collected was murky and unsafe. They walked every day, because the alternative was not walking."
      },
      {
        type: "section",
        heading: "The Cost of Water",
        text: "In Kargi, water was not just a physical burden — it was an economic and social one. Girls who spent three to four hours each morning fetching water arrived at school late, or did not arrive at all. Studies across the region consistently find that when the water source is more than one kilometre from home, girls' school attendance drops by up to 40%. In Kargi, where the walk was four kilometres each way, many girls had effectively dropped out not because of a formal decision, but because the arithmetic of survival left no time for school.\n\nThe women of Kargi had known this for years. They had raised it with their village elder, with the county government, and with visiting NGO representatives who had arrived, taken notes, and not returned. By 2023, the village had developed a quiet, bone-deep cynicism about outsiders who came with clipboards. When a Lumora field team arrived in April of that year, they were greeted politely and with visible scepticism."
      },
      {
        type: "quote",
        text: "Many people had come before to look at our water problem. They would ask questions and write things down, and then we would not see them again. I told the women: listen, but don't expect anything. I had been disappointed too many times.",
        attr: "— Nuria Golicha, Chairwoman, Kargi Women's Cooperative"
      },
      {
        type: "section",
        heading: "A Different Kind of Meeting",
        text: "What was different about the Lumora visit in April 2023 was that it was not led by Lumora. It was led by Fatuma Hassan, Lumora's Head of Girl Child Programmes and a native of Marsabit County who spoke fluent Borana, the primary language of the Kargi community. Fatuma had spent two days in the village before the formal meeting — sitting with women at the morning water collection, eating with families, listening to complaints about past programmes that had failed to deliver.\n\nThe formal meeting, held under an acacia tree at the edge of the village on a Thursday afternoon, had seventy-three attendees — more than a third of the village's adult population. Fatuma began not with a presentation, but with a question: 'If you could change one thing about water in this village — one thing — what would it be?' The answers filled two notebooks. But the most common answer was the same across every group: 'We want to not walk. We want water here.'\n\nFrom that answer, a plan began to take shape. Lumora's hydrogeological survey team — two engineers contracted from Nairobi — visited the following week and identified three things: a rocky ridge 600 metres north-east of the village where a 50,000-litre reinforced concrete water tank could be gravity-fed; a dry seasonal river that, with a subsurface sand dam, could be made to retain water year-round; and a catchment roof on the school building that, with guttering and a pipe, could collect enough rainwater in a six-week rainy season to fill a 10,000-litre underground cistern."
      },
      {
        type: "section",
        heading: "The Village Builds",
        text: "The agreement that Lumora proposed was unconventional. Lumora would fund materials — cement, pipe, a submersible pump, solar panels, and a controller unit. But the construction would be done by the village, under the supervision of one of Lumora's engineers. The village would provide the labour. They would also elect a five-person Water Management Committee — at least three of whom must be women — who would be trained to maintain the system, manage the small monthly fee charged to households for system upkeep, and keep a ledger of income and expenses that would be reviewed quarterly.\n\n'We almost said no,' Nuria Golicha recalls. 'We thought: why should we do the work? But then Fatuma explained it to us. She said: if we build it, it is ours. If they build it and give it to us, we will not know how to fix it when it breaks. That made sense. We had seen it happen in other villages — a motor breaks, nobody knows how to fix it, the system stops working, and you are back to the river.'\n\nConstruction began in June 2023. Forty-seven villagers — twenty-nine of them women — worked six days a week for nine weeks. The sand dam at the seasonal river was built by hand, stone by stone, using rock quarried from the ridge 800 metres away and carried on shoulders and on the backs of donkeys. The water tank foundation was dug using hand tools. The children of the school painted the cistern cover in yellow and green, the school's colours, and wrote their names on the underside before it was sealed."
      },
      {
        type: "stat-row",
        stats: [
          { num: "47",   label: "Villagers worked on construction" },
          { num: "9 wks", label: "Built in nine weeks" },
          { num: "600m",  label: "Reduced walking distance to water" },
          { num: "73%",   label: "Increase in girls' school attendance" },
        ]
      },
      {
        type: "section",
        heading: "The Day the Water Came",
        text: "The system was commissioned on a Saturday in September 2023. A crowd of about 200 people gathered around the distribution standpipe at the centre of the village. Fatuma Hassan and the Lumora engineer gave brief remarks. The Water Management Committee chairwoman — Nuria Golicha — was handed the valve handle.\n\nShe opened it. Water came out. Clean water, gravity-fed from the tank on the ridge above, filtered through a basic biosand filter, flowing freely from a standpipe four metres from the village's central meeting place.\n\nThe crowd was quiet for a moment. Then an elderly woman at the back began ululating — the high, wavering sound of Borana celebration — and within seconds the whole crowd had joined her. Children who had never seen running water outside a town ran forward and stuck their hands under the flow, then put their wet hands on each other's faces, laughing.\n\nNuria Golicha cried. She did not try to hide it. 'Forty years,' she said later. 'Forty years I have lived in this village and walked to that river. My mother walked. Her mother walked. And now my granddaughters will not walk. That is worth crying for.'"
      },
      {
        type: "section",
        heading: "What Water Made Possible",
        text: "By December 2023 — three months after the system was commissioned — Kargi Primary School's attendance records showed a 73% increase in female student attendance. The school's head teacher, Mr. Guyo Wario, reported that the number of girls arriving on time had gone from approximately 12 to 38 per cent of the enrolled female students.\n\nThe Water Management Committee held its first quarterly account review in January 2024. The monthly fee — equivalent to KSh 50, approximately 35 US cents, per household — had been collected at a 94% rate. The maintenance fund had accumulated enough to replace the pump's filter cartridge and purchase spare O-rings. Nuria presented the ledger to the village at a public meeting. Every item was accounted for. There was applause.\n\nIn February 2024, three girls from Kargi Primary School enrolled in Lumora's Innovation Lab in Marsabit town — made possible because they now had time in the mornings that had previously been consumed by the walk to the river. One of them, Doyo, aged 14, has since been selected for the Lumora Code Academy 2025 cohort. She wants to build water-monitoring software for communities like hers.\n\n'Water taught me something,' Doyo said in her scholarship application. 'When you give a community the tools to solve its own problems, it does not just solve one problem. It starts solving all of them.'"
      },
      {
        type: "closing",
        text: "Kargi is one village. Kenya has 43,400 of them. But every systems change in history started with one village that decided to believe the problem was solvable — and then solved it."
      }
    ]
  }
};

// ─── Story renderer ────────────────────────────────────────────────────────────
function StoryView({ storyKey, onBack }) {
  const story = FULL_STORIES[storyKey];
  if (!story) return null;

  return (
    <div style={{ paddingTop: 80, background: "var(--obsidian)", minHeight: "100vh" }}>
      {/* Back button */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 40px 0" }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "1px solid var(--border)", borderRadius: 100,
            color: "var(--sand-dim)", padding: "8px 20px", fontFamily: "var(--ff-body)",
            fontSize: "0.82rem", cursor: "pointer", display: "inline-flex", alignItems: "center",
            gap: 8, transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ember)"; e.currentTarget.style.color = "var(--sand)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--sand-dim)"; }}
        >
          ← Back to Stories
        </button>
      </div>

      {/* Story header */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 40px 0" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(212,129,58,.1)", border: "1px solid rgba(212,129,58,.3)", color: "var(--ember-glow)", padding: "5px 14px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {story.cat}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--sand-dim)" }}>{story.date}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--sand-dim)" }}>· {story.readTime}</div>
        </div>
        <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "var(--cream)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
          {story.title}
        </h1>
        <div style={{ height: 1, background: "linear-gradient(to right, var(--ember), transparent)", marginBottom: 48, opacity: 0.4 }} />
      </div>

      {/* Story body */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 40px 100px" }}>
        {story.body.map((block, i) => {
          if (block.type === "lead") return (
            <p key={i} style={{ fontFamily: "var(--ff-display)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--sand)", lineHeight: 1.75, marginBottom: 36, fontWeight: 400 }}>
              {block.text}
            </p>
          );

          if (block.type === "section") return (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "1.35rem", fontWeight: 700, color: "var(--cream)", marginBottom: 16, letterSpacing: "-0.01em" }}>
                {block.heading}
              </h2>
              {block.text.split("\n\n").map((para, j) => (
                <p key={j} style={{ color: "var(--sand-dim)", fontSize: "1rem", lineHeight: 1.85, fontWeight: 300, marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>
          );

          if (block.type === "quote") return (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(212,129,58,.08), rgba(122,170,138,.05))", border: "1px solid rgba(212,129,58,.15)", borderRadius: 16, padding: "32px 36px", margin: "36px 0" }}>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: "3rem", color: "var(--ember)", lineHeight: .6, marginBottom: 16, opacity: .5 }}>"</div>
              <p style={{ fontFamily: "var(--ff-display)", fontSize: "1.15rem", fontStyle: "italic", color: "var(--cream)", lineHeight: 1.6, marginBottom: 16 }}>
                {block.text}
              </p>
              <div style={{ fontSize: "0.82rem", color: "var(--sand-dim)" }}>{block.attr}</div>
            </div>
          );

          if (block.type === "stat-row") return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, margin: "36px 0" }}>
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
              <p style={{ fontFamily: "var(--ff-display)", fontSize: "1.15rem", fontStyle: "italic", color: "var(--sage)", lineHeight: 1.7, fontWeight: 600 }}>
                {block.text}
              </p>
            </div>
          );

          return null;
        })}

        {/* Share / back */}
        <div style={{ marginTop: 60, paddingTop: 36, borderTop: "1px solid var(--border)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 100, color: "var(--sand-dim)", padding: "10px 22px", fontFamily: "var(--ff-body)", fontSize: "0.875rem", cursor: "pointer" }}>
            ← Back to Stories
          </button>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 22px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "var(--ember)", color: "var(--obsidian)", borderRadius: 100, fontWeight: 700 }}>
              ♥ Support This Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stories index ─────────────────────────────────────────────────────────────
const STORY_CARDS = [
  {
    key:      "marsabit",
    cat:      "Food Relief",
    title:    "72 Hours in Marsabit: Inside a Lumora Emergency Response",
    excerpt:  "When the drought-monitoring alert fired at 4:47 a.m., Lumora had 72 hours to reach 6,900 people in the most remote corners of Marsabit County. This is what happened.",
    type:     "read",
    featured: true,
    readTime: "8 min read",
  },
  {
    key:      "water",
    cat:      "Community",
    title:    "How One Village Built Its Own Water System",
    excerpt:  "For forty years, the women of Kargi walked four kilometres to the river every morning. Then, in nine weeks, they built something that ended that walk forever.",
    type:     "read",
    readTime: "7 min read",
  },
  {
    key:      null,
    cat:      "Tech Education",
    title:    "From Herder's Daughter to Software Engineer",
    excerpt:  "Halima Wario grew up watching her father herd camels across Turkana's cracked earth. Today she is writing software that helps predict drought.",
    type:     "watch",
  },
  {
    key:      null,
    cat:      "Scholar Profile",
    title:    "Halima's First App Tracks Water for 3,000 People",
    excerpt:  "Built in 14 weeks using Python and a $45 Raspberry Pi, Halima's app is now used by three NGOs operating in Turkana County.",
    type:     "watch",
  },
  {
    key:      null,
    cat:      "Impact Report",
    title:    "2025 Annual Impact: The Numbers Behind the Change",
    excerpt:  "142,000 meals. 3,800 girls trained. 280 scholarships. 7 innovation labs. The full accounting of four years of work.",
    type:     "read",
  },
];

// ─── Main Stories component ───────────────────────────────────────────────────
export default function Stories() {
  const [openStory, setOpenStory] = useState(null);

  if (openStory) {
    return <StoryView storyKey={openStory} onBack={() => setOpenStory(null)} />;
  }

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
              Read the full accounts from our field teams, communities, and scholars.
            </p>
          </FadeIn>
        </section>

        {/* ── Featured video placeholder ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }}>
              {/* VIDEO EMBED AREA
                  Replace the placeholder div below with a YouTube or Vimeo iframe:
                  <div style={{ position:'relative', paddingTop:'56.25%' }}>
                    <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                      style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none' }}
                      allowFullScreen title="Lumora Foundation Documentary" />
                  </div>
              */}
              <div style={{ aspectRatio:"16/9", background:"linear-gradient(135deg,var(--card),var(--deep))", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}>
                <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--ember)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", cursor:"pointer" }}>▶</div>
                <div style={{ fontSize:"0.8rem", color:"var(--sand-dim)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                  Paste YouTube / Vimeo embed here
                </div>
              </div>
              <div style={{ padding:"32px 40px" }}>
                <div className="section-tag">Featured Documentary</div>
                <div style={{ fontFamily:"var(--ff-display)", fontSize:"1.6rem", fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                  The Girls Who Refused to Be Forgotten
                </div>
                <p style={{ color:"var(--sand-dim)", fontSize:"0.95rem", lineHeight:1.7 }}>
                  An 8-minute documentary following three Lumora scholars from Turkana County as they navigate
                  family pressure, drought, and a first laptop — and build apps that change their communities.
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
            <p style={{ color:"var(--sand-dim)", fontSize:"0.875rem", marginBottom:8 }}>
              Click any written story to read the full account.
            </p>
          </FadeIn>

          <div className="stories-grid">
            {STORY_CARDS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`story-card${s.featured ? " featured" : ""}`}
                  onClick={() => s.key && setOpenStory(s.key)}
                  style={{ cursor: s.key ? "pointer" : "default" }}
                >
                  {/* STORY CARD IMAGE
                      Replace with: <img src={storyFeatured} alt={s.title} className="story-real-img" />
                  */}
                  <div
                    className="story-img-placeholder"
                    style={{
                      minHeight: s.featured ? 540 : 260,
                      background: i === 0
                        ? "linear-gradient(135deg,#1a0f08,#0f1a10)"
                        : i === 1
                        ? "linear-gradient(135deg,#081a14,#0d1208)"
                        : "linear-gradient(135deg,var(--card),var(--panel))",
                    }}
                  >
                    <div style={{ margin:"auto", textAlign:"center", opacity:.5, padding: 24 }}>
                      <div style={{ fontSize:"3rem", marginBottom:8 }}>
                        {s.cat === "Food Relief" ? "🍽️" : s.cat === "Community" ? "💧" : s.cat === "Tech Education" ? "👩‍💻" : s.cat === "Scholar Profile" ? "💻" : "📊"}
                      </div>
                      <div style={{ fontSize:"0.65rem", color:"var(--sand-dim)" }}>
                        {s.key ? "Click to read full story" : "Upload image · src/images/"}
                      </div>
                    </div>
                  </div>

                  {s.type === "watch" && <div className="play-btn">▶</div>}

                  <div className="story-overlay">
                    <div className="story-cat">{s.cat}</div>
                    <div className="story-title">{s.title}</div>
                    {s.excerpt && s.featured && (
                      <p style={{ fontSize:"0.82rem", color:"rgba(232,223,200,.75)", lineHeight:1.6, marginTop:8, maxWidth:380 }}>
                        {s.excerpt}
                      </p>
                    )}
                    <div className="story-read">
                      {s.key
                        ? `→ Read Full Story · ${s.readTime}`
                        : s.type === "watch"
                        ? "▶ Watch Story"
                        : "→ Read Story"}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Upload area ── */}
        <section style={{ padding:"60px 40px", background:"var(--panel)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <FadeIn>
              <div className="section-tag">Content Library</div>
              <h2 className="section-h2">Add New <em>Content</em></h2>
              <p className="section-body" style={{ marginBottom:40 }}>
                Add photos to src/images/, videos to public/videos/, and add new stories to the FULL_STORIES object at the top of Stories.js.
              </p>
            </FadeIn>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:16 }}>
              {[
                { icon:"📷", label:"Add Photos → src/images/" },
                { icon:"🎬", label:"Add Videos → public/videos/" },
                { icon:"✍️", label:"Add Story → FULL_STORIES in Stories.js" },
                { icon:"📄", label:"Add Report → public/reports/" },
              ].map((u, i) => (
                <div key={i} style={{ background:"var(--card)", border:"2px dashed var(--border)", borderRadius:16, padding:32, textAlign:"center", fontSize:"0.8rem", color:"var(--sand-dim)", lineHeight:1.6 }}>
                  <div style={{ fontSize:"2rem", marginBottom:12 }}>{u.icon}</div>
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
