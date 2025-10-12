import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTest } from '../../context/TestProvider'
import Loader from '../../layout/Loader'
import { BASE_URL, LOGO } from '../../lib/config'
import { Box, Divider, Modal } from '@mui/material'
import { CheckCircle, PlayArrow, Lock } from '@mui/icons-material'
import axios from 'axios'
import socket from '../../context/Socket'

const TestInstructions = lazy(() => import('./TestAttempt/TestInstructions'))
const TestQuizInterface = lazy(() => import('./TestAttempt/TestQuizInterface'))
const TestCodingInterface = lazy(() => import('./TestAttempt/TestCodingInterface'))

export default function TestAttempt() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(true)
  const [showFullscreenModal, setShowFullscreenModal] = useState(false)
  const [exitCount, setExitCount] = useState(parseInt(localStorage.getItem('ufm')) || 0)

  const {
    hasAgreed,
    testResponse,
    test,
    currSection,
    curr,
    sections,
    isSubmitted,
    loading,
    startedAt
  } = useTest()

  // ---------------- Auto Fullscreen ----------------
  const enterFullScreen = () => {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
    else if (el.msRequestFullscreen) el.msRequestFullscreen()
  }

  const reEnterFullScreen = () => {
    enterFullScreen()
    setShowFullscreenModal(false)
  }

  // ---------------- Auto Submit API ----------------
  const callAutoSubmit = async () => {
    if (!testResponse?._id) return
    try {
      const res = await axios.post(
        `${BASE_URL}/api/test/autosubmit`,
        { submissionId: testResponse._id },
        { withCredentials: true }
      )
      if(res.data.isSubmitted) window.location.reload();
    } catch (err) {
      console.error('Auto-submit failed', err)
    }
  }

  // ---------------- Fullscreen & Tab Switch ----------------
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFS = !!document.fullscreenElement
      setIsFullScreen(isFS)

      if (!isFS && !isSubmitted) {
        setExitCount(prev => {
          const newCount = prev + 1
          localStorage.setItem('ufm', newCount)
          setShowFullscreenModal(true)
          callAutoSubmit()
          return newCount
        })
      } else {
        setShowFullscreenModal(false)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isSubmitted) {
        setExitCount(prev => {
          const newCount = prev + 1
          localStorage.setItem('ufm', newCount)
          alert('Tab switch detected. Auto-submitting your test!')
          callAutoSubmit()
          return newCount
        })
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isSubmitted, testResponse?._id])

  // ---------------- Timer ----------------
  useEffect(() => {
    if (!hasAgreed) return

    const start = startedAt || parseInt(testResponse?.startedAt)
    if (!start || !test?.duration) return

    const startTime = new Date(start).getTime()
    const durationMs = parseInt(test.duration) * 60 * 1000
    const alreadySpent = parseInt(testResponse?.durationSpent) || 0

    const interval = setInterval(() => {
      const now = Date.now()
      const timeUsed = now - startTime - alreadySpent
      const remainingTime = durationMs - timeUsed
      setTimeLeft(Math.max(remainingTime, 0))
      if (remainingTime <= 0) {
        clearInterval(interval)
        callAutoSubmit()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startedAt, test, testResponse?.durationSpent, hasAgreed])

  // ---------------- Socket ----------------
  useEffect(() => {
    if (hasAgreed) {
      enterFullScreen()
      socket.connect()
      socket.emit('register-test-session', { testResponseId: testResponse?._id })
      return () => socket.disconnect()
    }
  }, [socket, hasAgreed, testResponse?._id])

  // ---------------- Loading & Instructions ----------------
  if (loading) return <LoaderFallback />
  if (!hasAgreed) return <Suspense fallback={<LoaderFallback />}><TestInstructions /></Suspense>
  if (isSubmitted) return <SubmissionSuccess submissionId={testResponse._id} />
  if (sections.length <= curr || timeLeft == null) return <LoaderFallback />

  return (
    <main className="h-screen bg-white">
      <TestHeader timeLeft={timeLeft} sections={sections} curr={curr} />
      <Suspense fallback={<LoaderFallback />}>
        {currSection?.sectionType === 'Quiz' ? (
          <TestQuizInterface timeLeft={timeLeft} />
        ) : (
          <TestCodingInterface timeLeft={timeLeft} />
        )}
      </Suspense>

      <Modal open={showFullscreenModal} onClose={() => {}} aria-labelledby="fullscreen-warning">
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-md shadow-lg w-[90%] max-w-[400px] text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Fullscreen Required</h2>
          <p className="text-gray-700 mb-4">
            You exited fullscreen. Please return to continue the test.
          </p>
          <button
            onClick={reEnterFullScreen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Re-enter Fullscreen
          </button>
        </Box>
      </Modal>
    </main>
  )
}

// ---------------- Components ----------------
const LoaderFallback = () => (
  <div className="flex justify-center items-center h-screen w-screen">
    <Loader />
  </div>
)

const SubmissionSuccess = ({ submissionId }) => {
  const navigate = useNavigate()
  const redirectNow = () => window.location.href = '/user'

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg">
        <div className="text-xl border-b border-slate-200 flex items-center gap-4 font-semibold text-slate-800">
          <p>Test Queued Successfully</p>
        </div>
        <div className="py-4 flex gap-3 items-center text-slate-600 font-light">
          <span className="flex w-[140px] justify-center">
            <img
              className="h-20"
              src="https://cdn-icons-png.freepik.com/256/18945/18945371.png"
              alt=""
            />
          </span>
          <p>Your test has been successfully queued for evaluation. You will be notified once the evaluation is complete.</p>
        </div>
        <div className="flex justify-end pt-4">
          <button
            className="rounded-md border py-2 px-4 text-sm text-slate-600 hover:bg-slate-100"
            onClick={redirectNow}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

const TestHeader = ({ timeLeft, sections, curr }) => (
  <header className="h-[50px] border-b-gray-100 justify-between border-2 items-center px-5 shadow-sm flex mb-1">
    <img src={LOGO} className="h-8" alt="Logo" />
    <div className="px-5 py-2 flex items-center gap-4 overflow-x-auto border-b border-gray-200">
      {sections.map((section, index) => {
        const isCurrent = index === curr
        const isCompleted = index < curr
        const isUpcoming = index > curr

        return (
          <div
            key={section._id}
            className={`text-sm px-3 py-1 rounded-md border flex items-center gap-2 text-xs whitespace-nowrap
              ${isCurrent ? 'bg-blue-100 border-blue-500 text-blue-700 font-semibold' : ''}
              ${isCompleted ? 'bg-green-100 border-green-500 text-green-700' : ''}
              ${isUpcoming ? 'bg-gray-100 border-gray-300 text-gray-500' : ''}
            `}
          >
            {isCompleted ? <CheckCircle sx={{ fontSize: 19 }} /> : isCurrent ? <PlayArrow sx={{ fontSize: 19 }} /> : <Lock sx={{ fontSize: 19 }} />}
            {section.name || `Section ${index + 1}`}
          </div>
        )
      })}
      <div className="flex gap-4 items-center px-4 py-2 bg-gray-100 text-gray-900 rounded-md shadow-sm font-medium">
        <div className="flex items-center gap-1 text-sm">🕒 <span>{Math.floor(timeLeft / 60000)} min</span></div>
        <Divider orientation="vertical" flexItem className="border-gray-300" />
        <div className="flex items-center gap-1 text-sm">⏱️ <span>{Math.floor((timeLeft % 60000) / 1000)} sec</span></div>
      </div>
    </div>
  </header>
)
