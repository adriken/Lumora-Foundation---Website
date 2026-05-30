import { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase";

function PulseDot({ color = "#22c55e" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "ping 1.5s infinite" }} />
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: color }} />
    </span>
  );
}

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

function ProgRow({ label, value, max, color, flag }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: "0.85rem", color: "#e4e4e7" }}>{flag ? `${flag} ` : ""}{label}</span>
        <span style={{ fontSize: "0.85rem", color, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, opacity: 0.75, transition: "width .6s" }} />
      </div>
    </div>
  );
}

// Country code → flag emoji
function flag(code) {
  if (!code || code === "XX") return "🌍";
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt())
  );
}

export default function AdminAnalytics({ onBack }) {
  const [tab, setTab]           = useState("overview");
  const [visitors, setVisitors] = useState({ total: 0, today: 0, week: 0, month: 0, byCountry: {} });
  const [views, setViews]       = useState({ total: 0, today: 0, byPage: {}, byCountry: {}, sessions: [] });
  const [donations, setDonations] = useState({ total: 0, totalValue: 0, todayValue: 0, weekValue: 0, monthValue: 0, byCountry: {} });
  const [liveUsers, setLiveUsers] = useState(0);
  const [countryNames, setCountryNames] = useState({});
  const [loading, setLoading]   = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Visitors
    onValue(ref(db, "visitors"), snap => {
      if (snap.exists()) setVisitors(snap.val());
      setLoading(false);
      setLastUpdated(new Date());
    });
    // Page views
    onValue(ref(db, "pageViews"), snap => {
      if (snap.exists()) {
        const d = snap.val();
        const sessions = d.sessions
          ? Object.entries(d.sessions).map(([k, v]) => ({ id: k, ...v })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 100)
          : [];
        setViews({ total: d.total || 0, today: d.today || 0, byPage: d.byPage || {}, byCountry: d.byCountry || {}, sessions });
      }
      setLastUpdated(new Date());
    });
    // Donations
    onValue(ref(db, "donations"), snap => {
      if (snap.exists()) {
        const d = snap.val();
        setDonations({ total: d.total || 0, totalValue: d.totalValue || 0, todayValue: d.todayValue || 0, weekValue: d.weekValue || 0, monthValue: d.monthValue || 0, byCountry: d.byCountry || {} });
      }
      setLastUpdated(new Date());
    });
    // Live users
    onValue(ref(db, "liveUsers"), snap => { if (snap.exists()) setLiveUsers(Math.max(0, snap.val())); });
    // Country name map
    onValue(ref(db, "meta/countries"), snap => { if (snap.exists()) setCountryNames(snap.val()); });

    return () => {
      off(ref(db, "visitors"));
      off(ref(db, "pageViews"));
      off(ref(db, "donations"));
      off(ref(db, "liveUsers"));
      off(ref(db, "meta/countries"));
    };
  }, []);

  // Build sorted lists
  const pageList = Object.entries(views.byPage).map(([p, c]) => ({ page: p, count: c })).sort((a, b) => b.count - a.count);
  const maxPage  = pageList.length > 0 ? pageList[0].count : 1;

  // Merge all country data
  const allCountryCodes = new Set([
    ...Object.keys(visitors.byCountry || {}),
    ...Object.keys(views.byCountry    || {}),
    ...Object.keys(donations.byCountry || {}),
  ]);
  const countryList = Array.from(allCountryCodes).map(code => ({
    code,
    name:      countryNames[code]?.name || code,
    flag:      flag(code),
    visitors:  (visitors.byCountry  || {})[code] || 0,
    pageViews: (views.byCountry     || {})[code] || 0,
    donations: (donations.byCountry || {})[code] || 0,
  })).sort((a, b) => (b.visitors + b.pageViews) - (a.visitors + a.pageViews));

  const maxCountryVisitors = countryList.length > 0 ? Math.max(...countryList.map(c => c.visitors), 1) : 1;

  const S = {
    page:    { background: "#09090b", minHeight: "100vh", color: "#e4e4e7", fontFamily: "'DM Sans',system-ui,sans-serif" },
    bar:     { background: "rgba(9,9,11,.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 },
    tabBtn:  (a) => ({ background: a ? "#d4813a" : "transparent", color: a ? "#09090b" : "#a1a1aa", border: "none", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", transition: "all .2s" }),
    backBtn: { background: "transparent", color: "#71717a", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.8rem", cursor: "pointer" },
    card:    { background: "#18181b", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: 24 },
    h3:      { fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa", marginBottom: 16 },
    tag:     { fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4813a", marginBottom: 6, display: "block" },
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
            {["overview", "pages", "countries", "sessions"].map(t => (
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
          <div style={{ fontSize: "0.72rem", color: "#52525b" }}>🔴 Firebase · {lastUpdated.toLocaleTimeString()}</div>
          <button style={S.backBtn} onClick={onBack}>← Website</button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 16 }}>
          <PulseDot color="#d4813a" />
          <div style={{ color: "#52525b", fontSize: "0.875rem" }}>Connecting to Firebase...</div>
        </div>
      ) : (
        <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

          {/* ══ OVERVIEW ══ */}
          {tab === "overview" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Total Visitors",   value: visitors.total.toLocaleString(),          sub: `${visitors.today} today`,            color: "#d4813a", chart: [visitors.month, visitors.week, visitors.today, visitors.today, visitors.today, visitors.today, visitors.today] },
                  { label: "Total Page Views", value: views.total.toLocaleString(),              sub: `${views.today} today`,               color: "#7aaa8a", chart: [views.today, views.today, views.today, views.today, views.today, views.today, views.today] },
                  { label: "Total Donations",  value: donations.total.toLocaleString(),          sub: `$${donations.todayValue} today`,     color: "#f0a055", chart: [donations.monthValue, donations.weekValue, donations.todayValue, donations.todayValue, donations.todayValue, donations.todayValue, donations.todayValue] },
                  { label: "Total Revenue",    value: `$${donations.totalValue.toLocaleString()}`, sub: `$${donations.weekValue} this week`, color: "#818cf8", chart: [donations.monthValue, donations.weekValue, donations.todayValue, donations.todayValue, donations.todayValue, donations.todayValue, donations.todayValue] },
                ].map((k, i) => (
                  <div key={i} style={{ ...S.card, borderTop: `2px solid ${k.color}` }}>
                    <span style={S.tag}>{k.label}</span>
                    <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1, color: k.color, marginBottom: 4 }}>{k.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "#71717a", marginBottom: 16 }}>{k.sub}</div>
                    <MiniBar data={k.chart} color={k.color} />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Top pages */}
                <div style={S.card}>
                  <div style={S.h3}>Top Pages</div>
                  {pageList.length === 0
                    ? <div style={{ color: "#52525b", fontSize: "0.85rem" }}>No page view data yet.</div>
                    : pageList.map((p, i) => <ProgRow key={i} label={p.page} value={p.count} max={maxPage} color="#d4813a" />)
                  }
                </div>
                {/* Top countries overview */}
                <div style={S.card}>
                  <div style={S.h3}>Top Countries — Visitors</div>
                  {countryList.length === 0
                    ? <div style={{ color: "#52525b", fontSize: "0.85rem" }}>No country data yet.</div>
                    : countryList.slice(0, 8).map((c, i) => (
                        <ProgRow key={i} label={c.name} value={c.visitors} max={maxCountryVisitors} color="#7aaa8a" flag={c.flag} />
                      ))
                  }
                </div>
              </div>
            </>
          )}

          {/* ══ PAGES ══ */}
          {tab === "pages" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={S.card}>
                <div style={S.h3}>All page views by page</div>
                {pageList.length === 0
                  ? <div style={{ color: "#52525b", fontSize: "0.85rem" }}>No data yet.</div>
                  : pageList.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize: "0.875rem", color: "#e4e4e7" }}>{p.page}</span>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 80, height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                          <div style={{ width: `${(p.count / maxPage) * 100}%`, height: "100%", background: "#d4813a", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: "0.875rem", color: "#d4813a", fontWeight: 700, minWidth: 32, textAlign: "right" }}>{p.count}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div style={S.card}>
                <div style={S.h3}>Page views by country</div>
                {countryList.length === 0
                  ? <div style={{ color: "#52525b", fontSize: "0.85rem" }}>No data yet.</div>
                  : countryList.filter(c => c.pageViews > 0).sort((a, b) => b.pageViews - a.pageViews).map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize: "1.2rem" }}>{c.flag}</span>
                      <span style={{ flex: 1, fontSize: "0.875rem", color: "#e4e4e7" }}>{c.name}</span>
                      <div style={{ width: 60, height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                        <div style={{ width: `${(c.pageViews / Math.max(...countryList.map(x => x.pageViews), 1)) * 100}%`, height: "100%", background: "#7aaa8a", borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: "0.875rem", color: "#7aaa8a", fontWeight: 700, minWidth: 28, textAlign: "right" }}>{c.pageViews}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* ══ COUNTRIES ══ */}
          {tab === "countries" && (
            <div style={S.card}>
              <div style={S.h3}>All countries — visitors, page views & donations</div>
              {countryList.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#52525b" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>🌍</div>
                  <div style={{ fontSize: "0.875rem" }}>No country data yet. Appears as visitors browse the site.</div>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        {["Country", "Visitors", "Page Views", "Donations", "Revenue Share"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {countryList.map((c, i) => {
                        const donationCountry = c.donations;
                        const totalDonations  = donations.total || 1;
                        const sharePct        = Math.round((donationCountry / totalDonations) * 100);
                        return (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: "1.4rem" }}>{c.flag}</span>
                                <span style={{ fontSize: "0.875rem", color: "#e4e4e7", fontWeight: 500 }}>{c.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 50, height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                                  <div style={{ width: `${(c.visitors / maxCountryVisitors) * 100}%`, height: "100%", background: "#d4813a", borderRadius: 2 }} />
                                </div>
                                <span style={{ fontSize: "0.875rem", color: "#d4813a", fontWeight: 700 }}>{c.visitors}</span>
                              </div>
                            </td>
                            <td style={{ padding: "12px 14px", fontSize: "0.875rem", color: "#7aaa8a", fontWeight: 600 }}>{c.pageViews}</td>
                            <td style={{ padding: "12px 14px", fontSize: "0.875rem", color: "#f0a055", fontWeight: 600 }}>{c.donations}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 60, height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                                  <div style={{ width: `${sharePct}%`, height: "100%", background: "#818cf8", borderRadius: 2 }} />
                                </div>
                                <span style={{ fontSize: "0.8rem", color: "#818cf8" }}>{sharePct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══ SESSIONS ══ */}
          {tab === "sessions" && (
            <div style={S.card}>
              <div style={S.h3}>Recent sessions with country — live feed ({views.sessions.length} recorded)</div>
              {views.sessions.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#52525b", fontSize: "0.875rem" }}>
                  No session data yet. Sessions appear here in real time.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        {["Page", "Country", "City", "Time"].map(h => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {views.sessions.map((s, i) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                          <td style={{ padding: "10px 12px" }}>
                            <span style={{ background: "rgba(212,129,58,.1)", color: "#d4813a", borderRadius: 6, padding: "2px 10px", fontSize: "0.78rem", fontWeight: 600 }}>{s.page}</span>
                          </td>
                          <td style={{ padding: "10px 12px", fontSize: "0.875rem", color: "#e4e4e7" }}>
                            {s.countryCode ? `${flag(s.countryCode)} ` : "🌍 "}{s.country || "Unknown"}
                          </td>
                          <td style={{ padding: "10px 12px", fontSize: "0.8rem", color: "#71717a" }}>{s.city || "—"}</td>
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
