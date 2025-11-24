import{r as t,j as c,L as q}from"./index-GnGT0G9-.js";import{u as I,g as _}from"./useQuery-CPOjcNba.js";const y=t.createContext(),$=_`
  query GetUserTestSolution($slug: String!, $userId: String!) {
    getUserTestSolution(slug: $slug, userId: $userId) {
      test {
        name
        duration
        sections {
          _id
          name
          sectionType
          problemset {
            constraints
            _id
            description
            title
            hints
            topics
            examples {
              input
              output
              explanation
            }
            testCases {
              output
              input
            }
            functionSignature {
              language
              signature
            }
          }
          questionSet {
            _id
            question
            category
            image
            options {
              text
              image
            }
            marks
            negative
          }
        }
      }
      testResponse {
        _id
        curr
        hasAgreed
        isSubmitted
        startedAt   
        endedAt       
        durationSpent   
        pausedAt  
        lastSeenAt
        response {
          quizAnswers {
            id
            selectedOption
          }
          codingAnswers {
            problemId
          }
        }
      }
    }
  }
`,L=({children:s,userId:S,testSlug:m})=>{var f,h,v;const{data:e,loading:l,error:a}=I($,{variables:{userId:S,slug:m},fetchPolicy:"cache-and-network"}),[w,d]=t.useState(!1),[x,p]=t.useState(!1),[o,g]=t.useState(0),[C,T]=t.useState([]),[U,O]=t.useState(null);if(t.useEffect(()=>{var r,u,i;(r=e==null?void 0:e.getUserTestSolution)!=null&&r.testResponse&&(d(e.getUserTestSolution.testResponse.hasAgreed),p(e.getUserTestSolution.testResponse.isSubmitted),g((i=(u=e==null?void 0:e.getUserTestSolution)==null?void 0:u.testResponse)==null?void 0:i.curr))},[e]),t.useEffect(()=>{var u,i,A,b,R;const r=(A=(i=(u=e==null?void 0:e.getUserTestSolution)==null?void 0:u.test)==null?void 0:i.sections)==null?void 0:A[o||0];r&&r.sectionType=="Coding"&&(T(((R=(b=e==null?void 0:e.getUserTestSolution.testResponse)==null?void 0:b.response[o])==null?void 0:R.codingAnswers)||[]),console.log("f"))},[o]),l)return c.jsxs("div",{className:"flex items-center justify-center bg-white h-screen w-screen",children:[" ",c.jsx(q,{})]});if(a)return console.error("Test query error:",a),c.jsx("p",{children:"Error loading test data. Please try again."});const n=(f=e==null?void 0:e.getUserTestSolution)==null?void 0:f.test,P=(h=e==null?void 0:e.getUserTestSolution)==null?void 0:h.testResponse,j=(v=n==null?void 0:n.sections)==null?void 0:v[o],W=n==null?void 0:n.sections;return c.jsx(y.Provider,{value:{setCurr:g,hasAgreed:w,sections:W,setHasAgreed:d,isSubmitted:x,setIsSubmitted:p,currSection:j,curr:o,test:n,testResponse:P,loading:l,startedAt:U,setStartedAt:O,problemsSolved:C,setProblemsSolved:T},children:s})},z=()=>{const s=t.useContext(y);if(!s)throw new Error("useTest must be used within a TestProvider");return s},E=t.createContext(),H=({children:s})=>{const[S,m]=t.useState(!1),[e,l]=t.useState(!1),[a,w]=t.useState(null),[d,x]=t.useState(null),[p,o]=t.useState(null),g={results:p,setResults:o,showOutputWindow:S,setShowOutputWindow:m,isExecuting:e,setIsExecuting:l,summary:a,setSummary:w,codeReview:d,setCodeReview:x};return c.jsx(E.Provider,{value:g,children:s})},N=()=>{const s=t.useContext(E);if(!s)throw new Error("useOutputWindow must be used within OutputWindowProvider");return s};export{H as O,L as T,N as a,z as u};
