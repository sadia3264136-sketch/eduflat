import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════
// 🏫 SCHOOL CONTENT — Edit everything here for each client
// ═══════════════════════════════════════════════════════════
const SCHOOL = {
  name: "Bright Future Academy",
  shortName: "BFA",
  est: "2010",
  tagline: "Innovative Education for a Brighter Tomorrow",
  city: "Lahore",
  phone: "042-1234-5678",
  phone2: "042-1234-5679",
  email: "info@brightfutureacademy.edu.pk",
  address: "123 Garden Town Road, Lahore, Pakistan",
  about: "Bright Future Academy is a network of modern campuses dedicated to providing quality education across Pakistan. We blend strong academics with character building, technology, and individual attention — preparing every student to become a confident, capable citizen of tomorrow.",
  stats: [
    { n: 12, suffix: "+", label: "Campuses" },
    { n: 850, suffix: "+", label: "Enrolled Students" },
    { n: 45, suffix: "+", label: "Expert Faculty" },
    { n: 98, suffix: "%", label: "Result Rate" },
  ],
  values: [
    { icon: "📘", color: "#1654c9", title: "Strong Academics", desc: "A balanced curriculum that meets national standards with modern teaching methods." },
    { icon: "🎨", color: "#ff9d2e", title: "Creative Arts", desc: "Music, art, and creative expression are part of every student's weekly routine." },
    { icon: "💻", color: "#16a364", title: "Tech & Robotics", desc: "Hands-on coding, robotics, and digital literacy starting from primary level." },
    { icon: "🤝", color: "#e0335c", title: "Character Building", desc: "Discipline, empathy and leadership taught alongside every subject." },
  ],
  programs: [
    { icon: "🧸", title: "Pre-School", range: "Age 2 – 5", desc: "A warm, playful introduction to learning, language, and social skills.", color: "#ff9d2e" },
    { icon: "📗", title: "Primary", range: "Class I – V", desc: "Building strong foundations in literacy, numeracy and curiosity.", color: "#1654c9" },
    { icon: "🔬", title: "Elementary & Secondary", range: "Class VI – X", desc: "Broader subjects, board-exam preparation, and growing independence.", color: "#16a364" },
    { icon: "🎓", title: "Higher Secondary", range: "Class XI – XII", desc: "Specialized FSc/FA streams preparing students for university and careers.", color: "#e0335c" },
  ],
  quickLinks: [
    { icon: "📝", label: "Admissions", color: "#1654c9" },
    { icon: "📅", label: "Calendar", color: "#ff9d2e" },
    { icon: "❤️", label: "Health & Support", color: "#e0335c" },
    { icon: "👨‍👩‍👧", label: "Parents Corner", color: "#16a364" },
    { icon: "📄", label: "Downloads", color: "#7c5cd4" },
    { icon: "❓", label: "FAQs", color: "#0fa3b1" },
  ],
  events: [
    { day: "28", month: "JUL", title: "Annual Sports Day", time: "9:00 AM – 5:00 PM" },
    { day: "01", month: "AUG", title: "Second Term Begins", time: "8:00 AM – 11:00 AM" },
    { day: "12", month: "AUG", title: "Inter-School Quiz Competition", time: "8:00 AM – 1:00 PM" },
    { day: "20", month: "AUG", title: "Parent-Teacher Meeting", time: "10:00 AM – 2:00 PM" },
  ],
  testimonials: [
    { name: "Ayesha Tariq", role: "Parent, Class 4", text: "My daughter looks forward to school every single day. The teachers genuinely care about each child." },
    { name: "Fahad Rauf", role: "Parent, Class 8", text: "Excellent balance of academics and extracurriculars. Best decision we made for our son's education." },
    { name: "Sana Malik", role: "Parent, Class 2", text: "The warmth and discipline together is rare to find. Highly recommend this school to every parent." },
  ],
}

