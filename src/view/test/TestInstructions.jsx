import React, { useState } from 'react'
import { BASE_URL, LOGO } from '../../lib/config'
import { Box, Modal, TextField } from '@mui/material'
import Loader from './components/Loader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import { useTest } from './context/TestProvider'
import { useSnackbar } from 'notistack'
export default function TestInstructions () {
  const [submitting, setIsSubmitting] = useState(false)
  const { data, helpers, setHasAgreed } = useTest()
  const navigate = useNavigate()
  const userId = useSelector(s => s.auth.user._id)
  // const testId = useSelector(s => s.auth.testId)
  const [passcode,setPasscode] = useState("");
  const { test, testId } = useTest()
  const [checked, setChecked] = useState(false)
  // const totalTime = sections.reduce((acc, sec) => acc + (sec.maxTime || 0), 0)
  const {enqueueSnackbar} = useSnackbar();
  const handleStartTest = async () => {
    setIsSubmitting(true)
    // alert(test)

    try {
      const res = await axios.post(
        `${BASE_URL}/api/exam/start-test`,
        {
          submissionId: data._id,
          testId:testId,
          passcode:passcode
        },
        { withCredentials: true }
      )
      if(res.data?.success) {
        setHasAgreed(true)
      }else{
        enqueueSnackbar(res.data?.message, {
          variant: 'error',
        });
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmitting(false);
    }
    // Simulate delay or replace with actual logic (e.g., mark agreed or post request)
  }

  return (
    <>
      <main className='h-screen bg-white overflow-y-scroll w-screen custom-scrollbar'>
        {/* Header */}
        <Header />

        {/* Instructions */}
        <section className='max-w-6xl w-full mx-auto px-6 py-8'>
          <h2 className='text-center text-xl font-semibold underline mb-6'>
            Please read the following instructions carefully before beginning
            the test
          </h2>
          <ul className='list-none space-y-3 text-gray-800 text-base'>
            <li>
              ➤ The test consists of {test?.length} {' Sections'}
              {/* <strong>{sections.length}</strong>{' '}
              {sections.length === 1 ? 'section' : 'sections'}. */}
            </li>
            <li>
              ➤ Sections may be of type <strong>Quiz</strong> or{' '}
              <strong>Coding</strong>.
            </li>
            <li>
              ➤ Each <strong>Quiz</strong> section includes MCQs, MSQs, and
              short answer questions.
            </li>
            <li>
              ➤ Each <strong>Coding</strong> section presents a problem
              statement — you must solve it using the provided code editor.
            </li>
            <li>
              ➤{' '}
              <strong className='bg-yellow-400'>
                Tab change monitoring is enabled.
              </strong>{' '}
              Switching tabs may negatively impact your result.
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
              ➤ In <strong>Quiz sections</strong>, question status is
              color-coded:
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
            <li>
              ➤ <strong>Do not use any external help</strong> like ChatGPT,
              online IDEs, or discuss answers with anyone.
            </li>
            <li>
              ➤ <strong>Use a laptop or desktop.</strong> Mobile devices are not
              recommended.
            </li>
            <li>
              ➤ <strong>Ensure a stable internet connection.</strong>{' '}
              Disruptions may affect your test progress.
            </li>
          </ul>

          {/* Section Overview */}
          {/* <div className='mt-8 border-t pt-4'>
            <h3 className='text-lg font-semibold mb-2'>Test Sections Overview</h3>
            <div className='space-y-3'>
              {sections.map((sec, i) => (
                <div key={i} className='text-base'>
                  <p>
                    <strong>➤ {sec.title}</strong> – Type: <strong>{sec.type}</strong>, Max Time: <strong>{sec.maxTime} min</strong>, Qestions: <strong>{sec.maxQuestion}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Disclaimer */}
          <div className='flex justify-center items-center mt-5 gap-3'>
            <input
              value={checked}
              onChange={e => {
                setChecked(e.target.checked)
              }}
              type='checkbox'
              name=''
              id=''
            />
            <p className='text-center text-red-600 font-semibold'>
              By clicking on Checkbox, you agree to follow the rules above. Any
              violation may lead to test cancellation.
            </p>
          </div>
          {/* Start Test Button */}
          <Box sx={{display:"flex", marginTop:"10px" ,justifyContent:"center" , alignItems:"center" , gap:"10px"}}>
            <TextField size='small' label="Passcode" value={passcode} onChange={(e)=>setPasscode(e.target.value)} />

            <CustomButton
              disabled={checked}
              callback={handleStartTest}
              label={'Start Test'}
            />
          </Box>

        </section>
        {submitting && <Loader />}
      </main>
    </>
  )
}

export const CustomButton = ({ disabled, label, callback }) => {
  return (
    <div className='flex justify-center '>
      <button
        onClick={callback}
        disabled={!disabled}
        className={`${
          !disabled
            ? 'cursor-not-allowed bg-slate-200 text-gray-600 '
            : 'hover:bg-orange-600 text-white cursor-pointer bg-orange-500 '
        } px-6  py-2  rounded-lg font-semibold transition-colors`}
        aria-label={label}
      >
        {label}
      </button>
    </div>
  )
}
