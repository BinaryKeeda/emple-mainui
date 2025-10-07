import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  BASE_URL,
  LOGO,
  MESSAGE_QUEUE_URL
} from '../../lib/config'
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Drawer,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Loader from '../../layout/Loader'

const Solution = () => {
  const { user } = useSelector(s => s.auth)
  const { slug } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [solution, setSolution] = useState(null)
  const [questionSet, setQuestionSet] = useState([])
  const [answers, setAnswers] = useState({})
  const [visitedQuestions, setVisitedQuestions] = useState(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [redirectModal, setRedirectModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const answersRef = useRef(answers)
  answersRef.current = answers

  const currentQuestion = quiz?.questions[currentIndex]

  const isMSQ = question =>
    question?.options?.filter(opt => opt.isCorrect).length > 1

  const handleOptionChange = (question, selectedOption) => {
    const qId = question._id
    if (isMSQ(question)) {
      setAnswers(prev => {
        const current = new Set(prev[qId] || [])
        current.has(selectedOption)
          ? current.delete(selectedOption)
          : current.add(selectedOption)
        return { ...prev, [qId]: Array.from(current) }
      })
    } else {
      setAnswers(prev => ({ ...prev, [qId]: selectedOption }))
    }
  }

  const handleTextChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }

  const getButtonStyle = qId => {
    const isCurrent = questionSet[currentIndex]?._id === qId
    const isAnswered =
      answers[qId] &&
      (Array.isArray(answers[qId]) ? answers[qId].length > 0 : answers[qId])
    const isVisited = visitedQuestions.has(qId)
    let base = 'p-2 border text-sm'
    if (isCurrent) return `${base} bg-blue-600 text-white border-blue-700`
    if (isAnswered)
      return `${base} bg-green-600/20 border-green-400 text-green-800`
    if (isVisited)
      return `${base} bg-orange-100 border-orange-400 text-orange-800`
    return `${base} bg-blue-100 border-blue-400 text-blue-600`
  }

  // Fetch quiz & solution
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/graphql`,
          {
            query: `
              query getUserSolution($slug: String!, $userId: String!) {
                getUserSolution(slug: $slug, userId: $userId) {
                  solution { _id createdAt }
                  quiz {
                    _id
                    duration
                    questions { _id question image marks category negative options { text image isCorrect } }
                  }
                }
              }
            `,
            variables: { slug, userId: user._id }
          },
          { withCredentials: true }
        )

        const data = res.data?.data?.getUserSolution
        if (!data) throw new Error('Invalid response')

        setQuiz(data.quiz)
        setQuestionSet(data.quiz.questions)

        if (data.solution) {
          setSolution(data.solution)
        } else {
          // create solution immediately
          const createRes = await axios.post(
            `${BASE_URL}/graphql`,
            {
              query: `
                mutation createSolution($quizId: ID!, $userId: ID!) {
                  createSolution(quizId: $quizId, userId: $userId) {
                    _id
                    createdAt
                  }
                }
              `,
              variables: { quizId: data.quiz._id, userId: user._id }
            },
            { withCredentials: true }
          )
          setSolution(createRes.data.data.createSolution)
        }

        // Load cached progress
        const cached = localStorage.getItem(`solution-${slug}`)
        if (cached) {
          const parsed = JSON.parse(cached)
          setAnswers(parsed.answers || {})
          setVisitedQuestions(new Set(parsed.visited || []))
          setCurrentIndex(parsed.currentIndex || 0)
        }
      } catch (e) {
        console.error('Failed to fetch quiz', e)
        navigate('/user')
      }
    }

    fetchQuiz()
  }, [slug, user._id, navigate])

  // Track visited questions
  useEffect(() => {
    if (currentQuestion?._id) {
      setVisitedQuestions(prev => new Set(prev).add(currentQuestion._id))
    }
  }, [currentIndex, currentQuestion])

  // Save progress to localStorage
  useEffect(() => {
    if (!quiz) return
    localStorage.setItem(
      `solution-${slug}`,
      JSON.stringify({
        answers,
        visited: Array.from(visitedQuestions),
        currentIndex
      })
    )
  }, [answers, visitedQuestions, currentIndex, quiz, slug])

  // Timer & auto-submit
  useEffect(() => {
    if (!quiz || !solution) return

    const syncServerTime = async () => {
      try {
        const reqMade = Date.now()
        const res = await axios.get(`${BASE_URL}/api/test/campus/time`, {
          withCredentials: true
        })
        const resCame = Date.now()
        let serverNow = res.data.serverTime
        serverNow += (resCame - reqMade) / 2 // latency adjustment

        const testStartTime = new Date(parseInt(solution.createdAt)).getTime()
        const durationMs = parseInt(quiz.duration) * 60 * 1000
        const timeUsed = serverNow - testStartTime
        setTimeLeft(Math.max(durationMs - timeUsed, 0))
      } catch (e) {
        console.error('Server time sync failed:', e)
      }
    }

    syncServerTime()

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          clearInterval(interval)
          submitHandler(answersRef.current) // auto-submit with latest answers
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [quiz, solution])

  const submitHandler = async (finalAnswers = answers) => {
    if (!solution) return
    setLoading(true)
    setRedirectModal(true)
    try {
      await axios.post(
        `${MESSAGE_QUEUE_URL}/api/v4/eval/quiz/submit`,
        {
          quizId: quiz?._id,
          userId: user._id,
          response: finalAnswers,
          submissionId: solution._id
        },
        { withCredentials: true }
      )
      localStorage.removeItem(`solution-${slug}`)
    } catch (e) {
      console.error('Submission failed', e)
      setRedirectModal(false)
    } finally {
      setLoading(false)
    }
  }

  const SidebarContent = () => (
    <div className='flex flex-col gap-10 p-4'>
      <div>
        <h3 className='text-md font-semibold mb-4'>Question Navigator</h3>
        <div className='grid grid-cols-6 gap-2 lg:grid-cols-5'>
          {quiz.questions.map((q, idx) => (
            <button
              key={q._id}
              className={`${getButtonStyle(
                q._id
              )} rounded-full h-[40px] w-[40px]`}
              onClick={() => {
                setCurrentIndex(idx)
                setSidebarOpen(false)
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='mt-6 text-sm space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 bg-blue-700 inline-block rounded-sm'></span>{' '}
            Current
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 bg-green-100 border border-green-400 inline-block rounded-sm'></span>{' '}
            Attempted
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 bg-orange-100 border border-orange-400 inline-block rounded-sm'></span>{' '}
            Seen
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 bg-blue-100 border border-blue-400 inline-block rounded-sm'></span>{' '}
            Unseen
          </div>
        </div>

        <Button
          fullWidth
          onClick={() => setShowConfirmModal(true)}
          variant='contained'
          color='primary'
          className='mt-6'
        >
          Submit
        </Button>
      </div>
    </div>
  )

  if (!quiz)
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader />
      </div>
    )

  return (
    <>
      {/* Header */}
      <header className='relative top-0 left-0 w-full p-4 shadow-sm bg-white z-20 flex justify-between items-center h-[60px]'>
        <div className='flex items-center gap-3'>
          {/* Sidebar toggle button for small screens */}
          <IconButton
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden'
            aria-label='open sidebar'
          >
            <MenuIcon />
          </IconButton>
          <img src={LOGO} className='h-10' alt='Logo' />
        </div>

        <span>
          {String(Math.floor(timeLeft / 60000)).padStart(2, '0')}m :{' '}
          {String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')}s
        </span>
      </header>

      {/* Main content */}
      <main className='flex bg-white flex-col lg:flex-row h-[calc(100vh-60px)] pt-[0px]'>
        {/* Question Section */}
        <section className='flex-1 p-5 flex flex-col justify-between'>
          <div className='border p-8 rounded-sm shadow-sm'>
            <div className='flex justify-between'>
              <p className='mb-6 text-base'>
                Q{currentIndex + 1}.{' '}
                <span
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion?.question
                  }}
                ></span>
              </p>
              <div className='flex items-center gap-2'>
                <span className='bg-green-100 border-green-400 border p-1 w-[40px] text-xs'>
                  {' + '}
                  {currentQuestion.marks}
                </span>
                <span className='bg-red-100 border-red-400 border p-1 w-[40px] text-center text-xs'>
                  {currentQuestion.negative}
                </span>
              </div>
            </div>

            {currentQuestion?.image && (
              <img className='h-60 mb-4' src={currentQuestion?.image} alt='' />
            )}

            <div className='space-y-4'>
              {currentQuestion?.category != 'Text' ? (
                currentQuestion.options.map((opt, idx) => {
                  const qId = currentQuestion._id
                  const isChecked = isMSQ(currentQuestion)
                    ? answers[qId]?.includes(opt.text)
                    : answers[qId] === opt.text

                  return (
                    <label
                      key={idx}
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition ${isChecked
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                        }`}
                    >
                      <input
                        type={isMSQ(currentQuestion) ? 'checkbox' : 'radio'}
                        className='mr-3'
                        name={`question-${qId}`}
                        value={opt.text}
                        checked={isChecked}
                        onChange={() =>
                          handleOptionChange(currentQuestion, opt.text)
                        }
                      />
                      <span>{opt.text}</span>
                    </label>
                  )
                })
              ) : (
                <TextField
                  label='Your Answer'
                  fullWidth
                  value={answers[currentQuestion._id] || ''}
                  onChange={e =>
                    handleTextChange(currentQuestion._id, e.target.value)
                  }
                />
              )}

              <div className='flex justify-end'>
                <button
                  onClick={() => {
                    setAnswers(prev => {
                      const updated = { ...prev }
                      delete updated[currentQuestion._id]
                      return updated
                    })
                  }}
                  className='text-sm text-gray-700'
                >
                  Clear choice
                </button>
              </div>
            </div>
          </div>

          <div className='mt-8 flex gap-4 justify-end'>
            <button
              onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className='px-4 py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
            >
              Previous
            </button>

            {currentIndex === questionSet.length - 1 ?
              <button onClick={() => setShowConfirmModal(true)} className='px-4 py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'>
                Submit
              </button> : <button
                onClick={() =>
                  setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
                }
                disabled={currentIndex === questionSet.length - 1}
                className='px-4 py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
              >
                Next
              </button>}
          </div>
        </section>

        {/* Sidebar for large screens */}
        <section className='hidden lg:flex lg:w-1/4 border-l border-gray-200'>
          <SidebarContent />
        </section>

        {/* Drawer Sidebar for small screens */}
        <Drawer
          anchor='left'
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <Box sx={{ width: 300, p: 2 }}>
            <SidebarContent />
          </Box>
        </Drawer>
      </main>

      {/* Redirect modal */}
      <Modal open={redirectModal}>
        <div
          className='relative top-[50%] md:left-[50%] p-6 w-2/5  rounded-lg bg-white shadow-lg'
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='flex items-center pb-4 text-xl font-semibold text-slate-800'>
                Quiz Queued Successfully
              </div>
              <div className='border-t border-slate-200 py-4 text-slate-600 font-light leading-relaxed'>
                Your quiz has been successfully queued for evaluation. You will
                be notified once the evaluation is complete.
              </div>
              <div className='flex items-center justify-end pt-4'>
                <button
                  className='rounded-md border border-transparent py-2 px-4 text-sm text-slate-600 hover:bg-slate-100'
                  onClick={() => window.location.reload()}
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Confirm submit modal */}
      <Modal open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div
          className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className='flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800'>
            Are you sure you want to submit?
          </div>
          <div className='border-t border-slate-200 py-4 leading-normal text-slate-600 font-light'>
            This action is{' '}
            <span className='font-semibold text-red-600'>irreversible</span>.
            Once submitted, your changes cannot be undone.
          </div>
          <div className='flex shrink-0 flex-wrap items-center pt-4 justify-end'>
            <button
              onClick={() => setShowConfirmModal(false)}
              className='rounded-md border border-transparent py-2 px-4 text-center text-sm text-slate-600 hover:bg-slate-100'
            >
              Cancel
            </button>
            <button
              onClick={() => submitHandler()}
              className='rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white ml-2'
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Solution
