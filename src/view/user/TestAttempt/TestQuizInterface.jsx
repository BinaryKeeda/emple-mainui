import { useEffect, useState } from 'react'
import { useTest } from '../../../context/TestProvider'
import { LOGO, MESSAGE_QUEUE_URL } from '../../../lib/config'
import { Button, Modal, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { red } from '@mui/material/colors'
import Loader from '../../../layout/Loader'

const TestQuizInterface = ({ timeLeft }) => {
  const {
    currSection,
    loading,
    setIsSubmitted,
    testResponse,
    setCurr,
    sections
  } = useTest()
  const { slug } = useParams()
  const [questionSet, setQuestionSet] = useState(currSection.questionSet)
  const [answers, setAnswers] = useState({})
  const [visitedQuestions, setVisitedQuestions] = useState(new Set())
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState()
  const currentQuestion = currSection.questionSet[currentIndex]
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
  useEffect(() => {
    if (timeLeft <= 0) {
      submitHandler(true)
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

  const submitHandler = async (autoSubmit = false) => {
    try {
      setSubmitting(true)
      const res = await axios.post(
        `${MESSAGE_QUEUE_URL}/api/v4/eval/test/submit/section`,
        {
          sectionId: currSection._id,
          submissionId: testResponse._id,
          sectionType: 'Quiz',
          quizAnswers: answers,
          sectionLength: sections.length,
          codingAnswers: null,
          autoSubmit
        }
      )
      sessionStorage.removeItem(`solution-${slug}`)
      console.log('Chl rha hai')
      setCurr(prev => prev + 1)
      console.log(res.data)
      setIsSubmitted(res?.data?.isSubmitted || false)
    } catch (e) {
      console.log(e)
    } finally {
      setShowConfirmModal(false)
      setSubmitting(false)
    }
  }
  if (loading)
    return (
      <div className='h-screen flex justify-center items-center w-screen'>
        <Loader />
      </div>
    )

  return (
    <>
      <main className='flex bg-white flex-col lg:flex-row h-[calc(100vh-60px)] pt-[0px]'>
        <section className='flex-1 p-5 flex flex-col justify-betwee'>
          <div className='border p-8 rounded-sm shadow-sm'>
            <div className='flex justify-between'>
              <p className='mb-6 text-base'>
                Q{currentIndex + 1}. {currentQuestion?.question}
              </p>
              {/* <div className='flex items-center gap-2'>
                <span className='bg-green-100 border-green-400 border p-1 w-[40px] text-xs'>
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
            <button
              onClick={() =>
                setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
              }
              disabled={currentIndex === questionSet.length - 1}
              className='px-4 py-2 rounded-md bg-[#1876d2] text-white text-sm disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </section>

        <section className='lg:w-1/4 p-6  flex flex-col justify-between border-t gap-10 lg:border-t-0 lg:border-l border-gray-200'>
          <div>
            <h3 className='text-md font-semibold mb-4'>Question Navigator</h3>
            <div className='grid grid-cols-6 gap-2 lg:grid-cols-5'>
              {currSection.questionSet.map((q, idx) => (
                <button
                  key={q._id}
                  className={`rounded-full ${getButtonStyle(
                    q._id
                  )} rounded-full h-[40px] w-[40px]`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-between gap-6'>
            <div className='mt-6 text-sm grid grid-cols-1 space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 bg-blue-700 inline-block rounded-full'></span>{' '}
                Current
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 bg-green-100 border border-green-400 inline-block rounded-full'></span>{' '}
                Attempted
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 bg-orange-100 border border-orange-400 inline-block rounded-full'></span>{' '}
                Seen
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 bg-blue-100 border border-blue-400 inline-block rounded-full'></span>{' '}
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
        </section>
        <Modal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
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
                className='rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  submitHandler(false)
                }}
                data-dialog-close='true'
                className='rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
                type='button'
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
        <Modal open={submitting || false}>
          <div
            style={{ transform: 'translate(-50%, -50%)' }}
            className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
            role='dialog'
            aria-modal='true'
          >
            <Loader />
          </div>
        </Modal>
      </main>
    </>
  )
}

export default TestQuizInterface
