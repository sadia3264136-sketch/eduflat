import { useState, useEffect, useRef } from 'react'
import { Badge, Av, Bar, StatBox, Modal, Toast } from './ui'
import { C, CLASSES, makeStudents } from './data'

const STUDENTS = makeStudents(500)
const PG = 40

export default function Dashboard({ role, onLogout }) {
  const [tab,setTab]           = useState("overview")
  const [search,setSearch]     = useState("")
  const [filterCls,setFilterCls] = useState("All")
  const [filterFee,setFilterFee] = useState("All")
  const [page,setPage]         = useState(0)
  const [modal,setModal]       = useState(null)
  const [selSt,setSelSt]       = useState(null)
  const [toast,setToast]       = useState(null)
  const [students,setStudents] = useState(STUDENTS)
  const [aiMsgs,setAiMsgs]     = useState([{role:"assistant",text:"Hi! I am your AI Academy Assistant 🎓\n\nAsk me anything — fee stats, attendance, top students, alerts, or any insight from your live academy data."}])
  const [aiInput,setAiInput]   = useState("")
  const [aiLoading,setAiLoading] = useState(false)
  const aiEnd = useRef()

  const isPrincipal = role==="principal"
  const isTeacher   = role==="teacher"
  const rc = isPrincipal?C.purple:isTeacher?C.green:C.blue

  const totalFee  = students.reduce((a,s)=>a+s.fee,0)
  const collected = students.filter(s=>s.paid).reduce((a,s)=>a+s.fee,0)
  const absent    = students.filter(s=>s.todayAbsent).length
  const lowAtt    = students.filter(s=>s.att<75).length
  const feeDue    = students.filter(s=>!s.paid).length
  const avgGPA    = (students.reduce((a,s)=>a+s.gpa,0)/students.length).toFixed(2)

  const clsStats = CLASSES.map(c=>{
    const ss=students.filter(s=>s.cls===c)
    return{name:c,total:ss.length,paid:ss.filter(s=>s.paid).length,absent:ss.filter(s=>s.todayAbsent).length,
      avgAtt:ss.length?Math.round(ss.reduce((a,s)=>a+s.att,0)/ss.length):0,
      avgGpa:ss.length?(ss.reduce((a,s)=>a+s.gpa,0)/ss.length).toFixed(1):0,
      revenue:ss.filter(s=>s.paid).reduce((a,s)=>a+s.fee,0)}
  })

  const filtered = students.filter(s=>{
    const q=search.toLowerCase()
    const mq=!q||s.name.toLowerCase().includes(q)||s.rollNo.toLowerCase().includes(q)||s.phone.includes(q)||s.guardian.toLowerCase().includes(q)
    const mc=filterCls==="All"||s.cls===filterCls
    const mf=filterFee==="All"||(filterFee==="Paid"?s.paid:!s.paid)
    return mq&&mc&&mf
  })
  const pageData=filtered.slice(page*PG,(page+1)*PG)
  const pages=Math.ceil(filtered.length/PG)

  useEffect(()=>setPage(0),[search,filterCls,filterFee,tab])
  useEffect(()=>aiEnd.current?.scrollIntoView({behavior:"smooth"}),[aiMsgs])

  const showToast=(msg,color=C.green)=>setToast({msg,color})
  const togglePaid=(id)=>{setStudents(p=>p.map(s=>s.id===id?{...s,paid:!s.paid}:s));showToast("Fee status updated!")}

  const sendAI=async()=>{
    if(!aiInput.trim()||aiLoading) return
    const msg=aiInput.trim(); setAiInput(""); setAiLoading(true)
    setAiMsgs(p=>[...p,{role:"user",text:msg}])
    const ctx=`You are an AI assistant for EduFlow Academy. LIVE DATA: Students:${students.length}, Collected:Rs.${collected.toLocaleString()}, Pending:Rs.${(totalFee-collected).toLocaleString()}, Absent:${absent}, LowAtt:${lowAtt}, FeeDue:${feeDue}, AvgGPA:${avgGPA}. Answer helpfully and concisely.`
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,system:ctx,
          messages:[...aiMsgs.filter((_,i)=>i>0).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text})),{role:"user",content:msg}]})})
      const d=await res.json()
      setAiMsgs(p=>[...p,{role:"assistant",text:d.content?.[0]?.text||"Try again."}])
    } catch { setAiMsgs(p=>[...p,{role:"assistant",text:"Connection error. Please try again."}]) }
    setAiLoading(false)
  }

  const NAV=[
    {k:"overview",i:"⬡",l:"Overview"},
    {k:"students",i:"👤",l:"Students",cnt:students.length},
    ...(!isTeacher?[{k:"fees",i:"💰",l:"Fees",cnt:feeDue,cc:C.red}]:[]),
    {k:"attendance",i:"📋",l:"Attendance",cnt:absent,cc:C.yellow},
    ...(isPrincipal?[{k:"classes",i:"📚",l:"Classes"},{k:"reports",i:"📊",l:"Reports"}]:[]),
    {k:"ai",i:"✦",l:"AI Assistant",glow:true},
  ]

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans',sans-serif",display:"flex"}}>

      {/* SIDEBAR */}
      <aside style={{width:216,background:C.bg2,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div style={{padding:"18px 14px 13px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:9,background:rc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:`0 0 12px ${rc}44`}}>🎓</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:900,letterSpacing:-.3}}>EduFlow</div>
            <div style={{color:C.text3,fontSize:10,marginTop:1,textTransform:"capitalize"}}>{role} Panel</div>
          </div>
        </div>
        <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
          {NAV.map(n=>(
            <button key={n.k} onClick={()=>setTab(n.k)} style={{
              display:"flex",alignItems:"center",gap:10,width:"100%",
              background:tab===n.k?`${rc}18`:"transparent",
              border:tab===n.k?`1px solid ${rc}30`:"1px solid transparent",
              color:tab===n.k?rc:C.text2,borderRadius:9,padding:"10px 11px",cursor:"pointer",
              fontWeight:tab===n.k?700:500,fontSize:13,marginBottom:3,textAlign:"left",transition:"all .15s"}}>
              <span style={{fontSize:15,filter:n.glow?`drop-shadow(0 0 4px ${rc})`:"none"}}>{n.i}</span>
              <span style={{flex:1}}>{n.l}</span>
              {n.cnt>0&&<span style={{background:`${n.cc||rc}25`,color:n.cc||rc,fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:99}}>
                {n.cnt>999?`${(n.cnt/1000).toFixed(1)}k`:n.cnt}</span>}
            </button>
          ))}
        </nav>
        <div style={{padding:10,borderTop:`1px solid ${C.border}`}}>
          <button onClick={onLogout} style={{width:"100%",background:"transparent",border:`1px solid ${C.border2}`,color:C.text3,borderRadius:8,padding:"8px",cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border2;e.currentTarget.style.color=C.text3}}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <header style={{background:`${C.bg2}ee`,borderBottom:`1px solid ${C.border}`,padding:"11px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:100,flexShrink:0}}>
          <div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:900,letterSpacing:-.3}}>{NAV.find(n=>n.k===tab)?.i} {NAV.find(n=>n.k===tab)?.l}</h1>
            <div style={{color:C.text3,fontSize:11,marginTop:1}}>{new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{background:`${C.red}15`,border:`1px solid ${C.red}30`,borderRadius:999,padding:"4px 11px",fontSize:11,fontWeight:700,color:C.red}}>🚨 {absent} absent</div>
            <Av name={role==="principal"?"Principal":role==="teacher"?"Teacher":"Admin"} size={30} col={rc}/>
          </div>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:20}}>

          {/* OVERVIEW */}
          {tab==="overview"&&(
            <div style={{animation:"slideUp .4s ease"}}>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
                <StatBox icon="👤" label="Students" value={students.length.toLocaleString()} color={C.blue} trend={3} sub="Active enrollment"/>
                <StatBox icon="💰" label="Collected" value={`Rs.${(collected/1000).toFixed(0)}k`} color={C.green} trend={6} sub={`${Math.round(collected/totalFee*100)}% of total`}/>
                <StatBox icon="⏳" label="Pending" value={`Rs.${((totalFee-collected)/1000).toFixed(0)}k`} color={C.red} sub={`${feeDue} students`}/>
                <StatBox icon="📋" label="Absent Today" value={absent} color={C.yellow}/>
                <StatBox icon="⚠️" label="Low Att." value={lowAtt} color={C.red} sub="Below 75%"/>
                <StatBox icon="🎓" label="Avg GPA" value={avgGPA} color={C.cyan}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14}}>Fee by Class</h3>
                  {clsStats.slice(0,7).map(c=>(
                    <div key={c.name} style={{marginBottom:11}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                        <span style={{fontWeight:600}}>{c.name}</span>
                        <span style={{color:C.text3}}>{c.paid}/{c.total}</span>
                      </div>
                      <Bar val={c.paid} max={c.total||1} color={C.green} h={5}/>
                    </div>
                  ))}
                </div>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14}}>🚨 Live Alerts</h3>
                  {[{i:"💸",c:C.red,t:"Fee Defaulters",v:`${feeDue} students`},{i:"📵",c:C.yellow,t:"Absent Today",v:`${absent} students`},{i:"⚠️",c:C.red,t:"Low Attendance",v:`${lowAtt} students`},{i:"🏆",c:C.green,t:"Perfect Record",v:`${students.filter(s=>s.att===100&&s.paid).length} students`}].map(a=>(
                    <div key={a.t} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 13px",background:`${a.c}0a`,border:`1px solid ${a.c}20`,borderRadius:10,marginBottom:8}}>
                      <span style={{fontSize:18}}>{a.i}</span>
                      <div><div style={{fontSize:13,fontWeight:700,color:a.c}}>{a.t}</div><div style={{fontSize:12,color:C.text2}}>{a.v}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14}}>Class Overview — Click to View Students</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>
                  {clsStats.map(c=>(
                    <div key={c.name} style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"border-color .2s"}}
                      onClick={()=>{setFilterCls(c.name);setTab("students")}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=`${rc}55`}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,marginBottom:8}}>{c.name}</div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.text3}}>
                        <span>Fee {Math.round(c.paid/(c.total||1)*100)}%</span>
                        <span>Att {c.avgAtt}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {tab==="students"&&(
            <div style={{animation:"slideUp .4s ease"}}>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, roll no, guardian, phone..."
                  style={{background:C.card2,border:`1px solid ${C.border2}`,borderRadius:9,padding:"8px 13px",color:C.text,fontSize:13,outline:"none",width:280}}/>
                <select value={filterCls} onChange={e=>setFilterCls(e.target.value)} style={{background:C.card2,border:`1px solid ${C.border2}`,borderRadius:9,padding:"8px 11px",color:C.text,fontSize:13,outline:"none"}}>
                  <option>All</option>{CLASSES.map(c=><option key={c}>{c}</option>)}
                </select>
                <select value={filterFee} onChange={e=>setFilterFee(e.target.value)} style={{background:C.card2,border:`1px solid ${C.border2}`,borderRadius:9,padding:"8px 11px",color:C.text,fontSize:13,outline:"none"}}>
                  {["All","Paid","Unpaid"].map(o=><option key={o}>{o}</option>)}
                </select>
                <div style={{marginLeft:"auto",color:C.text3,fontSize:12}}><strong style={{color:C.text}}>{filtered.length.toLocaleString()}</strong> / {students.length.toLocaleString()}</div>
              </div>
              <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead>
                      <tr style={{borderBottom:`1px solid ${C.border}`}}>
                        {["#","Student","Roll No","Class","Guardian","Fee","Today","Att.","GPA",""].map(h=>(
                          <th key={h} style={{padding:"10px 12px",textAlign:"left",color:C.text3,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((s,i)=>(
                        <tr key={s.id} className="row-hover" style={{borderBottom:`1px solid ${C.border}15`}}>
                          <td style={{padding:"9px 12px",color:C.text3,fontSize:11}}>{page*PG+i+1}</td>
                          <td style={{padding:"9px 12px"}}><div style={{display:"flex",alignItems:"center",gap:8}}><Av name={s.name} size={28}/><span style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap"}}>{s.name}</span></div></td>
                          <td style={{padding:"9px 12px",fontSize:11,color:C.text2,fontFamily:"monospace"}}>{s.rollNo}</td>
                          <td style={{padding:"9px 12px"}}><Badge c={C.purple} sm>{s.cls}-{s.sec}</Badge></td>
                          <td style={{padding:"9px 12px"}}><div style={{fontSize:12,color:C.text2,whiteSpace:"nowrap"}}>{s.guardian}</div><div style={{fontSize:11,color:C.text3,fontFamily:"monospace"}}>{s.phone}</div></td>
                          <td style={{padding:"9px 12px"}}><div style={{fontSize:12,fontWeight:700}}>Rs.{s.fee.toLocaleString()}</div><Badge c={s.paid?C.green:C.red} sm>{s.paid?"Paid":"Due"}</Badge></td>
                          <td style={{padding:"9px 12px"}}><Badge c={s.todayAbsent?C.red:C.green} sm>{s.todayAbsent?"Absent":"Present"}</Badge></td>
                          <td style={{padding:"9px 12px",minWidth:80}}><div style={{fontSize:11,fontWeight:700,marginBottom:3,color:s.att>=85?C.green:s.att>=70?C.yellow:C.red}}>{s.att}%</div><Bar val={s.att} h={3}/></td>
                          <td style={{padding:"9px 12px",fontSize:12,fontWeight:700,color:s.gpa>=3.5?C.green:s.gpa>=2.5?C.yellow:C.red}}>{s.gpa}</td>
                          <td style={{padding:"9px 12px"}}>
                            <div style={{display:"flex",gap:4}}>
                              <button onClick={()=>{setSelSt(s);setModal("st")}} style={{background:`${rc}18`,border:`1px solid ${rc}33`,color:rc,borderRadius:7,padding:"3px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>View</button>
                              {!isTeacher&&<button onClick={()=>togglePaid(s.id)} style={{background:`${s.paid?C.red:C.green}12`,border:`1px solid ${s.paid?C.red:C.green}33`,color:s.paid?C.red:C.green,borderRadius:7,padding:"3px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{s.paid?"✕":"✓"}</button>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{color:C.text3,fontSize:12}}>Page {page+1} of {pages}</div>
                  <div style={{display:"flex",gap:5}}>
                    <button disabled={page===0} onClick={()=>setPage(p=>p-1)} style={{background:"transparent",border:`1px solid ${C.border2}`,color:C.text2,borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer",opacity:page===0?.4:1}}>Prev</button>
                    {Array.from({length:Math.min(5,pages)},(_,i)=>{const pg=Math.max(0,page-2)+i;if(pg>=pages)return null;return <button key={pg} onClick={()=>setPage(pg)} style={{background:pg===page?rc:"transparent",border:`1px solid ${pg===page?rc:C.border2}`,color:pg===page?"#fff":C.text2,borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer"}}>{pg+1}</button>})}
                    <button disabled={page>=pages-1} onClick={()=>setPage(p=>p+1)} style={{background:"transparent",border:`1px solid ${C.border2}`,color:C.text2,borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer",opacity:page>=pages-1?.4:1}}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEES */}
          {tab==="fees"&&(
            <div style={{animation:"slideUp .4s ease"}}>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
                <StatBox icon="💵" label="Total Expected" value={`Rs.${(totalFee/1000).toFixed(0)}k`} color={C.blue}/>
                <StatBox icon="✅" label="Collected" value={`Rs.${(collected/1000).toFixed(0)}k`} color={C.green} trend={5} sub={`${Math.round(collected/totalFee*100)}%`}/>
                <StatBox icon="⏳" label="Pending" value={`Rs.${((totalFee-collected)/1000).toFixed(0)}k`} color={C.red} sub={`${feeDue} students`}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14}}>Revenue by Class</h3>
                  {clsStats.sort((a,b)=>b.revenue-a.revenue).map(c=>(
                    <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:76,fontSize:12,fontWeight:600}}>{c.name}</div>
                      <div style={{flex:1}}><Bar val={c.paid} max={c.total||1} color={C.green} h={6}/></div>
                      <div style={{width:64,textAlign:"right",fontSize:12,fontWeight:700,color:C.green}}>Rs.{(c.revenue/1000).toFixed(0)}k</div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14,color:C.red}}>Top Defaulters</h3>
                  {students.filter(s=>!s.paid).slice(0,10).map(s=>(
                    <div key={s.id} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}15`,cursor:"pointer"}} onClick={()=>{setSelSt(s);setModal("st")}}>
                      <Av name={s.name} size={28} col={C.red}/>
                      <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{color:C.text3,fontSize:11}}>{s.cls}-{s.sec} · {s.phone}</div></div>
                      <div style={{fontWeight:800,color:C.red,fontSize:13}}>Rs.{s.fee.toLocaleString()}</div>
                      <button onClick={e=>{e.stopPropagation();togglePaid(s.id)}} style={{background:`${C.green}15`,border:`1px solid ${C.green}33`,color:C.green,borderRadius:7,padding:"3px 8px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Pay</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {tab==="attendance"&&(
            <div style={{animation:"slideUp .4s ease"}}>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
                <StatBox icon="✅" label="Present" value={(students.length-absent).toLocaleString()} color={C.green}/>
                <StatBox icon="❌" label="Absent Today" value={absent} color={C.red}/>
                <StatBox icon="⚠️" label="Below 75%" value={lowAtt} color={C.yellow}/>
                <StatBox icon="🏆" label="100% Attendance" value={students.filter(s=>s.att===100).length} color={C.cyan}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14}}>Absent by Class</h3>
                  {clsStats.sort((a,b)=>b.absent-a.absent).map(c=>(
                    <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:78,fontSize:12,fontWeight:600}}>{c.name}</div>
                      <div style={{flex:1}}><Bar val={c.absent} max={Math.max(...clsStats.map(x=>x.absent),1)} color={c.absent>4?C.red:C.yellow} h={6}/></div>
                      <Badge c={c.absent>4?C.red:C.yellow} sm>{c.absent}</Badge>
                    </div>
                  ))}
                </div>
                <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,marginBottom:14,color:C.red}}>Today Absentees</h3>
                  <div style={{overflowY:"auto",maxHeight:300}}>
                    {students.filter(s=>s.todayAbsent).map(s=>(
                      <div key={s.id} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}15`,cursor:"pointer"}} onClick={()=>{setSelSt(s);setModal("st")}}>
                        <Av name={s.name} size={26} col={C.red}/>
                        <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div><div style={{color:C.text3,fontSize:10}}>{s.cls}-{s.sec}</div></div>
                        <div style={{fontSize:11,color:C.text2,fontFamily:"monospace"}}>{s.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLASSES */}
          {tab==="classes"&&(
            <div style={{animation:"slideUp .4s ease",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
              {clsStats.map(c=>(
                <div key={c.name} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:20,cursor:"pointer",transition:"all .2s",borderTop:`3px solid ${rc}`}}
                  onClick={()=>{setFilterCls(c.name);setTab("students")}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 30px #00000066"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:900}}>{c.name}</h3><Badge c={rc}>{c.total}</Badge></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                    {[{l:"Fee Rate",v:`${Math.round(c.paid/(c.total||1)*100)}%`,c:C.green},{l:"Absent",v:c.absent,c:c.absent>3?C.red:C.yellow},{l:"Avg Att.",v:`${c.avgAtt}%`,c:c.avgAtt>=80?C.green:C.yellow},{l:"Avg GPA",v:c.avgGpa,c:C.cyan}].map(x=>(
                      <div key={x.l} style={{background:C.bg2,borderRadius:8,padding:"9px 11px"}}><div style={{color:C.text3,fontSize:10}}>{x.l}</div><div style={{color:x.c,fontWeight:900,fontSize:17,fontFamily:"'Syne',sans-serif",marginTop:2}}>{x.v}</div></div>
                    ))}
                  </div>
                  <Bar val={c.paid} max={c.total||1} color={rc} h={5}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:C.text3}}><span>Rs.{(c.revenue/1000).toFixed(0)}k revenue</span><span style={{color:rc}}>View Students</span></div>
                </div>
              ))}
            </div>
          )}

          {/* REPORTS */}
          {tab==="reports"&&(
            <div style={{animation:"slideUp .4s ease"}}>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
                <StatBox icon="📈" label="Collection Rate" value={`${Math.round(collected/totalFee*100)}%`} color={C.green}/>
                <StatBox icon="💰" label="Avg Fee/Student" value={`Rs.${Math.round(totalFee/students.length).toLocaleString()}`} color={C.yellow}/>
              </div>
              <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800}}>Full Class Report</div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Class","Students","Paid","Due","Revenue","Att.","GPA","Status"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",color:C.text3,fontSize:10,fontWeight:700,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {clsStats.map(c=>(
                      <tr key={c.name} className="row-hover" style={{borderBottom:`1px solid ${C.border}15`,cursor:"pointer"}} onClick={()=>{setFilterCls(c.name);setTab("students")}}>
                        <td style={{padding:"10px 14px",fontWeight:700,fontSize:13}}>{c.name}</td>
                        <td style={{padding:"10px 14px",fontSize:13}}>{c.total}</td>
                        <td style={{padding:"10px 14px"}}><Badge c={C.green} sm>{c.paid}</Badge></td>
                        <td style={{padding:"10px 14px"}}><Badge c={C.red} sm>{c.total-c.paid}</Badge></td>
                        <td style={{padding:"10px 14px",fontWeight:700,color:C.green,fontSize:13}}>Rs.{(c.revenue/1000).toFixed(0)}k</td>
                        <td style={{padding:"10px 14px",fontWeight:700,color:c.avgAtt>=80?C.green:C.yellow,fontSize:13}}>{c.avgAtt}%</td>
                        <td style={{padding:"10px 14px",fontWeight:700,color:c.avgGpa>=3?C.green:C.yellow,fontSize:13}}>{c.avgGpa}</td>
                        <td style={{padding:"10px 14px"}}><Badge c={c.avgAtt>=80&&c.paid/(c.total||1)>0.7?C.green:c.avgAtt>=70?C.yellow:C.red} sm>{c.avgAtt>=80&&c.paid/(c.total||1)>0.7?"Good":c.avgAtt>=70?"OK":"Needs Attention"}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI */}
          {tab==="ai"&&(
            <div style={{animation:"slideUp .4s ease",display:"flex",flexDirection:"column",height:"calc(100vh - 140px)"}}>
              <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:13,padding:"13px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:rc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 0 14px ${rc}44`}}>✦</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800}}>AI Academy Assistant</div>
                  <div style={{color:C.text3,fontSize:11}}>Powered by Claude · Live access to {students.length} student records</div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {["Fee summary","Who is absent?","Top students","Low GPA alert"].map(q=>(
                    <button key={q} onClick={()=>setAiInput(q)} style={{background:C.border,border:`1px solid ${C.border2}`,color:C.text2,borderRadius:999,padding:"4px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>{q}</button>
                  ))}
                </div>
              </div>
              <div style={{flex:1,overflowY:"auto",background:C.card2,border:`1px solid ${C.border}`,borderRadius:13,padding:16,marginBottom:12}}>
                {aiMsgs.map((m,i)=>(
                  <div key={i} style={{marginBottom:14,display:"flex",gap:10,flexDirection:m.role==="user"?"row-reverse":"row"}}>
                    <div style={{width:30,height:30,borderRadius:8,flexShrink:0,background:m.role==="user"?rc:C.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{m.role==="user"?"👤":"✦"}</div>
                    <div style={{maxWidth:"75%",background:m.role==="user"?`${rc}20`:C.bg2,border:`1px solid ${m.role==="user"?`${rc}44`:C.border}`,borderRadius:12,padding:"10px 13px",fontSize:13,lineHeight:1.72,whiteSpace:"pre-wrap",color:C.text}}>{m.text}</div>
                  </div>
                ))}
                {aiLoading&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:30,height:30,borderRadius:8,background:C.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✦</div><div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",fontSize:13,color:C.text3,animation:"pulse 1.2s infinite"}}>Thinking...</div></div>}
                <div ref={aiEnd}/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendAI()}}} placeholder="Ask anything about your academy..."
                  style={{flex:1,background:C.card2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:13,outline:"none"}}/>
                <button className="btn-primary" onClick={sendAI} disabled={aiLoading||!aiInput.trim()} style={{background:aiLoading||!aiInput.trim()?C.border:rc,padding:"12px 20px"}}>{aiLoading?"...":"Send"}</button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL */}
      {modal==="st"&&selSt&&(
        <Modal title="Student Profile" onClose={()=>setModal(null)} wide>
          <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:20}}>
            <Av name={selSt.name} size={56}/>
            <div style={{flex:1}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:900,marginBottom:8}}>{selSt.name}</h2>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <Badge c={C.purple}>{selSt.cls}-{selSt.sec}</Badge>
                <Badge c={selSt.paid?C.green:C.red}>{selSt.paid?"Fee Paid":"Fee Due"}</Badge>
                <Badge c={selSt.todayAbsent?C.red:C.green}>{selSt.todayAbsent?"Absent Today":"Present Today"}</Badge>
                <Badge c={selSt.att>=75?C.green:C.red}>Att. {selSt.att}%</Badge>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["Roll No",selSt.rollNo],["Guardian",selSt.guardian],["Phone",selSt.phone],["Join Date",selSt.joinDate],["Monthly Fee",`Rs. ${selSt.fee.toLocaleString()}`],["GPA",selSt.gpa]].map(([k,v])=>(
              <div key={k} style={{background:C.bg2,borderRadius:9,padding:"10px 13px"}}><div style={{color:C.text3,fontSize:11,marginBottom:3}}>{k}</div><div style={{fontWeight:700,fontSize:14}}>{v}</div></div>
            ))}
          </div>
          <div style={{marginBottom:16}}><div style={{color:C.text3,fontSize:11,marginBottom:6}}>Overall Attendance</div><Bar val={selSt.att} h={7}/></div>
          {!isTeacher&&<div style={{display:"flex",justifyContent:"flex-end"}}><button onClick={()=>{togglePaid(selSt.id);setModal(null)}} style={{background:`${selSt.paid?C.red:C.green}15`,border:`1px solid ${selSt.paid?C.red:C.green}33`,color:selSt.paid?C.red:C.green,borderRadius:9,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>{selSt.paid?"Mark Unpaid":"Mark Paid"}</button></div>}
        </Modal>
      )}

      {toast&&<Toast msg={toast.msg} color={toast.color} onDone={()=>setToast(null)}/>}
    </div>
  )
}
