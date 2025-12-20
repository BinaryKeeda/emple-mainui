import React, { useState } from 'react'
import { BASE_URL, LOGO } from '../../../lib/config'
import axios from 'axios'
import { useSnackbar } from '../../../context/SnackBarContext'
import { Modal } from '@mui/material'
import Loader from '../../../layout/Loader'
import { useTest } from '../../test/context/TestProvider'

export default function TestInstructions () {
  const { test, testResponse, setHasAgreed ,setStartedAt } = useTest()
  // const { showSnackbar } = useSnackbar()
  const sections = test?.sections || []
  const [submitting,setIsSubmitting] = useState(false);
  const handleStartTest = async () => {
    setIsSubmitting(true)
    try {
      const res = await axios.post(
        `${BASE_URL}/api/test/start`,
        {
          submissionId: testResponse._id
        },
        {
          withCredentials: true
        }
      )
      setHasAgreed(true);
      setStartedAt(res.data.startedAt);
      // showSnackbar('Test Started', 'success');

      setHasAgreed(true)
    } catch (e) {
      console.log(e)
      // showSnackbar('Error Starting Test', 'error')
    } finally {
        setIsSubmitting(false)
    }
  }
  return (
    <main className='h-screen bg-white overflow-y-scroll w-screen custom-scrollbar'>
      {/* Header */}
      <header className='h-[40px] flex justify-between shadow-sm items-center px-5'>
        {/* Left: Logo */}
        <nav>
          <img src={LOGO} className='h-8' alt='Logo' />
        </nav>

        {/* Right: Language Selector */}
        <div className='flex items-center space-x-2'>
          <label htmlFor='language' className='text-sm text-gray-600'>
            Language:
          </label>
          <select
            id='language'
            className='text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500'
            onChange={e => console.log(e.target.value)}
          >
            <option value='en'>English</option>
          </select>
        </div>
      </header>

      {/* Title Bar */}
      {/* Uncomment and adjust if you want a title */}
      {/* <nav className="h-[60px] text-white px-7 flex items-center bg-orange-500">
        <h1 className="text-xl font-semibold">General Instructions</h1>
      </nav> */}

      {/* Instructions */}
      <section className='max-w-6xl w-full mx-auto px-6 py-8'>
        <h2 className='text-center text-xl font-semibold underline mb-6'>
          Please read the following instructions carefully before beginning the
          test
        </h2>
        <ul className='list-none space-y-3 text-gray-800 text-base'>
          <li>
            ➤ The total duration of the test is{' '}
            <strong>{test?.duration || 60} minutes</strong>.
          </li>
          <li>
            ➤ The test consists of <strong>{sections.length}</strong> section
            {sections.length !== 1 && 's'}.
          </li>
          <li>
            ➤ Sections may be of type <strong>Quiz</strong> or{' '}
            <strong>Coding</strong>.
          </li>
          <li>
            ➤ Each <strong>Quiz</strong> section includes MCQs, MSQs, and short
            answer questions.
          </li>
          <li>
            ➤ Each <strong>Coding</strong> section presents a problem statement
            — you must solve it using the provided code editor.
          </li>
          <li>
            ➤ <strong>Tab change monitoring</strong> is enabled. Switching tabs
            may negatively impact your result.
          </li>
          <li>
            ➤{' '}
            <strong>
              Do not close or refresh the browser tab once the test starts.
            </strong>{' '}
            Doing so may lead to data loss or disqualification.
          </li>
          <li>
            ➤ <strong>Plagiarism is strictly prohibited.</strong> All code
            submissions must be your own.
          </li>
          <li>
            ➤ In <strong>Quiz sections</strong>, question status is color-coded:
            <ul className='list-none grid grid-cols-4 ml-6 mt-2 space-y-2'>
              <li className='flex items-center gap-2'>
                <span className='inline-block h-3 w-3 rounded-full bg-green-100 border border-green-400 ' />
                <span>Attempted (Done)</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='inline-block h-3 w-3 rounded-full bg-orange-100 border border-orange-400' />
                <span>Seen but not attempted</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='inline-block h-3 w-3 rounded-full bg-blue-100 border border-blue-400 ' />
                <span>Unseen / Not visited</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='inline-block h-3 w-3 rounded-full border-blue-600 bg-blue-50 border' />
                <span>Current Question</span>
              </li>
            </ul>
          </li>

          <li>
            ➤ The test will be <strong>auto-submitted</strong> once the time
            runs out. Please track the on-screen timer.
          </li>
          <li>
            ➤ Once a section is submitted, you may{' '}
            <strong>not be able to return</strong> to it. Double-check before
            submitting.
          </li>
          {/* <li>
            ➤ Your answers are auto-saved, but make sure to click{' '}
            <strong>“Next” or “Save”</strong> where required.
          </li> */}
          <li>
            ➤ <strong>Do not use any external help</strong> like ChatGPT, online
            IDEs, or discuss answers with anyone.
          </li>
          <li>
            ➤ <strong>Use a laptop or desktop.</strong> Mobile devices are not
            recommended.
          </li>
          <li>
            ➤ <strong>Ensure a stable internet connection.</strong> Disruptions
            may affect your test progress.
          </li>
        </ul>

        {/* Sections Overview */}
        <div className='mt-6 border-t pt-4'>
          <h3 className='text-lg font-semibold mb-2'>Test Sections Overview</h3>
          <div className='space-y-2'>
            {sections.map((sec, i) => (
              <div key={i} className=''>
                <p>
                  <strong>➤ {sec.name}</strong> – Type: {sec.sectionType}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className='mt-8 text-center text-red-600 font-semibold'>
          By clicking "Start Test", you agree to follow the rules above. Any
          violation may lead to test cancellation.
        </p>

        {/* Start Test Button */}
        <CustomButton label={'Start Test'} callback={() => {handleStartTest()}} />
      </section>

       <Modal open={submitting || false}>
        <div 
          style={{ transform: 'translate(-50%, -50%)' }}
          className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
          role='dialog'
          aria-modal='true'
        >
            <Loader />
            </div>

        </Modal>
    </main>

  )
}

export const CustomButton = ({ label, callback }) => {
  return (
    <div className='flex justify-center'>
      <button
        onClick={callback}
        className='mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors'
        aria-label={label}
      >
        {label}
      </button>
    </div>
  )
}
