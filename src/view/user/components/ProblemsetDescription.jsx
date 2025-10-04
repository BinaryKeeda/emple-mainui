import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { ExpandMore } from '@mui/icons-material'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
export default function ProblemsetDescription () {
  const { topicName, problemTitle } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData () {
      try {
        const json = await import(
          `../data/dsaSheet/${topicName}/${problemTitle}.json`
        )
        setData(json.default)
      } catch (err) {
        console.error(err)
        setError('⚠️ Problem not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [topicName, problemTitle])

  if (loading)
    return <p className='p-6 text-center text-gray-600'>Loading problem...</p>
  if (error) return <p className='p-6 text-center text-red-500'>{error}</p>
  if (!data) return null

  return (
    <>
      <Helmet>
        <title>
          {data.title} | {topicName}
        </title>
        <meta
          name='description'
          content={`Detailed explanation and code for ${data.title} in topic ${topicName}.`}
        />
      </Helmet>

      <main className='text-gray-800 dark:text-gray-100 font-sans'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{data.title}</h1>
          <p className='mt-2 text-base text-gray-700 dark:text-gray-300'>
            <strong>Problem:</strong> {data.description}
          </p>
        </header>

        <div className='flex flex-col gap-3'>
          {data.approaches.map((approach, index) => (
            <Accordion title={approach.category}>
              <article key={index} className='ml-10 py-3 '>
                <h3 className='text-lg font-semibold'>Approch</h3>
                <p className='mb-1'>{approach.description}</p>
                <ul>
                  {approach.steps.map((item, idx) => (
                    <li className='text-gray-800'>
                      Step {idx + 1 + '. '}
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              <Accordion className='-ml-6' title={'Code'}>
                {Object.entries(approach.code).map(([lang, code]) => (
                  <div key={lang} className='mb-5'>
                    <p className='text-sm font-semibold mb-1'>
                      {lang.toUpperCase()} Code:
                    </p>
                    <SyntaxHighlighter
                      language={lang === 'c++' ? 'cpp' : lang}
                      style={oneDark}
                      showLineNumbers
                      wrapLongLines
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </Accordion>
              <Accordion title={'Time & Space Complexity'}>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 ml-10'>
                  <strong className='text-black text-md'>Time:</strong>{' '}
                  {approach.time_complexity} <br />
                  <strong className='text-black text-md'>Space:</strong>{' '}
                  {approach.space_complexity}
                </p>
              </Accordion>
            </Accordion>
          ))}

          <Accordion title='Examples'>
            {data.examples.map((ex, i) => (
              <div key={i} className='mb-3'>
                <p>
                  <strong>Input:</strong> {JSON.stringify(ex.input)}
                </p>
                <p>
                  <strong>Output:</strong> {ex.output}
                </p>
                <p>
                  <strong>Explanation:</strong> {ex.explanation}
                </p>
              </div>
            ))}
          </Accordion>

          <Accordion title='Constraints'>
            <ul className='list-disc pl-5 space-y-1'>
              {Object.entries(data.constraints).map(([k, v]) => (
                <li key={k}>
                  {k}: {String(v)}
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title='Edge Cases'>
            {data.edge_cases.map((edge, i) => (
              <div key={i} className='mb-3'>
                <p>
                  <strong>Input:</strong> {JSON.stringify(edge.input)}
                </p>
                <p>
                  <strong>Output:</strong> {edge.output}
                </p>
                <p>
                  <strong>Reason:</strong> {edge.reason}
                </p>
              </div>
            ))}
          </Accordion>

          <Accordion title='Test Cases'>
            <ul className='list-disc pl-5 space-y-1'>
              {data.test_cases.map(tc => (
                <li key={tc.id}>
                  <strong>{tc.id}:</strong> Input: {JSON.stringify(tc.input)} |
                  Expected: {tc.expected_output}
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title='Notes'>
            <ul className='list-disc pl-5 space-y-1'>
              {Object.entries(data.notes).map(([key, val]) => (
                <li key={key}>
                  <strong>{key}:</strong> {val}
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title='Follow-Up'>
            <ul className='list-disc pl-5 space-y-1'>
              {data.follow_up.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </Accordion>

          <Accordion title='Tags'>
            <div className='flex flex-wrap gap-2'>
              {data.tags.map((tag, i) => (
                <span
                  key={i}
                  className='bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>
          </Accordion>
        </div>
      </main>
    </>
  )
}

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [showData, setShowData] = useState(false)

  return (
    <div
      className={`w-full flex-col rounded-md border border-gray-100 mt-1 bg-primary dark:bg-support border-b`}
    >
      <button
        onClick={() => setShowData(prev => !prev)}
        className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-7 py-3 sm:py-5 w-full gap-2 sm:gap-4'
      >
        {/* Left Side: Expand Icon + Topic + Title */}
        <div className='flex flex-col sm:flex-row sm:items-center w-full sm:w-auto min-w-0 gap-1 sm:gap-4'>
          {/* Line 1: Expand Icon + Topic */}
          <div className='flex items-center flex-shrink-0 '>
            <ExpandMore
              className={`flex-shrink-0 transition-transform duration-300 ${
                showData ? 'rotate-360' : '-rotate-90'
              }`}
            />
            {/* <span className="ml-2 font-semibold text-lg">{`Topic ${
              // idx + 1
            }`}</span> */}
          </div>

          {/* Line 2: Title (stacked under Topic on mobile, inline on desktop) */}
          <div className='ml-8 sm:ml-0 sm:mt-0'>
            <span
              className='font-semibold text-base sm:text-lg text-left block text-ellipsis overflow-hidden'
              title={title}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Right Side: Progress Bar + Count */}
        {/* <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto sm:min-w-[200px]">
          <LinearProgress
            variant="determinate"
            value={(completed.length / data.length) * 100}
            sx={{
              height: 8,
              width: "100%",
              minWidth: 150,
              maxWidth: 370,
              borderRadius: 5,
              backgroundColor: "#inherit",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: "#f7931e",
              },
            }}
          />
          <span className="text-sm sm:text-base w-full text-right sm:text-left">
            {completed.length} / {data.length}
          </span>
        </div> */}
      </button>

      {showData && (
        <div className='px-4 sm:px-7 pb-4'>
          {children}
          {/* <ProblemTable
            data={data}
            completed={completed}
            handleCheck={handleCheck}
            topicName={title}
            topicSlug={topicSlug}
          /> */}
        </div>
      )}
    </div>
  )
}
