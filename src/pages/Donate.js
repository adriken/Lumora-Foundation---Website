import { useState, useEffect } from "react";
import { FadeIn } from "../components/utils";

// ─────────────────────────────────────────────────────────────────────────────
//  PAYPAL CONFIGURATION
//  Donations are sent directly to: adams.lockin@gmail.com
//  Uses PayPal's Hosted Buttons / Donate SDK — no backend required.
// ─────────────────────────────────────────────────────────────────────────────
const PAYPAL_EMAIL = "adams.lockin@gmail.com";
const PAYPAL_CURRENCY = "USD";
const PAYPAL_ITEM_NAME = "Lumora Foundation Donation";

// Builds the PayPal donate URL for a given amount and frequency.
// - One-time  → standard payment
// - Monthly   → recurring subscription (cmd=_xclick-subscriptions)
// - Annual    → recurring subscription, billed yearly
function buildPayPalUrl({ amount, freq, customAmount }) {
  const finalAmount = customAmount || amount;

  if (freq === "monthly") {
    const params = new URLSearchParams({
      cmd:           "_xclick-subscriptions",
      business:      PAYPAL_EMAIL,
      item_name:     PAYPAL_ITEM_NAME,
      currency_code: PAYPAL_CURRENCY,
      a3:            finalAmount,   // recurring amount
      p3:            "1",           // every 1
      t3:            "M",           // Month
      src:           "1",           // recurring payments
      srt:           "0",           // no limit on recurrences
      no_note:       "1",
      return:        window.location.href,
    });
    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
  }

  if (freq === "annual") {
    const params = new URLSearchParams({
      cmd:           "_xclick-subscriptions",
      business:      PAYPAL_EMAIL,
      item_name:     PAYPAL_ITEM_NAME,
      currency_code: PAYPAL_CURRENCY,
      a3:            finalAmount,
      p3:            "1",
      t3:            "Y",           // Year
      src:           "1",
      srt:           "0",
      no_note:       "1",
      return:        window.location.href,
    });
    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
  }

  // One-time
  const params = new URLSearchParams({
    cmd:           "_donations",
    business:      PAYPAL_EMAIL,
    item_name:     PAYPAL_ITEM_NAME,
    amount:        finalAmount,
    currency_code: PAYPAL_CURRENCY,
    no_note:       "1",
    return:        window.location.href,
  });
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

// ─── Donation tiers ───────────────────────────────────────────────────────────
const TIERS = [
  { amount: 15,  title: "Nourisher",         desc: "Provides 10 nutritious meals to children in acute food crisis zones.",              badge: null },
  { amount: 45,  title: "Family Guardian",   desc: "Feeds a family of 5 for an entire month, plus clean water access.",                 badge: "Most Popular" },
  { amount: 120, title: "Tech Sponsor",      desc: "Fully sponsors one girl's access to the Lumora Code Academy for 30 days.",          badge: null },
  { amount: 500, title: "Community Champion",desc: "Funds an Innovation Lab day — computers, power, internet — for 80 students.",       badge: "High Impact" },
];

// ─── Main Donate component ────────────────────────────────────────────────────
export default function Donate() {
  const [freq, setFreq]               = useState("monthly");
  const [activeTier, setActiveTier]   = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom]     = useState(false);
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [errors, setErrors]           = useState({});

  // When switching back to monthly, clear custom mode
  useEffect(() => {
    if (freq === "monthly") setUseCustom(false);
  }, [freq]);

  const isCustomMode = freq !== "monthly";
  const resolvedAmount = isCustomMode && useCustom
    ? customAmount
    : String(TIERS[activeTier].amount);

  const freqLabel = freq === "monthly" ? "/ month" : freq === "annual" ? "/ year" : "today";
  const displayBtnAmount = resolvedAmount ? `$${resolvedAmount}` : "$—";

  // ── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim())  e.lastName  = "Required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
    if (!resolvedAmount || Number(resolvedAmount) <= 0) e.amount = "Please enter a valid amount";
    return e;
  }

  // ── Donate handler — opens PayPal in new tab ──────────────────────────────
  function handleDonate(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const url = buildPayPalUrl({
      amount:       resolvedAmount,
      freq,
      customAmount: useCustom ? customAmount : null,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <div className="donate-section">
          <div className="donate-inner">

            {/* ── Headline ── */}
            <FadeIn>
              <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 20px" }}>
                <div className="section-tag">Give Today</div>
                <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  Your Dollar Has a<br /><em>Name. A Face. A Future.</em>
                </h1>
                <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
                  Every contribution — from $5 to $50,000 — directly nourishes a child or
                  transforms a girl's trajectory. We account for every cent, and we'll show
                  you the results.
                </p>
              </div>
            </FadeIn>

            <div className="donate-grid">

              {/* ════════════════════════════════════════
                  LEFT COLUMN — Tier selector
                  ════════════════════════════════════════ */}
              <FadeIn>
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div className="section-tag">Choose Your Impact</div>
                    <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>
                      Select a Giving Level
                    </h3>
                    <p style={{ color: "var(--sand-dim)", fontSize: "0.875rem" }}>
                      All donations are tax-deductible. 87¢ of every dollar reaches programs.
                    </p>
                  </div>

                  <div className="donate-tiers">
                    {/* Preset tiers */}
                    {TIERS.map((t, i) => (
                      <div
                        key={i}
                        className={`tier-card${activeTier === i && !useCustom ? " active" : ""}`}
                        onClick={() => { setActiveTier(i); setUseCustom(false); setErrors({}); }}
                      >
                        {t.badge && <div className="tier-badge">{t.badge}</div>}
                        <div className="tier-amount">
                          ${t.amount}
                          <span>{freq === "monthly" ? "/mo" : freq === "annual" ? "/yr" : ""}</span>
                        </div>
                        <div className="tier-title">{t.title}</div>
                        <div className="tier-desc">{t.desc}</div>
                      </div>
                    ))}

                    {/* Custom amount card — One-time & Annual only */}
                    {isCustomMode && (
                      <div
                        className={`tier-card${useCustom ? " active" : ""}`}
                        onClick={() => setUseCustom(true)}
                      >
                        <div className="tier-title" style={{ marginBottom: 12, color: "var(--ember)" }}>
                          ✏️ Enter Your Own Amount
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{
                            fontFamily: "var(--ff-display)", fontSize: "1.8rem",
                            fontWeight: 800, color: "var(--cream)",
                          }}>$</span>
                          <input
                            className="input-field"
                            type="number"
                            min="1"
                            placeholder="Any amount"
                            value={customAmount}
                            onChange={e => { setCustomAmount(e.target.value); setUseCustom(true); setErrors({}); }}
                            onClick={e => { e.stopPropagation(); setUseCustom(true); }}
                            style={{
                              fontFamily: "var(--ff-display)", fontWeight: 700,
                              fontSize: "1.2rem", flex: 1,
                            }}
                          />
                        </div>
                        <div className="tier-desc" style={{ marginTop: 10 }}>
                          Give any amount that feels right to you. Every dollar creates change.
                        </div>
                        {errors.amount && useCustom && (
                          <div style={{ color: "#e05252", fontSize: "0.78rem", marginTop: 8 }}>
                            {errors.amount}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PayPal note */}
                  <div style={{
                    marginTop: 20, padding: "14px 18px",
                    background: "rgba(0,100,255,0.06)", border: "1px solid rgba(0,100,255,0.15)",
                    borderRadius: 12,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "1.4rem" }}>🔵</span>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--cream)", fontSize: "0.875rem" }}>
                          Payments secured by PayPal
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--sand-dim)", marginTop: 2 }}>
                          You will be redirected to PayPal to complete your donation safely.
                          No PayPal account required — credit & debit cards accepted.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* ════════════════════════════════════════
                  RIGHT COLUMN — Donor details form
                  ════════════════════════════════════════ */}
              <FadeIn delay={0.15}>
                <div className="donate-form-area">
                  <div className="donate-form-title">Complete Your Gift</div>
                  <div className="donate-form-sub">
                    You'll be securely redirected to PayPal to complete payment.
                    We never store your card details.
                  </div>

                  {/* ── Frequency toggle ── */}
                  <div className="freq-toggle">
                    <button
                      className={`freq-btn${freq === "monthly" ? " active" : ""}`}
                      onClick={() => setFreq("monthly")}
                    >Monthly</button>
                    <button
                      className={`freq-btn${freq === "once" ? " active" : ""}`}
                      onClick={() => setFreq("once")}
                    >One-time</button>
                    <button
                      className={`freq-btn${freq === "annual" ? " active" : ""}`}
                      onClick={() => setFreq("annual")}
                    >Annual</button>
                  </div>

                  {/* ── Amount display ── */}
                  <div className="input-group">
                    <label className="input-label">Donation Amount (USD)</label>
                    {isCustomMode && useCustom ? (
                      <div style={{
                        display: "flex", alignItems: "center",
                        background: "var(--card)", border: "1px solid var(--ember)",
                        borderRadius: 12, padding: "0 18px", gap: 6,
                      }}>
                        <span style={{ fontFamily: "var(--ff-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--ember)" }}>$</span>
                        <input
                          className="input-field"
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={e => { setCustomAmount(e.target.value); setErrors({}); }}
                          style={{
                            fontFamily: "var(--ff-display)", fontWeight: 700,
                            fontSize: "1.2rem", background: "transparent",
                            border: "none", padding: "14px 0",
                          }}
                        />
                      </div>
                    ) : (
                      <input
                        className="input-field"
                        value={`$${TIERS[activeTier].amount}`}
                        readOnly
                        style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: "1.2rem" }}
                      />
                    )}
                    {errors.amount && !useCustom && (
                      <div style={{ color: "#e05252", fontSize: "0.78rem", marginTop: 6 }}>{errors.amount}</div>
                    )}
                  </div>

                  {/* ── Name fields ── */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="input-group">
                      <label className="input-label">First Name</label>
                      <input
                        className="input-field"
                        placeholder="Amara"
                        value={firstName}
                        onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: null })); }}
                        style={{ borderColor: errors.firstName ? "#e05252" : undefined }}
                      />
                      {errors.firstName && <div style={{ color: "#e05252", fontSize: "0.75rem", marginTop: 4 }}>{errors.firstName}</div>}
                    </div>
                    <div className="input-group">
                      <label className="input-label">Last Name</label>
                      <input
                        className="input-field"
                        placeholder="Johnson"
                        value={lastName}
                        onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: null })); }}
                        style={{ borderColor: errors.lastName ? "#e05252" : undefined }}
                      />
                      {errors.lastName && <div style={{ color: "#e05252", fontSize: "0.75rem", marginTop: 4 }}>{errors.lastName}</div>}
                    </div>
                  </div>

                  {/* ── Email ── */}
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <input
                      className="input-field"
                      placeholder="amara@email.com"
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: null })); }}
                      style={{ borderColor: errors.email ? "#e05252" : undefined }}
                    />
                    {errors.email && <div style={{ color: "#e05252", fontSize: "0.75rem", marginTop: 4 }}>{errors.email}</div>}
                  </div>

                  {/* ── Summary box ── */}
                  <div style={{
                    background: "var(--card)", border: "1px solid var(--border)",
                    borderRadius: 14, padding: "18px 20px", marginBottom: 8,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--sand-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Giving summary
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--ember)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {freq === "monthly" ? "Monthly" : freq === "annual" ? "Annual" : "One-time"}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--sand)", fontSize: "0.9rem" }}>
                        {isCustomMode && useCustom ? "Custom donation" : TIERS[activeTier].title}
                      </span>
                      <span style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", fontWeight: 800, color: "var(--ember)" }}>
                        {displayBtnAmount}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--sand-dim)", marginTop: 6 }}>
                      Funds sent to PayPal account · Lumora Foundation
                    </div>
                  </div>

                  {/* ── PayPal donate button ── */}
                  <button className="donate-submit" onClick={handleDonate}>
                    <span style={{ fontSize: "1.1rem" }}>🔵</span>
                    Donate {displayBtnAmount} {freqLabel} via PayPal
                  </button>

                  {/* ── Trust strip ── */}
                  <div className="trust-strip" style={{ marginTop: 16 }}>
                    <div className="trust-item">🔒 PayPal Secured</div>
                    <div className="trust-item">✅ 501(c)(3) Registered</div>
                    <div className="trust-item">🌍 Transparent Reporting</div>
                    <div className="trust-item">💳 Cards Accepted</div>
                  </div>

                  <div style={{
                    marginTop: 16, fontSize: "0.75rem", color: "var(--sand-dim)",
                    textAlign: "center", lineHeight: 1.6,
                  }}>
                    By donating you agree to Lumora Foundation's terms. You will be
                    redirected to PayPal's secure payment page. No account required.
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ════════════════════════════════════════
                OTHER WAYS TO GIVE
                ════════════════════════════════════════ */}
            <FadeIn>
              <div style={{ marginTop: 80, textAlign: "center" }}>
                <div className="section-tag">Other Ways to Give</div>
                <h2 className="section-h2">Your Impact, <em>Your Way</em></h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 40 }}>
                {[
                  { icon: "🏢", title: "Corporate Partnership",  desc: "CSR programs, employee giving, and branded impact campaigns. Contact our partnerships team." },
                  { icon: "🎓", title: "Sponsor a Scholar",      desc: "Fully fund one girl's education for a year — $1,440 — and receive regular updates on her progress." },
                  { icon: "🏭", title: "Fund an Innovation Lab", desc: "A one-time $5,000 gift equips an entire school with computers, solar power, and internet access." },
                  { icon: "📜", title: "Legacy Giving",          desc: "Include Lumora in your estate planning and create a lasting legacy for future generations in Kenya." },
                ].map((w, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="value-card" style={{ padding: 28 }}>
                      <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{w.icon}</div>
                      <div style={{ fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>{w.title}</div>
                      <div style={{ fontSize: "0.875rem", color: "var(--sand-dim)", lineHeight: 1.7 }}>{w.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </>
  );
}
