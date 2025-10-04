import React from 'react'
import { useOutputWindow } from '../../../context/TestOutputContext'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import Loader from '../../../layout/Loader'

export default function CodeOutputWindow() {
  const {
    showOutputWindow, setShowOutputWindow,
    isExecuting,
    results = [], summary, codeReview
  } = useOutputWindow()

  const reviewMetrics = ['indentation', 'modularity', 'variable_name_convention', 'time_complexity', 'space_complexity']
  const passedReview = reviewMetrics.filter(k => (codeReview?.[k] || 0) > 0).length
  const failedReview = reviewMetrics.length - passedReview
  return (
    <div className={`h-[calc(100%-0px)] overflow-scroll relative transition-all duration-200 ease-linear w-full ${showOutputWindow ? '-translate-y-[calc(100%)]' : 'translate-y-0'} bg-gray-50`}>
      <div className='absolute top-0 w-full flex flex-col p-5 space-y-4'>

        {/* Close Button */}
        <div className='flex justify-end'>
          <IconButton onClick={() => setShowOutputWindow(prev => !prev)}>
            <Close />
          </IconButton>
        </div>

        {(!summary || !results )&& <Loader/>}

        {/* Submission Summary */}
        {summary && (
          <div className='bg-white px-6 py-4 rounded shadow flex justify-between items-center'>
            <span className='text-blue-600 font-medium text-lg'>{summary.passed}/{summary.total} Test Cases Passed</span>
            <span className='text-sm text-gray-700'>⏱ Avg Time: <strong>{summary.avgTime}s</strong></span>
            <span className='text-sm text-gray-700'>💾 Avg Memory: <strong>{summary.avgMemory} KB</strong></span>
          </div>
        )}

        {/* Code Review Summary */}
        {codeReview && (
          <div className='bg-white px-6 py-4 rounded shadow flex justify-between items-center'>
            <span className='text-purple-600 font-medium text-lg'>Code Review</span>
            <span className='text-sm text-gray-700'><strong>{passedReview}</strong> Passed, <strong>{failedReview}</strong> Failed</span>
            <span className='text-sm text-gray-700'>Score: <strong>{codeReview.finalScore}</strong></span>
          </div>
        )}

        {/* Top 2 Test Case Results */}
        {results?.length > 0 && (
          <div className='bg-white px-6 py-4 rounded shadow'>
            <h3 className='text-lg font-semibold mb-3'>Test Case Results</h3>
            <div className='space-y-3'>
              {results.slice(0, 2).map((r, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded border text-sm ${
                    r.passed
                      ? 'border-green-400 bg-green-50'
                      : 'border-red-400 bg-red-50'
                  }`}
                >
                  <p className='font-medium text-gray-800 mb-2'>Test Case #{idx + 1}</p>
                  <p><strong>Input:</strong> <code>{r.input}</code></p>
                  <p><strong>Expected:</strong> <code>{r.expected}</code></p>
                  <p><strong>Your Output:</strong> <code>{r.output}</code></p>
                  {!r.passed && (
                    <p className='text-red-500'><strong>Error:</strong> {r.error || 'Incorrect Output'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Review Breakdown */}
        {codeReview && (
          <div className='bg-white px-6 py-4 rounded shadow'>
            <h3 className='text-lg font-semibold mb-3'>Code Review Breakdown</h3>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              {reviewMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded font-medium ${
                    codeReview[metric] > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {metric.replace(/_/g, ' ')}: {codeReview[metric]}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
