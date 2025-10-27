import{x as l,an as j,ao as N,ap as f,aq as i,ar as y,as as w,at as v,d as P,B as $,a as k,u as h,j as e,L as S,b as T,i as L,r as I,au as q,av as F}from"./index-CwFirUwE.js";import"./TestProvider-CJ-GrgfU.js";import{L as C}from"./Lock-OfJC53AI.js";import"./useQuery-B24uWYQr.js";const p=async()=>{var o;const{page:r,category:s}=l.getState().testUser,c=(o=l.getState().auth.user)==null?void 0:o._id;l.dispatch(j());try{const a=(await E({page:r,category:s,userId:c,limit:20,search:""})).data.data.getTests;l.dispatch(N({key:a.page,value:a.data})),l.dispatch(f(a.totalPages)),l.dispatch(i(a.page)),l.dispatch(y()),a.totalPages<=r&&l.dispatch(w())}catch(t){l.dispatch(v(t.message)),console.log(t)}},E=async({page:r,limit:s,search:c,category:o,userId:t})=>{try{return await P.post(`${$}/graphql`,{query:`#graphql
                query GetTests (
                    $page: Int = 1,
                    $limit: Int = 10,
                    $search: String,
                    $category: String,
                    $userId: String!,
                ) {
                getTests(userId:$userId ,page:$page , limit:$limit, search: $search, category: $category) {
                    data {
                        slug
                        _id
                        category
                        name
                        duration
                        attempts
                        description
                    }
                        limit
                        page
                       totalItems,
                        totalPages
                }
            }
    `,variables:{page:r,limit:s,search:c,category:o,userId:t}},{withCredentials:!0})}catch(a){throw console.log(a),new Error("Failed to Load")}},U=()=>{var m,x;const{hasMore:r,page:s,loading:c,data:o,currentPage:t,totalPages:a}=k(n=>n.testUser),d=h(),g=()=>{t==s-1||t==s?p():d(i(t+1))},u=()=>{t!=1&&d(i(t-1))};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"relative flex flex-col w-full  overflow-scroll dark:text-white bg-white shadow-md rounded-lg bg-clip-border",children:c?e.jsxs(e.Fragment,{children:[" ",e.jsx(S,{})]}):e.jsxs(e.Fragment,{children:[e.jsxs("table",{className:"w-full text-left table-auto min-w-max",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-support",children:[e.jsx("th",{className:"p-4 border-b border-slate-200 ",children:e.jsx("p",{className:"text-sm font-normal leading-none ",children:"Title"})}),e.jsx("th",{className:"p-4 border-b border-slate-200 ",children:e.jsx("p",{className:"text-sm font-normal leading-none ",children:"Description"})}),e.jsx("th",{className:"p-4 border-b border-slate-200 ",children:e.jsx("p",{className:"text-sm font-normal leading-none ",children:"Duration"})}),e.jsx("th",{className:"p-4 border-b border-slate-200 ",children:e.jsx("p",{className:"text-sm font-normal leading-none ",children:"Attempts"})}),e.jsx("th",{className:"p-4 border-b border-slate-200 ",children:e.jsx("p",{className:"text-sm font-normal leading-none ",children:"Solve"})})]})}),e.jsx("tbody",{children:(m=o[t])==null?void 0:m.map((n,b)=>e.jsxs("tr",{className:"bg-primary",children:[e.jsx("td",{className:"p-4 text-start",children:e.jsx("p",{className:"block font-semibold text-sm ",children:n.name})}),e.jsx("td",{className:"p-4 text-start",children:e.jsx("p",{className:"text-sm ",children:n.description})}),e.jsx("td",{className:"p-4 text-start",children:e.jsx("p",{className:"text-sm ",children:n.duration+" min."})}),e.jsx("td",{className:"p-4 text-start",children:e.jsxs("p",{className:"text-sm ",children:[n.attempts," / 1"]})}),e.jsx("td",{className:" text-black dark:text-white text-start",children:n.attempts==0?e.jsx(T,{className:"text-xs  bg-sky-600 hover:bg-sky-500 text-white py-2 px-5 text-start  rounded-full",to:`/user/test/${n.slug}`,children:"Attempt"}):e.jsx(C,{color:"inherit"})})]},b))})]}),e.jsxs("div",{className:"flex bg-support justify-between items-center px-4 py-3",children:[e.jsxs("div",{className:"text-sm ",children:["Showing ",e.jsxs("b",{children:["1-",(x=o[t])==null?void 0:x.length]})," of ",a]}),e.jsxs("div",{className:"flex  space-x-1",children:[e.jsx("button",{onClick:u,disabled:t==1,className:"px-3 py-1 min-w-9 min-h-9 text-sm font-normal  bg-primary border border-slate-200 rounded hover: hover:border-slate-400 transition duration-200 ease",children:"Prev"}),e.jsx("button",{disabled:!r&&t==s-1,onClick:g,className:"px-3 py-1 min-w-9 min-h-9 text-sm font-normal  bg-primary border border-slate-200 rounded hover: hover:border-slate-400 transition duration-200 ease",children:"Next"})]})]})]})})})};function B(){const r=h(),{name:s}=L();return I.useEffect(()=>{r(q()),r(F(s)),p()},[s]),e.jsx(e.Fragment,{children:e.jsx(U,{category:s})})}export{B as default};
