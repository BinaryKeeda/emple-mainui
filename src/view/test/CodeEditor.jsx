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
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox'
// Themes
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-crimson_editor'
import 'ace-builds/src-noconflict/theme-eclipse'
import { useOutputWindow } from './context/TestOutputContext'
import { useTest } from './context/TestProvider'

export default function CodeEditor({
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
  const defaultLang = localStorage.getItem('default_language') || 'java'

  const [language, setLanguage] = useState(defaultLang)
  const [tokens, setTokens] = useState([])
  const [code, setCode] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('default_theme') || 'crimson_editor')

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
    const tokens = sessionStorage.getItem(`problem-token-${problemId}`)
    if (tokens) {
      setTokens(JSON.parse(tokens ?? []))
    } else {
      setTokens([])
    }

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
          language: language,
          tokens: tokens
        }
      }

      sessionStorage.setItem(
        `${response[current].sectionId}sectionAnswers`,
        JSON.stringify(updated)
      )

      return updated
    })
  }, [code, language, tokens])

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
        setSummary,
        setTokens,
        problemId: problem?._id
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
      console.error(e)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className='h-[calc(100vh-60px)] overflow-hidden flex flex-col bg-white'>
      {/* Header */}
      <div className='h-12 flex justify-between px-4 items-center gap-4 border-b border-gray-200 bg-white flex-shrink-0'>
        {/* Left Section - Time & Language */}
        <div className='flex items-center gap-4'>
          {Number.MAX_SAFE_INTEGER === timeLeft ? (
            <div className='flex border-2 rounded-full border-t-transparent border-gray-400 h-4 w-4 animate-spin'></div>
          ) : (
            <Clock timeLeft={timeLeft} />
          )}

          <select
            className='border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition'
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
            onChange={e => setTheme(e.target.value)}
            value={theme}
            className='border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition'
          >
            {editorThemes.map(themeName => (
              <option key={themeName} value={themeName}>
                {themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section - Actions */}
        <div className='flex gap-3'>
          <button
            disabled={isExecuting}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded transition-all ${
              isExecuting
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600'
            }`}
            onClick={() => runCode(language, code, false)}
          >
            {!isExecuting ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Run</span>
              </>
            ) : (
              <>
                <div className='w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
                <span>Running...</span>
              </>
            )}
          </button>

          {!hasMore && (
            <button
              className='px-4 py-1.5 text-sm font-medium rounded transition-all bg-green-600 text-white hover:bg-green-700 border border-green-600'
              onClick={() => setShowConfirmBox(true)}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className='flex-1 overflow-hidden'>
        <AceEditor
          mode={language === 'java' ? 'java' : 'c_cpp'}
          theme={theme}
          name='code-editor'
          value={code}
          onChange={handleCodeChange}
          fontSize={13}
          width='100%'
          height='100%'
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
      </div>

      {/* Confirmation Modal */}
      <Modal open={!submitting && showConfirmBox} onClose={() => setShowConfirmBox(false)}>
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden'
          role='dialog'
          aria-modal='true'
        >
          {/* Modal Header */}
          <div className='px-6 py-4 border-b border-gray-200 bg-white'>
            <h2 className='text-lg font-semibold text-gray-900'>Submit Solution</h2>
          </div>

          {/* Modal Content */}
          <div className='px-6 py-4 text-sm text-gray-700 leading-relaxed'>
            <p className='mb-2'>Are you sure you want to submit this solution?</p>
            <p>
              This action is <span className='font-semibold text-red-600'>irreversible</span>. Once submitted, your code cannot be modified.
            </p>
          </div>

          {/* Modal Footer */}
          <div className='px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3'>
            <button
              onClick={() => setShowConfirmBox(false)}
              className='px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition'
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition'
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>

      {submitting && <Loader />}
    </div>
  )
}