const C = {
  blue: "#1654c9",
  blueDark: "#0f3d99",
  blueLight: "#e8f0ff",
  orange: "#ff9d2e",
  green: "#16a364",
  red: "#e0335c",
  purple: "#7c5cd4",
  ink: "#1a2138",
  ink2: "#5b6478",
  ink3: "#9aa1b0",
  bg: "#ffffff",
  bgSoft: "#f7f9fc",
  border: "#e7ebf2",
}

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`,
      ...style,
    }}>{children}</div>
  )
}

function Counter({ to, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0)
  const [ref, visible] = useReveal()
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = to / 60
    const t = setInterval(() => {
      start = Math.min(start + step, to)
      setVal(Math.floor(start))
      if (start >= to) clearInterval(t)
    }, duration / 60)
    return () => clearInterval(t)
  }, [visible, to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

export default function HomePage({ onOpenLock }) {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setNavOpen(false)
  }

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "'Inter',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${C.blue}22; }
        @keyframes floatSlow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 ${C.orange}44; } 70% { box-shadow: 0 0 0 14px ${C.orange}00; } 100% { box-shadow: 0 0 0 0 ${C.orange}00; } }
        @keyframes wiggle { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        .btn-primary {
          background: ${C.blue}; color: #fff; border: none; border-radius: 14px;
          padding: 16px 34px; font-size: 15px; font-weight: 700; cursor: pointer;
          transition: all .25s; font-family: 'Poppins', sans-serif; box-shadow: 0 8px 24px ${C.blue}33;
        }
        .btn-primary:hover { background: ${C.blueDark}; transform: translateY(-3px); box-shadow: 0 14px 32px ${C.blue}44; }
        .btn-secondary {
          background: ${C.orange}; color: #fff; border: none; border-radius: 14px;
          padding: 15px 30px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: all .25s; font-family: 'Poppins', sans-serif; box-shadow: 0 8px 24px ${C.orange}33;
        }
        .btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 14px 32px ${C.orange}44; }
        .btn-ghost {
          background: #fff; color: ${C.blue}; border: 2px solid ${C.blue}; border-radius: 14px;
          padding: 14px 28px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: all .25s; font-family: 'Poppins', sans-serif;
        }
        .btn-ghost:hover { background: ${C.blueLight}; }
        .quick-card { transition: all .3s ease; cursor: pointer; }
        .quick-card:hover { transform: translateY(-6px); box-shadow: 0 16px 36px rgba(0,0,0,.1); }
        .value-card { transition: all .35s ease; }
        .value-card:hover { transform: translateY(-8px); box-shadow: 0 20px 44px rgba(0,0,0,.1); }
        .program-card { transition: all .35s ease; }
        .program-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,.1); }
        .event-card { transition: all .3s ease; }
        .event-card:hover { border-color: ${C.blue} !important; background: ${C.blueLight} !important; }
        .testimonial-card { transition: all .3s ease; }
        .testimonial-card:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(0,0,0,.08); }
        .nav-link { color: ${C.ink2}; font-size: 14.5px; font-weight: 600; cursor: pointer; background: none; border: none; font-family: 'Inter', sans-serif; transition: color .2s; }
        .nav-link:hover { color: ${C.blue}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bgSoft}; }
        ::-webkit-scrollbar-thumb { background: ${C.blue}55; border-radius: 99px; }
        @media (max-width: 900px) { .desktop-nav { display: none !important; } }
        @media (min-width: 901px) { .mobile-toggle { display: none !important; } }
        @media (max-width: 760px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid, .programs-grid, .quick-grid { grid-template-columns: repeat(2,1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════════ TOP BAR ═══════════ */}
      <div style={{ background: C.blueDark, color: "#fff", padding: "8px 6%", fontSize: 13 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>📞 Parent Helpline: {SCHOOL.phone} | {SCHOOL.phone2}</span>
          <span>✉️ {SCHOOL.email}</span>
        </div>
      </div>

      {/* ═══════════ NAV ═══════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 500, background: "#fff",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,.06)" : "none",
        transition: "box-shadow .3s ease",
      }}>
        <div style={{
          maxWidth: 1240, margin: "0 auto", padding: "0 24px", height: 80,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              boxShadow: `0 8px 20px ${C.blue}33`,
            }}>🎓</div>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 19, fontWeight: 800, color: C.ink, lineHeight: 1.1 }}>{SCHOOL.name}</div>
              <div style={{ fontSize: 11.5, color: C.ink3, fontWeight: 500, marginTop: 2 }}>Est. {SCHOOL.est} · {SCHOOL.city}</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
            <button className="nav-link" onClick={() => scrollTo("programs")}>Programs</button>
            <button className="nav-link" onClick={() => scrollTo("events")}>Events</button>
            <button className="nav-link" onClick={() => scrollTo("testimonials")}>Testimonials</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
            <button className="btn-primary" style={{ padding: "11px 24px", fontSize: 13 }} onClick={onOpenLock}>Staff Portal →</button>
          </div>

          <button className="mobile-toggle" onClick={() => setNavOpen(p => !p)} style={{
            background: C.blueLight, border: "none", color: C.blue, fontSize: 20, cursor: "pointer",
            width: 44, height: 44, borderRadius: 10,
          }}>{navOpen ? "✕" : "☰"}</button>
        </div>

        {navOpen && (
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {[["about", "About"], ["programs", "Programs"], ["events", "Events"], ["testimonials", "Testimonials"], ["contact", "Contact"]].map(([id, label]) => (
              <button key={id} className="nav-link" style={{ textAlign: "left" }} onClick={() => scrollTo(id)}>{label}</button>
            ))}
            <button className="btn-primary" onClick={onOpenLock}>Staff Portal →</button>
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.blueLight} 0%, #fff 60%)` }}>
        <div style={{
          position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%",
          background: `${C.orange}15`, animation: "floatSlow 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -60, width: 320, height: 320, borderRadius: "50%",
          background: `${C.blue}10`, animation: "floatSlow 10s ease-in-out infinite reverse",
        }} />

        <div className="hero-grid" style={{
          maxWidth: 1240, margin: "0 auto", padding: "70px 24px 90px",
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 50, alignItems: "center",
          position: "relative", zIndex: 1,
        }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, background: "#fff",
              padding: "8px 18px", borderRadius: 999, marginBottom: 26, boxShadow: "0 4px 16px rgba(0,0,0,.06)",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulseRing 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.ink2 }}>Admissions Open for 2026</span>
            </div>

            <h1 style={{
              fontFamily: "'Poppins',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.2rem,4.8vw,3.6rem)", lineHeight: 1.15, color: C.ink, marginBottom: 22,
            }}>
              A Bright Future,<br />
              <span style={{ color: C.blue }}>Growing</span> <span style={{ color: C.orange }}>Together.</span>
            </h1>

            <p style={{ fontSize: 17, color: C.ink2, lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
              {SCHOOL.tagline} — combining strong academics, creativity, and character to shape confident leaders of tomorrow.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("about")}>Discover Our Story</button>
              <button className="btn-ghost" onClick={onOpenLock}>Staff Login</button>
            </div>
          </Reveal>

          <Reveal delay={.15}>
            <div style={{ position: "relative" }}>
              <div style={{
                background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, borderRadius: 28,
                padding: 40, color: "#fff", boxShadow: `0 30px 60px ${C.blue}33`, position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "#ffffff12" }} />
                <div style={{ fontSize: 56, marginBottom: 16 }}>🏫</div>
                <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{SCHOOL.name}</h3>
                <p style={{ fontSize: 14, opacity: .9, lineHeight: 1.7, marginBottom: 24 }}>{SCHOOL.address}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {SCHOOL.stats.slice(0, 2).map(s => (
                    <div key={s.label} style={{ background: "#ffffff18", borderRadius: 14, padding: "14px 16px" }}>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 26, fontWeight: 800 }}>
                        <Counter to={s.n} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize: 11.5, opacity: .85, marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: -22, left: -22, background: C.orange, borderRadius: 18,
                padding: "16px 22px", color: "#fff", boxShadow: `0 16px 32px ${C.orange}44`,
                animation: "wiggle 4s ease-in-out infinite",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Poppins',sans-serif" }}>98%</div>
                <div style={{ fontSize: 11 }}>Result Rate</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ QUICK LINKS ═══════════ */}
      <section style={{ padding: "0 24px", position: "relative", zIndex: 2, marginTop: -36 }}>
        <div className="quick-grid" style={{
          maxWidth: 1240, margin: "0 auto", background: "#fff", borderRadius: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,.08)", padding: 28,
          display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16,
        }}>
          {SCHOOL.quickLinks.map((q, i) => (
            <Reveal key={q.label} delay={i * .05}>
              <div className="quick-card" style={{ textAlign: "center", padding: "16px 8px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, background: `${q.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, margin: "0 auto 12px",
                }}>{q.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{q.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ STATS STRIP ═══════════ */}
      <section style={{ padding: "100px 24px 60px" }}>
        <div className="stats-grid" style={{
          maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24,
        }}>
          {SCHOOL.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * .1}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 800,
                  color: [C.blue, C.orange, C.green, C.red][i % 4],
                }}>
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div style={{ color: C.ink2, fontSize: 14.5, fontWeight: 600, marginTop: 6 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <Reveal>
            <div style={{
              background: `linear-gradient(135deg, ${C.blueLight}, #fff)`, borderRadius: 28, padding: 50,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🌟</div>
              <p style={{
                fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 600, color: C.ink,
                lineHeight: 1.5, fontStyle: "italic",
              }}>
                "We are living in the age of information — every child deserves the tools to thrive in it."
              </p>
              <div style={{ marginTop: 20, fontSize: 13, color: C.ink3, fontWeight: 600 }}>— Chairman's Message</div>
            </div>
          </Reveal>
          <Reveal delay={.15}>
            <span style={{
              display: "inline-block", background: `${C.blue}12`, color: C.blue, padding: "6px 16px",
              borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 18, letterSpacing: ".3px",
            }}>WHO WE ARE</span>
            <h2 style={{
              fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 800,
              color: C.ink, lineHeight: 1.2, marginBottom: 22,
            }}>
              Innovative Education for 21st Century Skills
            </h2>
            <p style={{ fontSize: 16, color: C.ink2, lineHeight: 1.85 }}>{SCHOOL.about}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CORE VALUES ═══════════ */}
      <section style={{ padding: "90px 24px", background: C.bgSoft }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                display: "inline-block", background: `${C.orange}15`, color: C.orange, padding: "6px 16px",
                borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16,
              }}>WHY CHOOSE US</span>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 800, color: C.ink }}>
                Our Core Values
              </h2>
            </div>
          </Reveal>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {SCHOOL.values.map((v, i) => (
              <Reveal key={v.title} delay={i * .1}>
                <div className="value-card" style={{
                  background: "#fff", borderRadius: 22, padding: "34px 26px", height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,.04)",
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 18, background: `${v.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20,
                  }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17.5, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: C.ink2, fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROGRAMS ═══════════ */}
      <section id="programs" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                display: "inline-block", background: `${C.green}15`, color: C.green, padding: "6px 16px",
                borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16,
              }}>ACADEMIC LEVELS</span>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 800, color: C.ink }}>
                A Path for Every Stage
              </h2>
            </div>
          </Reveal>
          <div className="programs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {SCHOOL.programs.map((p, i) => (
              <Reveal key={p.title} delay={i * .1}>
                <div className="program-card" style={{
                  borderRadius: 22, overflow: "hidden", height: "100%",
                  border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,.03)",
                }}>
                  <div style={{ background: p.color, padding: "30px 26px", color: "#fff" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>{p.icon}</div>
                    <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700 }}>{p.title}</h3>
                    <div style={{ fontSize: 12.5, opacity: .9, marginTop: 4 }}>{p.range}</div>
                  </div>
                  <div style={{ padding: "22px 24px", background: "#fff" }}>
                    <p style={{ color: C.ink2, fontSize: 13.5, lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EVENTS ═══════════ */}
      <section id="events" style={{ padding: "90px 24px", background: C.bgSoft }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
              <div>
                <span style={{
                  display: "inline-block", background: `${C.purple}15`, color: C.purple, padding: "6px 16px",
                  borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16,
                }}>STAY UPDATED</span>
                <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: C.ink }}>
                  Upcoming Events
                </h2>
              </div>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="values-grid">
            {SCHOOL.events.map((e, i) => (
              <Reveal key={e.title} delay={i * .08}>
                <div className="event-card" style={{
                  background: "#fff", border: `2px solid ${C.border}`, borderRadius: 18, padding: 24, transition: "all .3s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      background: C.blue, color: "#fff", borderRadius: 12, padding: "8px 14px", textAlign: "center", minWidth: 56,
                    }}>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{e.day}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".5px" }}>{e.month}</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{e.title}</h3>
                  <p style={{ color: C.ink3, fontSize: 12.5 }}>🕐 {e.time}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section id="testimonials" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                display: "inline-block", background: `${C.red}12`, color: C.red, padding: "6px 16px",
                borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16,
              }}>TESTIMONIALS</span>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 800, color: C.ink }}>
                What Parents Say
              </h2>
            </div>
          </Reveal>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {SCHOOL.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * .1}>
                <div className="testimonial-card" style={{
                  background: C.bgSoft, borderRadius: 22, padding: "32px 28px", height: "100%",
                }}>
                  <div style={{ color: C.orange, fontSize: 18, marginBottom: 16 }}>★★★★★</div>
                  <p style={{ color: C.ink2, fontSize: 14.5, lineHeight: 1.8, marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", background: C.blue, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'Poppins',sans-serif",
                    }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: C.ink3 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "90px 24px" }}>
        <Reveal>
          <div style={{
            maxWidth: 1100, margin: "0 auto", background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
            borderRadius: 32, padding: "70px 50px", textAlign: "center", color: "#fff",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "#ffffff10" }} />
            <div style={{ position: "absolute", bottom: -80, left: -40, width: 200, height: 200, borderRadius: "50%", background: "#ffffff08" }} />
            <h2 style={{
              fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800,
              marginBottom: 18, position: "relative",
            }}>
              Ready to Enroll Your Child?
            </h2>
            <p style={{ fontSize: 16, opacity: .9, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px", position: "relative" }}>
              Admissions are now open for the 2026 academic year. Give your child the bright future they deserve.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <button className="btn-secondary">📝 Apply for Admission</button>
              <button style={{
                background: "#fff", color: C.blue, border: "none", borderRadius: 14, padding: "15px 30px",
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins',sans-serif",
              }} onClick={onOpenLock}>Staff Login →</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer id="contact" style={{ background: C.ink, color: "#fff", padding: "70px 24px 30px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 50, marginBottom: 50 }} className="testimonials-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>🎓</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 18, fontWeight: 700 }}>{SCHOOL.name}</div>
              </div>
              <p style={{ color: "#aab2c5", fontSize: 13.5, lineHeight: 1.8, maxWidth: 320 }}>
                Innovative education shaping confident, capable students across Pakistan since {SCHOOL.est}.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 18, color: C.orange }}>Quick Links</div>
              {["About Us", "Admissions", "Programs", "Events", "FAQs"].map(l => (
                <div key={l} style={{ color: "#aab2c5", fontSize: 13.5, marginBottom: 12, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 18, color: C.orange }}>Contact Us</div>
              <p style={{ color: "#aab2c5", fontSize: 13.5, lineHeight: 2 }}>
                📍 {SCHOOL.address}<br />
                📞 {SCHOOL.phone}<br />
                ✉️ {SCHOOL.email}
              </p>
            </div>
          </div>
          <div style={{
            borderTop: "1px solid #2a3349", paddingTop: 24,
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{ color: "#7a8499", fontSize: 12.5 }}>© 2026 {SCHOOL.name}. All Rights Reserved.</span>
            <span style={{ color: "#7a8499", fontSize: 12.5 }}>Est. {SCHOOL.est} · {SCHOOL.city}, Pakistan</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
