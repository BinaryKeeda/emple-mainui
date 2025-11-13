import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../lib/config'
import CodeOutputWindow from './CodeOutputWindow'
import CodeEditor from './CodeEditor'
import { Modal } from '@mui/material'
import Loader from './components/Loader'
import { useRef } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { IosArrowRtl24Filled, IosArrowLtr24Filled } from '@fluentui/react-icons'
import { MoreHorizontal20Filled } from '@fluentui/react-icons'
import Header from './components/Header'
import TestProblemDescription from './TestProblemDescription'
import { useTest } from './context/TestProvider'
export default function TestCodeInterface () {
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
    sections
  } = useTest()

  const [timeLeft, setTimeLeft] = useState(Number.MAX_SAFE_INTEGER)
  const [answers, setAnswers] = useState({})
  const [leftWidth, setLeftWidth] = useState(46)
  const [topHeight, setTopHeight] = useState(70) // in %
  const verticalDrag = useRef(false)

  const [problems, setProblems] = useState([])
  const [activeProblemIndex, setActiveProblemIndex] = useState(0)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => {
    console.log(section)
    setProblems(section.problems)
  }, [])
  useEffect(() => {
    const saved = localStorage.getItem(
      `${response[current].sectionId}sectionAnswers`
    )
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [])
  const handlePrev = () => {
    setActiveProblemIndex(prev => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setActiveProblemIndex(prev => Math.min(prev + 1, problems.length - 1))
  }

  const submitHandler = async () => {
    try {
      setSubmitting(true)
      const res = await axios.post(
        `${BASE_URL}/api/exam/submit-section`,
        {
          submissionId: data._id,
          sectionId: response[current].sectionId,
          sectionType: 'coding',
          response: answers,
          current
        },
        {
          withCredentials: true
        }
      )
      sessionStorage.removeItem(`${response[current].sectionId}sectionAnswers`)
      setCurrent(res.data.nextSection)
      console.log(res.data)

      setIsSubmitted(res.data.submitted)
    } catch (e) {
      console.log(e)
    }
  }

  const handleMouseMove = e => {
    if (!isDragging.current || !containerRef.current) return
    const containerWidth = containerRef.current.getBoundingClientRect().width
    const newLeftWidth = (e.clientX / containerWidth) * 100
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth)
    }
  }
  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }
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

  const activeProblem = problems[activeProblemIndex]
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // useEffect(() => {
  //   if (timeLeft != Number.MAX_SAFE_INTEGER && timeLeft < 0) {
  //     submitHandler()
  //   }
  // }, [timeLeft])
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
  //       submitHandler()
  //     }
  //     // console.log(remainingTime)
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
            if(prev - 1000 < 0) {
              submitHandler();
            }
            return prev - 1000;
          }) // countdown every second
          
        }, 1000)
  
        return () => clearInterval(interval)
      }
    }, [data])
  return (
    <>
      <Header timeLeft={timeLeft} />
      <section
        ref={containerRef}
        className='h-[calc(100vh-(58px))] mt-[2px] w-full flex overflow-hidden'
      >
        {/* Left Pane */}
        <div
          className='h-full flex flex-col bg-gray-50 overflow-hidden'
          style={{ width: `${leftWidth}%` }}
        >
          {/* Top: ProblemDescription */}
          <div
            className='overflow-y-auto border-b border-gray-300'
            style={{ height: `${topHeight}%` }}
          >
            <TestProblemDescription problem={activeProblem} />
          </div>

          {/* Divider: vertical draggable */}
          <div
            className='h-[6px] gap-1 cursor-ns-resize bg-gray-300 flex items-center justify-center'
            onMouseDown={handleVerticalMouseDown}
          >
            <MoreHorizontal20Filled
              style={{
                height: '29px',
                width: '29px'
              }}
            />
          </div>

          {/* Bottom: CodeOutputWindow */}
          <div
            className='overflow-y-auto'
            style={{ height: `${100 - topHeight - 1}%` }}
          >
            <CodeOutputWindow testCases={activeProblem?.testCases} />
          </div>
        </div>

        {/* Divider */}
        <div className=' flex justify-center px-[1px] items-center bg-gray-200  transition duration-150 relative z-10'>
          <div
            onMouseEnter={e => {
              const parent = e.currentTarget.parentNode
              parent.style.backgroundColor = '#e2e8f0' // Equivalent to bg-gray-300
            }}
            onMouseLeave={e => {
              const parent = e.currentTarget.parentNode
              parent.style.backgroundColor = '#e5e7eb' // Back to bg-gray-200
            }}
            onMouseDown={handleMouseDown}
            className='cursor-ew-resize gap-1 py-1  text-gray-900 select-none text-2xl  mx-auto rounded-full    z-50'
          >
            {/* <ArrowLeft sx={{ marginLeft: -0.5, color: '#FFF', fontSize: 20 }} />
            <ArrowRight sx={{ marginLeft: -2, fontSize: 20, color: '#fff' }} /> */}
            <div className='h-[5px] w-[5px] bg-black mt-1  rounded-full'></div>
            <div className='h-[5px] w-[5px] bg-black mt-1  rounded-full'></div>
            <div className='h-[5px] w-[5px] bg-black mt-1 rounded-full'></div>
          </div>
        </div>

        {/* Right Pane - Code */}
        <div
          className='h-full overflow-y-auto bg-white'
          style={{ width: `${100 - leftWidth}%` }}
        >
          <CodeEditor
            submitting={submitting}
            hasMore={problems.length > activeProblemIndex + 1}
            timeLeft={timeLeft}
            response={response}
            submitHandler={submitHandler}
            setAnswers={setAnswers}
            setSubmitting={setSubmitting}
            problem={activeProblem}
            current={current}
          />
        </div>

        {/* Problem Tabs */}
      </section>
      <section className='h-[50px] bg-white pb-1 -pt-7  z-50 left-0 absolute flex justify-center items-center gap-4 bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
        <button
          onClick={handlePrev}
          disabled={activeProblemIndex === 0}
          className={`rounded-xl cursor-pointer bg-gray-200 flex items-center justify-center px-3 h-8  transition ${
            activeProblemIndex === 0
              ? 'opacity-50 cursor-not-allowed bg-white '
              : 'hover:bg-gray-200'
          }`}
        >
          <IosArrowLtr24Filled style={{ height: '13px', width: '13px' }} />
          <span className='text-gray-900 text-xs'>Prev</span>
        </button>

        <span className='text-gray-600 text-xs font-medium'>
          {activeProblemIndex + 1} / {problems.length}
        </span>

        <button
          onClick={handleNext}
          disabled={activeProblemIndex === problems.length - 1}
          className={`rounded-xl cursor-pointer bg-gray-200 flex items-center justify-center px-3 h-8 transition ${
            activeProblemIndex === problems.length - 1
              ? 'opacity-50 cursor-not-allowed bg-white'
              : 'hover:bg-gray-300'
          }`}
        >
          <span className='text-gray-900 text-xs'>Next</span>
          <IosArrowRtl24Filled style={{ height: '13px', width: '13px' }} />
        </button>
      </section>
    </>
  )
}
