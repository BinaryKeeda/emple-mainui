// import React from 'react'
// import { IconButton } from '@mui/material'
// import { Close } from '@mui/icons-material'
// import Loader from '../../layout/Loader'
// import { useOutputWindow } from '../../context/TestOutputContext'
// import { Clock16Color, Clock16Filled } from '@fluentui/react-icons'

// export default function CodeOutputWindow ({ testCases }) {
//   const {
//     showOutputWindow,
//     setShowOutputWindow,
//     isExecuting,
//     results = [],
//     summary,
//     codeReview
//   } = useOutputWindow()

//   const reviewMetrics = [
//     'indentation',
//     'modularity',
//     'variable_name_convention',
//     'time_complexity',
//     'space_complexity'
//   ]
//   const passedReview = reviewMetrics.filter(
//     k => (codeReview?.[k] || 0) > 0
//   ).length
//   const failedReview = reviewMetrics.length - passedReview
//   return (
//     <div
//       className={`h-[calc(100%-0px)] overflow-scroll relative transition-all duration-200 ease-linear w-full  bg-gray-50`}
//     >
//       <div className='absolute top-10 w-full flex flex-col p-5 space-y-4'>
//         {/* Close Button */}

//         <div className='bg-white rounded p-5'>
//           <div className='flex justify-end'>
//             <IconButton onClick={() => setShowOutputWindow(prev => !prev)}>
//               <Close />
//             </IconButton>
//           </div>
//           {/* Submission Summary */}
//           {(!summary || !results) && (
//             <div className='flex justify-center my-20 w-full'>
//               <div className='flex gap-2'>
//                 <div className='h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]'></div>
//                 <div className='h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]'></div>
//                 <div className='h-2 w-2 rounded-full bg-black animate-bounce'></div>
//               </div>
//             </div>
//           )}

//           {summary && (
//             <div className=' px-6 py-4 rounded  flex justify-between items-center'>
//               <span className='text-gray-900 font-medium text-lg'>
//                 {summary.passed}/{summary.total} Test Cases Passed
//               </span>
//               <span className='text-sm text-gray-700'>
//                 Avg Time: <strong>{summary.avgTime}s</strong>
//               </span>
//               <span className='text-sm text-gray-700'>
//                 Avg Memory: <strong>{summary.avgMemory} KB</strong>
//               </span>
//             </div>
//           )}

//           {/* Code Review Summary
//         {codeReview && (
//           <div className=' px-6 py-4 rounded  flex justify-between items-center'>
//             <span className='text-purple-600 font-medium text-lg'>Code Review</span>
//             <span className='text-sm text-gray-700'><strong>{passedReview}</strong> Passed, <strong>{failedReview}</strong> Failed</span>
//             <span className='text-sm text-gray-700'>Score: <strong>{codeReview.finalScore}</strong></span>
//           </div>
//         )} */}

//           {/* Top 2 Test Case Results */}
//           {results?.length > 0 && (
//             <div className=' px-6 py-4 rounded '>
//               <h3 className='text-lg font-semibold mb-3'>Test Case Results</h3>
//               <div className='space-y-3'>
//                 {results.slice(0, 2).map((r, idx) => (
//                   <div
//                     key={idx}
//                     className={`p-4 rounded border text-sm ${
//                       r.passed
//                         ? 'border-green-400 bg-green-50'
//                         : 'border-red-400 bg-red-50'
//                     }`}
//                   >
//                     <p className='font-medium text-gray-800 mb-2'>
//                       Test Case #{idx + 1}
//                     </p>
//                     <p>
//                       <strong>Input:</strong> <code>{r.input}</code>
//                     </p>
//                     <p>
//                       <strong>Expected:</strong> <code>{r.expected}</code>
//                     </p>
//                     <p>
//                       <strong>Your Output:</strong> <code>{r.output}</code>
//                     </p>
//                     {!r.passed && (
//                       <p className='text-red-500'>
//                         <strong>Error:</strong> {r.error || 'Incorrect Output'}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Code Review Breakdown */}
//           {/* {codeReview && (
//           <div className=' px-6 py-4 rounded '>
//             <h3 className='text-lg font-semibold mb-3'>Code Review Breakdown</h3>
//             <div className='grid grid-cols-2 gap-3 text-sm'>
//               {reviewMetrics.map((metric, idx) => (
//                 <div
//                   key={idx}
//                   className={`p-3 rounded font-medium ${
//                     codeReview[metric] > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                   }`}
//                 >
//                   {metric.replace(/_/g, ' ')}: {codeReview[metric]}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )} */}
//         </div>

//         <div>
//           {testCases?.map((testcase, idx) => {
//             if (idx > 2) {
//               return
//             } else {
//               return (
//                 <div className='flex flex-col'>
//                   <span>{JSON.stringify(testcase.input)}</span>
//                   <span>{JSON.stringify(testcase.output)}</span>
//                 </div>
//               )
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { useOutputWindow } from './context/TestOutputContext'

export default function CodeOutputWindow ({ testCases = [] }) {
  const {
    showOutputWindow,
    setShowOutputWindow,
    results = [],
    summary,
    isExecuting = false
  } = useOutputWindow()

  const [view, setView] = useState('testcases') // 'testcases' | 'result'

  useEffect(() => {
    if (isExecuting || results?.length > 0) setView('result')
    else setView('testcases')
  }, [results, isExecuting])

  return (
    <div className='bottom-0 z-40  rounded-t-3xl relative transition-transform duration-300 ease-in-out'>
      {/* Header Buttons */}
      <div className='flex absolute p-2 items-center h-[45px] w-full  border border-slate-300 bg-white px-3 text-center text-sm transition-all shadow-sm text-slate-600'>
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



      <div className='w-full h-[40px]' />

        {/* {JSON.stringify(results)} */}
      {/* Summary */}
      {view === 'result' && summary  && (
        <div className='bg-white items-center rounded-lg shadow p-4  px-8 flex justify-between text-sm text-gray-700'>
          <div>
            <strong>{summary.passed}</strong> / {summary.total} Passed
          </div>
          <div className='flex flex-col' > 
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
        <div className='rounded-lg px-7 pt-4 pb-20'>
          {(isExecuting )? (
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
        <div className='rounded-lg pb-12 pt-4'>
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
