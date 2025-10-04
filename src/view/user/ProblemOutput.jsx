import React, { useEffect, useState } from 'react'
import { useOutputWindow } from '../../context/TestOutputContext'
import Skeleton from '@mui/material/Skeleton'

export default function ProblemOutput ({
  results = [],
  summary,
  isExecuting = false,
  testCases = []
}) {
  const [view, setView] = useState('testcases') // 'testcases' | 'result'

  useEffect(() => {
    console.log(results)
    if (isExecuting || results?.length > 0) setView('result')
    else setView('testcases')
  }, [results, isExecuting])

  return (
    <div className='bottom-0 z-40 transition-transform duration-300 ease-in-out'>
      {/* Header Buttons */}
      <div className='flex absolute p-2 items-center h-[45px] w-full border border-slate-300 bg-white px-3 text-center text-sm transition-all shadow-sm text-slate-600'>
        <button
          onClick={() => setView('testcases')}
          className='cursor-pointer flex items-center rounded-md py-2 px-4 text-sm transition-all text-slate-600 hover:text-white hover:bg-slate-800'
        >
          Testcases
        </button>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4 h-4 mx-1.5'
        >
          <path
            fillRule='evenodd'
            d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
            clipRule='evenodd'
          />
        </svg>
        {(isExecuting || results?.length > 0) && (
          <button
            onClick={() => setView('result')}
            className='cursor-pointer  flex items-center rounded-md py-2 px-4 text-sm transition-all text-slate-600 hover:text-white hover:bg-slate-800'
          >
            Output
          </button>
        )}
      </div>

      <div className='w-full h-[45px]' />

      {/* {JSON.stringify(results)} */}
      {/* Summary */}
      {view === 'result' && summary && !isExecuting && (
        <div className='bg-white items-center rounded-lg shadow p-4 px-8 flex justify-between text-sm text-gray-700'>
          <div>
            <strong>{summary.passed}</strong> / {summary.total} Passed
          </div>
          <div className='flex flex-col'>
            <div>
              Time: <strong>{summary.avgTime}s</strong>
            </div>
            <div>
              Memory: <strong>{summary.avgMemory} KB</strong>
            </div>
          </div>
        </div>
      )}

      {/* Output View */}
      {view === 'result' && (
        <div className='rounded-lg px-7 py-4'>
          {isExecuting ? (
            // Loading Skeletons
            <>
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className='mb-4'>
                  <Skeleton variant='text' width='30%' height={20} />
                  <Skeleton
                    variant='rectangular'
                    height={60}
                    className='rounded mb-2'
                  />
                  {/* <Skeleton variant='text' width='30%' height={20} />
                  <Skeleton
                    variant='rectangular'
                    height={60}
                    className='rounded'
                  /> */}
                </div>
              ))}
            </>
          ) : results?.length > 0 ? (
            results.slice(0, 2).map((r, idx) => (
              <div key={idx} className='flex flex-col gap-1'>
                {/* Input */}
                <div className='flex  mt-3 items-center bg-gray-100 w-fit py-1 px-3 rounded-sm text-md text-gray-700 gap-2'>
                  <span
                    className={`rounded-full h-2 w-2 ${
                      r?.passed ? 'bg-green-600' : 'bg-red-400'
                    }`}
                  ></span>
                  <label htmlFor=''>Case {idx + 1}</label>
                </div>
                <div>
                  <label className='text-sm block mb-1'>Input:</label>
                  <div className='bg-gray-100 rounded p-2 whitespace-pre-wrap'>
                    {r?.input}
                  </div>
                </div>

                {/* Expected Output */}
                <div>
                  <label className='text-sm block mb-1'>Expected Output:</label>
                  <div className='bg-gray-100 rounded p-2 whitespace-pre-wrap'>
                    {r?.expected}
                  </div>
                </div>

                {/* Your Output */}
                <div>
                  <label className='text-sm block mb-1'>Your Output:</label>
                  <div className='bg-gray-100 rounded p-2 whitespace-pre-wrap'>
                    {r?.output}
                  </div>
                </div>

                {/* Error (if any) */}
                {!r?.passed && r?.error && (
                  <div className='text-red-600 mt-2'>
                    <strong>Error:</strong> {r?.error}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='text-gray-600 text-sm text-center mt-4'>
              No output available.
            </div>
          )}
        </div>
      )}

      {/* Test Case View */}
      {view === 'testcases' && testCases.length > 0 && (
        <div className='rounded-lg'>
          {testCases.slice(0, 2).map((t, idx) => (
            <div
              key={idx}
              className='grid px-7 grid-cols-1 gap-4 text-sm text-gray-700 mt-2'
            >
              {/* Input */}
              <div>
                <label className='text-sm block mb-1'>Input:</label>
                <div
                  className='bg-gray-100 rounded p-2 whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{
                    __html: t?.input?.replace(/\n/g, '<br/>')
                  }}
                />
              </div>

              {/* Output */}
              <div>
                <label className='text-sm block mb-1'>Expected Output:</label>
                <div
                  className='bg-gray-100 rounded p-2 whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{
                    __html: t?.output?.replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'testcases' && testCases.length === 0 && (
        <div className='text-gray-600 text-sm text-center mt-4'>
          No test cases available.
        </div>
      )}
    </div>
  )
}
