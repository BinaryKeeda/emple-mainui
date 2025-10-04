import React from 'react'
import { useTest } from '../../context/TestProvider'
import { useState } from 'react'
import { BASE_URL, LOGO } from '../../lib/config'
// import CodeOutputWindow from './CodeOutputWindow'
// import CodeEditor from './CodeEditor'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../layout/Loader'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Box, Modal, Tooltip, Typography } from '@mui/material'
import { MoreHorizontal20Filled } from '@fluentui/react-icons'
import { useParams } from 'react-router-dom'
import { fetchParticular } from './api/fetchParticular'
import ProblemCodeEditor from './ProblemCodeEditor'
import ProblemOutput from './ProblemOutput'
import { Helmet } from 'react-helmet-async'
import { getProblemMeta } from '../admin/helpers/getProblemMeta'
import {
  ArrowLeft,
  ArrowRight,
  Article,
  Description,
  Fullscreen,
  RestartAlt
} from '@mui/icons-material'
export default function TestCodeInterface () {
  const { slug } = useParams()

  const { title, description } = getProblemMeta(slug)

  const queryKey = [
    slug,
    {
      endpoint: {
        prefix: 'problems',
        suffix: slug
      }
    }
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: fetchParticular,
    staleTime: 300000,
    cacheTime: 3600000
  })
  const [leftWidth, setLeftWidth] = useState(46)
  const [topHeight, setTopHeight] = useState(70) // in %
  const verticalDrag = useRef(false)

  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const [submitting, setSubmitting] = useState(false)
  // const {} = location

  const submitHandler = async () => {
    // try {
    //   setSubmitting(true)
    //   const res = await axios.post(
    //     `${BASE_URL}/api/test/campus/submit-section`,
    //     {
    //       submissionId: data._id,
    //       sectionId: response[current].sectionId,
    //       sectionType: 'coding',
    //       response: answers,
    //       current
    //     },
    //     {
    //       withCredentials: true
    //     }
    //   )
    //   sessionStorage.removeItem(`${response[current].sectionId}sectionAnswers`)
    //   setCurrent(res.data.nextSection)
    //   console.log(res.data)
    //   setIsSubmitted(res.data.submitted)
    // } catch (e) {
    //   console.log(e)
    // }
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

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (isLoading) return <>Loading ....</>
  return (
    <>
      <Helmet>
        <title>{title} | BinaryKeeda</title>
        <meta name='description' content={description} />
      </Helmet>
      <header className='h-[45px] relative shadow-lg  flex items-center'>
        <nav className='h-[45px] sticky top-0 z-50 w-full shadow-lg px-4 flex items-center'>
          <img src={LOGO} className='h-8' alt='' />
        </nav>
      </header>
      <section
        ref={containerRef}
        className='h-[calc(100vh-(45px))]  w-full flex overflow-hidden'
      >
        {/* Left Pane */}
        <div
          className='h-[100vh-45px] flex flex-col  overflow-hidden'
          style={{ width: `${leftWidth}%` }}
        >
          <div className='h-[50px] gap-3 px-4 bg-gray-100 mt-3 rounded-full mx-2  flex overflow-x-scroll'>
            <button className='flex  gap-1 items-center'>
              <Description sx={{fontSize:"14px"}} color='inherit' />
              <small>
                Description
              </small>
            </button>
            <button className='flex gap-1 items-center'>
              <Article sx={{fontSize:"14px"}} color='inherit' />
              <small>
                Article
              </small>
            </button>

           
          </div>

          <div
            className='overflow-y-auto border-b border-gray-300'
            style={{ height: `${topHeight}%` }}
          >
            <ProblemDescription problem={data.data} />
          </div>

          {/* Divider: vertical draggable */}
          <div
            className='h-[6px] gap-1 cursor-ns-resize bg-gray-300 flex items-center justify-center'
            onMouseDown={handleVerticalMouseDown}
          >
            <div className='relative rounded-full items-center justify-center h-[20px] gap-1  w-[20px]  z-50  bg-orange-500 flex flex-col-reverse'>
              <ArrowLeft
                sx={{
                  position: 'absolute',
                  fontSize: '10x',
                  top: -5,
                  transform: `rotate(90deg)`
                }}
              />
              <ArrowRight
                sx={{
                  position: 'absolute',
                  transform: `rotate(90deg)`,
                  bottom: -5,
                  fontSize: '10x'
                }}
              />
            </div>
          </div>

          {/* Bottom: CodeOutputWindow */}
          <div
            className='overflow-y-auto'
            style={{ height: `${100 - topHeight - 1}%` }}
          >
            {/* <CodeOutputWindow testCases={activeProblem?.testCases} /> */}
            <ProblemOutput testCases={data.data.examples} />
          </div>
        </div>

        {/* Divider */}
        <div className=' flex justify-center px-[1px]  items-center h-full w-[10px] bg-gray-200  transition duration-150 relative z-10'>
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
            className='cursor-ew-resize h-[20px] w-[20px] absolute top-[50%] bg-orange-500 flex justify-center items-center  text-gray-900 select-none  rounded-full    z-50'
          >
            <ArrowLeft
              sx={{ marginRight: -0.7, fontSize: '18px' }}
            />
            <ArrowRight
              sx={{ marginLeft: -0.7, fontSize: '18px' }}
            />
          </div>
        </div>

        {/* Right Pane - Code */}
        <div
          className='h-full overflow-y-auto bg-white'
          style={{ width: `${100 - leftWidth}%` }}
        >
          <ProblemCodeEditor problem={data?.data} />
        </div>

        {/* Problem Tabs */}
      </section>
    </>
  )
}
const ExampleCard = ({ example }) => (
  <div className='bg-gray-200 p-3 rounded-md space-y-2'>
    <div>
      <strong>Input:</strong>
      <pre className='bg-gray-100 px-2 py-1 rounded whitespace-pre-wrap'>
        {example.input}
      </pre>
    </div>
    <div>
      <strong>Output:</strong>
      <pre className='bg-gray-100 px-2 py-1 rounded whitespace-pre-wrap'>
        {example.output}
      </pre>
    </div>
    {example.explanation && (
      <div>
        <strong>Explanation:</strong>
        <p className='text-sm text-gray-600 whitespace-pre-wrap'>
          {example.explanation}
        </p>
      </div>
    )}
  </div>
)

