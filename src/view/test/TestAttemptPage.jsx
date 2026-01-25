import WarningModal from './components/WarningModal'
import TestInstructions from './TestInstructions'
import { useEffect, useState, useRef } from 'react'
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
import axios from 'axios'
import { BASE_URL } from '../../lib/config'

export default function TestAttemptPage() {
  const {
    hasAgreed,
    loading,
    error,
    response,
    isSubmitted,
    test,
    current,
    section,
    userDetails,
    submissionId,
    setIsSubmitted,
    setUFMSubmit,
    ufmSubmit
  } = useTest()
  
  const [loader, setLoader] = useState(false)
  const [warningModal, setWarningModal] = useState({
    open: false,
    warning: '',
    count: 0,
    color: '',
    justCame: true
  })


  // section.questionn 
  
  const devToolsCheckInterval = useRef(null)
  const blurCheckInterval = useRef(null)
  const originalWindowSize = useRef({ width: window.innerWidth, height: window.innerHeight })
  
  // Track UFM call state to prevent duplicates
  const ufmCallInProgress = useRef(false)
  const lastUFMCall = useRef(0)
  const UFM_COOLDOWN = 2000 // 2 seconds cooldown between UFM calls
  
  // Track specific violation states to prevent repeated calls for same issue
  const activeViolations = useRef({
    devTools: false,
    blur: false,
    fullscreen: false,
    visibility: false,
    resize: false
  })

  const handleUFM = async (violationType = 'general') => {
    const now = Date.now()
    
    // Prevent duplicate calls within cooldown period
    if (ufmCallInProgress.current || (now - lastUFMCall.current < UFM_COOLDOWN)) {
      console.log('UFM call skipped - cooldown active')
      return
    }
    
    // Prevent duplicate calls for the same active violation
    if (activeViolations.current[violationType]) {
      console.log(`UFM call skipped - ${violationType} already logged`)
      return
    }
    
    ufmCallInProgress.current = true
    activeViolations.current[violationType] = true
    lastUFMCall.current = now
    
    try {
      const res = await axios.put(
        `${BASE_URL}/api/exam/ufm-count`,
        {
          submissionId: submissionId
        },
        { withCredentials: true }
      )
      setUFMSubmit(res.data.isSubmitted)
      console.log('UFM logged:', violationType, res)
    } catch (e) {
      console.log('UFM error:', e)
    } finally {
      ufmCallInProgress.current = false
      
      // Clear the violation flag after cooldown to allow future detections
      setTimeout(() => {
        activeViolations.current[violationType] = false
      }, UFM_COOLDOWN)
    }
  }

  // 🚨 DETECT DEVTOOLS OPENING
  const detectDevTools = () => {
    const threshold = 160
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold
    
    // Check if devtools is docked
    if (widthThreshold || heightThreshold) {
      if (!activeViolations.current.devTools) {
        handleUFM('devTools');
        setWarningModal({
          open: true,
          warning: '⚠️ Developer tools detected! Close them immediately.',
          count: 0,
          color: 'red',
          justCame: false
        })
      }
      return true
    }

    // Detect undocked devtools via console
    const start = performance.now()
    debugger // This pauses if devtools is open
    const end = performance.now()
    
    if (end - start > 100) {
      if (!activeViolations.current.devTools) {
        handleUFM('devTools')
        setWarningModal({
          open: true,
          warning: '⚠️ Developer tools detected! Close them immediately.',
          count: 0,
          color: 'red',
          justCame: false
        })
      }
      return true
    }

    // Clear devTools violation if no longer detected
    if (activeViolations.current.devTools && !widthThreshold && !heightThreshold) {
      activeViolations.current.devTools = false
    }

    return false
  }

  // 🚨 DETECT WINDOW BLUR (Focus Loss)
  const handleWindowBlur = () => {
    if (!hasAgreed || isSubmitted) return
    
    if (!activeViolations.current.blur) {
      handleUFM('blur')
      setWarningModal(prev => ({
        open: true,
        warning: '⚠️ Window focus lost! Keep the test window focused.',
        count: prev.count + 1,
        color: 'orange',
        justCame: false
      }))
    }
  }

  // 🚨 DETECT WINDOW RESIZE
  const handleWindowResize = () => {
    if (!hasAgreed || isSubmitted) return
    
    const currentWidth = window.innerWidth
    const currentHeight = window.innerHeight
    const originalWidth = originalWindowSize.current.width
    const originalHeight = originalWindowSize.current.height
    
    // Allow small tolerance for browser chrome changes
    const widthDiff = Math.abs(currentWidth - originalWidth)
    const heightDiff = Math.abs(currentHeight - originalHeight)
    
    // Don't trigger resize detection if fullscreen modal is active
    if (widthDiff > 50 || heightDiff > 50) {
      if (!activeViolations.current.resize && !warningModal.justCame) {
        handleUFM('resize')
        setWarningModal({
          open: true,
          warning: '⚠️ Window resize detected! Keep the window maximized.',
          count: 0,
          color: 'orange',
          justCame: false
        })
      }
    }
  }

  // 🚨 PREVENT RIGHT CLICK
  const preventRightClick = (e) => {
    e.preventDefault()
    handleUFM('rightClick')
    setWarningModal({
      open: true,
      warning: '⚠️ Right-click is disabled during the test.',
      count: 0,
      color: 'red',
      justCame: false
    })
  }

  // 🚨 PREVENT COMMON KEYBOARD SHORTCUTS
  const preventShortcuts = (e) => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.metaKey && e.altKey && e.keyCode === 73) || // Cmd+Option+I (Mac)
      (e.metaKey && e.altKey && e.keyCode === 74) || // Cmd+Option+J (Mac)
      (e.metaKey && e.altKey && e.keyCode === 67) || // Cmd+Option+C (Mac)
      (e.ctrlKey && e.keyCode === 83) || // Ctrl+S (Save)
      (e.ctrlKey && e.keyCode === 80) || // Ctrl+P (Print)
      (e.metaKey && e.keyCode === 83) || // Cmd+S (Save Mac)
      (e.metaKey && e.keyCode === 80) // Cmd+P (Print Mac)
    ) {
      e.preventDefault()
      handleUFM('shortcut')
      setWarningModal({
        open: true,
        warning: '⚠️ Keyboard shortcuts are disabled during the test.',
        count: 0,
        color: 'red',
        justCame: false
      })
    }
  }

  // 🚨 PREVENT COPY/PASTE/CUT (except in code editor areas)
  const preventCopyPaste = (e) => {
    // Allow in specific elements like code editors
    if (
      e.target.tagName === 'TEXTAREA' ||
      e.target.tagName === 'INPUT' ||
      e.target.contentEditable === 'true' ||
      e.target.closest('.monaco-editor') || // Monaco editor
      e.target.closest('.code-editor') // Custom code editor
    ) {
      return
    }

    e.preventDefault()
    handleUFM('copyPaste')
    setWarningModal({
      open: true,
      warning: '⚠️ Copy/Paste is restricted during the test.',
      count: 0,
      color: 'orange',
      justCame: false
    })
  }

  useEffect(() => {
    // Only enforce these rules after test has started
    if (!hasAgreed || isSubmitted) return

    // Visibility change detection
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (!activeViolations.current.visibility) {
          handleUFM('visibility')
          handleVisibilityChange({ setWarningModal })
        }
      } else {
        // Clear visibility violation when user returns
        activeViolations.current.visibility = false
      }
    }

    // Fullscreen change detection - FIXED
    const onFullScreenChange = () => {
      if (!document.fullscreenElement) {
        if (!activeViolations.current.fullscreen) {
          handleUFM('fullscreen')
          setWarningModal({
            open: true,
            warning: 'Please Switch to Full Screen',
            count: 0,
            color: 'green',
            justCame: true
          })
        }
      } else {
        // Clear fullscreen violation when user returns to fullscreen
        activeViolations.current.fullscreen = false
      }
    }

    // Add all event listeners
    document.addEventListener('visibilitychange', onVisibilityChange)
    document.addEventListener('fullscreenchange', onFullScreenChange)
    document.addEventListener('contextmenu', preventRightClick)
    document.addEventListener('keydown', preventShortcuts)
    document.addEventListener('copy', preventCopyPaste)
    document.addEventListener('cut', preventCopyPaste)
    document.addEventListener('paste', preventCopyPaste)
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('resize', handleWindowResize)

    // Start devtools detection (check every 1 second)
    devToolsCheckInterval.current = setInterval(detectDevTools, 1000)

    // Continuous blur check (some students alt-tab quickly)
    blurCheckInterval.current = setInterval(() => {
      if (!document.hasFocus() && hasAgreed && !isSubmitted) {
        handleWindowBlur()
      }
    }, 500)

    // Disable text selection on the entire page
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
    document.body.style.msUserSelect = 'none'

    // Store initial window size
    originalWindowSize.current = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      document.removeEventListener('fullscreenchange', onFullScreenChange)
      document.removeEventListener('contextmenu', preventRightClick)
      document.removeEventListener('keydown', preventShortcuts)
      document.removeEventListener('copy', preventCopyPaste)
      document.removeEventListener('cut', preventCopyPaste)
      document.removeEventListener('paste', preventCopyPaste)
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('resize', handleWindowResize)

      if (devToolsCheckInterval.current) {
        clearInterval(devToolsCheckInterval.current)
      }
      if (blurCheckInterval.current) {
        clearInterval(blurCheckInterval.current)
      }

      // Re-enable text selection
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.msUserSelect = ''
    }
  }, [hasAgreed, isSubmitted])

  // 🚨 CLEAR CONSOLE PERIODICALLY
  useEffect(() => {
    if (!hasAgreed || isSubmitted) return

    const clearConsoleInterval = setInterval(() => {
      console.clear()
      console.log('%c⚠️ STOP!', 'color: red; font-size: 50px; font-weight: bold;')
      console.log(
        '%cThis is a secure exam environment. Any attempt to use developer tools will be logged.',
        'font-size: 16px;'
      )
    }, 8000)

    return () => clearInterval(clearConsoleInterval)
  }, [hasAgreed, isSubmitted])

  if (error) return <>Error</>
  if (loading) return <Loader />

  if (!userDetails || userDetails.length === 0) {
    return <TestUserDetailsInterface />
  }

  if (!hasAgreed) return <TestInstructions />
  if (isSubmitted) return <TestSubmissionModal />

  return (
    <div className='max-h-screen overflow-y-hidden'>
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
              ? 'Please Switch to Full Screen'
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