import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useTest } from '../../../context/TestProvider'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import CodeEditor from './CodeEditor'
import CodeOutputWindow from '../CodeOutputWindow'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import Loader from '../../../layout/Loader'
import { Modal } from '@mui/material'

export default function TestCodingInterface ({ timeLeft }) {
  const {
    currSection,
    test,
    setIsSubmitted,
    testResponse,
    loading,
    problemsSolved,
    setCurr
  } = useTest()

  const [leftWidth, setLeftWidth] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const [submitting, setSubmitting] = useState(false)
  const solvedSet = useMemo(
    () => new Set(problemsSolved.map(p => p.problemId)),
    [problemsSolved]
  )

  const problems = useMemo(() => currSection?.problemset || [], [currSection])

  const [activeProblemIndex, setActiveProblemIndex] = useState(0)
  const submitSection = async () => {
    return axios
      .post(
        `${BASE_URL}/api/test/submit-section`,
        {
          testResponseId: testResponse._id,
          testSectionLength: test.sections.length,
          ufm: localStorage.getItem('ufm')
        },
        { withCredentials: true }
      )
      .then(data => {
        console.log(data)
        setIsSubmitted(data.data.isSubmitted)
        setCurr(prev => prev + 1)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      setSubmitting(true)
      submitSection()
      setSubmitting(false)
    }
  }, [timeLeft])

  useEffect(() => {
    if (!currSection) return

    const allSolved = problems.every(prob => solvedSet.has(prob._id || prob.id))

    if (allSolved) {
      submitSection()
    } else {
      if (
        activeProblemIndex >= problems.length ||
        solvedSet.has(
          problems[activeProblemIndex]._id || problems[activeProblemIndex].id
        )
      ) {
        const firstUnsolvedIndex = problems.findIndex(
          prob => !solvedSet.has(prob._id || prob.id)
        )
        if (firstUnsolvedIndex !== -1) {
          setActiveProblemIndex(firstUnsolvedIndex)
        }
      }
    }
  }, [currSection, solvedSet, problems, activeProblemIndex])

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseMove = e => {
    if (!isDragging.current || !containerRef.current) return
    const containerWidth = containerRef.current.getBoundingClientRect().width
    const newLeftWidth = (e.clientX / containerWidth) * 100
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth)
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (loading) {
    return (
      <div className='w-full h-[calc(100vh-60px)] flex items-center justify-center text-lg text-gray-600'>
        Loading...
      </div>
    )
  }

  if (!currSection) {
    return <>No section loaded</>
  }

  const activeProblem = problems[activeProblemIndex]

  if (!activeProblem) {
    return <div className='p-4'>All problems solved ✅</div>
  }

  return (
    <section
      ref={containerRef}
      className='h-[calc(100vh-60px)] w-full flex overflow-hidden'
    >
      {/* Left Pane */}
      <div
        className='h-full overflow-y-hidden border-r bg-gray-50'
        style={{ width: `${leftWidth}%` }}
      >
        {/* Problem Tabs */}
        <div className='flex gap-2 p-2 border-b bg-white flex-wrap'>
          {problems.map((prob, index) => {
            const probId = prob._id || prob.id
            const isSolved = solvedSet.has(probId)

            return (
              <button
                key={probId}
                onClick={() => setActiveProblemIndex(index)}
                className={`px-3 py-1 text-sm border rounded 
                  ${
                    isSolved
                      ? 'opacity-50 cursor-not-allowed'
                      : activeProblemIndex === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  }
                `}
                disabled={isSolved}
              >
                Problem {index + 1}
              </button>
            )
          })}
        </div>

        <ProblemDescription problem={activeProblem} />
        <CodeOutputWindow />
      </div>

      {/* Divider */}
      <div className='w-[2px] flex items-center justify-center bg-gray-50 hover:bg-gray-600 transition duration-150 relative z-10'>
        <div
          onMouseDown={handleMouseDown}
          className='cursor-col-resize text-gray-900 select-none text-2xl gap-1 rounded-full w-[20px] h-[20px] flex items-center bg-gray-600 z-50'
        >
          <ArrowLeft sx={{ marginLeft: -0.5, color: '#FFF', fontSize: 20 }} />
          <ArrowRight sx={{ marginLeft: -2, fontSize: 20, color: '#fff' }} />
        </div>
      </div>

      {/* Right Pane - Code */}
      <div
        className='h-full overflow-y-auto bg-white'
        style={{ width: `${100 - leftWidth}%` }}
      >
        <CodeEditor setSubmitting={setSubmitting} problem={activeProblem} />
      </div>

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
    </section>
  )
}

const ProblemDescription = ({ problem }) => {
  return (
    <div className='flex-[0.6] bg-white font-[Lato] h-[calc(100%-50px)] overflow-y-scroll relative min-w-[200px] custom-scrollbar'>
      <div className='flex-[0.4] overflow-y-scroll h-full p-4 space-y-4 text-sm'>
        <h2 className='text-xl font-semibold'>{problem?.title}</h2>

        <div>
          {/* <h2 className='text-lg font-semibold'>Description</h2> */}
          <p className='text-gray-700 whitespace-pre-line'>
            {problem?.description}
          </p>
        </div>

        {problem?.constraints && (
          <div>
            <h2 className='text-lg font-semibold'>Constraints</h2>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.constraints.map((constraint, i) => (
                <li key={i}>{constraint}</li>
              ))}
            </ul>
          </div>
        )}
{/* 
        {problem?.topics && (
          <div>
            <h2 className='text-lg font-semibold'>Topics</h2>
            <div className='flex flex-wrap gap-2'>
              {problem.topics.map((topic, i) => (
                <span
                  key={i}
                  className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {problem?.examples?.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Sample testcases
            </h3>
            <div className='flex flex-col gap-4'>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className='bg-gray-200 p-3 rounded-md'>
                  <p className='text-sm'>
                    <strong>Input:</strong>{' '} <br></br>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: ex.input.replace(/\n/g, '<br/>')
                      }}
                      className='bg-gray-100 px-1 py-0.5 rounded'
                    />
                  </p>
                  <p className='text-sm'>
                    <strong>Output:</strong>{' '} <br />
                    <p className='bg-gray-100 px-1 py-0.5 rounded'>
                      {ex.output}
                    </p>
                  </p>
                  {ex.explanation && (
                    <p className='text-sm text-gray-600'>
                      <strong>Explanation:</strong> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {problem?.hints && (
          <div>
            <h2 className='text-lg font-semibold'>Hints</h2>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
        )} */}

        {problem?.sampleTestCases && (
          <div>
            <h2 className='text-lg font-semibold'>Sample Test Cases</h2>
            {problem.sampleTestCases.map((test, i) => (
              <div key={i} className='mb-2 p-2 bg-gray-100 rounded'>
                <p>
                  <strong>Input:</strong>{' '}
                  <div dangerouslySetInnerHTML={{ __html: test.input }}></div>
                </p>
                <p>
                  <strong>Output:</strong> {test.output}
                </p>
                <p>
                  <strong>Explanation:</strong> {test.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
