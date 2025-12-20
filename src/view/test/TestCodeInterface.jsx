import React, { useState, useRef, useEffect } from 'react'
import { BASE_URL } from '../../lib/config'
import CodeOutputWindow from './CodeOutputWindow'
import CodeEditor from './CodeEditor'
import { Box, IconButton, Modal, Typography, Tooltip, Drawer } from '@mui/material'
import axios from 'axios'
import { Close, ShortText, UnfoldMore } from '@mui/icons-material'
import Header from './components/Header'
import TestProblemDescription from './TestProblemDescription'
import { useTest } from './context/TestProvider'
import { runSingleTest } from './helpers/coderunner'
import { setLoading } from '../../redux/slice/UserSlice'
import { Button } from '@mui/material'
import { useOutputWindow } from './context/TestOutputContext'

export default function TestCodeInterface() {
  const {
    section,
    loading,
    current,
    test,
    response,
    setCurrent,
    setIsSubmitted,
    data,
    helpers,
    sections,
    ufmSubmit,
    sectionId
  } = useTest()
  
  const { isExecuting = false, setResults } = useOutputWindow()
  
  const [timeLeft, setTimeLeft] = useState(Number.MAX_SAFE_INTEGER)
  const [answers, setAnswers] = useState({})
  const [leftWidth, setLeftWidth] = useState(35)
  const [topHeight, setTopHeight] = useState(70)
  const [problems, setProblems] = useState([])
  const [activeProblemIndex, setActiveProblemIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [customTest, setCustomTest] = useState("")
  const [customTestOpen, setCustomTestOpen] = useState(false)
  const [customOutput, setCustomOutput] = useState("")
  const [showConfirmBox, setShowConfirmBox] = useState(false)
  const [isRunningCustomTest, setIsRunningCustomTest] = useState(false)
  
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const verticalDrag = useRef(false)
  const hasMountedRef = useRef(false)

  useEffect(() => {
    setProblems(section.problems)
  }, [])
  
  useEffect(() => {
    const saved = sessionStorage.getItem(`${response[current].sectionId}sectionAnswers`)
    if (saved) setAnswers(JSON.parse(saved))
  }, [])

  const submitHandler = async (autoSubmit = false) => {
    try {
      setSubmitting(true)
      let isAnswerable = true
      
      if (answers && !autoSubmit) {
        Object.keys(answers).forEach((item) => {
          if (answers[item].tokens.length === 0) {
            isAnswerable = false
            setLoading(false)
            setShowConfirmBox(false)
            setShowModal(true)
          }
        })
      }
      
      if (!isAnswerable) return
      
      const res = await axios.post(
        `${BASE_URL}/api/exam/submit-section`,
        {
          submissionId: data?._id,
          sectionId: sectionId,
          sectionType: 'coding',
          response: answers,
          current,
          autoSubmit
        },
        { withCredentials: true }
      )
      
      sessionStorage.removeItem(`${response[current].sectionId}sectionAnswers`)
      setCurrent(res.data.nextSection)
      setIsSubmitted(res.data.submitted)
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    if (timeLeft !== Number.MAX_SAFE_INTEGER && timeLeft < 0) {
      submitHandler(true)
    }
  }, [timeLeft])

  useEffect(() => {
    if (ufmSubmit) {
      submitHandler?.(true)
      setIsSubmitted(true)
    }
  }, [ufmSubmit])

  // Horizontal resize handlers
  const handleMouseMove = e => {
    if (!isDragging.current || !containerRef.current) return
    const containerWidth = containerRef.current.getBoundingClientRect().width
    const newLeftWidth = (e.clientX / containerWidth) * 100
    if (newLeftWidth > 20 && newLeftWidth < 60) {
      setLeftWidth(newLeftWidth)
    }
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  // Vertical resize handlers
  const handleVerticalMouseDown = () => {
    verticalDrag.current = true
  }

  const handleVerticalMouseMove = e => {
    if (!verticalDrag.current || !containerRef.current) return
    const containerHeight = containerRef.current.getBoundingClientRect().height
    const offsetTop = containerRef.current.getBoundingClientRect().top
    const newTopHeight = ((e.clientY - offsetTop) / containerHeight) * 100
    if (newTopHeight > 10 && newTopHeight < 90) {
      setTopHeight(newTopHeight)
    }
  }

  const handleVerticalMouseUp = () => {
    verticalDrag.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleVerticalMouseMove)
    window.addEventListener('mouseup', handleVerticalMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleVerticalMouseMove)
      window.removeEventListener('mouseup', handleVerticalMouseUp)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const runCustomCode = async () => {
    try {
      setIsRunningCustomTest(true)
      setCustomOutput("")
      const output = await runSingleTest({
        language: activeProblem.language,
        source_code: answers[activeProblem._id]?.code || "",
        input: customTest,
        expectedOutput: ""
      })
      setCustomOutput(output)
    } catch (error) {
      setCustomOutput({ error: "Failed to run test" })
    } finally {
      setIsRunningCustomTest(false)
    }
  }

  useEffect(() => {
    const syncServerTime = async () => {
      try {
        const reqMade = Date.now()
        const res = await axios.get(`${BASE_URL}/api/test/campus/time`)
        const resCame = Date.now()
        let serverNow = res.data.serverTime
        const roundTrip = resCame - reqMade
        const latency = roundTrip / 2
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
        setTimeLeft(prev => prev - 1000)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [data])

  const activeProblem = problems[activeProblemIndex]

  return (
    <>
      <Header timeLeft={timeLeft} />
      
      <section
        ref={containerRef}
        className='h-[calc(100vh-58px)] mt-[2px] w-full flex overflow-hidden relative bg-gray-50'
      >
        {/* LEFT PANEL - Problem Description */}
        <div
          className='h-full flex flex-col bg-white overflow-hidden border-r border-gray-200'
          style={{ width: `${leftWidth}%` }}
        >
          {/* Problem Description */}
          <div
            className='overflow-y-auto'
            style={{ height: `${topHeight}%` }}
          >
            <TestProblemDescription problem={activeProblem} />
          </div>

          {/* Vertical Resize Icon */}
          <div
            className='h-1 cursor-ns-resize bg-white hover:bg-blue-500 flex items-center justify-center transition-colors group relative border-y border-gray-100'
            onMouseDown={handleVerticalMouseDown}
          >
            <div className='absolute bg-white group-hover:bg-blue-500 rounded-full p-1 shadow-sm border border-gray-200 group-hover:border-blue-500 transition-all'>
              <UnfoldMore 
                sx={{ 
                  zIndex:1999,
                  fontSize: 16,
                  color: '#6b7280',
                  transition: 'color 0.2s'
                }} 
                className='group-hover:!text-white'
              />
            </div>
          </div>

          {/* Code Output Window */}
          <div
            className='overflow-y-auto bg-white'
            style={{ height: `${100 - topHeight - 0.4}%` }}
          >
            <CodeOutputWindow testCases={activeProblem?.testCases} />
          </div>
        </div>

        {/* HORIZONTAL RESIZE ICON */}
        <div className='w-1 flex justify-center items-center bg-white hover:bg-blue-500 transition-colors cursor-ew-resize group relative border-x border-gray-100'>
          <div
            onMouseDown={handleMouseDown}
            className='absolute z-[999] bg-white group-hover:bg-blue-500 rounded-full p-1 shadow-sm border border-gray-200 group-hover:border-blue-500 transition-all'
          >
            <UnfoldMore 
              sx={{ 
                fontSize: 16,
                zIndex:1999,
                color: '#6b7280',
                transform: 'rotate(90deg)',
                transition: 'color 0.2s'
              }} 
              className='group-hover:!text-white'
            />
          </div>
        </div>

        {/* RIGHT PANEL - Code Editor */}
        <div
          className='h-full overflow-y-auto bg-white relative'
          style={{ width: `calc(${100 - leftWidth}% - 64px)` }}
        >
          <CodeEditor
            showConfirmBox={showConfirmBox}
            setShowConfirmBox={setShowConfirmBox}
            submitting={submitting}
            hasMore={problems.length > activeProblemIndex + 1}
            timeLeft={timeLeft}
            response={response}
            submitHandler={() => submitHandler(false)}
            setAnswers={setAnswers}
            setSubmitting={setSubmitting}
            problem={activeProblem}
            current={current}
          />
        </div>

        {/* PROBLEM NAVIGATION - Right Fixed Sidebar with circles and lines */}
        <div className='w-16 bg-white border-l border-gray-200 flex flex-col items-center py-6 overflow-y-auto shadow-sm relative'>
          <div className='flex flex-col items-center gap-0 relative'>
            {problems.map((problem, index) => {
              const isActive = index === activeProblemIndex
              const isCompleted = answers[problem._id]?.code?.length > 0
              const isLast = index === problems.length - 1
              
              return (
                <div key={problem._id} className='flex flex-col items-center relative'>
                  {/* Circle */}
                  <Tooltip 
                    title={`Problem ${index + 1}${isCompleted ? ' ✓' : ''}`} 
                    placement="left"
                    arrow
                  >
                    <button
                      onClick={() => {
                        setActiveProblemIndex(index)
                        setResults([])
                      }}
                      disabled={isExecuting}
                      className={`
                        relative w-10 h-10 rounded-full flex items-center justify-center
                        font-semibold text-sm transition-all duration-200 border-2
                        ${isActive 
                          ? 'bg-blue-500 text-white border-blue-600 shadow-lg' 
                          : isCompleted 
                            ? 'bg-white text-blue-600 border-blue-500 shadow hover:shadow-md' 
                            : 'bg-white text-gray-400 border-gray-300 hover:border-blue-300'
                        }
                        ${isExecuting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {index + 1}
                    </button>
                  </Tooltip>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div 
                      className={`
                        w-0.5 h-5 my-1 transition-all duration-200
                        ${isCompleted && answers[problems[index + 1]._id]?.code?.length > 0
                          ? 'bg-blue-500' 
                          : 'bg-gray-300'
                        }
                      `}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CUSTOM TEST TOGGLE - Fixed Button at Bottom */}
        <Tooltip title="Custom Test Case" placement="left" arrow>
          <IconButton 
            onClick={() => setCustomTestOpen(true)}  
            sx={{
              position: "fixed",
              right: 80,
              bottom: 24,
              bgcolor: "#3b82f6",
              color: "white",
              boxShadow: 3,
              width: 56,
              height: 56,
              zIndex: 10,
              '&:hover': {
                bgcolor: "#2563eb",
                boxShadow: 4,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s'
            }}
          >
            <ShortText sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </section>

      {/* CUSTOM TEST SIDEBAR - Right Drawer */}
      <Drawer
        anchor="right"
        open={customTestOpen}
        onClose={() => setCustomTestOpen(false)}
        PaperProps={{
          sx: {
            width: 450,
            bgcolor: '#ffffff',
            marginTop: '58px',
            height: 'calc(100vh - 58px)',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.08)'
          }
        }}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Custom Test Case</h2>
              <p className="text-sm text-gray-500 mt-0.5">Run your code with custom inputs</p>
            </div>
            <IconButton
              onClick={() => setCustomTestOpen(false)}
              size="small"
              sx={{ 
                color: '#6b7280',
                '&:hover': { bgcolor: '#f3f4f6' }
              }}
            >
              <Close />
            </IconButton>
          </div>

          {/* Content */}
          <div className='flex-1 flex flex-col overflow-hidden'>
            {/* Input Section */}
            <div className='flex-1 flex flex-col p-6 border-b border-gray-200'>
              <label className='text-sm font-medium text-gray-700 mb-2'>
                Input
              </label>
              <textarea
                value={customTest}
                onChange={(e) => setCustomTest(e.target.value)}
                placeholder="Enter your test input here...&#10;&#10;Example:&#10;5&#10;1 2 3 4 5"
                disabled={isRunningCustomTest}
                className="flex-1 p-4 border border-gray-300 rounded-lg resize-none 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                bg-white text-sm font-mono transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Output Section */}
            <div className='flex-1 flex flex-col p-6 bg-gray-50'>
              <label className='text-sm font-medium text-gray-700 mb-2'>
                Output
              </label>
              <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 
              overflow-auto font-mono text-sm">
                {isRunningCustomTest ? (
                  <div className='flex flex-col items-center justify-center h-full'>
                    <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3'></div>
                    <p className="text-gray-500 text-sm">Running test...</p>
                  </div>
                ) : customOutput ? (
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {JSON.stringify(customOutput, null, 2)}
                  </pre>
                ) : (
                  <div className='flex items-center justify-center h-full text-center'>
                    <p className="text-gray-400 text-sm">Output will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Run Button */}
          <div className='border-t border-gray-200 p-6 bg-white'>
            <button
              onClick={runCustomCode}
              disabled={isRunningCustomTest || !customTest.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 
              disabled:bg-gray-300 disabled:cursor-not-allowed
              transition-all font-medium shadow-sm hover:shadow-md 
              flex items-center justify-center gap-2"
            >
              {isRunningCustomTest ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Running...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Run Test
                </>
              )}
            </button>
          </div>
        </div>
      </Drawer>

      {/* MODAL */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Pending Codes
          </Typography>

          <Typography sx={{ color: '#6b7280' }}>
            Please run all the codes before submitting
          </Typography>

          <Button 
            sx={{ mt: 3 }} 
            onClick={() => setShowModal(false)} 
            variant="contained"
            fullWidth
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  )
}