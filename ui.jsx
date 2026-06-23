import { useEffect } from 'react'
import { C } from './data'

export function Badge({ c=C.blue, children, sm }) {
  return (
    <span style={{background:`${c}18`,color:c,border:`1px solid ${c}30`,borderRadius:999,
      padding:sm?"1px 8px":"3px 10px",fontSize:sm?10:12,fontWeight:700,
      display:"inline-block",whiteSpace:"nowrap"}}>{children}</span>
  )
}

export function Av({ name, size=32, col }) {
  const cols=[C.blue,C.purple,C.green,C.cyan,C.yellow,C.pink]
  const c=col||cols[(name.charCodeAt(0)+(name.charCodeAt(1)||0))%cols.length]
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`${c}20`,color:c,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontWeight:800,fontSize:size*.38,flexShrink:0,border:`1.5px solid ${c}30`}}>{name[0]}</div>
  )
}

export function Bar({ val, max=100, color=C.blue, h=5 }) {
  return (
    <div style={{background:C.border2,borderRadius:999,height:h,overflow:"hidden"}}>
      <div style={{width:`${Math.min(100,(val/max)*100)}%`,height:"100%",
        background:color,borderRadius:999,transition:"width .6s ease"}}/>
    </div>
  )
}

export function StatBox({ icon, label, value, sub, color=C.blue, trend }) {
  return (
    <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,
      padding:"16px 18px",flex:1,minWidth:150,borderTop:`2px solid ${color}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <span style={{fontSize:22}}>{icon}</span>
        {trend && <span style={{fontSize:11,color:trend>0?C.green:C.red,fontWeight:700}}>{trend>0?"▲":"▼"}{Math.abs(trend)}%</span>}
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:900,color,marginTop:8,letterSpacing:-1}}>{value}</div>
      <div style={{color:C.text2,fontSize:12,marginTop:2}}>{label}</div>
      {sub&&<div style={{color:C.text3,fontSize:11,marginTop:2}}>{sub}</div>}
    </div>
  )
}

export function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{position:"fixed",inset:0,background:"#000000cc",zIndex:4000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16,
      backdropFilter:"blur(8px)"}} onClick={onClose}>
      <div style={{background:C.card2,border:`1px solid ${C.border2}`,borderRadius:20,
        padding:28,width:"100%",maxWidth:wide?680:460,maxHeight:"90vh",overflowY:"auto",
        animation:"slideUp .3s ease"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:900}}>{title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.text2,fontSize:22,cursor:"pointer"}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Toast({ msg, color, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone,3000); return()=>clearTimeout(t); },[onDone])
  return (
    <div style={{position:"fixed",bottom:24,right:24,background:C.card2,
      border:`1px solid ${color}44`,borderLeft:`4px solid ${color}`,
      color:C.text,borderRadius:12,padding:"13px 20px",fontSize:13,fontWeight:600,
      zIndex:9999,boxShadow:"0 8px 32px #00000099",animation:"slideUp .3s ease"}}>{msg}</div>
  )
}
