import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTest } from './context/TestProvider'
import { BASE_URL } from '../../lib/config'
import { useNavigate } from 'react-router-dom'

export default function TestSubmissionModal() {
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(3)

  const { submissionId } = useTest()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const feedback = { rating, comment }

    axios.post(`${BASE_URL}/api/exam/submit-feedback`, { feedback, submissionId })

    setSubmitted(true) // show countdown
  }

  // 🎯 Run countdown + redirect AFTER submission
  useEffect(() => {
    if (!submitted) return

    // countdown every 1 sec
    const interval = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)

    // redirect after 3 sec
    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [submitted, navigate])

  return (
    <div className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm'>
      <div className='relative m-4 p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-gray-50 shadow-lg transition-all duration-300 scale-100 opacity-100 translate-y-0'>
        <div className='flex items-center gap-4 pb-4 text-slate-700 font-light'>
            <img
              className='h-20'
              src='https://cdn-icons-png.freepik.com/256/18945/18945371.png?uid=R128329910&ga=GA1.1.1460744493.1740725947&semt=ais_hybrid'
              alt='Submitted'
            />
            <p>Your test has been successfully submitted. Please share your feedback.</p>
          </div>

          {!submitted ? (
            <>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm text-gray-600'>Rate your experience:</label>
                  <div className='flex gap-2 pt-1'>
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => setRating(num)}
                        className={`w-10 h-10 rounded-full cursor-pointer border ${rating === num ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm text-gray-600'>Your comments (optional):</label>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className='mt-1 w-full rounded-md border p-2 text-sm text-gray-700 focus:outline-none'
                    rows={3}
                    placeholder='Any suggestions or feedback?'
                  />
                </div>
              </div>

              <div className='flex justify-end pt-6'>
                <button
                  onClick={handleSubmit}
                  disabled={!rating}
                  className='rounded-md bg-green-600 py-2 px-4 text-sm text-white hover:bg-green-700 disabled:opacity-50'
                >
                  Submit Feedback
                </button>
              </div>
            </>
          ) : (
            <div className='text-center pt-4 text-green-700 font-medium'>
              Thank you for your feedback! Redirecting in {count}...
            </div>
          )}
        </div>
      </div>
      )
}
