import { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase";

// ── Pulse dot ─────────────────────────────────────────────────────────────────
function PulseDot({ color = "#22c55e" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite" }} />
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: color }} />
    </span>
  );
}

// ── Mini bar ──────────────────────────────────────────────────────────────────
function MiniBar({ data, color, height = 48 }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, background: i === data.length - 1 ? color : `${color}55`, borderRadius: "2px 2px 0 0", height: `${(v / max) * height}px`, minHeight: v > 0 ? 3 : 0, transition: "height .5s" }} />
      ))}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, chart }) {
  return (
    <div style={{ background: "#18181b", border: `1px solid rgba(255,255,255,.06)`, borderTop: `2px solid ${color}`, borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4813a", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: "#71717a", marginBottom: chart ? 16 : 0 }}>{sub}</div>
      {chart && <MiniBar data={chart} color={color} />}
    </div>
  );
}

// ── Progress row ──────────────────────────────────────────────────────────────
function ProgRow({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: "0.85rem", color: "#e4e4e7" }}>{label}</span>
        <span style={{ fontSize: "0.85rem", color, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, opacity: 0.75, transition: "width .6s" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminAnalytics({ onBack }) {
  const [tab, setTab]           = useState("overview");
  const [visitors, setVisitors] = useState({ total: 0, today: 0, week: 0, month: 0 });
  const [views, setViews]       = useState({ total: 0, today: 0, byPage: {} });
  const [donations, setDonations] = useState({ total: 0, totalValue: 0, todayValue: 0, weekValue: 0, monthValue: 0 });
  const [liveUsers, setLiveUsers] = useState(0);
  const [sessions, setSessions]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // ── Listen to visitors ──
    const visRef = ref(db, "visitors");
    onValue(visRef, snap => {
      if (snap.exists()) setVisitors(snap.val());
      setLoading(false);
      setLastUpdated(new Date());
    });

    // ── Listen to page views ──
    const pvRef = ref(db, "pageViews");
    onValue(pvRef, snap => {
      if (snap.exists()) {
        const d = snap.val();
        setViews({
          total:  d.total  || 0,
          today:  d.today  || 0,
          byPage: d.byPage || {},
        });
        // Collect recent sessions
        if (d.sessions) {
          const arr = Object.entries(d.sessions)
            .map(([k, v]) => ({ id: k, ...v }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, 50);
          setSessions(arr);
        }
      }
      setLastUpdated(new Date());
    });

    // ── Listen to donations ──
    const donRef = ref(db, "donations");
    onValue(donRef, snap => {
      if (snap.exists()) {
        const d = snap.val();
        setDonations({
          total:      d.total      || 0,
          totalValue: d.totalValue || 0,
          todayValue: d.todayValue || 0,
          weekValue:  d.weekValue  || 0,
          monthValue: d.monthValue || 0,
        });
      }
      setLastUpdated(new Date());
    });

    // ── Listen to live users ──
    const luRef = ref(db, "liveUsers");
    onValue(luRef, snap => {
      if (snap.exists()) setLiveUsers(Math.max(0, snap.val()));
    });

    return () => {
      off(ref(db, "visitors"));
      off(ref(db, "pageViews"));
      off(ref(db, "donations"));
      off(ref(db, "liveUsers"));
    };
  }, []);

  // Build sorted page list from byPage object
  const pageList = Object.entries(views.byPage)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count);

  const maxPageViews = pageList.length > 0 ? pageList[0].count : 1;

  const S = {
    page:    { background: "#09090b", minHeight: "100vh", color: "#e4e4e7", fontFamily: "'DM Sans',system-ui,sans-serif" },
    bar:     { background: "rgba(9,9,11,.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 },
    tabBtn:  (a) => ({ background: a ? "#d4813a" : "transparent", color: a ? "#09090b" : "#a1a1aa", border: "none", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", transition: "all .2s" }),
    backBtn: { background: "transparent", color: "#71717a", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.8rem", cursor: "pointer" },
    card:    { background: "#18181b", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: 24 },
    h3:      { fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa", marginBottom: 16 },
  };

  return (
    <div style={S.page}>
      <style>{`@keyframes ping{0%{transform:scale(1);opacity:.75}75%,100%{transform:scale(2);opacity:0}}`}</style>

      {/* TOP BAR */}
      <div style={S.bar}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 800, color: "#f5f0e8", fontSize: "1rem" }}>
            Lumora<span style={{ color: "#d4813a" }}>.</span> Analytics
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["overview", "pages", "sessions"].map(t => (
              <button key={t} style={S.tabBtn(tab === t)} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem" }}>
            <PulseDot color="#22c55e" />
            <span style={{ color: "#22c55e", fontWeight: 700 }}>{liveUsers}</span>
            <span style={{ color: "#71717a" }}>live now</span>
          </div>
          <div style={{ fontSize: "0.72rem", color: "#52525b" }}>
            🔴 Firebase Live · Updated {lastUpdated.toLocaleTimeString()}
          </div>
          <button style={S.backBtn} onClick={onBack}>← Website</button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 16 }}>
          <PulseDot color="#d4813a" />
          <div style={{ color: "#52525b", fontSize: "0.875rem" }}>Connecting to Firebase...</div>
          <div style={{ color: "#3f3f46", fontSize: "0.78rem" }}>Make sure your Firebase config is filled in src/firebase.js</div>
        </div>
      ) : (
        <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

          {/* ── OVERVIEW TAB ── */}
          {tab === "overview" && (
            <>
              {/* KPI row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                <StatCard label="Total Visitors"    value={visitors.total.toLocaleString()} sub={`${visitors.today} today`}          color="#d4813a" chart={[visitors.month, visitors.week, visitors.today, visitors.today, visitors.today, visitors.today, visitors.today]} />
                <StatCard label="Total Page Views"  value={views.total.toLocaleString()}    sub={`${views.today} today`}             color="#7aaa8a" chart={[views.today,views.today,views.today,views.today,views.today,views.today,views.today]} />
                <StatCard label="Total Donations"   value={donations.total.toLocaleString()} sub={`$${donations.todayValue} today`}  color="#f0a055" chart={[donations.monthValue,donations.weekValue,donations.todayValue,donations.todayValue,donations.todayValue,donations.todayValue,donations.todayValue]} />
                <StatCard label="Total Revenue"     value={`$${donations.totalValue.toLocaleString()}`} sub={`$${donations.weekValue} this week`} color="#818cf8" chart={[donations.monthValue,donations.weekValue,donations.todayValue,donations.todayValue,donations.todayValue,donations.todayValue,donations.todayValue]} />
              </div>

              {/* Secondary row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Visitors This Week",  value: visitors.week.toLocaleString(),          note: "Unique sessions",      color: "#d4813a" },
                  { label: "Visitors This Month", value: visitors.month.toLocaleString(),         note: "Unique sessions",      color: "#7aaa8a" },
                  { label: "Revenue This Week",   value: `$${donations.weekValue.toLocaleString()}`,  note: "Via PayPal",      color: "#f0a055" },
                  { label: "Revenue This Month",  value: `$${donations.monthValue.toLocaleString()}`, note: "Via PayPal",      color: "#818cf8" },
                ].map((m, i) => (
                  <div key={i} style={S.card}>
                    <div style={S.h3}>{m.label}</div>
                    <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2rem", fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "#71717a" }}>{m.note}</div>
                  </div>
                ))}
              </div>

              {/* Top pages */}
              <div style={S.card}>
                <div style={S.h3}>Top Pages — All Time</div>
                {pageList.length === 0 ? (
                  <div style={{ color: "#52525b", fontSize: "0.85rem", textAlign: "center", padding: "24px 0" }}>
                    No page view data yet. Data appears here as visitors browse the site.
                  </div>
                ) : (
                  pageList.map((p, i) => (
                    <ProgRow key={i} label={p.page} value={p.count} max={maxPageViews} color="#d4813a" />
                  ))
                )}
              </div>
            </>
          )}

          {/* ── PAGES TAB ── */}
          {tab === "pages" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={S.card}>
                <div style={S.h3}>Page views by page</div>
                {pageList.length === 0 ? (
                  <div style={{ color: "#52525b", fontSize: "0.85rem", padding: "24px 0" }}>No data yet — visit some pages first.</div>
                ) : (
                  pageList.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize: "0.875rem", color: "#e4e4e7" }}>{p.page}</span>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 80, height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                          <div style={{ width: `${(p.count / maxPageViews) * 100}%`, height: "100%", background: "#d4813a", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: "0.875rem", color: "#d4813a", fontWeight: 700, minWidth: 32, textAlign: "right" }}>{p.count}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div style={S.card}>
                <div style={S.h3}>Today vs All Time</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
                  {[
                    { label: "Page Views Today",    value: views.today,    total: views.total,        color: "#7aaa8a" },
                    { label: "Visitors Today",      value: visitors.today, total: visitors.total,      color: "#d4813a" },
                    { label: "Revenue Today ($)",   value: donations.todayValue, total: donations.totalValue, color: "#f0a055" },
                    { label: "Donations Today",     value: donations.total > 0 ? Math.round(donations.todayValue / (donations.totalValue / donations.total)) : 0, total: donations.total, color: "#818cf8" },
                  ].map((m, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: "0.82rem", color: "#a1a1aa" }}>{m.label}</span>
                        <span style={{ fontSize: "0.82rem", color: m.color, fontWeight: 700 }}>{m.value} / {m.total}</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                        <div style={{ width: m.total > 0 ? `${(m.value / m.total) * 100}%` : "0%", height: "100%", background: m.color, borderRadius: 2, transition: "width .6s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SESSIONS TAB ── */}
          {tab === "sessions" && (
            <div style={S.card}>
              <div style={S.h3}>Recent sessions — live feed ({sessions.length} recorded)</div>
              {sessions.length === 0 ? (
                <div style={{ color: "#52525b", fontSize: "0.85rem", textAlign: "center", padding: "40px 0" }}>
                  No session data yet. Sessions appear here in real time as visitors browse.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        {["Page Visited", "Time"].map(h => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((s, i) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                          <td style={{ padding: "10px 12px", fontSize: "0.875rem", color: "#e4e4e7" }}>
                            <span style={{ background: "rgba(212,129,58,.1)", color: "#d4813a", borderRadius: 6, padding: "2px 10px", fontSize: "0.78rem", fontWeight: 600 }}>{s.page}</span>
                          </td>
                          <td style={{ padding: "10px 12px", fontSize: "0.8rem", color: "#52525b" }}>
                            {s.timestamp ? new Date(s.timestamp).toLocaleString() : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
