// import React from 'react'
// import { useTest } from '../../context/TestProvider'
// import Loader from '../../layout/Loader'
// import axios from 'axios'
// import {
//   ArrowNext20Filled,
//   CheckmarkSquare20Filled,
//   LockClosed16Filled
// } from '@fluentui/react-icons'
// import { BASE_URL, LOGO } from '../../lib/config'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { Box, Icon, IconButton, Modal } from '@mui/material'
// import { logOutUser } from '../../redux/thunks/UserThunks'
// import Stepper from './components/Stepper'
// import BackGround from './BackGround'
// // import {logoutUser} from '../../redux/thunks/UserThunks';

// export default function TestAttemptPage () {
//   const {
//     data,
//     current,
//     setTest,
//     response,
//     test,
//     section,
//     loading,
//     error,
//     helpers
//   } = useTest()
//   const [loader, setLoader] = useState(false)
//   const dispatch = useDispatch()
//   const [isFullScreen, setIsFullScreen] = useState(true)
//   const [autoSubmit, setAutoSubmit] = useState(false)
//   const [showFullscreenModal, setShowFullscreenModal] = useState(true)
//   const [exitCount, setExitCount] = useState(
//     parseInt(localStorage.getItem('count')) || 0
//   )

//   // useEffect(() => {
//   //   if (exitCount > 2) {
//   //     // dispatch(logoutUser());
//   //     // setAutoSubmit(true);
//   //   }
//   // }, [exitCount])
//   // Auto fullscreen request if not already fullscreen
//   const enterFullScreen = () => {
//     const el = document.documentElement
//     if (el.requestFullscreen) el.requestFullscreen()
//     else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
//     else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
//     else if (el.msRequestFullscreen) el.msRequestFullscreen()
//   }

//   // Re-enter fullscreen when modal appears
//   const reEnterFullScreen = () => {
//     enterFullScreen()
//     setShowFullscreenModal(false)
//   }

//   const handleKey = e => {
//     if (e.key == 'F' || e.key == 'f') reEnterFullScreen()
//   }

//   const markUFM = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/test/campus/mark-ufm`,
//         {
//           submissionId: data._id
//         },
//         { withCredentials: true }
//       )
//       // console.log(res.data.submitted)
//       if (res.data.submitted) {
//         setAutoSubmit(true)
//         console.log('UFM marked, reloading page')
//         window.location.reload()
//       }
//       return res.data
//     } catch (error) {
//       console.error('Error marking UFM:', error)
//       return { success: false, message: 'Failed to mark UFM' }
//     }
//   }

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       const isFS = !!document.fullscreenElement
//       // setIsFullScreen(isFS)

//       if (!isFS) {
//         markUFM()
//         setExitCount(prev => prev + 1)

//         setShowFullscreenModal(true)
//       } else {
//         setShowFullscreenModal(false)
//       }
//     }

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         const newCount = exitCount + 1
//         localStorage.setItem('ufm', newCount)
//         setExitCount(newCount)
//         alert('Tab switch detected , Another attempt may submit the quiz.')
//         markUFM()
//       }
//     }

//     document.addEventListener('fullscreenchange', handleFullscreenChange)
//     document.addEventListener('visibilitychange', handleVisibilityChange)
//     document.addEventListener('keypress', handleKey)
//     // Optional: Warn before unload (refresh/close)
//     // window.addEventListener('beforeunload', e => {
//     //   e.preventDefault()
//     //   e.returnValue = ''
//     // })

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange)
//       document.removeEventListener('visibilitychange', handleVisibilityChange)
//       // window.removeEventListener('beforeunload', () => {})
//     }
//   }, [])

//   const userId = useSelector(s => s.auth.user._id)
//   const testId = useSelector(s => s.auth.testId)
//   if (loading)
//     return (
//       <div className='flex justify-center items-center h-screen text-2xl'>
//         <Loader />
//       </div>
//     )

//   if (error) return <>Error</>

//   if (!helpers.hasAgreed) {
//     return (
//       <>
//         <TestInstructions />
//       </>
//     )
//   }

//   if (helpers.isSubmitted) {
//     return <SubmitModal />
//   }
//   const startSection = async () => {
//     try {
//       setLoader(true)
//       const res = await axios.post(
//         `${BASE_URL}/api/test/campus/start-section`,
//         {
//           testId,
//           userId,
//           sectionId: section.sectionId,
//           sectionType: section.type
//         },
//         { withCredentials: true }
//       )
//       helpers.setData(prev => ({
//         ...prev,
//         response: [...(prev.response || []), res.data.section]
//       }))
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoader(false)
//     }
//   }

