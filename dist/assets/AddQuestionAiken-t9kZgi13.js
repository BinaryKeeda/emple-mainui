import{r as A,j as e,I as N,C as E,d as b,B as v}from"./index-BEtsFFci.js";import{u as C}from"./index-CZZnGOdc.js";import{B as S}from"./Button-BMiHgxWN.js";function k(j){const x=j.split(/\r?\n/).map(s=>s.trim()).filter(s=>s.length>0),u=[];let l=[],n=[],m=1,d=0,h=null;const c=()=>{if(l.length===0)return;const s=l.join(`
`).trim();if(n.length>0){const r=n.filter(i=>i.isAnswer);if(r.length===0)throw new Error(`No ANSWER specified for question: "${s}"`);const p=r.length>1?"MSQ":"MCQ";u.push({question:s,category:p,marks:m,negative:d,options:n.map(i=>({text:i.text,isCorrect:i.isAnswer}))})}else h!==null&&u.push({question:s,category:"Text",marks:m,negative:d,answer:h});l=[],n=[],m=1,d=0,h=null};for(let s=0;s<x.length;s++){const r=x[s],p=r.match(/^([A-Z])\.\s+(.*)$/);if(p){n.push({key:p[1],text:p[2],isAnswer:!1});continue}const i=r.match(/^ANSWER:\s*(.+)$/i);if(i){const o=i[1].trim();n.length>0?o.split(",").map(g=>g.trim().charAt(0).toUpperCase()).forEach(g=>{const w=n.find(y=>y.key===g);if(!w)throw new Error(`Invalid ANSWER key: ${g} in question "${l.join(" ")}"`);w.isAnswer=!0}):h=o;continue}const t=r.match(/^MARKS:\s*([0-9]+(?:\.[0-9]+)?)$/i);if(t){m=parseFloat(t[1]);continue}const a=r.match(/^NEGATIVE:\s*(-?[0-9]+(?:\.[0-9]+)?)$/i);if(a){d=parseFloat(a[1]),c();continue}l.push(r)}return c(),u}function I({onSuccess:j,onError:x,setModalClose:u,id:l}){const[n,m]=A.useState(null),[d,h]=A.useState(!1),[c,s]=A.useState([]),{getRootProps:r,getInputProps:p}=C({onDropAccepted:async t=>{const a=t[0];m(a);try{const o=await a.text(),f=k(o,l);s(f)}catch(o){console.error(o),alert("Invalid Aiken format")}},onDropRejected:t=>{t.forEach(a=>{console.log(`${a.name} has an invalid MIME type.`)})},accept:{"text/plain":[".txt"]}}),i=async()=>{if(c.length){h(!0);try{const t=await b.post(`${v}/api/admin/quiz/add/questions`,{quizId:l,data:c},{headers:{"Content-Type":"application/json"},withCredentials:!0});j(),u(!0)}catch(t){x(),console.error(t)}finally{h(!1)}}};return e.jsx("div",{className:"h-screen w-screen bg-opacity-25 px-36 py-24 bg-black fixed top-0 left-0 z-[2099]",children:e.jsxs("div",{className:"rounded-md relative h-full w-full transition-all ease-linear duration-300 bg-white overflow-y-auto",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx(N,{onClick:()=>u(!0),children:e.jsx(E,{})})}),e.jsxs("div",{className:"mt-6 bg-green-50 border border-green-300 rounded-md p-4",children:[e.jsx("h2",{className:"text-base font-semibold mb-2",children:"Expected Aiken Format Example:"}),e.jsx("pre",{className:"bg-white text-xs rounded-md p-3 overflow-x-auto whitespace-pre-wrap",children:`What is the capital of France?
A. London
B. Berlin
C. Madrid
D. Paris
ANSWER: D
MARKS: 2
NEGATIVE: 0.5

Which of the following are fruits?
A. Apple
B. Carrot
C. Banana
D. Mango
ANSWER: A,C,D
MARKS: 3
NEGATIVE: 1

Define gravity.
ANSWER: Gravity is the force that attracts a body toward the center of the earth.
MARKS: 5
NEGATIVE: 0`})]}),e.jsxs("section",{className:"p-5 gap-5",children:[e.jsxs("div",{className:"p-10 cursor-pointer flex-1 flex justify-center border-dashed border-2 border-black",...r(),children:[e.jsx("input",{...p()}),n?e.jsx("small",{children:n.name}):e.jsx("small",{children:"Upload here (Only .txt in Aiken format)"})]}),c.length>0&&e.jsxs("div",{className:"mt-4 bg-gray-100 rounded-md p-4 max-h-[400px] overflow-y-auto",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Preview Questions:"}),e.jsx("ul",{className:"space-y-4 text-sm",children:c.map((t,a)=>e.jsxs("li",{className:"bg-white rounded-md p-3 shadow-sm",children:[e.jsxs("p",{children:[e.jsxs("strong",{children:["Q",a+1,":"]})," ",t.question]}),e.jsxs("p",{className:"text-xs text-gray-600",children:["Category: ",e.jsx("i",{children:t.category})," | Marks: ",t.marks," | Negative: ",t.negative]}),["MCQ","MSQ"].includes(t.category)&&e.jsx("ul",{className:"mt-2 list-disc pl-5",children:t.options.map((o,f)=>e.jsxs("li",{className:o.isCorrect?"text-green-600 font-semibold":"",children:[o.text," ",o.isCorrect&&e.jsx("span",{className:"ml-1",children:"✔️"})]},f))}),t.category==="Text"&&e.jsxs("p",{className:"mt-2 text-blue-700",children:[e.jsx("strong",{children:"Answer:"})," ",t.answer]})]},a))})]}),n&&c.length>0&&e.jsx(S,{onClick:i,className:"mt-3",sx:{marginTop:"10px"},variant:"contained",color:"primary",disabled:d,children:d?"Uploading...":"Validate & Upload"})]})]})})}export{I as default};
