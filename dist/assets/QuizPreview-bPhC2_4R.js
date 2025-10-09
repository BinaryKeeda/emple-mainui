import{i as f,j as e,L as N}from"./index-DuMHTSdw.js";import{u as y,g as w}from"./useQuery-DFFnEaxW.js";const v=w`
  query GetSolutions(
    $userId: String!
    $page: Int
    $limit: Int
    $search: String
  ) {
    getSolutions(userId: $userId, page: $page, limit: $limit, search: $search) {
      data {
        _id
        attemptNo
        createdAt
        isSubmitted
        quizId {
          slug
          title
          duration
          difficulty
          questions {
            answer
            _id
            question
            image
            marks
            negative
            options {
              text
              isCorrect
              image
            }
          }
        }
        score
        response
      }
    }
  }
`,A=({userId:o="",page:c=1,limit:m=10,search:x=""})=>y(v,{variables:{userId:o,page:c,limit:m,search:x},fetchPolicy:"cache-and-network"});function I(){var u,b;const{id:o}=f(),{data:c,error:m,loading:x}=A({search:o});if(x)return e.jsx("div",{className:"flex items-center justify-center",children:e.jsx(N,{})});if(m)return e.jsx("p",{className:"text-center mt-10 text-red-500",children:"An error occurred while fetching the quiz data."});const i=(b=(u=c==null?void 0:c.getSolutions)==null?void 0:u.data)==null?void 0:b[0],a=i==null?void 0:i.quizId,p=(i==null?void 0:i.response)||{};return e.jsxs("div",{className:"flex gap-8 px-1 py-2 mx-auto",children:[e.jsxs("div",{className:"w-full space-y-8",children:[e.jsxs("header",{className:"mb-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:a==null?void 0:a.title}),e.jsxs("p",{className:"text-gray-600 mt-2",children:[e.jsxs("span",{className:"mr-4",children:[e.jsx("strong",{children:"Difficulty:"})," ",a==null?void 0:a.difficulty]}),e.jsxs("span",{className:"mr-4",children:[e.jsx("strong",{children:"Duration:"})," ",a==null?void 0:a.duration," minutes"]}),e.jsxs("span",{children:[e.jsx("strong",{children:"Score:"})," ",i==null?void 0:i.score]})]})]}),a.questions.map((s,n)=>{const r=p[s._id],l=Array.isArray(r);return s.options.length?s.options.filter(t=>t.isCorrect).map(t=>t.text):s.answer,e.jsxs("section",{id:`q${n+1}`,className:"bg-white border shadow-sm p-5 rounded-md",children:[e.jsxs("div",{className:"flex items-center justify-between py-3",children:[e.jsxs("h2",{className:"font-semibold text-lg mb-3",children:["Question ",n+1,": ",s.question]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"bg-green-100 border-green-400 border p-1 w-[40px] text-xs",children:["+",s.marks]}),e.jsx("span",{className:"bg-red-100 border-red-400 border p-1 w-[40px] text-center text-xs",children:s.negative})]})]}),s.image&&e.jsx("img",{src:s.image,alt:"Question Illustration",className:"mb-4 max-w-xs border rounded"}),e.jsx("ul",{className:"space-y-2",children:s.options.length>0?s.options.map((t,d)=>{const j=l&&(r==null?void 0:r.includes(t.text))||!l&&r===t.text,g=t.isCorrect;let h="bg-gray-50 border-gray-300";return g?h="bg-green-100 border-green-500":j&&!g&&(h="bg-red-100 border-red-500"),e.jsxs("li",{className:`p-2 rounded border ${h}`,children:[t.text,j&&e.jsx("span",{className:"ml-2 text-sm text-blue-600",children:"(Your Selection)"}),g&&e.jsx("span",{className:"ml-2 text-sm text-green-700",children:"(Correct Answer)"})]},d)}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"text-blue-600 italic mt-2",children:["Your Answer: ",e.jsx("strong",{children:r||"Not Attempted"})]}),e.jsxs("p",{children:["Correct Answer: ",e.jsx("strong",{children:s.answer})]})]})})]},s._id)})]}),e.jsxs("aside",{className:"w-1/4 sticky top-[100px] h-fit bg-gray-50 border p-5 rounded shadow-sm",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4 text-gray-800",children:"Question Navigator"}),e.jsx("div",{className:"grid grid-cols-4 gap-3",children:a.questions.map((s,n)=>{const r=p[s._id],l=s.options.length?s.options.filter(d=>d.isCorrect).map(d=>d.text):[s.answer];let t="";return!r||Array.isArray(r)&&r.length===0?t="bg-blue-400 hover:bg-blue-500":(Array.isArray(r)?JSON.stringify([...r].sort())===JSON.stringify([...l].sort()):r===l[0])?t="bg-green-500 hover:bg-green-600":t="bg-red-500 hover:bg-red-600",e.jsx("a",{href:`#q${n+1}`,title:`Question ${n+1}`,className:`w-10 h-10 flex items-center justify-center rounded-full font-medium text-white transition-colors duration-200 ${t}`,children:n+1},s._id)})})]})]})}export{I as default};