//   return (
//     <>
//       {loader && (
//         <>
//           <Modal open={loader || false}>
//             <div
//               style={{ transform: 'translate(-50%, -50%)' }}
//               className='relative top-[50%] left-[50%] p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg'
//               role='dialog'
//               aria-modal='true'
//             >
//               <Loader />
//             </div>
//           </Modal>
//         </>
//       )}
//       {!response ||
//       response.length <= current ||
//       response[current]?.isSubmitted ? (
//         <>
//           <header className=' z-50 fixed  top-0 w-full bg-  flex items-center px-5 py-2  '>
//             <img src={LOGO} className='h-9' alt='' />
//           </header>
//           <section className='mt-[60px] pb-20 w-screen  mx-auto flex flex-col items-center space-y-4'>
//             <Stepper test={test} current={current} startSection={0} />
//             <BackGround />

//             {test.map((s, index) => {
//               let status

//               if (current === -1) {
//                 status = index === 0 ? 'unlocked' : 'locked'
//               } else if (index < current) {
//                 status = 'done'
//                 return
//               } else if (index == current) {
//                 status = 'unlocked'
//               } else {
//                 status = 'locked'
//               }

//               return (
//                 <>
//                   <div
//                     key={index}
//                     onClick={() => {
//                       if (status === 'unlocked') {
//                         // startSection()
//                       }
//                     }}
//                     className={`w-full relative  z-50 max-w-3xl  flex items-center justify-between px-6 py-4 rounded-lg shadow-md border-l-4 transition-all duration-200
//                     ${status === 'done' ? 'border-green-500 bg-green-50' : ''}
//                     ${
//                       status === 'unlocked'
//                         ? 'border-blue-500 bg-blue-100 hover:bg-blue-100 cursor-pointer'
//                         : ''
//                     }
//                     ${
//                       status === 'locked'
//                         ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : ''
//                     }
//                   `}
//                   >
//                     <div className='flex  flex-col'>
//                       <h2 className='text-lg font-semibold'>{s.title}</h2>
//                       <span className='text-sm capitalize text-gray-500'>
//                         {s.type}
//                       </span>

//                       <span className='text-xs text-gray-600'>
//                         {/* {s?.questions?.length || s?.problems?.length} Questions
//                         for {s.maxTime} minutes */}
//                         Status :{' '}
//                         {status == 'locked'
//                           ? 'Upcoming'
//                           : status == 'done'
//                           ? 'Completed'
//                           : 'Current'}
//                       </span>
//                     </div>

//                     {/* {status == 'unlocked' && (
//                       <span className='text-xs text-gray-500 left-0 bottom-3 text-center w-full absolute'>
//                         Click to Attempt
//                       </span>
//                     )} */}
//                     <div className='ml-4'>
//                       {status === 'locked' ? (
//                         <LockClosed16Filled className='w-5 h-5' />
//                       ) : status === 'done' ? (
//                         <CheckmarkSquare20Filled className='w-5 h-5 text-green-600' />
//                       ) : (
//                         // <ArrowNext20Filled />
//                         <button
//                           onClick={() => {
//                             startSection()
//                           }}
//                           className='bg-sky-700 cursor-pointer rounded-md px-3 py-1  text-xs text-white'
//                         >
//                           Proceed
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )
//             })}
//             {/* <p>
//               Note : All the sections are mandatory to attempt then only the
//               submmission would be counted
//             </p> */}
//           </section>
//         </>
//       ) : (
//         <>
//           {section.type == 'quiz' ? (
//             <>
//               <TestQuizInterface autoSubmit={autoSubmit} />
//             </>
//           ) : (
//             <>
//               <TestCodingInterface autoSubmit={autoSubmit} />
//             </>
//           )}
//         </>
//       )}
//       <Modal
//         open={showFullscreenModal || autoSubmit}
//         onClose={() => {}}
//         sx={{ border: 'none' }}
//         aria-labelledby='fullscreen-warning'
//         aria-describedby='fullscreen-required'
//       >
//         <Box className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-md shadow-lg w-[90%] max-w-[400px] text-center'>
//           {!autoSubmit ? (
//             <>
//               <h2 className='text-xl font-semibold text-red-600 mb-2'>
//                 Fullscreen Required
//               </h2>

//               {exitCount >= 2 ? (
//                 <p className='text-sm text-gray-600 mb-4'>
//                   You have exited fullscreen mode multiple times. Please try
//                   again to continue the test.
//                 </p>
//               ) : exitCount >= 1 ? (
//                 <p className='text-gray-700 mb-4'>
//                   Warning: One more attempt to leave fullscreen will result in
//                   automatic submission.
//                 </p>
//               ) : (
//                 <p className='text-gray-700 mb-4'>
//                   Please switch to fullscreen mode to continue the test.
//                 </p>
//               )}

