export const FIRST = ["Ali","Sara","Usman","Fatima","Bilal","Ayesha","Hassan","Zainab","Omar","Hira","Ahmed","Noor","Tariq","Sana","Kamran","Mehwish","Hamza","Rabia","Asad","Sadia","Faisal","Amna","Waqas","Huma","Naveed"];
export const LAST  = ["Khan","Ahmed","Ali","Hassan","Malik","Qureshi","Hussain","Shah","Akhtar","Mirza","Sheikh","Butt","Chaudhry","Siddiqui","Ansari"];
export const CLASSES = ["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12","O-Level","A-Level"];
export const SECS = ["A","B","C","D"];
export const STAFF_ROLES = ["Teacher","Senior Teacher","HOD","Lab Instructor","Admin","Accountant","Coordinator","Counselor"];

function rng(seed){ let s=seed; return ()=>{ s=(s*1664525+1013904223)&0xffffffff; return (s>>>0)/0xffffffff; }; }

export function makeStudents(n=500) {
  const r = rng(42);
  return Array.from({length:n}, (_,i) => {
    const fn = FIRST[Math.floor(r()*FIRST.length)];
    const ln = LAST[Math.floor(r()*LAST.length)];
    const cls = CLASSES[Math.floor(r()*CLASSES.length)];
    const sec = SECS[Math.floor(r()*SECS.length)];
    const fee = [2500,3000,3500,4000,4500,5000][Math.floor(r()*6)];
    return {
      id: i+1, name:`${fn} ${ln}`, cls, sec, fee,
      paid: r()>0.35, att: 55+Math.floor(r()*45),
      todayAbsent: r()>0.83, gpa: +(2+r()*2).toFixed(1),
      guardian: `${FIRST[Math.floor(r()*FIRST.length)]} ${ln}`,
      phone: `03${Math.floor(r()*9+1)}${String(Math.floor(r()*1e8)).padStart(8,"0")}`,
      rollNo: `${cls.replace(/\s/,"")}-${sec}-${String(i%60+1).padStart(3,"0")}`,
      joinDate: `202${Math.floor(r()*4)+1}-${String(Math.floor(r()*12)+1).padStart(2,"0")}-${String(Math.floor(r()*28)+1).padStart(2,"0")}`,
    };
  });
}

export const C = {
  bg:"#04060d", bg2:"#060b14", card:"#080e1c", card2:"#0a1220",
  border:"#0f1c2e", border2:"#1c2d4a",
  blue:"#1d6ef5", blue2:"#4f8ef7",
  green:"#00c97a", red:"#ff3b5c", yellow:"#ffbb00",
  purple:"#8b5cf6", cyan:"#00cfff", pink:"#f472b6",
  text:"#e8f0fe", text2:"#7a93b8", text3:"#2a4060",
};

export const PINS = { admin:"0000", principal:"1234", teacher:"5678" };
