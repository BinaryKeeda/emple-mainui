import{r as t,j as c,L as I}from"./index-Cw-TTt2Q.js";import{u as _,g as $}from"./useQuery-BeWBS4Cp.js";const b=t.createContext(),k=$`
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
`,z=({children:u,userId:U,testSlug:v})=>{var m,T,f;const{data:e,loading:l,error:a}=_(k,{variables:{userId:U,slug:v},fetchPolicy:"cache-and-network"}),[w,g]=t.useState(!1),[y,d]=t.useState(!1),[o,p]=t.useState(0),[R,S]=t.useState([]),[E,j]=t.useState(null);if(t.useEffect(()=>{var r,n,i;(r=e==null?void 0:e.getUserTestSolution)!=null&&r.testResponse&&(g(e.getUserTestSolution.testResponse.hasAgreed),d(e.getUserTestSolution.testResponse.isSubmitted),p((i=(n=e==null?void 0:e.getUserTestSolution)==null?void 0:n.testResponse)==null?void 0:i.curr))},[e]),t.useEffect(()=>{var n,i,x,A,h;const r=(x=(i=(n=e==null?void 0:e.getUserTestSolution)==null?void 0:n.test)==null?void 0:i.sections)==null?void 0:x[o||0];r&&r.sectionType=="Coding"&&(S(((h=(A=e==null?void 0:e.getUserTestSolution.testResponse)==null?void 0:A.response[o])==null?void 0:h.codingAnswers)||[]),console.log("f"))},[o]),l)return c.jsxs("div",{className:"flex items-center justify-center bg-white h-screen w-screen",children:[" ",c.jsx(I,{})]});if(a)return console.error("Test query error:",a),c.jsx("p",{children:"Error loading test data. Please try again."});const s=(m=e==null?void 0:e.getUserTestSolution)==null?void 0:m.test,q=(T=e==null?void 0:e.getUserTestSolution)==null?void 0:T.testResponse,C=(f=s==null?void 0:s.sections)==null?void 0:f[o],P=s==null?void 0:s.sections;return c.jsx(b.Provider,{value:{setCurr:p,hasAgreed:w,sections:P,setHasAgreed:g,isSubmitted:y,setIsSubmitted:d,currSection:C,curr:o,test:s,testResponse:q,loading:l,startedAt:E,setStartedAt:j,problemsSolved:R,setProblemsSolved:S},children:u})},H=()=>{const u=t.useContext(b);if(!u)throw new Error("useTest must be used within a TestProvider");return u};export{z as T,H as u};
