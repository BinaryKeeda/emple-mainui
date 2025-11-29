import { useEffect, useRef, useState } from 'react'
import { Button, Modal, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../lib/config'
import Loader from './components/Loader'
import Clock from './components/Clock'
import Header from './components/Header'
import { useTest } from './context/TestProvider'
const TestQuizInterface = ({ autoSubmit }) => {
  const {
    setCurrent,
    setIsSubmitted,
    section,
    loading,
    current,
    response,
    data
  } = useTest()

  const { slug } = useParams()
  const [questionSet, setQuestionSet] = useState(section.questions)
  const [answers, setAnswers] = useState({})
  const [visitedQuestions, setVisitedQuestions] = useState(new Set())
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState()
  const currentQuestion = section.questions[currentIndex]

  const [timeLeft, setTimeLeft] = useState(Number.MAX_SAFE_INTEGER)
  const [reviewQuestions, markForReview] = useState(new Set())
  const isMSQ = question => question.category === 'MSQ'
  function handleKey (e) {
    if (e.key === 'ArrowRight') {
      setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex(i => Math.max(i - 1, 0))
    }
  }
  useEffect(() => {
    // KEY LISTNER
    window.addEventListener('keyup', handleKey)
    return () => {
      window.removeEventListener('keyup', handleKey)
    }
  }, [])
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
    let base = ' p-2 border text-sm rounded-full '
    if (isCurrent) return `${base} bg-blue-600 text-white border-blue-700`
    if (isAnswered)
      return `${base} bg-green-600/20 border-green-400 text-green-800`
    if (isVisited)
      return `${base} bg-orange-100 border-orange-400 text-orange-800`
    return `${base} bg-blue-100 border-blue-400 text-blue-600`
  }

  useEffect(() => {
    if (currentQuestion?._id) {
      setVisitedQuestions(prev => new Set(prev).add(currentQuestion._id))
    }
  }, [currentIndex, currentQuestion])

  useEffect(() => {
    const cached = sessionStorage.getItem(`solution-${slug}`)
    if (cached) {
      const parsed = JSON.parse(cached)
      setAnswers(parsed.answers || {})
      setVisitedQuestions(new Set(parsed.visited || []))
      setCurrentIndex(parsed.currentIndex || 0)
    }
  }, [])

  const hasMountedRef = useRef(false)

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    if (timeLeft !== Number.MAX_SAFE_INTEGER && timeLeft < 0) {
      submitHandler()
    }
  }, [timeLeft])

  useEffect(() => {
    if (loading) return
    sessionStorage.setItem(
      `solution-${slug}`,
      JSON.stringify({
        answers,
        visited: Array.from(visitedQuestions),
        currentIndex
      })
    )
  }, [answers, visitedQuestions, currentIndex])

  const submitHandler = async () => {
    try {
      setSubmitting(true)
      const res = await axios.post(
        `${BASE_URL}/api/exam/submit-section`,
        {
          submissionId: data._id,
          sectionId: response[current].sectionId,
          sectionType: 'quiz',
          response: answers,
          current
        },
        {
          withCredentials: true
        }
      )
      sessionStorage.removeItem(`solution-${slug}`)
      setCurrent(res.data?.nextSection)
      setIsSubmitted(res.data?.submitted)
    } catch (e) {
      console.log(e)
    }
  }
  // useEffect(() => {
  //   if (autoSubmit) {
  //     submitHandler()
  //   }
  // }, [autoSubmit])
  // useEffect(() => {
  //   if (!response[current]) return
  //   const start = response[current]?.startedAt
  //   const startTime = new Date(start).getTime()
  //   // console.log(startTime)
  //   const durationMs = parseInt(section.maxTime) * 60 * 1000 // test duration in ms
  //   // console.log(durationMs)
  //   const alreadySpent = parseInt(response?.durationUnavailaible) || 0 // in ms
  //   // console.log(alreadySpent)

  //   const interval = setInterval(() => {
  //     const now = Date.now()
  //     const timeUsed = now - startTime - alreadySpent
  //     const remainingTime = durationMs - timeUsed
  //     setTimeLeft(Math.max(remainingTime, -999999))
  //     if (remainingTime < 0) {
  //       // submitHandler()
  //     }
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [data])
  useEffect(() => {
    const syncServerTime = async () => {
      try {
        const reqMade = Date.now()
        const res = await axios.get(`${BASE_URL}/api/test/campus/time`)
        const resCame = Date.now()
        let serverNow = res.data.serverTime
        const roundTrip = resCame - reqMade // total latency
        const latency = roundTrip / 2

        // Adjusted server time (from client's perspective)
        serverNow = serverNow + latency

        const testStartTime = new Date(response[current]?.startedAt).getTime()
        const alreadySpent = parseInt(response?.durationUnavailaible || 0)
        const durationMs = parseInt(section.maxTime) * 60 * 1000

        const timeUsed = serverNow - testStartTime - alreadySpent
        const remainingTime = durationMs - timeUsed

        setTimeLeft(Math.max(remainingTime, -999999))
      } catch (e) {
        console.error('Server time sync failed:', e)
      }
    }

    if (response[current]) {
      syncServerTime()

      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(interval)
            submitHandler?.() // trigger autoSubmit function
          }
          return prev - 1000
        }, 1000)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [data])

  if (loading)
    return (
      <div className='h-screen flex justify-center items-center w-screen'>
        <Loader />
      </div>
    )

  return (
    <>
      <Header />
      <main className='flex bg-white flex-col lg:flex-row h-[calc(100vh-60px)] pt-[0px]'>
        <section className='flex-1 flex flex-col justify-between'>
          <div className='p-8 max-h-[calc(100vh - (61px + 55px))] flex-1 rounded-sm '>
            <div className='flex justify-between'>
              <p className='mb-6 text-base'>
                <pre>
                  
                  { "Q." + currentQuestion?.question}
                  </pre>
              </p>
              {/* <div className='flex items-center gap-2'>
                <span className='bg-green-100` border-green-400 border p-1 w-[40px] text-xs'>
                  {' + '}
                  {currentQuestion.marks}
                </span>
                <span className='bg-red-100 border-red-400 border p-1 w-[40px] text-center text-xs'>
                  {currentQuestion.negative}
                </span>
              </div> */}
            </div>
            {currentQuestion?.image && (
              <img
                className='h-[260px] mb-4'
                src={currentQuestion?.image}
                alt=''
              />
            )}

            <div className='space-y-4'>
              {currentQuestion?.options?.length > 0 ? (
                currentQuestion.options.map((opt, idx) => {
                  const qId = currentQuestion._id
                  const isChecked = isMSQ(currentQuestion)
                    ? answers[qId]?.includes(opt.text)
                    : answers[qId] === opt.text

                  return (
                    <label
                      key={idx}
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition ${
                        isChecked
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
                  className='text-sm cursor-pointer text-gray-700'
                >
                  Clear choice
                </button>
              </div>
            </div>
          </div>

          <div className='flex gap-4 border-t border-gray-200 py-3 px-5 justify-between'>
            <button
              className='px-4 cursor-pointer py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
              onClick={() => {
                markForReview(prev => {
                  const updated = new Set(prev)
                  if (updated.has(currentQuestion._id)) {
                    updated.delete(currentQuestion._id) // Remove if already marked
                  } else {
                    updated.add(currentQuestion._id) // Add if not marked
                  }
                  return updated
                })
              }}
            >
              {reviewQuestions.has(currentQuestion._id)
                ? 'Unmark'
                : 'Mark for Review'}
            </button>

            <div className='flex gap-3 '>
              <button
                onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
                disabled={currentIndex === 0}
                className='px-4 cursor-pointer py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
                }
                disabled={currentIndex === questionSet.length - 1}
                className='px-4 py-2 cursor-pointer  rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className='flex flex-col w-[380px] justify-between'>
          <div className='p-8 flex flex-col justify-between border-l border-gray-200 max-h-[calc(100vh - (61px + 55px))] flex-1 rounded-sm '>
            <div>
              <div className='flex gap-3 items-center justify-between mb-4'>
                <h3 className='text-md font-semibold'>Timeleft </h3>
                <div className=''>
                  {Number.MAX_SAFE_INTEGER == timeLeft ? (
                    <>
                      <div className='flex border-2  rounded-full border-t-transparent border-black h-4 w-4 animate-spin'></div>
                    </>
                  ) : (
                    <>
                      <Clock timeLeft={timeLeft} />
                    </>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-6 gap-2 mt-3 lg:grid-cols-6'>
                {section.questions.map((q, idx) => (
                  <button
                    key={q._id}
                    className={`rounded-full cursor-pointer ${
                      reviewQuestions.has(q._id)
                        ? 'bg-red-200 border text-red-500 border-red-400  '
                        : getButtonStyle(q._id)
                    } rounded-full h-[40px] w-[40px]`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className='space-y-4'>
              {/* Legend */}
              <div className='flex flex-wrap items-center gap-4 text-xs'>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 bg-blue-700 rounded-full inline-block'></span>
                  Current
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 bg-green-100 border border-green-400 rounded-full inline-block'></span>
                  Attempted
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 bg-orange-100 border border-orange-400 rounded-full inline-block'></span>
                  Seen
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 bg-blue-100 border border-blue-400 rounded-full inline-block'></span>
                  Unseen
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 bg-red-100 border border-red-400 rounded-full inline-block'></span>
                  Marked for review
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className='flex flex-col items-center text-sm mt-4'>
                <div className='mb-2 text-gray-500'>
                  You can use ← and → arrow keys to navigate between questions
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4 border-t border-gray-200 py-3 px-5 justify-between'>
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
        </section>
        <Modal
          open={showConfirmModal && !submitting}
          onClose={() => setShowConfirmModal(true)}
        >
          <div
            style={{ transform: 'translate(-50%, -50%)' }}
            className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
            role='dialog'
            aria-modal='true'
          >
            <div className='flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800'>
              Are you sure you want to submit?
            </div>
            <div className='relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light'>
              This action is{' '}
              <span className='font-semibold text-red-600'>irreversible</span>.
              Once submitted, your changes cannot be undone.
            </div>
            <div className='flex shrink-0 flex-wrap items-center pt-4 justify-end'>
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                }}
                data-dialog-close='true'
                className='rounded-md border cursor-pointer border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  submitHandler(false)
                }}
                data-dialog-close='true'
                className='rounded-md cursor-pointer bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
                type='button'
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
        {submitting && <Loader />}
      </main>
    </>
  )
}

export default TestQuizInterface
