import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef()
  useEffect(()=>{
    const cvs=ref.current; if(!cvs) return
    const ctx=cvs.getContext("2d")
    let W=cvs.width=cvs.offsetWidth, H=cvs.height=cvs.offsetHeight
    const pts=Array.from({length:55},()=>({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      r:Math.random()*1.4+.4,a:Math.random()*.3+.08,
    }))
    let af
    const draw=()=>{
      ctx.clearRect(0,0,W,H)
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>W)p.vx*=-1
        if(p.y<0||p.y>H)p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(29,110,245,${p.a})`; ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(29,110,245,${.07*(1-d/110)})`;ctx.stroke()}
      }
      af=requestAnimationFrame(draw)
    }
    draw()
    const ro=new ResizeObserver(()=>{W=cvs.width=cvs.offsetWidth;H=cvs.height=cvs.offsetHeight})
    ro.observe(cvs)
    return()=>{cancelAnimationFrame(af);ro.disconnect()}
  },[])
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>
}
