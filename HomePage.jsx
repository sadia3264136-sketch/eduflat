import { useState, useEffect, useRef } from 'react'
import Particles from './Particles'

// ═══════════════════════════════════════════════════════════
// 🏫 SCHOOL CONTENT — Edit everything here for each client
// ═══════════════════════════════════════════════════════════
const SCHOOL = {
  name: "Bright Future Academy",
  shortName: "BFA",
  est: "2010",
  tagline: "Where Curious Minds Become Confident Leaders",
  city: "Lahore",
  country: "Pakistan",
  heroLine: "A school built on the belief that every child carries a future worth investing in.",
  about: "For over a decade, Bright Future Academy has combined rigorous academics with genuine care — small class sizes, dedicated teachers, and a culture where curiosity is the starting point, not the end goal. We don't just prepare students for exams. We prepare them for the rest of their lives.",
  pullQuote: "We measure success not by the grades on a report card, but by the confidence a child carries out of our gates.",
  pullQuoteAuthor: "— Principal's Office",
  stats: [
    { n: "850+", label: "Students Enrolled" },
    { n: "45", label: "Faculty Members" },
    { n: "98%", label: "Matriculation Result" },
    { n: "14", label: "Years of Excellence" },
  ],
  values: [
    { num: "I", title: "Academic Rigor", desc: "A curriculum that challenges students to think critically, not just memorize — built on national standards with international best practice." },
    { num: "II", title: "Individual Attention", desc: "Small class sizes mean every student is known by name, not just by roll number. Teachers track progress closely and personally." },
    { num: "III", title: "Character Before Career", desc: "We believe discipline, honesty and empathy are taught alongside mathematics and science — not as an afterthought, but as the foundation." },
    { num: "IV", title: "Parent Partnership", desc: "Education works best as a partnership. Regular updates, open communication, and a door that's always open to families." },
  ],
  programs: [
    { level: "Primary", range: "Class I – V", focus: "Foundational literacy, numeracy, and the joy of learning." },
    { level: "Middle", range: "Class VI – VIII", focus: "Broadening horizons across sciences, languages, and the arts." },
    { level: "Secondary", range: "Class IX – X (Matric)", focus: "Focused board-exam preparation with strong fundamentals." },
    { level: "Higher Secondary", range: "Class XI – XII (FSc/FA)", focus: "Specialized streams preparing for university and beyond." },
  ],
  testimonials: [
    { quote: "My daughter has grown so much more confident since joining. The teachers actually know her — not just her grades.", author: "Parent of a Class 7 student" },
    { quote: "The discipline here is firm but never harsh. There's real warmth behind the structure.", author: "Parent of a Class 10 student" },
    { quote: "Best decision we made for our son's education. The faculty genuinely cares about each child's progress.", author: "Parent of a Class 5 student" },
  ],
  address: "123 Garden Town Road, Lahore, Pakistan",
  phone: "+92 42 1234 5678",
  email: "admissions@brightfutureacademy.edu.pk",
}

