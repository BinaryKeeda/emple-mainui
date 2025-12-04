import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Modal } from '@mui/material'
import { useCodeExecutor } from './temp/codeExecutor'
import { BASE_URL, CODE_EXECUTION_API, headers } from '../../lib/config'
import Clock from './components/Clock'
import { Bolt } from '@mui/icons-material'
import Loader from './components/Loader'
import AceEditor from 'react-ace'
// Load only required modes and themes
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/ext-language_tools' // for autocomplete
import 'ace-builds/src-noconflict/ext-searchbox' // for search functionality
// Light themes
// Import themes you want to include
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-crimson_editor'
import 'ace-builds/src-noconflict/theme-eclipse'
import { useOutputWindow } from './context/TestOutputContext'
import { useTest } from './context/TestProvider'

export default function CodeEditor ({
  setSubmitting,
  submitting,
  hasMore,
  current,
  response,
  submitHandler,
  setAnswers,
  problem,
  submitSection,
  timeLeft,
  showConfirmBox, 
  setShowConfirmBox

}) {
  if (!problem) return <>Select a problem</>
  const { user } = useSelector(s => s.auth)
  const {
    showOutputWindow,
    setShowOutputWindow,
    results,
    setResults,
    isExecuting,
    setIsExecuting,
    summary,
    setSummary,
    codeReview,
    setCodeReview
  } = useOutputWindow()

  const { testResponse, section, setProblemsSolved } = useTest()
  const problemId = problem?._id

  const getKey = lang => `${problemId}_${lang}_code`
  const getLangKey = () => `${problemId}_language`
  const defaultLang = localStorage.getItem('default_language') || 'java';

  const [language, setLanguage] = useState(defaultLang)
  const [tokens,setTokens] = useState([]);
  const [code, setCode] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('default_theme') || 'crimson_editor');
  
  const editorThemes = [
    'monokai',
    'tomorrow_night',
    'github',
    'chrome',
    'crimson_editor',
    'eclipse'
  ]

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
    localStorage.setItem('default_language', newLang)

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

  useEffect(() => {
    setAnswers(prev => {
      const updated = {
        ...prev,
        [problem._id]: {
          ...prev[problem._id],
          code: code,
          language: language ,
          tokens: tokens
        }
      }

      // Save to localStorage
      sessionStorage.setItem(
        `${response[current].sectionId}sectionAnswers`,
        JSON.stringify(updated)
      )

      return updated
    })
  }, [code, language , tokens])

  const handleCodeChange = newCode => {
    setCode(newCode)
    sessionStorage.setItem(getKey(language), newCode)
  }

  const { runTests } = useCodeExecutor({
    setTokens,
    CODE_EXECUTION_API,
    headers
  })

  const runCode = async (language, code, isSubmit) => {
    try {
      setShowConfirmBox(false)
      setShowOutputWindow(true)
      setSummary(null)
      setResults(null)
      setIsExecuting(true)
      setCodeReview(null)

      const { summary, results, review } = await runTests({
        code,
        language,
        testCases: problem.testCases,
        problemName: problem.problemName,
        problemId: problem._id,
        setSummary, setTokens
      })

      if (isSubmit) {
        setSubmitting(true)
        await axios.post(
          `${BASE_URL}/api/judge0/submit`,
          {
            userId: user?._id,
            problemId: problem?._id,
            responseId: testResponse?._id,
            language,
            sourceCode: code,
            codeReview: review,
            passedTestCases: summary.passed,
            totalTestCases: summary.total,
            executionTime: summary.avgTime,
            memoryUsed: summary.avgMemory,
            sectionId: section._id
          },
          { withCredentials: true }
        )
        setProblemsSolved(prev => [...prev, { problemId: problem._id }])
        setShowOutputWindow(false)
        setSubmitting(false)
      } else {
        setSummary(summary)
        setResults(results)
        setCodeReview(review)
      }
    } catch (e) {
      // console.error(e)
    } finally {
      setIsExecuting(false)
    }
  }

  // runCode.js (caller logic)

  return (
    <div className='h-[calc(100vh-60px)] overflow-hidden'>
      <div className='h-[47px] flex justify-between px-4 items-center gap-2  border-b border-gray-200 w-full '>
        <div className='flex items-center gap-3'>
          {Number.MAX_SAFE_INTEGER == timeLeft ? (
            <>
              <div className='flex border-2  rounded-full border-t-transparent border-black h-4 w-4 animate-spin'></div>
            </>
          ) : (
            <Clock timeLeft={timeLeft} />
          )}

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
          <select
            onChange={e => {
              setTheme(e.target.value)
            }}
            className='border border-gray-200 rounded px-2 py-1 text-sm text-slate-700'
            name='theme'
            id=''
          >
            {editorThemes.map(themeName => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>
        </div>

        <div className='flex gap-2'>
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
              <div className='w-10 h-5 items-center flex justify-center'>
                <div className='dot-pulse'></div>{' '}
              </div>
            )}
          </button>
          {!hasMore && (
            <button
              className='flex items-center cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800'
              onClick={() => setShowConfirmBox(true)}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <div className=''>
        {
          /* <Editor
          language={language}
          value={code}
          onChange={handleCodeChange}
          options={{
            padding: '100px'
          }}
          theme='vs-dark'
          height='calc(100vh - (55px + 47px + 55px))'
        /> */
          <AceEditor
            mode={language == "java" ? 'java' : 'c_cpp'} // "c_cpp" or "java"
            theme={theme} // or "twilight"
            name='code-editor'
            value={code}
            onChange={handleCodeChange}
            fontSize={13}
            width='100%'
            height='calc(100vh - (55px + 47px + 55px))'
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 4
            }}
          />
        }
      </div>
      <Modal
        open={!submitting && showConfirmBox}
        onClose={() => setShowConfirmBox(false)}
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
          <div className='relative border-t border-gray-200 py-4 leading-normal text-slate-600 font-light'>
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
      {submitting && <Loader />}
    </div>
  )
}
