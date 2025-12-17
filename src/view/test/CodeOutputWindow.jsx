import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { useOutputWindow } from './context/TestOutputContext'
import { CircularProgress } from '@mui/material'
import { runSingleTest } from './helpers/coderunner'

export default function CodeOutputWindow({ runCustomCode, testCases = [] }) {
  const {
    showOutputWindow,
    setShowOutputWindow,
    results = [],
    summary,
    isExecuting = false
  } = useOutputWindow()

  const [view, setView] = useState('testcases')
  const prompts = [
    "My relationship status? Still debugging…",
    "I don't commit in relationships, only in Git.",
    "She wanted attention. I wanted to fix warnings first.",
    "I optimize code, not feelings.",
    "Love is like Java — too many rules, too much syntax.",
    "Finding love is harder than passing all test cases on the first try.",
    "Relationship failed: NullPointerException.",
    "I don't do breakups, only break statements.",
    "ERROR: Feelings not defined.",
    "Love is temporary. Stack overflow is forever.",
  ]
  const [loadingTest, setLoadingTest] = useState(prompts[0])

  useEffect(() => {
    if (isExecuting || results?.length > 0) setView('result')
    else setView('testcases')
  }, [results, isExecuting])

  const [customInput, setCustomInput] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * prompts.length)
      setLoadingTest(prompts[random])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      {/* Tab Navigation */}
      <div className='flex items-center h-12 border-b border-gray-200 bg-white px-4'>
        <button
          onClick={() => setView('testcases')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            view === 'testcases'
              ? 'text-gray-900 border-b-2 border-blue-600 -mb-px'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Testcases
        </button>
        {(isExecuting || results?.length > 0) && (
          <button
            onClick={() => setView('result')}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              view === 'result'
                ? 'text-gray-900 border-b-2 border-blue-600 -mb-px'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Result
          </button>
        )}
      </div>

      {/* Summary Bar */}
      {view === 'result' && summary && (
        <div className='bg-gray-50 border-b border-gray-200 px-4 py-3'>
          <div className='flex items-center justify-between text-sm'>
            <div className='font-medium text-gray-900'>
              <span className={summary.passed === summary.total ? 'text-green-600' : 'text-red-600'}>
                {summary.passed}
              </span>
              <span className='text-gray-600'> / {summary.total} Passed</span>
            </div>
            <div className='flex gap-6'>
              <div>
                <span className='text-gray-600'>Time: </span>
                <span className='font-medium text-gray-900'>{summary.avgTime}s</span>
              </div>
              <div>
                <span className='text-gray-600'>Memory: </span>
                <span className='font-medium text-gray-900'>{summary.avgMemory} KB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className='flex-1 overflow-y-auto bg-white pb-6'>
        {view === 'result' && (
          <div className='px-6 pt-6'>
            {isExecuting ? (
              <div className='flex items-center justify-center py-12'>
                <div className='flex items-center gap-3 bg-gray-50 px-4 py-3 rounded border border-gray-200'>
                  <CircularProgress size={14} />
                  <p className='text-xs text-gray-600'>{loadingTest}</p>
                </div>
              </div>
            ) : results?.length > 0 ? (
              <div className='space-y-6'>
                {results.slice(0, 2).map((r, idx) => (
                  <div key={idx} className='border border-gray-200 rounded overflow-hidden'>
                    {/* Header */}
                    <div className={`px-4 py-3 flex items-center gap-2 ${
                      r?.passed ? 'bg-green-50 border-b border-green-100' : 'bg-red-50 border-b border-red-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${r?.passed ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      <span className='text-sm font-medium text-gray-900'>Case {idx + 1}</span>
                    </div>

                    {/* Content */}
                    <div className='p-4 space-y-4'>
                      {/* Input */}
                      <div>
                        <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>Input:</label>
                        <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-900 font-mono overflow-x-auto whitespace-pre-wrap'>
                          {r?.input}
                        </pre>
                      </div>

                      {/* Expected Output */}
                      <div>
                        <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>Expected Output:</label>
                        <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-900 font-mono overflow-x-auto whitespace-pre-wrap'>
                          {r?.expected}
                        </pre>
                      </div>

                      {/* Your Output */}
                      <div>
                        <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>Your Output:</label>
                        <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-900 font-mono overflow-x-auto whitespace-pre-wrap'>
                          {r?.output}
                        </pre>
                      </div>

                      {/* Error */}
                      {!r?.passed && r?.error && (
                        <div className='bg-red-50 border border-red-200 rounded p-3'>
                          <p className='text-xs font-semibold text-red-700'>Error:</p>
                          <p className='text-xs text-red-600 font-mono mt-1'>{r?.error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center py-12 text-gray-500 text-sm'>
                No output available.
              </div>
            )}
          </div>
        )}

        {view === 'testcases' && testCases.length > 0 && (
          <div className='px-6 pt-4 space-y-6'>
            {testCases.slice(0, 2).map((t, idx) => (
              <div key={idx} className='border border-gray-200 rounded overflow-hidden'>
                {/* Header */}
                <div className='px-4 py-3 bg-gray-50 border-b border-gray-200'>
                  <span className='text-sm font-medium text-gray-900'>Test Case {idx + 1}</span>
                </div>

                {/* Content */}
                <div className='p-4 space-y-4'>
                  {/* Input */}
                  <div>
                    <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>Input:</label>
                    <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-900 font-mono overflow-x-auto whitespace-pre-wrap'>
                      {t?.input}
                    </pre>
                  </div>

                  {/* Output */}
                  <div>
                    <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>Expected Output:</label>
                    <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-900 font-mono overflow-x-auto whitespace-pre-wrap'>
                      {t?.output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'testcases' && testCases.length === 0 && (
          <div className='flex items-center justify-center py-12 text-gray-500 text-sm'>
            No test cases available.
          </div>
        )}
      </div>
    </div>
  )
}