const COLOR = {
  navy: "#0a1628",
  navy2: "#0f1f38",
  navyLight: "#16294a",
  gold: "#c9a227",
  goldLight: "#e0c158",
  cream: "#f5efe0",
  sage: "#7a8b7f",
  text: "#eef0f3",
  text2: "#9aa6b8",
  text3: "#566177",
  border: "#1b2c47",
}

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL HOOK
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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .8s ${delay}s ease, transform .8s ${delay}s ease`,
      ...style,
    }}>{children}</div>
  )
}

export default function HomePage({ onOpenLock }) {
  const [vis, setVis] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setVis(true), 100)
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const anim = (delay) => ({
    animation: vis ? `riseIn .9s ${delay}s cubic-bezier(.16,1,.3,1) both` : "none",
    opacity: vis ? undefined : 0,
  })

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setNavOpen(false)
  }

  return (
    <div style={{ background: COLOR.navy, color: COLOR.text, fontFamily: "'Inter',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${COLOR.gold}33; color: ${COLOR.goldLight}; }
        @keyframes riseIn { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform: translateY(0); } }
        @keyframes shimmerGold { 0%,100% { opacity:.55 } 50% { opacity:1 } }
        @keyframes slowDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-12px,-10px); } }
        .gold-underline { position:relative; display:inline-block; }
        .gold-underline::after {
          content:''; position:absolute; left:0; right:0; bottom:-4px; height:2px;
          background: linear-gradient(90deg, ${COLOR.gold}, transparent);
        }
        .btn-gold {
          background: ${COLOR.gold}; color: ${COLOR.navy}; border: none;
          border-radius: 2px; padding: 16px 34px; font-size: 14px; font-weight: 600;
          letter-spacing: .5px; text-transform: uppercase; cursor: pointer;
          transition: all .3s ease; font-family: 'Inter', sans-serif;
        }
        .btn-gold:hover { background: ${COLOR.goldLight}; transform: translateY(-2px); box-shadow: 0 10px 30px ${COLOR.gold}33; }
        .btn-outline {
          background: transparent; color: ${COLOR.text}; border: 1px solid ${COLOR.border};
          border-radius: 2px; padding: 15px 30px; font-size: 13px; font-weight: 500;
          letter-spacing: .5px; cursor: pointer; transition: all .3s ease; font-family: 'Inter', sans-serif;
        }
        .btn-outline:hover { border-color: ${COLOR.gold}; color: ${COLOR.goldLight}; }
        .value-card { transition: all .4s ease; }
        .value-card:hover { background: ${COLOR.navyLight} !important; }
        .testimonial-card { transition: all .4s ease; }
        .testimonial-card:hover { border-color: ${COLOR.gold}44 !important; transform: translateY(-4px); }
        .program-row:hover { background: ${COLOR.navyLight}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLOR.navy}; }
        ::-webkit-scrollbar-thumb { background: ${COLOR.border}; border-radius: 99px; }
        .nav-link { color: ${COLOR.text2}; font-size: 13.5px; letter-spacing: .3px; cursor: pointer; transition: color .2s; background:none; border:none; font-family:'Inter',sans-serif; }
        .nav-link:hover { color: ${COLOR.goldLight}; }
        @media (max-width: 860px) { .desktop-nav { display: none !important; } }
        @media (min-width: 861px) { .mobile-nav-toggle { display: none !important; } }
      `}</style>

      {/* ═══════════ NAV ═══════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(10,22,40,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLOR.border}` : "1px solid transparent",
        transition: "all .4s ease",
      }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto", padding: "0 32px", height: 78,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%", border: `1.5px solid ${COLOR.gold}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 16, color: COLOR.goldLight,
            }}>{SCHOOL.shortName}</div>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600, letterSpacing: ".2px" }}>{SCHOOL.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: COLOR.text3, letterSpacing: "1.5px", marginTop: 1 }}>EST. {SCHOOL.est}</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
            <button className="nav-link" onClick={() => scrollTo("values")}>Philosophy</button>
            <button className="nav-link" onClick={() => scrollTo("programs")}>Programs</button>
            <button className="nav-link" onClick={() => scrollTo("voices")}>Voices</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
            <button className="btn-outline" style={{ padding: "10px 22px", fontSize: 12 }} onClick={onOpenLock}>Staff Portal</button>
          </div>

          <button className="mobile-nav-toggle" onClick={() => setNavOpen(p => !p)} style={{
            background: "none", border: "none", color: COLOR.text, fontSize: 22, cursor: "pointer",
          }}>{navOpen ? "✕" : "☰"}</button>
        </div>

        {navOpen && (
          <div style={{ background: COLOR.navy2, borderTop: `1px solid ${COLOR.border}`, padding: "20px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
            {["about", "values", "programs", "voices", "contact"].map(id => (
              <button key={id} className="nav-link" style={{ textAlign: "left", textTransform: "capitalize" }} onClick={() => scrollTo(id)}>{id}</button>
            ))}
            <button className="btn-gold" onClick={onOpenLock}>Staff Portal →</button>
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", padding: "140px 32px 80px",
      }}>
        <Particles />
        <div style={{
          position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLOR.gold}08 0%, transparent 70%)`, pointerEvents: "none",
          animation: "slowDrift 14s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${COLOR.border}22 1px, transparent 1px), linear-gradient(90deg, ${COLOR.border}22 1px, transparent 1px)`,
          backgroundSize: "64px 64px", maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 30, ...anim(0),
            }}>
              <div style={{ width: 36, height: 1, background: COLOR.gold }} />
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, letterSpacing: "2.5px",
                color: COLOR.goldLight, textTransform: "uppercase",
              }}>{SCHOOL.city}, {SCHOOL.country} · Est. {SCHOOL.est}</span>
            </div>

            <h1 style={{
              fontFamily: "'Fraunces',serif", fontWeight: 600,
              fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: 1.04, letterSpacing: "-1.5px",
              marginBottom: 30, ...anim(.12),
            }}>
              {SCHOOL.name}
            </h1>

            <p style={{
              fontFamily: "'Fraunces',serif", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(1.2rem,2.4vw,1.55rem)", color: COLOR.goldLight,
              lineHeight: 1.5, marginBottom: 28, maxWidth: 600, ...anim(.24),
            }}>
              {SCHOOL.tagline}
            </p>

            <p style={{
              fontSize: 16.5, color: COLOR.text2, lineHeight: 1.85, maxWidth: 540, marginBottom: 46, ...anim(.36),
            }}>
              {SCHOOL.heroLine}
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", ...anim(.48) }}>
              <button className="btn-gold" onClick={() => scrollTo("about")}>Discover Our Story</button>
              <button className="btn-outline" onClick={onOpenLock}>Staff &amp; Admin Login</button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
            marginTop: 90, borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}`,
            ...anim(.6),
          }}>
            {SCHOOL.stats.map((s, i) => (
              <div key={s.label} style={{
                padding: "28px 20px", borderLeft: i > 0 ? `1px solid ${COLOR.border}` : "none",
              }}>
                <div style={{
                  fontFamily: "'Fraunces',serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 600,
                  color: COLOR.goldLight, letterSpacing: "-1px", lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: COLOR.text3,
                  letterSpacing: "1px", marginTop: 8, textTransform: "uppercase",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" style={{ padding: "140px 32px", background: COLOR.navy2, borderTop: `1px solid ${COLOR.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2.5px",
                color: COLOR.gold, textTransform: "uppercase",
              }}>Our Story</span>
              <h2 style={{
                fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 600,
                lineHeight: 1.12, marginTop: 18, letterSpacing: "-1px",
              }}>
                A decade of <span className="gold-underline" style={{ color: COLOR.goldLight }}>quiet excellence</span>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={.15}>
            <p style={{ fontSize: 18, lineHeight: 1.9, color: COLOR.text2, marginBottom: 44 }}>{SCHOOL.about}</p>
            <div style={{
              borderLeft: `2px solid ${COLOR.gold}`, paddingLeft: 32, margin: "0 0 8px",
            }}>
              <p style={{
                fontFamily: "'Fraunces',serif", fontStyle: "italic", fontSize: "clamp(1.3rem,2.2vw,1.6rem)",
                color: COLOR.text, lineHeight: 1.5, marginBottom: 16,
              }}>
                &ldquo;{SCHOOL.pullQuote}&rdquo;
              </p>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: COLOR.text3, letterSpacing: "1px",
              }}>{SCHOOL.pullQuoteAuthor}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ VALUES / PHILOSOPHY ═══════════ */}
      <section id="values" style={{ padding: "140px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 70, maxWidth: 620 }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2.5px",
                color: COLOR.gold, textTransform: "uppercase",
              }}>Our Philosophy</span>
              <h2 style={{
                fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 600,
                lineHeight: 1.15, marginTop: 18, letterSpacing: "-1px",
              }}>
                Four principles guide everything we do.
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, border: `1px solid ${COLOR.border}` }}>
            {SCHOOL.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="value-card" style={{
                  padding: "44px 40px", borderRight: i % 2 === 0 ? `1px solid ${COLOR.border}` : "none",
                  borderBottom: i < 2 ? `1px solid ${COLOR.border}` : "none",
                  height: "100%",
                }}>
                  <div style={{
                    fontFamily: "'Fraunces',serif", fontSize: 15, color: COLOR.gold, fontWeight: 600,
                    letterSpacing: "1px", marginBottom: 20,
                  }}>{v.num}</div>
                  <h3 style={{
                    fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, marginBottom: 14, letterSpacing: "-.3px",
                  }}>{v.title}</h3>
                  <p style={{ color: COLOR.text2, fontSize: 15, lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROGRAMS ═══════════ */}
      <section id="programs" style={{ padding: "140px 32px", background: COLOR.navy2, borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 64, maxWidth: 620 }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2.5px",
                color: COLOR.gold, textTransform: "uppercase",
              }}>Academic Programs</span>
              <h2 style={{
                fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 600,
                lineHeight: 1.15, marginTop: 18, letterSpacing: "-1px",
              }}>
                A path for every stage of growth.
              </h2>
            </div>
          </Reveal>

          <div>
            {SCHOOL.programs.map((p, i) => (
              <Reveal key={p.level} delay={i * .08}>
                <div className="program-row" style={{
                  display: "grid", gridTemplateColumns: "1fr 1.4fr 2fr", gap: 30, alignItems: "center",
                  padding: "32px 28px", borderTop: `1px solid ${COLOR.border}`,
                  borderBottom: i === SCHOOL.programs.length - 1 ? `1px solid ${COLOR.border}` : "none",
                  transition: "background .3s",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: COLOR.text3, letterSpacing: "1px",
                  }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600 }}>{p.level}</h3>
                  <div>
                    <div style={{ color: COLOR.goldLight, fontSize: 13, fontWeight: 600, marginBottom: 6, letterSpacing: ".3px" }}>{p.range}</div>
                    <div style={{ color: COLOR.text2, fontSize: 14.5, lineHeight: 1.7 }}>{p.focus}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ VOICES / TESTIMONIALS ═══════════ */}
      <section id="voices" style={{ padding: "140px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 64, maxWidth: 620 }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2.5px",
                color: COLOR.gold, textTransform: "uppercase",
              }}>Parent Voices</span>
              <h2 style={{
                fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 600,
                lineHeight: 1.15, marginTop: 18, letterSpacing: "-1px",
              }}>
                What families say about us.
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SCHOOL.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * .12}>
                <div className="testimonial-card" style={{
                  border: `1px solid ${COLOR.border}`, borderRadius: 4, padding: "36px 30px",
                  height: "100%", display: "flex", flexDirection: "column",
                }}>
                  <div style={{
                    fontFamily: "'Fraunces',serif", fontSize: 38, color: COLOR.gold, lineHeight: 1, marginBottom: 18,
                  }}>&ldquo;</div>
                  <p style={{
                    fontFamily: "'Fraunces',serif", fontStyle: "italic", fontSize: 16.5,
                    color: COLOR.text, lineHeight: 1.7, flex: 1, marginBottom: 20,
                  }}>{t.quote}</p>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: COLOR.text3, letterSpacing: ".5px",
                  }}>{t.author}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA / ADMISSIONS ═══════════ */}
      <section style={{
        padding: "120px 32px", background: COLOR.navy2,
        borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 300, background: `radial-gradient(ellipse, ${COLOR.gold}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <Reveal>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2.5px",
              color: COLOR.gold, textTransform: "uppercase",
            }}>Admissions Open</span>
            <h2 style={{
              fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600,
              lineHeight: 1.15, marginTop: 18, marginBottom: 26, letterSpacing: "-1px",
            }}>
              Begin your child&rsquo;s journey with us.
            </h2>
            <p style={{ color: COLOR.text2, fontSize: 16.5, lineHeight: 1.8, marginBottom: 40 }}>
              We welcome families who share our belief that education is about more than grades — it&rsquo;s about character, curiosity, and confidence.
            </p>
            <button className="btn-gold" onClick={() => scrollTo("contact")}>Request a Prospectus</button>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ CONTACT / FOOTER ═══════════ */}
      <footer id="contact" style={{ padding: "100px 32px 50px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 60, marginBottom: 70 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", border: `1.5px solid ${COLOR.gold}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 16, color: COLOR.goldLight,
                }}>{SCHOOL.shortName}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 600 }}>{SCHOOL.name}</div>
              </div>
              <p style={{ color: COLOR.text3, fontSize: 14, lineHeight: 1.8, maxWidth: 320 }}>
                Shaping confident, capable young minds in {SCHOOL.city} since {SCHOOL.est}.
              </p>
            </Reveal>

            <Reveal delay={.1}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px",
                color: COLOR.gold, textTransform: "uppercase", marginBottom: 20,
              }}>Visit Us</div>
              <p style={{ color: COLOR.text2, fontSize: 14.5, lineHeight: 1.9 }}>{SCHOOL.address}</p>
            </Reveal>

            <Reveal delay={.2}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px",
                color: COLOR.gold, textTransform: "uppercase", marginBottom: 20,
              }}>Get in Touch</div>
              <p style={{ color: COLOR.text2, fontSize: 14.5, lineHeight: 1.9 }}>{SCHOOL.phone}<br />{SCHOOL.email}</p>
              <button className="btn-outline" style={{ marginTop: 20, fontSize: 12, padding: "11px 22px" }} onClick={onOpenLock}>
                Staff &amp; Admin Login →
              </button>
            </Reveal>
          </div>

          <div style={{
            borderTop: `1px solid ${COLOR.border}`, paddingTop: 28,
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{ color: COLOR.text3, fontSize: 12.5 }}>© 2026 {SCHOOL.name}. All rights reserved.</span>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", color: COLOR.text3, fontSize: 11, letterSpacing: ".5px",
            }}>Est. {SCHOOL.est} · {SCHOOL.city}, {SCHOOL.country}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
