import { createContext, useContext, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loader from '../layout/Loader'

// Create context
const TestContext = createContext()

// GraphQL query
const GET_TESTS = gql`
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
`

// Provider component
const TestProvider = ({ children, userId, testSlug }) => {
  const { data, loading, error } = useQuery(GET_TESTS, {
    variables: { userId, slug: testSlug },
    fetchPolicy: 'cache-and-network'
  })
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [curr, setCurr] = useState(0)
  const [problemsSolved, setProblemsSolved] = useState([])
  const [startedAt, setStartedAt] = useState(null)

  useEffect(() => {
    if (data?.getUserTestSolution?.testResponse) {
      setHasAgreed(data.getUserTestSolution.testResponse.hasAgreed)
      setIsSubmitted(data.getUserTestSolution.testResponse.isSubmitted)
      setCurr(data?.getUserTestSolution?.testResponse?.curr)
    }
  }, [data])
  useEffect(() => {
    const currSec = data?.getUserTestSolution?.test?.sections?.[curr || 0]
    if (currSec && currSec.sectionType == 'Coding') {
      setProblemsSolved(
        data?.getUserTestSolution.testResponse?.response[curr]?.codingAnswers ||
          []
      )
      console.log('f')
    }
  }, [curr])

  if (loading)
    return (
      <div className='flex items-center justify-center bg-white h-screen w-screen'>
        {' '}
        <Loader />
      </div>
    )
  if (error) {
    console.error('Test query error:', error)
    return <p>Error loading test data. Please try again.</p>
  }

  const test = data?.getUserTestSolution?.test
  const testResponse = data?.getUserTestSolution?.testResponse
  const currSection = test?.sections?.[curr]
  const sections = test?.sections
  
  return (
    <TestContext.Provider
      value={{
        setCurr,
        hasAgreed,
        sections,
        setHasAgreed,
        isSubmitted,
        setIsSubmitted,
        currSection,
        curr,
        test,
      testResponse,
        loading,
        startedAt,
        setStartedAt,
        problemsSolved,
        setProblemsSolved
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

// Custom hook
const useTest = () => {
  const context = useContext(TestContext)
  if (!context) throw new Error('useTest must be used within a TestProvider')
  return context
}

export { TestProvider, useTest }
