import { useState, useEffect } from 'react'
import { C } from './data'

export function Typewriter({ words, speed=70 }) {
  const [idx,setIdx]=useState(0)
  const [chars,setChars]=useState(0)
  const [del,setDel]=useState(false)
  useEffect(()=>{
    const w=words[idx]
    if(!del&&chars<w.length){const t=setTimeout(()=>setChars(p=>p+1),speed);return()=>clearTimeout(t)}
    if(!del&&chars===w.length){const t=setTimeout(()=>setDel(true),2000);return()=>clearTimeout(t)}
    if(del&&chars>0){const t=setTimeout(()=>setChars(p=>p-1),35);return()=>clearTimeout(t)}
    if(del&&chars===0){setDel(false);setIdx(p=>(p+1)%words.length)}
  },[chars,del,idx,words,speed])
  return (
    <span style={{color:C.blue2}}>
      {words[idx].slice(0,chars)}
      <span style={{borderRight:`2px solid ${C.blue2}`,animation:"blink 1s infinite"}}/>
    </span>
  )
}

export function Counter({ to, prefix="", suffix="", dur=1400 }) {
  const [v,setV]=useState(0)
  useEffect(()=>{
    let cur=0; const step=to/70
    const t=setInterval(()=>{cur=Math.min(cur+step,to);setV(Math.floor(cur));if(cur>=to)clearInterval(t)},dur/70)
    return()=>clearInterval(t)
  },[to,dur])
  return <>{prefix}{v.toLocaleString()}{suffix}</>
}