const ProblemDescription = ({ problem }) => {
  if (!problem) return null

  return (
    <div className='flex-[0.6] bg-white h-full overflow-y-scroll relative min-w-[200px] custom-scrollbar'>
      <div className='p-4 space-y-6 text-sm'>
        {/* Title */}
        <h2 className='text-xl font-semibold text-gray-800'>{problem.title}</h2>

        {/* Description */}
        {problem.description && (
          <section>
            <p className='text-gray-700 whitespace-pre-line'>
              {problem.description}
            </p>
          </section>
        )}

        {/* Constraints */}
        {Array.isArray(problem.constraints) && problem.constraints.length > 0 && (
          <section>
            <h3 className='text-lg font-semibold text-gray-800 mb-1'>
              Constraints
            </h3>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.constraints.map((constraint, i) => (
                <li key={i}>{constraint}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Input Format */}
        {Array.isArray(problem.inputFormat) && (
          <section>
            <h3 className='text-lg font-semibold text-gray-800 mb-1'>
              Input Format
            </h3>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.inputFormat.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Output Format */}
        {Array.isArray(problem.outputFormat) && (
          <section>
            <h3 className='text-lg font-semibold text-gray-800 mb-1'>
              Output Format
            </h3>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.outputFormat.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Examples */}
        {Array.isArray(problem.examples) && problem.examples.length > 0 && (
          <section>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Sample Testcases
            </h3>
            <div className='flex flex-col gap-4'>
              {problem.examples.map((ex, idx) => (
                <ExampleCard key={idx} example={ex} />
              ))}
            </div>
          </section>
        )}

        {/* Optional: Hints */}
        {Array.isArray(problem.hints) && problem.hints.length > 0 && (
          <section>
            <h3 className='text-lg font-semibold text-gray-800 mb-1'>Hints</h3>
            <ul className='list-disc list-inside text-gray-600'>
              {problem.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Sample Test Cases (Deprecated or Additional) */}
        {Array.isArray(problem.sampleTestCases) &&
          problem.sampleTestCases.length > 0 && (
            <section>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                Sample Test Cases
              </h3>
              {problem.sampleTestCases.map((test, i) => (
                <div key={i} className='mb-2 p-3 bg-gray-100 rounded space-y-1'>
                  <div>
                    <strong>Input:</strong>
                    <pre className='bg-gray-50 px-2 py-1 rounded whitespace-pre-wrap'>
                      {test.input}
                    </pre>
                  </div>
                  <div>
                    <strong>Output:</strong>
                    <pre className='bg-gray-50 px-2 py-1 rounded whitespace-pre-wrap'>
                      {test.output}
                    </pre>
                  </div>
                  {test.explanation && (
                    <div>
                      <strong>Explanation:</strong>
                      <p className='text-sm text-gray-600 whitespace-pre-wrap'>
                        {test.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
      </div>
    </div>
  )
}
