import { useState, useEffect, useRef } from "react";
import './styles.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Missions from "./pages/Missions";
import Impact from "./pages/Impact";
import Stories from "./pages/Stories";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import AdminAnalytics from "./pages/AdminAnalytics";
import DonationsView from "./pages/DonationsView";
import { trackPageView, trackVisitor, trackLiveUser } from "./firebase";

// ─────────────────────────────────────────────────────────────────────────────
// IMPACT REPORT — defined here to avoid any import/export issues
// ─────────────────────────────────────────────────────────────────────────────

function IRCounter({ end, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = end / (2000 / 16);
        const t = setInterval(() => {
          cur = Math.min(cur + step, end);
          setN(Math.floor(cur));
          if (cur >= end) clearInterval(t);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n.toLocaleString()}{suffix || ""}</span>;
}

function IRFade({ children, delay }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ${delay || 0}s, transform 0.7s ${delay || 0}s` }}>
      {children}
    </div>
  );
}

function IRBar({ data, color }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: "0.68rem", color: "#d4813a", fontWeight: 700 }}>{d.v >= 1000 ? (d.v/1000).toFixed(0)+"K" : d.v}</span>
          <div style={{ width: "100%", background: color || "#7aaa8a", borderRadius: "3px 3px 0 0", height: `${(d.v/max)*120}px`, opacity: 0.85 }} />
          <span style={{ fontSize: "0.68rem", color: "#a89e87" }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

function IRLine({ data, color }) {
  const max = Math.max(...data.map(d => d.v));
  const W = 480, H = 150, P = 18;
  const pts = data.map((d, i) => ({ x: P + (i/(data.length-1))*(W-P*2), y: H-P-((d.v/max)*(H-P*2)) }));
  const path = pts.map((p,i) => `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const area = `${path} L${pts[pts.length-1].x},${H-P} L${pts[0].x},${H-P} Z`;
  const c = color || "#d4813a";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {[0.25,0.5,0.75,1].map((f,i) => <line key={i} x1={P} y1={H-P-f*(H-P*2)} x2={W-P} y2={H-P-f*(H-P*2)} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
      <path d={area} fill={c} fillOpacity="0.1"/>
      <path d={path} fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill={c}/>
          <text x={p.x} y={H-3} textAnchor="middle" fill="#a89e87" fontSize="10">{data[i].l}</text>
          <text x={p.x} y={p.y-9} textAnchor="middle" fill={c} fontSize="10" fontWeight="700">{data[i].v>=1000?(data[i].v/1000).toFixed(0)+"K":data[i].v}</text>
        </g>
      ))}
    </svg>
  );
}

function IRDonut({ segs }) {
  const r=58, cx=78, cy=78, sw=36, circ=2*Math.PI*r;
  const total = segs.reduce((a,s)=>a+s.v,0);
  let off=0;
  const arcs = segs.map(s => { const dash=(s.v/total)*circ; const a={dash,off,c:s.c}; off+=dash; return a; });
  return (
    <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
      <svg viewBox="0 0 156 156" style={{ width:140, flexShrink:0 }}>
        {arcs.map((a,i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.c} strokeWidth={sw}
            strokeDasharray={`${a.dash} ${circ-a.dash}`}
            strokeDashoffset={circ/4-a.off}
            style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%" }}/>
        ))}
        <circle cx={cx} cy={cy} r={r-sw/2-2} fill="#13120f"/>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {segs.map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:9, height:9, borderRadius:2, background:s.c, flexShrink:0 }}/>
            <span style={{ fontSize:"0.78rem", color:"#a89e87" }}>{s.l}</span>
            <span style={{ fontSize:"0.78rem", color:"#e8dfc8", fontWeight:700, marginLeft:6 }}>{s.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IRProg({ label, pct, color }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontSize:"0.85rem", color:"#e8dfc8" }}>{label}</span>
        <span style={{ fontSize:"0.85rem", color: color||"#d4813a", fontWeight:700 }}>{pct}%</span>
      </div>
      <div style={{ height:5, background:"rgba(255,255,255,.07)", borderRadius:3 }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color||"#d4813a", borderRadius:3 }}/>
      </div>
    </div>
  );
}

