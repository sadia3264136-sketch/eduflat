import { useState } from 'react'
import Particles from './Particles'
import { C, PINS } from './data'

const ROLES = [
  {k:"admin",     icon:"⚙️", label:"Admin",     color:C.blue},
  {k:"principal", icon:"👑", label:"Principal", color:C.purple},
  {k:"teacher",   icon:"📚", label:"Teacher",   color:C.green},
]

export default function LockScreen({ onUnlock }) {
  const [role,setRole]=useState("admin")
  const [pin,setPin]=useState("")
  const [shake,setShake]=useState(false)
  const [hint,setHint]=useState("")
  const rc=ROLES.find(r=>r.k===role)?.color||C.blue

  const handleKey=(k)=>{
    if(pin.length>=4) return
    const next=pin+k; setPin(next)
    if(next.length===4){
      setTimeout(()=>{
        if(PINS[role]===next){onUnlock(role)}
        else{setShake(true);setPin("");setHint("Wrong PIN — try again");setTimeout(()=>setShake(false),500)}
      },200)
    }
  }

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <Particles/>
      <div style={{position:"absolute",top:"20%",left:"10%",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${rc}07 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1,width:380,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:54,height:54,borderRadius:16,background:rc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px",boxShadow:`0 0 28px ${rc}55`,animation:"glow 3s infinite"}}>🎓</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,color:C.text,letterSpacing:-.5}}>EduFlow</div>
          <div style={{color:C.text3,fontSize:12,marginTop:2}}>Academy Management System</div>
        </div>

        <div style={{background:C.card2,border:`1px solid ${C.border2}`,borderRadius:22,padding:28,boxShadow:"0 20px 60px #00000088"}}>
          <div style={{display:"flex",gap:6,marginBottom:22,padding:4,background:C.bg2,borderRadius:12}}>
            {ROLES.map(r=>(
              <button key={r.k} onClick={()=>{setRole(r.k);setPin("");setHint("")}} style={{
                flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                background:role===r.k?`${r.color}22`:"transparent",
                color:role===r.k?r.color:C.text3,fontWeight:700,fontSize:12,transition:"all .2s"}}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <div style={{background:C.bg2,border:`1px solid ${shake?C.red:C.border2}`,borderRadius:12,
            padding:"16px 20px",textAlign:"center",marginBottom:16,minHeight:56,
            animation:shake?"shake .4s ease":"none",transition:"border-color .3s"}}>
            {pin.length>0
              ? <div style={{display:"flex",gap:12,justifyContent:"center",alignItems:"center"}}>
                  {Array.from({length:4},(_,i)=>(
                    <div key={i} style={{width:12,height:12,borderRadius:"50%",
                      background:i<pin.length?rc:C.border2,
                      transition:"all .15s",transform:i<pin.length?"scale(1.2)":"scale(1)"}}/>
                  ))}
                </div>
              : <span style={{color:C.text3,fontSize:13}}>Enter PIN to access dashboard</span>
            }
          </div>

          {hint&&<div style={{textAlign:"center",color:C.red,fontSize:12,fontWeight:600,marginBottom:14}}>{hint}</div>}

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
            {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i)=>(
              <button key={i} className="pin-key" disabled={k===""} onClick={()=>{
                if(k==="⌫")setPin(p=>p.slice(0,-1))
                else handleKey(String(k))
              }} style={{background:k===""?"transparent":undefined}}>{k===""?"":k}</button>
            ))}
          </div>

          <div style={{padding:"12px 14px",background:C.bg2,borderRadius:10,border:`1px solid ${C.border}`}}>
            <div style={{color:C.text3,fontSize:11,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Demo PINs</div>
            {ROLES.map(r=>(
              <div key={r.k} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                <span style={{color:C.text2}}>{r.icon} {r.label}</span>
                <code style={{color:r.color,fontWeight:700}}>{PINS[r.k]}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