//               <button
//                 onClick={reEnterFullScreen}
//                 className='bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md'
//               >
//                 Enter Fullscreen (Press F)
//               </button>
//             </>
//           ) : (
//             <>
//               <div className='flex items-center gap-2 mb-2'>
//                 <svg
//                   className='w-6 h-6 text-red-600'
//                   fill='none'
//                   stroke='currentColor'
//                   viewBox='0 0 24 24'
//                 >
//                   <path
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth={2}
//                     d='M12 9v2m0 4h.01M5.93 5.93l12.14 12.14M12 5v.01M5 12H4.99M19 12h.01M12 19v.01'
//                   />
//                 </svg>
//                 <h2 className='text-xl font-semibold text-red-600'>
//                   Unfair Means Detected
//                 </h2>
//               </div>
//               <p className='text-gray-700'>
//                 Your test is being auto-submitted due to policy violation.
//               </p>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </>
//   )
// }
// const SubmitModal = () => {
//   const [count, setCount] = useState(5)
//   const dispacth = useDispatch()
//   const handleLogout = () => {
//     dispacth(logOutUser())
//   }
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount(prev => {
//         if (prev <= 1) {
//           dispacth(logOutUser())
//         }
//         return prev - 1
//       })
//     }, 1000)
//   }, [])
//   return (
//     <div className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm'>
//       <div className='relative m-4 p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-gray-50 shadow-lg transition-all duration-300 scale-100 opacity-100 translate-y-0'>
//         <div className=' py-4 flex gap-3 items-center text-slate-600 font-light'>
//           <span className='flex  w-[140px] justify-center'>
//             <img
//               className='h-20'
//               src='https://cdn-icons-png.freepik.com/256/18945/18945371.png?uid=R128329910&ga=GA1.1.1460744493.1740725947&semt=ais_hybrid'
//               alt=''
//             />
//           </span>
//           <p>
//             Your test has been successfully queued for evaluation. You will be
//             notified once the evaluation is complete.
//           </p>
//         </div>
//         <div className='flex justify-end pt-6'>
//           <button
//             onClick={handleLogout}
//             className='rounded-md cursor-pointer bg-gray-600 py-2 px-4 text-sm text-white hover:bg-green-700'
//           >
//             Close {'( ' + count + ' )'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
import WarningModal from './components/WarningModal'
import TestInstructions from './TestInstructions'
import { useEffect, useState } from 'react'
import {
  handleFullScreenChange,
  handleVisibilityChange,
  isFullScreen,
  switchToFullScreen
} from './helpers/control'
import TestCodeInterface from './TestCodeInterface'
import TestQuizInterface from './TestQuizInterface'
import TestScreenInterface from './TestScreenInterface'
import Loader from './components/Loader'
import TestSubmissionModal from './TestSubmissionModal'
import TestUserDetailsInterface from './TestUserDetailsInterface'
import { useTest } from './context/TestProvider'

export default function TestAttemptPage () {
  const {
    hasAgreed,
    loading,
    error,
    response,
    isSubmitted,
    test,
    current,
    section,
    userDetails
  } = useTest()
  const [loader, setLoader] = useState(false)
  const [warningModal, setWarningModal] = useState({
    open: false,
    warning: '',
    count: 0,
    color: '',
    justCame: true
  })
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState == 'hidden') {
        handleVisibilityChange({ setWarningModal })
      }
    }
    const onFullScreenChange = () => {
      if (!document.fullscreenElement) {
        handleFullScreenChange({ setWarningModal })
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    document.addEventListener('fullscreenchange', onFullScreenChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      document.removeEventListener('fullscreenchange', onFullScreenChange)
    }
  }, [])
  if (error) return <>Error</>
  if (loading) return <><Loader/></>

  if (!userDetails || userDetails.length === 0) {
    return <TestUserDetailsInterface />
  }

  if (!hasAgreed) return <TestInstructions />
  if (isSubmitted) return <TestSubmissionModal />
  

  return (
    <div className='max-h-screen  overflow-y-hidden'>
      {!response ||
      response.length <= current ||
      response[current]?.isSubmitted ? (
        <TestScreenInterface
          setLoader={setLoader}
          current={current}
          test={test}
        />
      ) : (
        <>
          {section?.type === 'quiz' ? (
            <TestQuizInterface />
          ) : (
            <TestCodeInterface />
          )}
        </>
      )}

      {/* Loader */}
      {loader && <Loader />}

      {/* Warning Modal */}
      {(warningModal?.open || warningModal.justCame) && (
        <WarningModal
          onConfirm={() => {
            if (!isFullScreen()) {
              switchToFullScreen()
            }
            setWarningModal(prev => ({
              ...prev,
              open: false,
              warning: '',
              color: '',
              justCame: false
            }))
          }}
          warning={
            warningModal.justCame
              ? 'Please Switch to Full Screen '
              : warningModal.warning
          }
          color={warningModal.justCame ? 'green' : warningModal.color}
          count={warningModal.count}
          justCame={warningModal.justCame}
        />
      )}
    </div>
  )
}
