import { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import Loader from '../components/Loader'

const TestContext = createContext()

const fetchTestSolution = async (userId, testId) => {
  return await axios
    .post(
      `${BASE_URL}/api/exam/solution`,
      {
        userId,
        testId
      },
      { withCredentials: true }
    )
    .then(data => data.data.data)
    .catch(e => e.response?.data?.message || 'Error fetching solution')
}

const TestProvider = ({ children, testId, userId }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasAgreed, setHasAgreed] = useState()
  const [loader, setLoader] = useState(false)
  const [current, setCurrent] = useState(-1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTestSolution(userId, testId)
      setData(result)
      setLoading(false)
      setHasAgreed(result.hasAgreed)
      setCurrent(result.currSection)
      setIsSubmitted(result.isSubmitted)
    }
    fetchData()
  }, [])
  // useEffect(() => {
  //   console.log(data);
  // },[data])
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

  // const test = data?.getUserTestSolution?.test
  // const testResponse = data?.getUserTestSolution?.testResponse
  // const currSection = test?.sections?.[curr]
  const test = data.testSnapshot
  const section = test[current]
  const response = data.response;
  const userDetails = data.userDetails || []
  const columns = data.columns || []
  const isProtected = data.isProtected || false
  // console.log(response)
  const helpers = {}
  return (
    <TestContext.Provider
      value={{
        loader,
        hasAgreed,
        setLoader,
        setHasAgreed,
        setData,
        isSubmitted,
        setIsSubmitted,
        testId,
        setCurrent,
        data,
        error,
        loading,
        test,
        section,
        response,
        current,
        isProtected,
        helpers,
        userDetails,
        columns ,
        submissionId: data._id,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

const useTest = () => useContext(TestContext)

export { useTest, TestProvider }
