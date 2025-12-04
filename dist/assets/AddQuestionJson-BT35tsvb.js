import{r as g,j as t,I as y,C as j,d as b,B as v}from"./index-BEtsFFci.js";import{u as w}from"./index-CZZnGOdc.js";import{B as N}from"./Button-BMiHgxWN.js";const q=(h,f)=>new Promise((p,n)=>{const r=new FileReader;r.onload=c=>{try{const i=c.target.result,d=JSON.parse(i);if(!Array.isArray(d))return n(new Error("JSON should be an array of questions."));const a=d.map((e,l)=>{if(!e.question||!e.category||typeof e.marks!="number")throw new Error(`Invalid or missing fields in question ${l+1}`);const u={quizId:f,question:e.question,category:e.category,marks:e.marks,negative:Math.abs(e.negative||0)};if(e.category==="Text"){if(!e.answer||typeof e.answer!="string")throw new Error(`Missing or invalid answer in question ${l+1}`);return{...u,answer:e.answer}}else if(e.category==="MCQ"||e.category==="MSQ"){if(!Array.isArray(e.options)||e.options.length<2||e.options.some(m=>typeof m.text!="string"||typeof m.isCorrect!="boolean"))throw new Error(`Invalid options in question ${l+1}`);return{...u,options:e.options}}else throw new Error(`Unsupported category '${e.category}' in question ${l+1}`)});p(a)}catch(i){n(i)}},r.onerror=c=>{n(c)},r.readAsText(h)});function S({onSuccess:h,onError:f,setModalClose:p,id:n}){const[r,c]=g.useState(null),[i,d]=g.useState(!1),[a,e]=g.useState([]),{getRootProps:l,getInputProps:u}=w({onDropAccepted:async s=>{const o=s[0];c(o);try{const x=await q(o,n);e(x)}catch(x){console.error(x),alert("Invalid JSON format")}},onDropRejected:s=>{s.forEach(o=>{console.log(`${o.name} has an invalid MIME type.`)})},accept:{"application/json":[".json"]}}),m=async()=>{if(a.length){d(!0);try{const s=await b.post(`${v}/api/admin/quiz/add/questions`,{quizId:n,data:a},{headers:{"Content-Type":"application/json"},withCredentials:!0});h(),console.log(s.data),p(!0)}catch(s){f(),console.error(s)}finally{d(!1)}}};return t.jsx("div",{className:"h-screen w-screen bg-opacity-25 px-36 py-24 bg-black fixed top-0 left-0 z-[2099]",children:t.jsxs("div",{className:"rounded-md relative h-full w-full transition-all ease-linear duration-300 bg-white overflow-y-auto",children:[t.jsx("div",{className:"flex justify-end",children:t.jsx(y,{onClick:()=>p(!0),children:t.jsx(j,{})})}),t.jsxs("div",{className:"mt-6 bg-blue-50 border border-blue-300 rounded-md p-4",children:[t.jsx("h2",{className:"text-base font-semibold mb-2",children:"Expected JSON Schema Example:"}),t.jsx("pre",{className:"bg-white text-xs rounded-md p-3 overflow-x-auto whitespace-pre-wrap",children:`[
  {
    "question": "What is the capital of France?",
    "category": "MCQ",
    "marks": 2,
    "negative": 0.5,
    "options": [
      { "text": "Paris", "isCorrect": true },
      { "text": "London", "isCorrect": false },
      { "text": "Berlin", "isCorrect": false },
      { "text": "Madrid", "isCorrect": false }
    ]
  },
  {
    "question": "Define gravity.",
    "category": "Text",
    "marks": 5,
    "negative": 0,
    "answer": "Gravity is the force that attracts a body toward the center of the earth."
  }
]`})]}),t.jsxs("section",{className:"p-5 gap-5",children:[t.jsxs("div",{className:"p-10 cursor-pointer flex-1 flex justify-center border-dashed border-2 border-black",...l(),children:[t.jsx("input",{...u()}),r?t.jsx("small",{children:r.name}):t.jsx("small",{children:"Upload here (Only .json supported)"})]}),a.length>0&&t.jsxs("div",{className:"mt-4 bg-gray-100 rounded-md p-4 max-h-[300px] overflow-y-auto",children:[t.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Preview Questions:"}),t.jsx("ul",{className:"list-disc pl-5 space-y-2 text-sm",children:a.map((s,o)=>t.jsxs("li",{children:[t.jsxs("strong",{children:["Q",o+1,":"]})," ",s.question," — ",t.jsx("i",{children:s.category})," (",s.marks," marks)"]},o))})]}),r&&a.length>0&&t.jsx(N,{onClick:m,className:"mt-3",sx:{marginTop:"10px"},variant:"contained",color:"primary",disabled:i,children:i?"Uploading...":"Validate & Upload"})]})]})})}export{S as default};
