import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../lib/config'
import { useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForward, ArrowForwardIos } from '@mui/icons-material'

/** ==== Compute Full Test + Section Analysis ==== */
const computeAnalysis = (response, testId) => {
  let totalMarks = 0
  let obtainedMarks = 0
  let negativeMarks = 0
  let sectionAnalysis = []

  response.forEach(section => {
    const meta = testId.sections.find(s => s._id === section.sectionId)
    let sectionTotal = 0
    let sectionObtained = 0
    let sectionNegative = 0
    let correctCount = 0
    let wrongCount = 0
    let skippedCount = 0

    /** === QUIZ === */
    if (section.sectionType === 'Quiz') {
      const questions = meta?.questionSet || []

      section.quizAnswers?.forEach(answerObj => {
        Object.entries(answerObj).forEach(([qid, markedAnswer]) => {
          const question = questions.find(q => q._id === qid)
          if (!question) return

          sectionTotal += question.marks
          totalMarks += question.marks

          let isCorrect = false
          if (question.category === 'Text') {
            isCorrect =
              question.answer?.trim().toLowerCase() ===
              markedAnswer?.trim().toLowerCase()
          } else {
            const correctOption = question.options.find(o => o.isCorrect)
            isCorrect = correctOption?.text === markedAnswer
          }

          if (isCorrect) {
            sectionObtained += question.marks
            obtainedMarks += question.marks
            correctCount++
          } else if (markedAnswer) {
            wrongCount++
            if (question.negative) {
              sectionNegative += question.negative
              negativeMarks += question.negative
            }
          } else {
            skippedCount++
          }
        })
      })
    }

    /** === CODING === */
    if (section.sectionType === 'Coding') {
      section.codingAnswers?.forEach(ansBlock => {
        const qid = Object.keys(ansBlock)[0]
        const codeData = ansBlock[qid]

        const totalCases = codeData.totalTestCases || 0
        const passedCases = codeData.passedTestCases || 0

        sectionTotal += totalCases
        sectionObtained += passedCases
        totalMarks += totalCases
        obtainedMarks += passedCases
      })
    }

    sectionAnalysis.push({
      sectionName: meta?.name || 'Untitled Section',
      sectionType: section.sectionType,
      totalMarks: sectionTotal,
      obtainedMarks: sectionObtained,
      negativeMarks: sectionNegative,
      correctCount,
      wrongCount,
      skippedCount
    })
  })

  return {
    totalMarks,
    obtainedMarks,
    negativeMarks,
    cumulativeMarks: obtainedMarks - negativeMarks,
    sectionAnalysis,
    verdict: obtainedMarks - negativeMarks >= totalMarks * 0.4 ? 'Pass' : 'Fail' // 40% pass
  }
}

