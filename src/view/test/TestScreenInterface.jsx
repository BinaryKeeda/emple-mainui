import React from 'react'
import { BASE_URL, LOGO } from '../../lib/config'
import BackGround from './BackGround'
import Stepper from './components/Stepper'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { CheckmarkSquare20Filled, LockClosed16Filled } from '@fluentui/react-icons'
import { useTest } from './context/TestProvider'

export default function TestScreenInterface ({
  setLoader,
  test,
  current
}) {
  const { section, setData , testId} = useTest()
  const userId = useSelector(s => s.auth.user._id)
  const startSection = async () => {
    try {
      setLoader(true)
      const res = await axios.post(
        `${BASE_URL}/api/exam/start-section`,
        {
          testId,
          userId,
          sectionId: section.sectionId,
          sectionType: section.type
        },
        { withCredentials: true }
      )
      setData(prev => ({
        ...prev,
        response: [...(prev.response || []), res.data.section]
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }
  return (
    <>
      <header className=' z-50  fixed  top-0 w-full bg-  flex items-center px-5 py-4  '>
        <img src={LOGO} className='h-9' alt='' />
      </header>
      <section className='mt-[60px] pb-20 w-screen  mx-auto flex flex-col items-center space-y-4'>
        <Stepper test={test} current={current} startSection={0} />
        <BackGround />
        {test.map((s, index) => {
          let status

          if (current === -1) {
            status = index === 0 ? 'unlocked' : 'locked'
          } else if (index < current) {
            status = 'done'
            return
          } else if (index == current) {
            status = 'unlocked'
          } else {
            status = 'locked'
          }

          return (
            <div
              key={index}
              className={`w-full relative  z-50 max-w-3xl  flex items-center justify-between px-6 py-4 rounded-lg shadow-md border-l-4 transition-all duration-200
                    ${status === 'done' ? 'border-green-500 bg-green-50' : ''}
                    ${
                      status === 'unlocked'
                        ? 'border-blue-500 bg-blue-100 hover:bg-blue-100 cursor-pointer'
                        : ''
                    }
                    ${
                      status === 'locked'
                        ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : ''
                    }
                  `}
            >
              <div className='flex  flex-col'>
                <h2 className='text-lg font-semibold'>{s.title}</h2>
                <span className='text-sm capitalize text-gray-500'>
                  {s.type}
                </span>

                <span className='text-xs text-gray-600'>
                  {/* {s?.questions?.length || s?.problems?.length} Questions
                        for {s.maxTime} minutes */}
                  Status :{' '}
                  {status == 'locked'
                    ? 'Upcoming'
                    : status == 'done'
                    ? 'Completed'
                    : 'Current'}
                </span>
              </div>

              {/* {status == 'unlocked' && (
                      <span className='text-xs text-gray-500 left-0 bottom-3 text-center w-full absolute'>
                        Click to Attempt
                      </span>
                    )} */}
              <div className='ml-4'>
                {status === 'locked' ? (
                  <LockClosed16Filled className='w-5 h-5' />
                ) : status === 'done' ? (
                  <CheckmarkSquare20Filled className='w-5 h-5 text-green-600' />
                ) : (
                  // <ArrowNext20Filled />
                  <button
                    onClick={() => {
                      startSection()
                    }}
                    className='bg-sky-700 cursor-pointer rounded-md px-3 py-1  text-xs text-white'
                  >
                    Proceed
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
