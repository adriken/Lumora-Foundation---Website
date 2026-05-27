import { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase";

function timeAgo(ts) {
  if (!ts) return "—";
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

function PulseDot({ color = "#22c55e" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "ping 1.5s infinite" }} />
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: color }} />
    </span>
  );
}

export default function DonationsView({ onBack }) {
  const [summary, setSummary]     = useState({ total: 0, totalValue: 0, todayValue: 0, weekValue: 0, monthValue: 0 });
  const [donations, setDonations] = useState([]);
  const [filter, setFilter]       = useState("all");
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    // ── Listen to donation summary ──
    const sumRef = ref(db, "donations");
    onValue(sumRef, snap => {
      if (snap.exists()) {
        const d = snap.val();
        setSummary({
          total:      d.total      || 0,
          totalValue: d.totalValue || 0,
          todayValue: d.todayValue || 0,
          weekValue:  d.weekValue  || 0,
          monthValue: d.monthValue || 0,
        });

        // Parse donation log
        if (d.log) {
          const arr = Object.entries(d.log)
            .map(([id, v]) => ({ id, ...v }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          setDonations(arr);
        } else {
          setDonations([]);
        }
      }
      setLoading(false);
    });

    return () => off(ref(db, "donations"));
  }, []);

  const filtered = filter === "all"
    ? donations
    : donations.filter(d => d.frequency === filter);

  // Tier breakdown from real data
  const tierCounts = donations.reduce((acc, d) => {
    acc[d.tier] = (acc[d.tier] || 0) + 1;
    return acc;
  }, {});

  const topTier = Math.max(...Object.values(tierCounts), 1);

  const S = {
    page:      { background: "#09090b", minHeight: "100vh", color: "#e4e4e7", fontFamily: "'DM Sans',system-ui,sans-serif" },
    bar:       { background: "rgba(9,9,11,.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 },
    card:      { background: "#18181b", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: 24 },
    bigNum:    { fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1 },
    sub:       { fontSize: "0.78rem", color: "#71717a", marginTop: 4 },
    tag:       { fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4813a", marginBottom: 6, display: "block" },
    filterBtn: (a) => ({ background: a ? "#d4813a" : "transparent", color: a ? "#09090b" : "#a1a1aa", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "6px 14px", fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer", transition: "all .2s" }),
    backBtn:   { background: "transparent", color: "#71717a", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.8rem", cursor: "pointer" },
    newBadge:  { background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 6, padding: "2px 8px", fontSize: "0.68rem", fontWeight: 700 },
  };

  return (
    <div style={S.page}>
      <style>{`@keyframes ping{0%{transform:scale(1);opacity:.75}75%,100%{transform:scale(2);opacity:0}} @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* TOP BAR */}
      <div style={S.bar}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 800, color: "#f5f0e8", fontSize: "1rem" }}>
            Lumora<span style={{ color: "#d4813a" }}>.</span> Donations
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem" }}>
            <PulseDot color="#22c55e" />
            <span style={{ color: "#22c55e", fontWeight: 600 }}>Firebase Live</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: "0.72rem", color: "#52525b" }}>PayPal → adams.lockin@gmail.com</div>
          <button style={S.backBtn} onClick={onBack}>← Website</button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 16 }}>
          <PulseDot color="#d4813a" />
          <div style={{ color: "#52525b", fontSize: "0.875rem" }}>Connecting to Firebase...</div>
        </div>
      ) : (
        <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Today's Revenue",  value: `$${summary.todayValue}`,                  sub: "Via PayPal",         color: "#22c55e" },
              { label: "This Week",        value: `$${summary.weekValue.toLocaleString()}`,   sub: "Last 7 days",        color: "#d4813a" },
              { label: "This Month",       value: `$${summary.monthValue.toLocaleString()}`,  sub: "Calendar month",     color: "#7aaa8a" },
              { label: "All Time Total",   value: `$${summary.totalValue.toLocaleString()}`,  sub: `${summary.total} donations`, color: "#818cf8" },
            ].map((k, i) => (
              <div key={i} style={{ ...S.card, borderTop: `2px solid ${k.color}` }}>
                <span style={S.tag}>{k.label}</span>
                <div style={{ ...S.bigNum, color: k.color }}>{k.value}</div>
                <div style={S.sub}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Tier breakdown + frequency */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div style={S.card}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa", marginBottom: 16 }}>Donations by tier</div>
              {Object.keys(tierCounts).length === 0 ? (
                <div style={{ color: "#52525b", fontSize: "0.85rem" }}>No donations recorded yet.</div>
              ) : (
                Object.entries(tierCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tier, count], i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: "0.82rem", color: "#e4e4e7" }}>{tier}</span>
                        <span style={{ fontSize: "0.82rem", color: "#d4813a", fontWeight: 700 }}>{count}</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                        <div style={{ width: `${(count / topTier) * 100}%`, height: "100%", background: "#d4813a", borderRadius: 2, opacity: 0.75 }} />
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div style={S.card}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa", marginBottom: 16 }}>Frequency split</div>
              {["monthly", "once", "annual"].map((freq, i) => {
                const count = donations.filter(d => d.frequency === freq).length;
                const pct   = donations.length > 0 ? Math.round((count / donations.length) * 100) : 0;
                const colors = ["#d4813a", "#7aaa8a", "#818cf8"];
                const labels = ["Monthly recurring", "One-time gifts", "Annual recurring"];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.8rem", fontWeight: 800, color: colors[i], minWidth: 64 }}>{pct}%</div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#e4e4e7", fontSize: "0.875rem" }}>{labels[i]}</div>
                      <div style={{ fontSize: "0.78rem", color: "#71717a" }}>{count} donors</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live donation table */}
          <div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa" }}>
                Live donation log · {filtered.length} records
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ k: "all", l: "All" }, { k: "monthly", l: "Monthly" }, { k: "once", l: "One-time" }, { k: "annual", l: "Annual" }].map(f => (
                  <button key={f.k} style={S.filterBtn(filter === f.k)} onClick={() => setFilter(f.k)}>{f.l}</button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#52525b" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>💳</div>
                <div style={{ fontSize: "0.875rem", marginBottom: 8 }}>No donations recorded yet.</div>
                <div style={{ fontSize: "0.78rem" }}>Donations appear here in real time as donors complete payment on PayPal.</div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                      {["Donor", "Amount", "Tier", "Frequency", "Email", "Time", "Status"].map(h => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d, i) => (
                      <tr key={d.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", animation: i === 0 ? "slideIn .4s ease" : "none", background: i === 0 ? "rgba(34,197,94,.04)" : "transparent" }}>
                        <td style={{ padding: "12px 12px", fontSize: "0.875rem", color: "#e4e4e7", fontWeight: 500 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {i === 0 && <span style={S.newBadge}>New</span>}
                            {d.name}
                          </div>
                        </td>
                        <td style={{ padding: "12px 12px", fontSize: "0.95rem", fontWeight: 800, color: "#22c55e", fontFamily: "'Playfair Display',Georgia,serif" }}>${d.amount}</td>
                        <td style={{ padding: "12px 12px", fontSize: "0.8rem", color: "#a1a1aa" }}>{d.tier}</td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ background: d.frequency === "monthly" ? "rgba(212,129,58,.15)" : d.frequency === "annual" ? "rgba(129,140,248,.15)" : "rgba(122,170,138,.15)", color: d.frequency === "monthly" ? "#d4813a" : d.frequency === "annual" ? "#818cf8" : "#7aaa8a", borderRadius: 6, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>
                            {d.frequency === "monthly" ? "Monthly" : d.frequency === "annual" ? "Annual" : "One-time"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 12px", fontSize: "0.8rem", color: "#52525b" }}>{d.email || "—"}</td>
                        <td style={{ padding: "12px 12px", fontSize: "0.8rem", color: "#52525b" }}>{timeAgo(d.timestamp)}</td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ background: d.status === "initiated" ? "rgba(251,191,36,.1)" : "rgba(34,197,94,.1)", color: d.status === "initiated" ? "#fbbf24" : "#22c55e", borderRadius: 6, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>
                            {d.status === "initiated" ? "⏳ Pending" : "✓ Completed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,255,255,.02)", borderRadius: 10, fontSize: "0.78rem", color: "#52525b", textAlign: "center" }}>
              All payments processed via PayPal · Funds deposited to adams.lockin@gmail.com · Data stored in Firebase Realtime Database
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