const TestSeriesPreview = () => {
  const [data, setData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const { id: responseId } = useParams()

  useEffect(() => {
    const fetchTestResponse = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/test/response/${responseId}`,
          {
            withCredentials: true
          }
        )
        if (res.data?.status) {
          const result = res.data.data
          setData(result)
          const stats = computeAnalysis(result.response, result.testId)
          setAnalysis(stats)
        }
      } catch (err) {
        console.error('Error fetching preview:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTestResponse()
  }, [responseId])

  if (loading) return <p className='text-center py-6'>Loading...</p>
  if (!data)
    return <p className='text-center py-6 text-red-500'>No data found</p>

  const { testId, response } = data
  const section = response[currentSectionIndex]
  const sectionMeta = testId.sections.find(s => s._id === section.sectionId)
  const sectionName = sectionMeta?.name || `Section ${currentSectionIndex + 1}`
  const sectionType = section.sectionType

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h2 className='text-3xl font-bold mb-6'>Test Preview: {testId?.name}</h2>

      {/* ==== Full Test Analysis ==== */}
      {analysis && (
        <div className='bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200'>
          <div className='flex justify-between items-center border-b pb-3 mb-4'>
            <h3 className='text-xl font-semibold text-gray-800'>
              Full Test Analysis
            </h3>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                analysis.verdict === 'Pass'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {analysis.verdict}
            </span>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
              <p className='text-xs uppercase tracking-wider text-gray-500'>
                Total Marks
              </p>
              <p className='mt-1 text-lg font-bold text-gray-800'>
                {analysis.totalMarks}
              </p>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
              <p className='text-xs uppercase tracking-wider text-gray-500'>
                Obtained
              </p>
              <p className='mt-1 text-lg font-bold text-green-600'>
                {analysis.obtainedMarks}
              </p>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
              <p className='text-xs uppercase tracking-wider text-gray-500'>
                Negative
              </p>
              <p className='mt-1 text-lg font-bold text-red-500'>
                {analysis.negativeMarks}
              </p>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
              <p className='text-xs uppercase tracking-wider text-gray-500'>
                Cumulative
              </p>
              <p className='mt-1 text-lg font-bold text-gray-800'>
                {analysis.cumulativeMarks}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==== Section Analysis Table ==== */}
      {analysis && (
        <div className='bg-white p-6 rounded-lg shadow mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Section Analysis</h3>
          <table className='w-full text-sm border'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-2'>Section</th>
                <th className='border p-2'>Type</th>
                <th className='border p-2'>Total</th>
                <th className='border p-2'>Obtained</th>
                <th className='border p-2'>Negative</th>
                <th className='border p-2'>Correct</th>
                <th className='border p-2'>Wrong</th>
                <th className='border p-2'>Skipped</th>
              </tr>
            </thead>
            <tbody>
              {analysis.sectionAnalysis.map((sec, idx) => (
                <tr key={idx}>
                  <td className='border p-2'>{sec.sectionName}</td>
                  <td className='border p-2'>{sec.sectionType}</td>
                  <td className='border p-2'>{sec.totalMarks}</td>
                  <td className='border p-2'>{sec.obtainedMarks}</td>
                  <td className='border p-2'>{sec.negativeMarks}</td>
                  <td className='border p-2'>{sec.correctCount}</td>
                  <td className='border p-2'>{sec.wrongCount}</td>
                  <td className='border p-2'>{sec.skippedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='flex text-xs justify-center'> 
        <p>Switch Sections</p>
      </div>

      <div className='flex mb-5 items-center text-xs justify-center gap-3'>
        <IconButton
          disabled={currentSectionIndex === 0}
          onClick={() => setCurrentSectionIndex(i => i - 1)}
          className='px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300'
        >
          <ArrowBackIos/>
        </IconButton>
        <span>
          {currentSectionIndex + 1} / {response.length}
        </span>
        <IconButton
          disabled={currentSectionIndex === response.length - 1}
          onClick={() => setCurrentSectionIndex(i => i + 1)}
          className='px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300'
        >
          <ArrowForwardIos/>
        </IconButton>
      </div>
      {/* ==== Current Section Questions ==== */}
      <div className='bg-white p-6 rounded-lg shadow mb-6'>
        <h3 className='text-xl font-semibold mb-4'>
          {sectionName} ({sectionType})
        </h3>

        {sectionType === 'Quiz' &&
          sectionMeta?.questionSet?.map((q, idx) => {
            const userAnswerObj = section.quizAnswers.find(
              a => a[q._id] !== undefined
            )
            const userAnswer = userAnswerObj ? userAnswerObj[q._id] : null
            const correctAnswer =
              q.options?.find(o => o.isCorrect)?.text || q.answer

            let scoreDisplay = '0'
            if (userAnswer) {
              scoreDisplay =
                userAnswer === correctAnswer ? `+${q.marks}` : `-${q.negative}`
            }

            return (
              <div key={q._id} className='border p-4 mb-4 rounded bg-gray-50'>
                <p className='font-medium mb-2'>
                  Q{idx + 1}: {q.question}
                </p>
                {q.options?.length > 0 && (
                  <ul className='list-disc pl-5'>
                    {q.options.map((opt, i) => (
                      <li
                        key={opt._id}
                        className={
                          opt.text === correctAnswer
                            ? 'text-green-600 font-semibold'
                            : opt.text === userAnswer &&
                              opt.text !== correctAnswer
                            ? 'text-red-600 font-semibold'
                            : ''
                        }
                      >
                        {String.fromCharCode(65 + i)}. {opt.text}
                      </li>
                    ))}
                  </ul>
                )}
                <p>Your Answer: {userAnswer || 'Not Attempted'}</p>
                <p>Correct Answer: {correctAnswer}</p>
                <p className='font-bold'>Marks: {scoreDisplay}</p>
              </div>
            )
          })}

        {sectionType === 'Coding' &&
          section.codingAnswers.map((ansBlock, idx) => {
            const qid = Object.keys(ansBlock)[0]
            const codeData = ansBlock[qid]
            return (
              <div key={qid} className='border p-4 mb-4 rounded bg-gray-50'>
                <p className='font-medium mb-2'>Coding Problem {idx + 1}</p>
                <p>
                  Marks: {codeData.passedTestCases} / {codeData.totalTestCases}
                </p>
                <pre className='bg-white p-2 rounded border overflow-x-auto'>
                  {codeData.code}
                </pre>
              </div>
            )
          })}
      </div>

      {/* ==== Pagination ==== */}
    </div>
  )
}

export default TestSeriesPreview
