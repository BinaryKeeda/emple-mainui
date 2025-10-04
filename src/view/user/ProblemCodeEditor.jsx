import React, { use, useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { Modal, Tooltip } from '@mui/material'
import { BASE_URL, CODE_EXECUTION_API, headers } from '../../lib/config'
import {
  Bolt,
  ContentCopy,
  CopyAll,
  Fullscreen,
  RestartAlt
} from '@mui/icons-material'

export default function CodeEditor ({
  setSubmitting,
  current,
  response,
  submitHandler,
  setAnswers,
  problem,
  submitSection,
  timeLeft,
  isExecuting
}) {
  if (!problem) return <>Select a problem</>
  const { user } = useSelector(s => s.auth)

  const problemId = problem?._id

  const getKey = lang => `${problemId}_${lang}_code`
  const getLangKey = () => `${problemId}_language`
  const defaultLang = 'java'

  const [language, setLanguage] = useState(defaultLang)
  const [code, setCode] = useState('')
  const [showConfirmBox, setShowConfirmBox] = useState(false)

  useEffect(() => {
    const langToUse = problem.functionSignature?.some(
      sig => sig.language === defaultLang
    )
      ? defaultLang
      : problem?.functionSignature?.[0]?.language

    sessionStorage.setItem(getLangKey(), langToUse)

    const storedCode = sessionStorage.getItem(getKey(langToUse))

    if (!storedCode) {
      const sig = problem.functionSignature?.find(
        sig => sig.language === langToUse
      )
      if (sig) {
        setCode(sig.signature)
        sessionStorage.setItem(getKey(langToUse), sig.signature)
      } else {
        setCode('')
      }
    } else {
      setCode(storedCode)
    }

    setLanguage(langToUse)
  }, [problem])

  const handleLanguageChange = e => {
    const newLang = e.target.value
    // const shouldSwitch = confirm(
    //   'Are you sure you want to switch language? Unsaved changes will be lost.'
    // )
    // if (!shouldSwitch) return

    sessionStorage.setItem(getLangKey(), newLang)

    const stored = sessionStorage.getItem(getKey(newLang))
    const sig = problem.functionSignature?.find(sig => sig.language === newLang)

    if (stored) {
      setCode(stored)
    } else if (sig) {
      setCode(sig.signature)
      sessionStorage.setItem(getKey(newLang), sig.signature)
    } else {
      setCode('')
    }

    setLanguage(newLang)
  }

  const handleCodeChange = newCode => {
    setCode(newCode)
    sessionStorage.setItem(getKey(language), newCode)
  }

  //   const { runTests } = useCodeExecutor({
  //     CODE_EXECUTION_API,
  //     headers
  //   })

  const runCode = async (language, code, isSubmit) => {
    // try {
    //   setShowConfirmBox(false)
    //   setShowOutputWindow(true)
    //   setSummary(null)
    //   setResults(null)
    //   setIsExecuting(true)
    //   setCodeReview(null)
    //   const { summary, results, review } = await runTests({
    //     code,
    //     language,
    //     testCases: problem.testCases,
    //     problemName: problem.problemName,
    //     problemId: problem._id
    //   })
    //   if (isSubmit) {
    //     setSubmitting(true)
    //     await axios.post(
    //       `${BASE_URL}/api/judge0/submit`,
    //       {
    //         userId: user?._id,
    //         problemId: problem?._id,
    //         responseId: testResponse?._id,
    //         language,
    //         sourceCode: code,
    //         codeReview: review,
    //         passedTestCases: summary.passed,
    //         totalTestCases: summary.total,
    //         executionTime: summary.avgTime,
    //         memoryUsed: summary.avgMemory,
    //         sectionId: section._id
    //       },
    //       { withCredentials: true }
    //     )
    //     setProblemsSolved(prev => [...prev, { problemId: problem._id }])
    //     setShowOutputWindow(false)
    //     setSubmitting(false)
    //   } else {
    //     setSummary(summary)
    //     setResults(results)
    //     setCodeReview(review)
    //   }
    // } catch (e) {
    //   // console.error(e)
    // } finally {
    //   setIsExecuting(false)
    // }
  }

  // runCode.js (caller logic)

  return (
    <>
      <div className='h-[calc(100vh-45px)] overflow-hidden'>
        <div className='h-[47px] flex justify-between px-4 items-center gap-2  border-b border-gray-200 w-full '>
          <div className='flex items-center gap-3'>
            <select
              className='border border-gray-200 rounded px-2 py-1 text-sm text-slate-700'
              value={language}
              onChange={handleLanguageChange}
            >
              {problem.functionSignature.map(sig => (
                <option key={sig.language} value={sig.language}>
                  {sig.language.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <Tooltip>
              <RestartAlt sx={{ fontSize: 18,cursor: 'pointer'}}/>
            </Tooltip>
            <Fullscreen sx={{   fontSize: 18,   cursor: 'pointer' }}/>
            <ContentCopy sx={{   fontSize: 15,   cursor: 'pointer' }}/>
          </div>
        </div>

        <div className=''>
          <Editor
            language={language}
            value={code}
            onChange={handleCodeChange}
            options={{
              padding: '100px'
            }}
            theme='vs-dark'
            height='calc(100vh - (45px + 47px + 55px))'
          />
          <div className='flex items-center justify-end h-[55px] gap-2'>
            <button
              disabled={isExecuting}
              className='flex items-center cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800'
              onClick={() => runCode(language, code, false)}
            >
              {!isExecuting ? (
                <>
                  <span className=''>Run</span>
                  <Bolt
                    sx={{
                      fontSize: 18
                    }}
                  />
                </>
              ) : (
                'Running...'
              )}
            </button>
            <div className="relative inline-block">
  <button
    className="relative z-10 flex items-center cursor-pointer rounded-md border border-orange-500 bg-orange-100 py-2 px-4 text-sm font-medium text-orange-700 hover:bg-orange-500 hover:text-white overflow-hidden transition duration-300"
    onClick={() => setShowConfirmBox(true)}
  >
    Submit Code
  </button>
  <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 animate-shine z-0" />
</div>


          </div>
        </div>
        <Modal open={showConfirmBox} onClose={() => setShowConfirmBox(false)}>
          <div
            style={{ transform: 'translate(-50%, -50%)' }}
            className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
            role='dialog'
            aria-modal='true'
          >
            <div className='flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800'>
              Are you sure you want to submit?
            </div>
            <div className='relative border-t border-gray-200 py-4 leading-normal text-slate-600 font-light'>
              <p className='text-red-600'>
                Note : This will submit the whole coding section <br />
                Please make sure you have written code for each question on
                given editor
              </p>
              This action is{' '}
              <span className='font-semibold text-red-600'>irreversible</span>.
              Once submitted, your changes cannot be undone.
            </div>
            <div className='flex shrink-0 flex-wrap items-center pt-4 justify-end'>
              <button
                onClick={() => {
                  setShowConfirmBox(false)
                }}
                data-dialog-close='true'
                className='rounded-md cursor-pointer border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
              >
                Cancel
              </button>
              <button
                onClick={submitHandler}
                data-dialog-close='true'
                className='rounded-md cursor-pointer bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
                type='button'
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
