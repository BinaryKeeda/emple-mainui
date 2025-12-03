import MDEditor from '@uiw/react-md-editor'
import React from 'react'

export default function TestProblemDescription({ problem }) {
  return (
    <div className='flex-[0.6] bg-white  h-[calc(100%-0px)] overflow-y-scroll relative min-w-[200px] custom-scrollbar'>
      <div className='flex-[0.4] overflow-y-scroll h-full p-4 space-y-4 text-sm'>
        <h2 className='text-xl font-semibold'>Problem Description</h2>

        <MDEditor.Markdown
          source={problem?.description}
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#ffffff",
            color:"#000",
            borderRadius: "6px",
            lineHeight:"1.4",
            lineHeightStep:"1",
            gap:"5px"
          }}
        />

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
        {/* {problem?.inputFormat && (
          <div>
            <strong>Input Format:</strong>
            <ul>
              {problem.inputFormat.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )} */}

        {/* {problem?.outputFormat && (
          <div>
            <strong>Output Format:</strong>
            <ul>
              {problem.outputFormat.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )} */}

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

        {/* {problem?.examples?.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Sample testcases
            </h3>
            <div className='flex flex-col gap-4'>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className='bg-gray-200 p-3 rounded-md'>
                  <div className='text-sm'>
                    <strong>Input:</strong> <br></br>
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: typeof ex?.input === 'string'
                          ? ex.input.replace(/\n/g, '<br/>')
                          : Array.isArray(ex?.input)
                            ? ex.input.join('<br/>')
                            : String(ex?.input ?? '')
                      }}
                      className='bg-gray-100 px-1 py-0.5 rounded'
                    />
                  </div>
                  <div className='text-sm'>
                    <strong>Output:</strong> <br />
                    <p className='bg-gray-100 px-1 py-0.5 rounded'>
                      {ex.output}
                    </p>
                  </div>
                  {ex.explanation && (
                    <p className='text-sm text-gray-600'>
                      <strong>Explanation:</strong> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}

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

        {/* {problem?.sampleTestCases && (
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
        )} */}
      </div>
    </div>
  )
}