function ImpactReport({ onBack }) {
  const EM = "#d4813a", SA = "#7aaa8a", GL = "#f0a055";
  const card = { background:"#1a1914", border:"1px solid rgba(255,255,255,.07)", borderRadius:18, padding:26 };
  const h2s = { fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:800, color:"#f5f0e8", marginBottom:14, lineHeight:1.1 };
  const tag = { fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:EM, marginBottom:10, display:"block" };
  const bod = { color:"#a89e87", fontSize:"0.98rem", lineHeight:1.8, fontWeight:300, marginBottom:28 };
  const div = { height:1, background:`linear-gradient(to right,transparent,${EM},transparent)`, margin:"0 40px", opacity:0.2 };

  return (
    <div style={{ background:"#0d0d0b", minHeight:"100vh", color:"#e8dfc8", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      {/* TOP BAR */}
      <div style={{ position:"sticky", top:0, zIndex:100, background:"rgba(13,13,11,.96)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,.07)", padding:"13px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", fontWeight:800, color:"#f5f0e8" }}>Lumora<span style={{ color:EM }}>.</span> Impact Report 2025</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onBack} style={{ background:"transparent", color:"#a89e87", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"8px 18px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:"0.78rem", fontWeight:600, cursor:"pointer" }}>← Back</button>
          <button onClick={()=>window.print()} style={{ background:EM, color:"#0d0d0b", border:"none", borderRadius:100, padding:"8px 18px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:"0.78rem", fontWeight:700, cursor:"pointer" }}>⬇ Print / Save</button>
        </div>
      </div>

      {/* COVER */}
      <div style={{ minHeight:"88vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 60px", position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#0d0d0b 0%,#1a1208 50%,#0f1a0f 100%)" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(212,129,58,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,129,58,0.04) 1px,transparent 1px)", backgroundSize:"48px 48px" }}/>
        <div style={{ position:"absolute", width:480, height:480, borderRadius:"50%", filter:"blur(90px)", background:"radial-gradient(circle,rgba(212,129,58,0.18) 0%,transparent 70%)", top:-60, right:-60, pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:820 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(212,129,58,0.1)", border:"1px solid rgba(212,129,58,0.3)", color:GL, padding:"6px 16px", borderRadius:100, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:30 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:GL, display:"inline-block" }}/> Annual Impact Report · 2025
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.8rem,5.5vw,4.8rem)", fontWeight:800, lineHeight:1.05, color:"#f5f0e8", marginBottom:18 }}>
            Four Years of<br/><em style={{ color:EM }}>Feeding. Coding. Transforming.</em>
          </h1>
          <p style={{ fontSize:"1.05rem", color:"#a89e87", fontWeight:300, lineHeight:1.7, maxWidth:600, marginBottom:44 }}>
            From the first emergency food distribution in Turkana County in 2021 to 7 Innovation Labs, 3,800+ girls trained, and 142,000+ meals delivered — this is the story of what happens when you refuse to accept that hunger and exclusion are inevitable.
          </p>
          <div style={{ display:"flex", gap:36, flexWrap:"wrap", paddingTop:28, borderTop:"1px solid rgba(255,255,255,.07)" }}>
            {[["Report Period","January 2021 — December 2025"],["Organisation","Lumora Foundation"],["Headquarters","Nairobi, Kenya"],["Status","Independently Audited"]].map(([l,v],i)=>(
              <div key={i}>
                <div style={{ fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"0.1em", color:EM, fontWeight:600, marginBottom:3 }}>{l}</div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", fontWeight:700, color:"#f5f0e8" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KEY NUMBERS */}
      <div style={{ background:"#1a1914", borderTop:"1px solid rgba(255,255,255,.07)", borderBottom:"1px solid rgba(255,255,255,.07)", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[{end:142000,suf:"+",l:"Meals Delivered"},{end:3800,suf:"+",l:"Girls Trained"},{end:47,suf:"",l:"Communities Reached"},{end:94,suf:"%",l:"Scholarship Retention"}].map((n,i)=>(
          <div key={i} style={{ padding:"36px 20px", borderRight:i<3?"1px solid rgba(255,255,255,.07)":"none", textAlign:"center" }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.8rem", fontWeight:800, color:EM, lineHeight:1, marginBottom:6 }}><IRCounter end={n.end} suffix={n.suf}/></div>
            <div style={{ fontSize:"0.76rem", color:"#a89e87", textTransform:"uppercase", letterSpacing:"0.1em" }}>{n.l}</div>
          </div>
        ))}
      </div>

      <div style={div}/>

      {/* EXECUTIVE LETTER */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Message from Our Executive Director</span>
          <h2 style={h2s}>We Started With <em style={{ color:EM }}>200 Families and One Belief.</em></h2>
        </IRFade>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
          <IRFade delay={0.1}>
            <p style={bod}>In 2021, Lumora Foundation was registered in Nairobi with a single, urgent conviction: that food insecurity and the exclusion of girls from the digital economy were not separate problems — they were two symptoms of the same disease. Poverty. Structural neglect. A world designed to leave certain people behind.</p>
            <p style={bod}>We began by feeding 200 families in Turkana during a devastating drought. Four years later, we have delivered 142,000+ meals, trained 3,800+ girls to code, built 7 solar-powered Innovation Labs, and awarded 280 full STEM university scholarships.</p>
            <p style={{ ...bod, marginBottom:20 }}>None of this happened by accident. It happened because our donors, partners, and the communities we serve chose to believe — together — that transformation was possible. This report is for you.</p>
            <div style={{ paddingTop:18, borderTop:"1px solid rgba(255,255,255,.07)" }}>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8" }}>Dr. Aisha Kamau</div>
              <div style={{ fontSize:"0.78rem", color:EM, marginTop:3 }}>Executive Director & Co-Founder, Lumora Foundation</div>
            </div>
          </IRFade>
          <IRFade delay={0.15}>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ ...card, borderTop:`3px solid ${EM}` }}>
                <div style={{ fontSize:"0.78rem", color:"#a89e87", marginBottom:6, fontWeight:600 }}>2025 Headline Achievement</div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.7rem", fontWeight:800, color:EM, margin:"6px 0" }}>7 Innovation Labs</div>
                <div style={{ fontSize:"0.83rem", color:"#a89e87", lineHeight:1.6 }}>All solar-powered, all in counties with under 5% female tech enrolment. Each serves an average of 340 students per month, 7 days a week.</div>
              </div>
              <div style={{ ...card, borderTop:`3px solid ${SA}` }}>
                <div style={{ fontSize:"0.78rem", color:"#a89e87", marginBottom:6, fontWeight:600 }}>Scholarship Milestone</div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.7rem", fontWeight:800, color:SA, margin:"6px 0" }}>280 Scholars</div>
                <div style={{ fontSize:"0.83rem", color:"#a89e87", lineHeight:1.6 }}>Full STEM university scholarships since 2022. A 94% retention rate — the highest recorded by any NGO scholarship programme in East Africa.</div>
              </div>
            </div>
          </IRFade>
        </div>
      </div>

      <div style={div}/>

      {/* FOOD RELIEF */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Mission One · Humanitarian Food Relief</span>
          <h2 style={h2s}>142,000+ Meals. <em style={{ color:EM }}>Zero Conditions.</em></h2>
          <p style={bod}>Over 17 million Kenyans face chronic food insecurity. In the Arid and Semi-Arid Lands — 80% of Kenya's territory — children bear the heaviest burden. Lumora's food relief is delivered with dignity, through local women's cooperatives, with no political conditions attached.</p>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ ...card, marginBottom:36 }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:3 }}>Cumulative meals delivered, 2021–2025</div>
            <div style={{ fontSize:"0.78rem", color:"#a89e87", marginBottom:20 }}>Emergency food packages sustaining families of 5 for 30 days each</div>
            <IRLine data={[{l:"2021",v:8200},{l:"2022",v:32000},{l:"2023",v:68000},{l:"2024",v:112000},{l:"2025",v:142000}]} color={EM}/>
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:14 }}>Geographic reach across 8 counties</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:40 }}>
            {[{n:"Turkana",f:"4,200",m:"38,000+",p:88},{n:"Marsabit",f:"2,800",m:"24,000+",p:72},{n:"Kilifi",f:"2,100",m:"19,000+",p:60},{n:"Garissa",f:"1,900",m:"17,000+",p:55},{n:"Mandera",f:"1,600",m:"14,000+",p:48},{n:"Wajir",f:"1,400",m:"12,000+",p:42},{n:"Nairobi",f:"1,200",m:"10,500+",p:38},{n:"Nakuru",f:"900",m:"7,500+",p:28}].map((c,i)=>(
              <div key={i} style={{ background:"#1a1914", border:"1px solid rgba(255,255,255,.07)", borderRadius:11, padding:"13px 14px" }}>
                <div style={{ fontWeight:700, color:"#f5f0e8", fontSize:"0.85rem", marginBottom:3 }}>{c.n}</div>
                <div style={{ fontSize:"0.72rem", color:"#a89e87", marginBottom:8 }}>{c.f} families · {c.m}</div>
                <div style={{ height:3, background:"rgba(255,255,255,.07)", borderRadius:2 }}><div style={{ width:`${c.p}%`, height:"100%", background:EM, borderRadius:2 }}/></div>
              </div>
            ))}
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {[{ic:"🚨",num:"72 hrs",l:"Rapid Response",d:"Teams mobilise within 72 hours of drought alert. 47 emergency deployments since 2021."},{ic:"💧",num:"23",l:"Water Systems",d:"Rainwater harvesting infrastructure serving 14,000+ community members."},{ic:"🌱",num:"73%",l:"Self-Sufficiency Rate",d:"Within 18 months, 73% of families report no longer requiring emergency food aid."}].map((c,i)=>(
              <div key={i} style={{ ...card, borderTop:`3px solid ${EM}` }}>
                <div style={{ fontSize:"1.8rem", marginBottom:10 }}>{c.ic}</div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.9rem", fontWeight:800, color:EM, marginBottom:5 }}>{c.num}</div>
                <div style={{ fontWeight:700, color:"#f5f0e8", fontSize:"0.88rem", marginBottom:5 }}>{c.l}</div>
                <div style={{ fontSize:"0.8rem", color:"#a89e87", lineHeight:1.6 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ background:"linear-gradient(135deg,rgba(212,129,58,.08),rgba(122,170,138,.05))", border:"1px solid rgba(212,129,58,.15)", borderRadius:18, padding:"36px 40px", margin:"40px 0" }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"3.5rem", color:EM, lineHeight:.6, marginBottom:14, opacity:.4 }}>"</div>
            <p style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.2rem", fontStyle:"italic", color:"#f5f0e8", lineHeight:1.6, marginBottom:14 }}>We had not eaten properly for three weeks when Lumora arrived. They didn't just bring food — they sat with us, listened, and treated us with dignity. Two years later, we have not needed emergency help again.</p>
            <div style={{ fontSize:"0.83rem", color:"#a89e87" }}>— Joseph M., Community Elder, Marsabit County</div>
          </div>
        </IRFade>
      </div>

      <div style={div}/>

      {/* TECH EMPOWERMENT */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Mission Two · Girl Child Technology Empowerment</span>
          <h2 style={h2s}>3,800 Girls Trained. <em style={{ color:EM }}>One Digital Economy, Finally Theirs.</em></h2>
          <p style={bod}>Across Sub-Saharan Africa, women hold fewer than 22% of technology roles. In Kenya's ASAL counties, that number falls below 5%. Lumora's technology programmes are systematically dismantling that barrier.</p>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ ...card, marginBottom:36 }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:3 }}>Girls enrolled in Lumora technology programmes, 2021–2025</div>
            <div style={{ fontSize:"0.78rem", color:"#a89e87", marginBottom:20 }}>Code Academy, Innovation Labs, and mentorship cohorts</div>
            <IRBar data={[{l:"2021",v:180},{l:"2022",v:520},{l:"2023",v:810},{l:"2024",v:1100},{l:"2025",v:1190}]} color={SA}/>
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:36 }}>
            {[{ic:"💻",num:"12 wks",l:"Code Academy",d:"Python, web dev, data analysis & AI. Every participant gets a laptop, data stipend, and living allowance.",c:SA},{ic:"🏫",num:"7 Labs",l:"Solar Innovation Labs",d:"Fully equipped digital hubs in rural schools. Open 7 days/week, 340 students per lab per month.",c:SA},{ic:"🎓",num:"280",l:"University Scholarships",d:"Full STEM placements at JKUAT, UoN, Strathmore, and Moi University. 94% retention.",c:SA}].map((c,i)=>(
              <div key={i} style={{ ...card, borderTop:`3px solid ${c.c}` }}>
                <div style={{ fontSize:"1.8rem", marginBottom:10 }}>{c.ic}</div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.9rem", fontWeight:800, color:c.c, marginBottom:5 }}>{c.num}</div>
                <div style={{ fontWeight:700, color:"#f5f0e8", fontSize:"0.88rem", marginBottom:5 }}>{c.l}</div>
                <div style={{ fontSize:"0.8rem", color:"#a89e87", lineHeight:1.6 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44 }}>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:20 }}>Skills acquired by graduates</div>
              <IRProg label="Python & Data Analysis" pct={94} color={EM}/>
              <IRProg label="Web Development" pct={89} color={EM}/>
              <IRProg label="AI & Machine Learning Basics" pct={71} color={EM}/>
              <IRProg label="Digital Literacy & Office Tools" pct={99} color={EM}/>
              <IRProg label="Entrepreneurship & Business" pct={78} color={SA}/>
            </div>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:20 }}>Post-graduation outcomes</div>
              <IRDonut segs={[{l:"University STEM enrolment",v:34,c:EM},{l:"Tech employment",v:28,c:SA},{l:"Freelance / Entrepreneur",v:21,c:GL},{l:"Further training",v:17,c:"rgba(168,158,135,.5)"}]}/>
            </div>
          </div>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
            {[{em:"💻",q:"I got my first laptop through Lumora. Six months later, I built an app that tracks water sources for my community. Three NGOs now use it.",n:"Halima A., 19",r:"Code Academy Graduate · Turkana"},{em:"🎓",q:"I was about to drop out and get married. The Lumora scholarship gave me a reason to stay. I'm now in second year Computer Science at JKUAT.",n:"Grace M., 21",r:"Lumora Scholar · Kilifi County"},{em:"🌟",q:"My father said girls don't need computers. After I showed him my first website, he told the whole village. Now he drives me to every session.",n:"Zawadi K., 17",r:"Innovation Lab Member · Garissa"}].map((s,i)=>(
              <div key={i} style={card}>
                <div style={{ fontSize:"2.2rem", marginBottom:12 }}>{s.em}</div>
                <p style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", fontStyle:"italic", color:"#e8dfc8", lineHeight:1.65, marginBottom:16 }}>"{s.q}"</p>
                <div style={{ fontWeight:700, color:"#f5f0e8", fontSize:"0.88rem" }}>{s.n}</div>
                <div style={{ fontSize:"0.75rem", color:EM, marginTop:3 }}>{s.r}</div>
              </div>
            ))}
          </div>
        </IRFade>
      </div>

      <div style={div}/>

      {/* FINANCIAL TRANSPARENCY */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Financial Transparency</span>
          <h2 style={h2s}>Every Dollar. <em style={{ color:EM }}>Accounted For.</em></h2>
          <p style={bod}>Lumora maintains a best-in-class overhead ratio. 87 cents of every dollar donated reaches direct programme delivery. All accounts are independently audited annually.</p>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44 }}>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:20 }}>How donations are allocated</div>
              {[{p:"52%",n:"Food Relief & Distribution",c:EM,w:52},{p:"35%",n:"Tech Education & Scholarships",c:SA,w:35},{p:"8%",n:"Infrastructure & Innovation Labs",c:GL,w:8},{p:"5%",n:"Admin, Reporting & Compliance",c:"#a89e87",w:5}].map((f,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:i>1?"1.4rem":"1.9rem", fontWeight:800, color:f.c, minWidth:58 }}>{f.p}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, color:"#f5f0e8", fontSize:"0.85rem", marginBottom:5 }}>{f.n}</div>
                    <div style={{ height:4, background:"rgba(255,255,255,.07)", borderRadius:2 }}><div style={{ width:`${f.w}%`, height:"100%", background:f.c, borderRadius:2 }}/></div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:20, padding:"14px 18px", background:"rgba(122,170,138,.08)", border:"1px solid rgba(122,170,138,.2)", borderRadius:12 }}>
                <div style={{ fontWeight:700, color:SA, fontSize:"0.85rem", marginBottom:3 }}>✓ Independently Audited</div>
                <div style={{ fontSize:"0.78rem", color:"#a89e87", lineHeight:1.6 }}>Financial statements audited annually. Full audit reports available to donors on request.</div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:"#f5f0e8", marginBottom:20 }}>Funding sources, 2025</div>
              <IRDonut segs={[{l:"Individual Donors",v:38,c:EM},{l:"International NGOs",v:27,c:SA},{l:"Corporate Partners",v:19,c:GL},{l:"Government Grants",v:11,c:"rgba(168,158,135,.6)"},{l:"Other",v:5,c:"rgba(168,158,135,.3)"}]}/>
            </div>
          </div>
        </IRFade>
      </div>

      <div style={div}/>

      {/* TIMELINE */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Our Journey</span>
          <h2 style={h2s}>Four Years of <em style={{ color:EM }}>Milestones</em></h2>
        </IRFade>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:36 }}>
          {[[{y:"2021",t:"Lumora Founded & First Emergency Response",b:"Registered in Nairobi. First Rapid Response Team deployed to Turkana County, reaching 200 families during severe drought."},{y:"2022",t:"First Code Academy & UN Partnership",b:"40-girl pilot in Mathare Valley — 38 completed. Partnered with WFP and UNICEF. Expanded food relief to 5 counties."}],[{y:"2023",t:"Innovation Labs & 50K Meals Milestone",b:"Opened first 3 solar-powered Innovation Labs. Surpassed 50,000 meals. Launched university scholarship programme."},{y:"2024–25",t:"3,800 Girls & Global Recognition",b:"Recognised by the African Union. Expanded to 8 counties. 3,800+ girls trained. 142,000+ meals. 280 scholarships."}]].map((col,ci)=>(
            <div key={ci} style={{ position:"relative", paddingLeft:28 }}>
              <div style={{ position:"absolute", left:7, top:0, bottom:0, width:1, background:`linear-gradient(to bottom,${EM},${SA},transparent)` }}/>
              {col.map((t,i)=>(
                <IRFade key={i} delay={i*0.1}>
                  <div style={{ position:"relative", marginBottom:32 }}>
                    <div style={{ position:"absolute", left:-24, top:4, width:16, height:16, borderRadius:"50%", background:"#211f19", border:`2px solid ${EM}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:EM }}/>
                    </div>
                    <div style={card}>
                      <div style={{ fontSize:"0.7rem", color:EM, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{t.y}</div>
                      <div style={{ fontWeight:700, color:"#f5f0e8", marginBottom:5 }}>{t.t}</div>
                      <div style={{ fontSize:"0.83rem", color:"#a89e87", lineHeight:1.6 }}>{t.b}</div>
                    </div>
                  </div>
                </IRFade>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={div}/>

      {/* PARTNERS */}
      <div style={{ padding:"60px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Strategic Partners</span>
          <h2 style={h2s}>We Don't Work Alone. <em style={{ color:EM }}>No One Should.</em></h2>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:8 }}>
            {["UN World Food Programme","UNICEF Kenya","Google.org","Microsoft Philanthropies","African Development Bank","Kenya Red Cross","Safaricom Foundation","Bill & Melinda Gates Foundation","Mastercard Foundation"].map((p,i)=>(
              <div key={i} style={{ background:"#1a1914", border:"1px solid rgba(255,255,255,.07)", borderRadius:100, padding:"9px 20px", fontSize:"0.8rem", fontWeight:600, color:"#a89e87" }}>{p}</div>
            ))}
          </div>
        </IRFade>
      </div>

      <div style={div}/>

      {/* 2026 GOALS */}
      <div style={{ padding:"72px 60px", maxWidth:1080, margin:"0 auto" }}>
        <IRFade>
          <span style={tag}>Looking Ahead · 2026 Goals</span>
          <h2 style={h2s}>The Work <em style={{ color:EM }}>Is Not Finished.</em></h2>
        </IRFade>
        <IRFade delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {[{num:"200K",l:"Meals Target",d:"Expand to reach 200,000 total meals, adding 3 new counties in North-Eastern Kenya.",c:EM},{num:"5K",l:"Girls Trained",d:"Scale Code Academy to 5 cities and launch a fully remote cohort for rural girls.",c:EM},{num:"10",l:"Innovation Labs",d:"Add 3 new solar-powered labs, each with a dedicated women's digital hub.",c:SA},{num:"400",l:"Scholarships",d:"Award 400 cumulative STEM scholarships with a new Masters-level track.",c:SA}].map((g,i)=>(
              <div key={i} style={{ ...card, borderTop:`3px solid ${g.c}` }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", fontWeight:800, color:g.c, marginBottom:5 }}>{g.num}</div>
                <div style={{ fontWeight:700, color:"#f5f0e8", marginBottom:5 }}>{g.l}</div>
                <div style={{ fontSize:"0.8rem", color:"#a89e87", lineHeight:1.6 }}>{g.d}</div>
              </div>
            ))}
          </div>
        </IRFade>
      </div>

      {/* CTA */}
      <div style={{ background:EM, padding:"72px 60px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.3rem", fontWeight:800, color:"#0d0d0b", marginBottom:10 }}>The Next Chapter Needs You.</h2>
        <p style={{ color:"rgba(13,13,11,.7)", fontSize:"0.98rem", marginBottom:28 }}>Every $45 feeds a family for a month. Every $120 sponsors a girl's month of tech education.</p>
        <button onClick={onBack} style={{ background:"#0d0d0b", color:"#f5f0e8", border:"none", borderRadius:100, padding:"14px 32px", fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:700, fontSize:"0.92rem", cursor:"pointer" }}>← Back to Website · Donate Today</button>
      </div>

      {/* FOOTER */}
      <div style={{ background:"#080807", borderTop:"1px solid rgba(255,255,255,.07)", padding:"36px 60px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", fontWeight:800, color:"#f5f0e8", marginBottom:6 }}>Lumora<span style={{ color:EM }}>.</span></div>
        <div style={{ fontSize:"0.8rem", color:"#a89e87", marginBottom:3 }}>Lumora House, Westlands, Nairobi, Kenya · hello@lumorafoundation.org</div>
        <div style={{ fontSize:"0.75rem", color:"#a89e87", opacity:.5 }}>© 2026 Lumora Foundation. All Rights Reserved. · Annual Impact Report 2025</div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  // ── URL-based secret routes ───────────────────────────────────────────────
  // Visit /weareadmins → Admin Analytics
  // Visit /payments    → Donations View
  useEffect(() => {
    const path = window.location.pathname.replace("/", "").toLowerCase();
    if (path === "weareadmins") setPage("AdminAnalytics");
    else if (path === "payments") setPage("DonationsView");
  }, []);

  // ── Track visitor on first load ───────────────────────────────────────────
  useEffect(() => {
    trackVisitor();
    trackLiveUser(true);
    trackPageView("Home");
    return () => trackLiveUser(false);
  }, []);

  const handleSetPage = (p) => {
    setPage(p);
    trackPageView(p);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  };

  // ── Secret admin pages — fullscreen, no nav/footer ────────────────────────
  if (page === "AdminAnalytics") {
    return <AdminAnalytics onBack={() => handleSetPage("Home")} />;
  }
  if (page === "DonationsView") {
    return <DonationsView onBack={() => handleSetPage("Home")} />;
  }

  if (page === "ImpactReport") {
    return <ImpactReport onBack={() => handleSetPage("Home")} />;
  }

  const renderPage = () => {
    switch (page) {
      case "Home":     return <Home setPage={handleSetPage} />;
      case "About":    return <About />;
      case "Missions": return <Missions setPage={handleSetPage} />;
      case "Impact":   return <Impact />;
      case "Stories":  return <Stories />;
      case "Donate":   return <Donate />;
      case "Contact":  return <Contact />;
      default:         return <Home setPage={handleSetPage} />;
    }
  };

  return (
    <>
      <Nav activePage={page} setPage={handleSetPage} />
      <main>{renderPage()}</main>
      <Footer setPage={handleSetPage} />
      <a href="#" className="float-donate" onClick={e => { e.preventDefault(); handleSetPage("Donate"); }}>
        ♥ Donate
      </a>
    </>
  );
}
