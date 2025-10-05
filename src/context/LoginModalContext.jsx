// LoginModalContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'
import Login, { ForgotPasswordForm, LoginForm } from '../pages/Login'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, MESSAGE_QUEUE_URL } from '../lib/config'
import zIndex from '@mui/material/styles/zIndex'

const LoginModalContext = createContext()
export const useLoginModal = () => useContext(LoginModalContext)

export const LoginModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState(null)

  // openLogin now accepts redirect
  const openLogin = ({ redirect } = {}) => {
    setRedirectUrl(redirect || null)
    setOpen(true)
  }

  const closeLogin = () => setOpen(false)

  return (
    <LoginModalContext.Provider value={{ openLogin, closeLogin }}>
      {children}
      <LoginModal  open={open} onClose={closeLogin} redirect={redirectUrl} />
    </LoginModalContext.Provider>
  )
}

const LoginModal = ({ open, onClose, redirect }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [forgetPass, setForgetPass] = useState(false)
  const captchaRef = useRef(null)
  const dispatch = useDispatch()
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const handleCaptchaChange = token => setCaptchaToken(token)
  useEffect(() => {}  , []);
  const handleLogin = async e => {
    e.preventDefault()
    setError(null)
    if (!captchaToken) {
      setMessage('Please complete the CAPTCHA.', 'warning')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password, captcha: captchaToken },
        { withCredentials: true }
      )
      if (res.status === 200) {
        setMessage('Login successful!')
        dispatch(loginSuccess(res.data.user))
        onClose() // close modal
        if (redirect) window.location.href = redirect
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.')
    } finally {
      captchaRef.current?.reset()
      setLoading(false)
    }
  }

  const handelResetLink = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        `${MESSAGE_QUEUE_URL}/api/v4/mail/forget-password`,
        { email: email.toLowerCase() },
        { withCredentials: true }
      )
      setMessage('Password reset request sent successfully', 'success')
    } catch (e) {
      setError(e?.response?.data?.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => setForgetPass(true)

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.2 } }
  }

  return (
    <AnimatePresence>
      {open && (
        <Modal sx={{zIndex:998}} open={open} onClose={onClose} closeAfterTransition>
          <motion.main
            className='flex w-full h-screen justify-center items-center bg-black/40'
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <motion.div
              className='relative flex w-[480px] flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg'
              variants={modalVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <IconButton
                onClick={() => {
                  navigate(-1)
                  onClose()
                }}
                sx={{
                  position: 'absolute',
                  zIndex: 999,
                  top: 8,
                  right: 8
                }}
                size='small'
              >
                <CloseIcon />
              </IconButton>

              {forgetPass ? (
                <ForgotPasswordForm
                  email={email}
                  setEmail={setEmail}
                  handleResetLink={handelResetLink}
                  setForgetPass={setForgetPass}
                  message={message}
                  error={error}
                />
              ) : (
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleLogin={handleLogin}
                  handleForgotPassword={handleForgotPassword}
                  message={message}
                  error={error}
                  captchaRef={captchaRef}
                  handleCaptchaChange={handleCaptchaChange}
                />
              )}
            </motion.div>
          </motion.main>
        </Modal>
      )}
    </AnimatePresence>
  )
}
