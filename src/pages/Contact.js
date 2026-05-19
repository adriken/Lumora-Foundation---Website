import { FadeIn } from "../components/utils";

export default function Contact() {
  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <section className="section">
          <FadeIn>
            <div className="section-tag">Get In Touch</div>
            <h1 className="section-h2" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
              Let's Build This<br /><em>Together.</em>
            </h1>
            <p className="section-body">
              Whether you're an NGO, government body, philanthropist, or someone who just
              wants to help — we'd love to talk.
            </p>
          </FadeIn>
        </section>

        <div className="contact-section">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="contact-grid">

              {/* ── Contact info ── */}
              <FadeIn>
                <div>
                  <div className="section-tag">Contact Information</div>
                  <h2 className="section-h2" style={{ marginBottom: 48 }}>Reach Us <em>Directly</em></h2>

                  {[
                    { icon: "📍", title: "Headquarters",      val: "Nairobi, Kenya, 00100" },
                    { icon: "✉️", title: "General Inquiries", val: "hello@lu-mora.org" },
                    { icon: "🤝", title: "Partnerships",      val: "partners@lu-mora.org" },
                    { icon: "📞", title: "Phone",             val: "+254 700 000 000" },
                  ].map((c, i) => (
                    <div key={i} className="contact-info-item">
                      <div className="contact-icon">{c.icon}</div>
                      <div>
                        <div className="contact-info-title">{c.title}</div>
                        <div className="contact-info-val" style={{ whiteSpace: "pre-line" }}>{c.val}</div>
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: 40 }}>
                    <div className="section-tag" style={{ marginBottom: 16 }}>Volunteer Opportunities</div>
                    <p style={{ color: "var(--sand-dim)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 20 }}>
                      We welcome field volunteers, remote tech mentors, content creators,
                      grant writers, and board advisors. All backgrounds welcome.
                    </p>
                    <a href="mailto:volunteer@lumorafoundation.org" className="btn-secondary">
                      Apply to Volunteer →
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* ── Partnership form ── */}
              <FadeIn delay={0.15}>
                <div className="contact-form">
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--cream)", marginBottom: 24 }}>
                    Partnership Inquiry
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="input-group">
                      <label className="input-label">First Name</label>
                      <input className="input-field" placeholder="Sarah" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Last Name</label>
                      <input className="input-field" placeholder="Mitchell" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Organization</label>
                    <input className="input-field" placeholder="Organization name" />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input className="input-field" placeholder="sarah@organization.org" type="email" />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Partnership Type</label>
                    <select className="select-field">
                      <option>NGO / Humanitarian Collaboration</option>
                      <option>Corporate CSR Partnership</option>
                      <option>Government / Bilateral</option>
                      <option>Academic / Research</option>
                      <option>Media / Documentary</option>
                      <option>Individual Philanthropy</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Message</label>
                    <textarea
                      className="textarea-field"
                      placeholder="Tell us about your organization and how you'd like to collaborate with Lumora Foundation..."
                    />
                  </div>

                  {/* ── FORM SUBMISSION ──
                      OPTION A — EmailJS (free, no backend needed):
                        1. npm install emailjs-com
                        2. import emailjs from 'emailjs-com'
                        3. Call emailjs.sendForm() on submit

                      OPTION B — Formspree (paste your endpoint):
                        Wrap inputs in <form action="https://formspree.io/f/YOUR_ID" method="POST">

                      OPTION C — Your own backend API:
                        Add onSubmit handler and POST to your endpoint
                  ── */}
                  <button className="donate-submit" style={{ marginTop: 0 }}>
                    Send Message →
                  </button>

                  <div style={{ marginTop: 16, fontSize: "0.78rem", color: "var(--sand-dim)", textAlign: "center" }}>
                    We respond to all partnership inquiries within 48 hours.
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── Social links ── */}
            <FadeIn>
              <div style={{ marginTop: 80, textAlign: "center" }}>
                <div className="section-tag">Follow the Mission</div>
                <h2 className="section-h2" style={{ marginBottom: 32 }}>Stay <em>Connected</em></h2>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  {[
                    { label: "𝕏 Twitter / X",  href: "https://x.com/Lumora_F" },
                    { label: "in LinkedIn",     href: "www.linkedin.com/in/lumora-foundation-0448b240b" },
                    { label: "▶ YouTube",       href: "https://www.youtube.com/@LumoraFoundation" },
                    { label: "📷 Instagram",    href: "https://instagram.com/lumorafoundation" },
                    { label: "f Facebook",      href: "https://www.facebook.com/people/Lumora-Mwangaza/pfbid031vxE7VTRaCT89XGwpiVKa3zfPTZ1gTtvuNKDkT5micheYyY2C4iP3Lhe8BBCHwNEl/" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
}