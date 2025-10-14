import{e as F,j as e,x as o,bV as L,bW as P,bX as C,bY as g,bZ as I,b_ as A,b$ as M,d as E,B as Q,a as N,u as z,L as B,b as y,c0 as p,c1 as x,i as D,a7 as O,f as T,r as j,c2 as R}from"./index-5IQCZWui.js";import"./Header-BjGupAHc.js";import"./api-CGi1rUhR.js";import{T as v}from"./TextField-BS5c8OM6.js";import{M as u}from"./MenuItem-B-7aeyCt.js";import"./useQuery-C3nZ_t6E.js";import"./Drawer-B26lk9zD.js";import"./index-1AjZU1gY.js";import"./mergeSlotProps-Bdsshikm.js";import"./Paper-Cl3TElX4.js";import"./Divider-D6GH9AmA.js";import"./dividerClasses-BuhX_QyX.js";import"./ShortText-883005E1.js";import"./Box-BwDpFZSy.js";import"./extendSxProp-N3quz4pF.js";import"./Typography-BjSHW2wE.js";import"./index-DCfX2AyQ.js";import"./usePreviousProps-CeN7NPEh.js";import"./Select-DfQ_w7p6.js";import"./Menu-COdTP9bR.js";import"./Grow-DcTh7rud.js";const H=F(e.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z"}),"LockRounded"),V=async({page:c,limit:r,search:t,category:n,userId:l,filters:i})=>E.post(`${Q}/graphql`,{query:`
        query GetQuizzes(
          $page: Int
          $limit: Int
          $search: String
          $category: String
          $filters: QuizFilterInput
          $userId: String!
        ) {
          getQuizzes(
            page: $page
            limit: $limit
            search: $search
            category: $category
            filters: $filters
            userId: $userId
          ) {
            status
            data {
              _id
              title
              category
              difficulty
              duration
              marks
              isSubmitted
              slug
              totalAttempts
              hasAttempted
            }
            page
            limit
            totalItems
            totalPages
          }
        }
      `,variables:{page:c,limit:r,search:t,category:n,filters:i,userId:l}},{headers:{"Content-Type":"application/json"},withCredentials:!0}),m=async()=>{var l;const{page:c,category:r,filters:t}=o.getState().quiz,n=(l=o.getState().auth.user)==null?void 0:l._id;try{o.dispatch(L());const a=(await V({page:c,limit:20,search:"",category:r,filters:t,userId:n})).data.data.getQuizzes;console.log("Fetched quizzes:",a),o.dispatch(P({key:a.page,value:a.data})),o.dispatch(C(a.totalPages)),o.dispatch(g(a.page)),o.dispatch(I()),a.totalPages<=c&&o.dispatch(A())}catch(i){o.dispatch(M(i.message||"Fetch failed"))}},_=({currCategory:c})=>{var b,f;const{hasMore:r,filters:t,page:n,loading:l,data:i,currentPage:a}=N(s=>s.quiz),d=z(),S=()=>{const s=t.sortOrder==="asc"?"desc":"asc";d(p()),d(x({...t,sortBy:"difficulty",sortOrder:s})),m()},w=s=>{d(p()),d(x({...t,difficulty:s.target.value||null,sortBy:"createdAt",sortOrder:"desc"})),m()},$=s=>{const h=s.target.value;d(p()),d(x({...t,search:h||"",sortBy:"createdAt",sortOrder:"desc",difficulty:t.difficulty||null})),m()},k=()=>{r?m():d(g(a+1))},q=()=>{a!==1&&d(g(a-1))};return e.jsxs("div",{className:"relative flex flex-col w-full h-full overflow-scroll custom-scrollbar bg-primary shadow-md rounded-lg bg-clip-border",children:[e.jsxs("div",{className:"flex justify-l items-center p-3 gap-4",children:[e.jsx(v,{size:"small",label:"Search Quiz",value:(t==null?void 0:t.search)||"",onChange:$,sx:{minWidth:250}}),e.jsxs(v,{select:!0,size:"small",label:"Filter by Difficulty",value:(t==null?void 0:t.difficulty)||"",onChange:w,sx:{minWidth:200},children:[e.jsx(u,{value:"",children:"All"}),e.jsx(u,{value:"Easy",children:"Easy"}),e.jsx(u,{value:"Medium",children:"Medium"}),e.jsx(u,{value:"Hard",children:"Hard"})]})]}),l?e.jsx(B,{}):e.jsxs(e.Fragment,{children:[e.jsxs("table",{className:"w-full overflow-x-scroll text-left table-auto min-w-max",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gradient-to-r from-orange-50 via-orange-300 to-orange-500",children:[e.jsx("th",{className:"p-4 border-b border-slate-200 bg-orange-50",children:e.jsx("p",{className:"text-sm font-normal leading-none text-gray-700",children:"Title"})}),e.jsx("th",{onClick:S,className:"cursor-pointer p-4 border-b border-slate-200 bg-orange-50",children:e.jsxs("p",{className:"text-sm font-normal leading-none text-gray-700 flex items-center gap-1",children:["Difficulty",t.sortBy==="difficulty"&&(t.sortOrder==="asc"?"↑":"↓")]})}),e.jsx("th",{className:"p-4 border-b border-slate-200 bg-orange-50",children:e.jsx("p",{className:"text-sm font-normal leading-none text-gray-700",children:"Duration"})}),e.jsx("th",{className:"p-4 border-b border-slate-200 bg-orange-50",children:e.jsx("p",{className:"text-sm pl-2 font-normal leading-none text-slate-500",children:"Attempt"})})]})}),e.jsx("tbody",{children:(b=i[a])==null?void 0:b.map((s,h)=>e.jsxs("tr",{className:"hover bg-primary hover:bg-support border-b border-slate-200",children:[e.jsx("td",{className:"p-4 py-5",children:e.jsx("p",{className:"block font-semibold text-sm text-slate-800",children:s.title})}),e.jsx("td",{className:"p-4 py-5",children:e.jsx("p",{className:"text-sm text-slate-500",children:s.difficulty})}),e.jsx("td",{className:"p-4 py-5",children:e.jsx("p",{className:"text-sm text-slate-500",children:s.duration+" min"})}),e.jsx("td",{className:"p-4 py-5",children:s!=null&&s.isSubmitted?e.jsx(y,{className:"text-xs px-4 py-2 rounded-full font-medium text-green-600 bg-green-100 hover:bg-green-200 transition",children:"Submitted"}):(s==null?void 0:s.hasAttempted)===0?e.jsx(y,{to:`/user/quiz/${s.slug}`,className:"text-xs px-5 py-2 rounded-full font-medium text-white bg-sky-600 hover:bg-sky-500 transition",children:"Attempt"}):e.jsxs("div",{className:"flex items-center gap-2 text-slate-500",children:[e.jsx(H,{fontSize:"small"}),e.jsx("p",{className:"text-sm",children:"Locked"})]})})]},h))})]}),e.jsxs("div",{className:"flex bg-support justify-between items-center px-4 py-3",children:[e.jsxs("div",{className:"text-sm text-slate-500",children:["Showing ",e.jsxs("b",{children:["1-",(f=i[a])==null?void 0:f.length]})]}),e.jsxs("div",{className:"flex space-x-1",children:[e.jsx("button",{onClick:q,disabled:a===1,className:"px-3 py-1 min-w-9 min-h-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-primary hover:border-slate-400 transition",children:"Prev"}),e.jsx("button",{disabled:!r&&a===n-1,onClick:k,className:"px-3 py-1 min-w-9 min-h-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-primary hover:border-slate-400 transition",children:"Next"})]})]})]})]})};function pe(){const c=z(),{name:r}=D(),t=N(i=>i.auth.user,O),{openLogin:n,closeLogin:l}=T();return j.useEffect(()=>{t?l():n()},[t,n,l]),t?(j.useEffect(()=>{c(p()),c(R(r)),m()},[r]),e.jsx(e.Fragment,{children:e.jsx(_,{category:r})})):null}export{pe as default};
