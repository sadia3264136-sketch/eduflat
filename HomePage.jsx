import { useState, useEffect } from 'react'
import Particles from './Particles'
import { Typewriter, Counter } from './animations'
import { Bar, Badge } from './ui'
import { C, CLASSES, makeStudents } from './data'

const PREVIEW = makeStudents(200)

export default function HomePage({ onOpenLock }) {
  const [vis,setVis]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    setTimeout(()=>setVis(true),80)
    const s=()=>setScrolled(window.scrollY>40)
    window.addEventListener("scroll",s)
    return()=>window.removeEventListener("scroll",s)
  },[])

  const clsStats=CLASSES.slice(0,5).map(c=>{
    const ss=PREVIEW.filter(s=>s.cls===c)
    return{name:c,paid:ss.filter(s=>s.paid).length,total:ss.length,absent:ss.filter(s=>s.todayAbsent).length}
  })

  const features=[
    {icon:"🎓",title:"Smart Enrollment",desc:"Paperless admissions with digital records, roll numbers and instant parent alerts from day one."},
    {icon:"💰",title:"Fee Automation",desc:"Auto-generate slips, track payments in real time, send reminders. Zero manual chasing required."},
    {icon:"📋",title:"Live Attendance",desc:"One-tap mark present/absent. Parents notified instantly. Full monthly reports auto-generated."},
    {icon:"📊",title:"AI Analytics",desc:"GPA tracking, early-warning for struggling students, class-wise performance powered by AI."},
    {icon:"👑",title:"Principal Command",desc:"Private PIN-protected dashboard with full visibility — every student, every class, every rupee."},
    {icon:"📱",title:"Works Everywhere",desc:"Any phone, tablet or laptop. No app download. Fully responsive and always blazing fast."},
  ]

  const testimonials=[
    {name:"Tariq Mehmood",role:"Owner, Bright Future Academy",city:"Lahore",text:"We used to spend 3 hours every month chasing fees. EduFlow cut that to zero. Auto reminders do everything."},
    {name:"Sara Jameel",role:"Principal, Stars Tuition Centre",city:"Karachi",text:"The principal dashboard is a game changer. I see absences and call parents before it becomes a problem."},
    {name:"Kamran Butt",role:"Director, Excel Academies",city:"Islamabad",text:"Running 3 branches from one screen. Analytics tell me exactly which class needs attention. Brilliant."},
  ]

  const anim=(delay)=>({ animation:vis?`fadeUp .7s ${delay}s ease both`:"none", opacity:vis?undefined:0 })

  return (
    <div style={{background:C.bg,color:C.text,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh"}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,height:66,
        display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 5%",
        background:scrolled?"rgba(4,6,13,.92)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?`1px solid ${C.border}`:"none",transition:"all .3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:9,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,boxShadow:`0 0 14px ${C.blue}55`}}>🎓</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:900,letterSpacing:-.5}}>EduFlow</span>
          <span style={{background:`${C.blue}22`,color:C.blue2,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:999,border:`1px solid ${C.blue}33`}}>PRO</span>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {["Features","Pricing","Reviews"].map(l=>(
            <button key={l} style={{background:"none",border:"none",color:C.text2,fontSize:13,fontWeight:600,cursor:"pointer",padding:"7px 12px",borderRadius:8}}>{l}</button>
          ))}
          <button className="btn-primary" style={{padding:"8px 18px",fontSize:13}} onClick={onOpenLock}>Login →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 5% 80px",position:"relative",overflow:"hidden"}}>
        <Particles/>
        <div style={{position:"absolute",top:"15%",left:"5%",width:600,height:500,borderRadius:"50%",background:`radial-gradient(circle,${C.blue}07 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"5%",right:"5%",width:450,height:400,borderRadius:"50%",background:`radial-gradient(circle,${C.purple}06 0%,transparent 65%)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:860,textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.blue}12`,border:`1px solid ${C.blue}28`,borderRadius:999,padding:"6px 16px",marginBottom:28,...anim(0)}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block",boxShadow:`0 0 8px ${C.green}`}}/>
            <span style={{fontSize:12,fontWeight:700,color:C.blue2,letterSpacing:.5}}>TRUSTED BY 1,200+ ACADEMIES IN PAKISTAN</span>
          </div>

          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2.8rem,6.5vw,5rem)",fontWeight:900,lineHeight:1.05,letterSpacing:-2,marginBottom:22,...anim(.15)}}>
            The Academy That<br/>
            <Typewriter words={["Runs Itself.","Never Misses a Fee.","Knows Every Student.","Works 24/7 for You."]}/>
          </h1>

          <p style={{fontSize:"clamp(.95rem,2.2vw,1.2rem)",color:C.text2,maxWidth:600,margin:"0 auto 36px",lineHeight:1.78,...anim(.3)}}>
            EduFlow automates everything your academy needs — student records, fees, attendance, parent communication and reports. Built for Pakistan, trusted worldwide.
          </p>

          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",...anim(.45)}}>
            <button className="btn-primary" style={{fontSize:15,padding:"14px 30px"}} onClick={onOpenLock}>🚀 Start Free Trial</button>
            <button className="btn-ghost" style={{fontSize:14}}>▶ Watch Demo</button>
          </div>

          <div style={{display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap",marginTop:40,...anim(.6)}}>
            {["✅ No credit card","🔒 Bank-grade SSL","⚡ 5-min setup","🌍 40+ countries"].map(t=>(
              <span key={t} style={{color:C.text3,fontSize:13}}>{t}</span>
            ))}
          </div>

          {/* Dashboard preview */}
          <div style={{marginTop:60,...anim(.75)}}>
            <div style={{background:C.card,border:`1px solid ${C.border2}`,borderRadius:20,overflow:"hidden",boxShadow:"0 40px 100px #000000aa",position:"relative"}}>
              <div style={{position:"absolute",left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.blue}55,transparent)`,animation:"scanline 4s linear infinite",zIndex:2,pointerEvents:"none"}}/>
              <div style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"11px 16px",display:"flex",alignItems:"center",gap:8}}>
                {["#ff5f57","#ffbd2e","#28c840"].map(c=><div key={c} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
                <div style={{flex:1,background:C.border,borderRadius:5,padding:"3px 10px",fontSize:11,color:C.text3,marginLeft:8,textAlign:"left"}}>app.eduflowapp.com/dashboard</div>
              </div>
              <div style={{padding:18,textAlign:"left"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                  {[{v:"500",l:"Students",c:C.blue},{v:"Rs.1.2M",l:"Collected",c:C.green},{v:"91%",l:"Attendance",c:C.yellow},{v:"3.8",l:"Avg GPA",c:C.purple}].map(s=>(
                    <div key={s.l} style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 13px",borderTop:`2px solid ${s.c}`}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:900,color:s.c}}>{s.v}</div>
                      <div style={{fontSize:10,color:C.text3,marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:9,padding:13}}>
                    <div style={{fontSize:10,color:C.text3,fontWeight:700,marginBottom:8}}>FEE COLLECTION</div>
                    {clsStats.slice(0,3).map(c=>(
                      <div key={c.name} style={{marginBottom:7}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                          <span style={{color:C.text2}}>{c.name}</span>
                          <span style={{color:C.green,fontWeight:700}}>{Math.round(c.paid/(c.total||1)*100)}%</span>
                        </div>
                        <Bar val={c.paid} max={c.total||1} color={C.green} h={3}/>
                      </div>
                    ))}
                  </div>
                  <div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:9,padding:13}}>
                    <div style={{fontSize:10,color:C.text3,fontWeight:700,marginBottom:8}}>LIVE ACTIVITY</div>
                    {[{t:"Fee received — Ali Khan",c:C.green,a:"2m"},{t:"Sara Malik absent today",c:C.red,a:"14m"},{t:"Class 10-A test added",c:C.blue,a:"1h"}].map(a=>(
                      <div key={a.t} style={{display:"flex",gap:8,marginBottom:9,alignItems:"center"}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:a.c,flexShrink:0}}/>
                        <span style={{fontSize:11,color:C.text2,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.t}</span>
                        <span style={{fontSize:10,color:C.text3}}>{a.a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,background:C.bg2,padding:"44px 5%"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:28}}>
          {[{n:12000,s:"+",l:"Academies Worldwide"},{n:1400000,s:"+",l:"Students Managed"},{n:99,s:".9%",l:"Uptime SLA"},{n:847,s:"★",l:"5-Star Reviews"}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.4rem",fontWeight:900,color:C.blue2,letterSpacing:-1.5}}><Counter to={s.n} suffix={s.s}/></div>
              <div style={{color:C.text3,fontSize:13,marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{padding:"100px 5%",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div style={{display:"inline-block",background:`${C.blue}12`,border:`1px solid ${C.blue}25`,borderRadius:999,padding:"5px 14px",fontSize:11,fontWeight:700,color:C.blue2,letterSpacing:1,marginBottom:14}}>FEATURES</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,3rem)",fontWeight:900,letterSpacing:-1.5,lineHeight:1.1,marginBottom:14}}>Everything Your Academy Will Ever Need</h2>
          <p style={{color:C.text2,fontSize:"1.05rem",maxWidth:520,margin:"0 auto",lineHeight:1.75}}>From first admission to final result — one platform, zero headaches.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
          {features.map(f=>(
            <div key={f.title} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,marginBottom:10,letterSpacing:-.3}}>{f.title}</h3>
              <p style={{color:C.text2,fontSize:14,lineHeight:1.78}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPAL SPOTLIGHT */}
      <section style={{padding:"90px 5%",background:C.bg2,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-block",background:`${C.purple}15`,border:`1px solid ${C.purple}30`,borderRadius:999,padding:"5px 14px",fontSize:11,fontWeight:700,color:C.purple,letterSpacing:1,marginBottom:18}}>PRINCIPAL ACCESS</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,3.5vw,2.7rem)",fontWeight:900,letterSpacing:-1.2,lineHeight:1.1,marginBottom:16}}>
              Total Control.<br/><span style={{color:C.purple}}>Just For You.</span>
            </h2>
            <p style={{color:C.text2,fontSize:15,lineHeight:1.8,marginBottom:24}}>A private PIN-protected dashboard only the Principal can access. See everything in real time.</p>
            {["Fee status of every student in every class","Today's absentee list with guardian contacts","Class-wise GPA and performance comparison","Staff attendance and salary overview","AI assistant for instant academy insights"].map(p=>(
              <div key={p} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:11}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:`${C.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:C.purple}}/>
                </div>
                <span style={{color:C.text2,fontSize:14}}>{p}</span>
              </div>
            ))}
            <button className="btn-primary" style={{marginTop:22,background:C.purple,boxShadow:`0 8px 24px ${C.purple}44`}} onClick={onOpenLock}>Try Principal Dashboard →</button>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
              <div style={{width:34,height:34,borderRadius:9,background:C.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>👑</div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800}}>Principal Command Center</div>
                <div style={{color:C.text3,fontSize:11}}>PIN Protected · Private Access</div>
              </div>
            </div>
            {clsStats.map(c=>(
              <div key={c.name} style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 13px",marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                  <span style={{fontWeight:700,fontSize:13}}>{c.name}</span>
                  <div style={{display:"flex",gap:6}}>
                    <Badge c={C.green} sm>{c.paid}/{c.total} paid</Badge>
                    <Badge c={c.absent>3?C.red:C.yellow} sm>{c.absent} absent</Badge>
                  </div>
                </div>
                <Bar val={c.paid} max={c.total||1} color={C.purple} h={4}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:"90px 5%",maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.8rem)",fontWeight:900,letterSpacing:-1.5,marginBottom:12}}>Simple, Honest Pricing</h2>
          <p style={{color:C.text2,fontSize:"1.05rem"}}>No hidden fees. Cancel anytime. Start free.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {[
            {name:"Starter",price:"Free",sub:"Forever",color:C.text2,features:["1 Class","20 Students","Basic Attendance","Fee Tracking","Email Support"]},
            {name:"Basic",price:"$9",sub:"/month",color:C.blue,popular:true,features:["5 Classes","100 Students","Full Attendance","Fee Reminders","Parent Portal","Analytics","Priority Support"]},
            {name:"Pro",price:"$25",sub:"/month",color:C.purple,features:["Unlimited Classes","Unlimited Students","SMS + WhatsApp","PDF Reports","Custom Branding","API Access","24/7 Support"]},
          ].map(p=>(
            <div key={p.name} style={{background:C.card,border:`1.5px solid ${p.popular?p.color:C.border}`,borderRadius:18,padding:28,position:"relative",boxShadow:p.popular?`0 0 40px ${p.color}18`:undefined}}>
              {p.popular&&<div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:p.color,color:"#fff",fontSize:11,fontWeight:800,padding:"4px 16px",borderRadius:999,whiteSpace:"nowrap"}}>⭐ Most Popular</div>}
              <div style={{color:p.color,fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,letterSpacing:.5,marginBottom:8}}>{p.name.toUpperCase()}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.4rem",fontWeight:900,color:p.price==="Free"?C.text:p.color,letterSpacing:-1.5,lineHeight:1}}>{p.price}</div>
              <div style={{color:C.text3,fontSize:13,marginBottom:22}}>{p.sub}</div>
              <ul style={{listStyle:"none",marginBottom:24}}>
                {p.features.map(f=>(
                  <li key={f} style={{display:"flex",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.text2}}>
                    <span style={{color:C.green,fontWeight:700,fontSize:12}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className={p.popular?"btn-primary":"btn-ghost"} style={{width:"100%",background:!p.popular?undefined:p.color,borderColor:!p.popular?p.color:undefined,color:!p.popular?p.color:undefined}} onClick={onOpenLock}>
                {p.price==="Free"?"Get Started Free":"Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"90px 5%",background:C.bg2,borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.8rem)",fontWeight:900,letterSpacing:-1.5,marginBottom:12}}>Loved by 12,000+ Academies</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {testimonials.map(t=>(
              <div key={t.name} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:26,transition:"all .3s"}}>
                <div style={{color:C.yellow,fontSize:15,letterSpacing:3,marginBottom:14}}>★★★★★</div>
                <p style={{color:C.text2,fontSize:14,lineHeight:1.78,fontStyle:"italic",marginBottom:20}}>"{t.text}"</p>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:`${C.blue}20`,color:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{t.name[0]}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{t.name}</div>
                    <div style={{color:C.text3,fontSize:12}}>{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"90px 5%",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:400,background:`radial-gradient(ellipse,${C.blue}08 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,5vw,3.8rem)",fontWeight:900,letterSpacing:-2,marginBottom:14,position:"relative"}}>Ready to Transform<br/>Your Academy?</h2>
        <p style={{color:C.text2,fontSize:"1.1rem",marginBottom:36,position:"relative"}}>Join 12,000+ academies. Free forever plan available.</p>
        <button className="btn-primary" style={{fontSize:16,padding:"15px 36px",animation:"glow 3s infinite",position:"relative"}} onClick={onOpenLock}>🎓 Get Started Free →</button>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${C.border}`,background:C.bg,padding:"32px 5%",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,borderRadius:7,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🎓</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14}}>EduFlow</span>
          <span style={{color:C.text3,fontSize:12}}>© 2026 All rights reserved</span>
        </div>
        <div style={{display:"flex",gap:18}}>
          {["Privacy","Terms","Contact"].map(l=><span key={l} style={{color:C.text3,fontSize:13,cursor:"pointer"}}>{l}</span>)}
        </div>
      </footer>
    </div>
  )
}
