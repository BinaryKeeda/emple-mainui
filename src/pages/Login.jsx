import {
  PersonMail16Regular,
  Eye24Regular,
  EyeOff24Regular
} from '@fluentui/react-icons'
import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSnackbar } from '../context/SnackBarContext'
import { BASE_URL, LOGIN_URL, MESSAGE_QUEUE_URL } from '../lib/config'
import ReCAPTCHA from 'react-google-recaptcha'
import { loginSuccess } from '../redux/slice/UserSlice'
import { IconButton } from '@mui/material'
import { GoogleLogo } from '../components/Logo/GoogleLogo'
import { ArrowBackIos } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import {  GoogleAuthenticationButton } from '../utilities/CustomButton'
import { useCurrentPath } from '../utilities/useCurrentPath'
import { useEffect } from 'react'

// --------------------------- Modular Components ---------------------------

const Captcha = ({ captchaRef, onChange }) => (
  <div
    style={{ transform: 'scale(0.85)', transformOrigin: '0 0' }}
    className='w-full scale-75 flex justify-start'
  >
    <ReCAPTCHA
      ref={captchaRef}
      theme='dark'
      sitekey='6Ld_aW0rAAAAAB_LtUxYA9ecnv00KQDZjNxAEuYJ'
      onChange={onChange}
    />
  </div>
)

export const ForgotPasswordForm = ({
  email,
  setEmail,
  handleResetLink,
  setForgetPass,
  message,
  error
}) => (
  <form
    onSubmit={handleResetLink}
    className='relative w-full bg-white/10 backdrop-blur-md h-max rounded-lg'
  >
    <div className='flex items-center'>
      <IconButton onClick={() => setForgetPass(false)}>
        <ArrowBackIos sx={{ cursor: 'pointer' }} />
      </IconButton>
      <h1 className='flex-1 mr-3 text-2xl font-semibold text-gray-600 text-center'>
        Enter Email
      </h1>
    </div>

    <div className='relative mt-6'>
      <input
        required
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 text-gray-600 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
        placeholder='Enter Your Email'
      />
      <PersonMail16Regular className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-800' />
    </div>

    <p className='text-xs mt-2 ml-1 text-green-400'>{message}</p>
    <p className='text-xs mt-2 ml-1 text-red-400'>{error}</p>

    <button
      type='submit'
      className='px-6 mt-5 py-2 bg-orange-500 w-full hover:bg-orange-600 text-white rounded-lg font-semibold'
    >
      Reset
    </button>
  </form>
)

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  handleForgotPassword,
  message,
  error,
  captchaRef,
  handleCaptchaChange,
  navigate
}) => (
  <form
    onSubmit={handleLogin}
    className='w-full relative bg-white/10 backdrop-blur-md py-14 p-8 h-max rounded-lg'
  >
    <h1 className='text-2xl font-semibold text-gray-900 text-center mb-7'>
      Welcome User
    </h1>

   <GoogleAuthenticationButton />

    <div className='flex gap-2 items-center text-gray-700 justify-center my-4'>
      <hr className='flex-1' /> or <hr className='flex-1' />
    </div>

    <div className='relative my-6'>
      <input
        required
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 text-gray-600 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
        placeholder='Enter Your Email'
      />
      <PersonMail16Regular className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-700' />
    </div>

    <div className='relative my-6'>
      <input
        required
        onChange={e => setPassword(e.target.value)}
        value={password}
        type={showPassword ? 'text' : 'password'}
        className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 text-gray-600 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
        placeholder='Enter Your Password'
      />
      <button
        type='button'
        onClick={() => setShowPassword(prev => !prev)}
        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-700'
      >
        {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
      </button>
    </div>

    <p className='text-green-500 text-xs'>{message}</p>
    <p className='text-red-500 text-xs mb-2'>{error}</p>

    <Captcha captchaRef={captchaRef} onChange={handleCaptchaChange} />

    <button
      type='submit'
      className='px-6 py-2 bg-orange-500 w-full hover:bg-orange-600 text-white rounded-lg font-semibold'
    >
      Login
    </button>

    <div className='text-gray-500 my-3 flex justify-between text-xs'>
      <button
        type='button'
        onClick={handleForgotPassword}
        className='hover:text-orange-500'
      >
        Forget Password?
      </button>
      <button
        type='button'
        onClick={() => window.location.href = "/register"}
        className='hover:text-orange-500'
      >
        Sign Up
      </button>
    </div>

    <p className='absolute text-xs w-full left-0 text-center z-10 text-gray-500 mt-4'>
      <a target='_blank' className='hover:underline' href='/terms-of-service'>
        Term & Conditions
      </a>{' '}
      |{' '}
      <a target='_blank' className='hover:underline' href='/privacy-policy'>
        Privacy Policy
      </a>
    </p>
  </form>
)

// --------------------------- Main Login Component ---------------------------
export default function Login ({ redirect = '/dashboard' }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [forgetPass, setForgetPass] = useState(false)
  const captchaRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const handleCaptchaChange = token => setCaptchaToken(token)

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
        navigate(redirect) // <-- redirect based on prop
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
  useEffect(() => {
    window.location.href = LOGIN_URL;
  } , []);
  // return (
  //   <main className='flex w-full h-screen justify-center items-center'>
  //     <div className='flex bg-white  w-[380px] flex-col h-max items-center justify-center'>
  //       {forgetPass ? (
  //         <ForgotPasswordForm
  //           email={email}
  //           setEmail={setEmail}
  //           handleResetLink={handelResetLink}
  //           setForgetPass={setForgetPass}
  //           message={message}
  //           error={error}
  //         />
  //       ) : (
  //         <LoginForm
  //           email={email}
  //           setEmail={setEmail}
  //           password={password}
  //           setPassword={setPassword}
  //           showPassword={showPassword}
  //           setShowPassword={setShowPassword}
  //           handleLogin={handleLogin}
  //           handleForgotPassword={handleForgotPassword}
  //           message={message}
  //           error={error}
  //           captchaRef={captchaRef}
  //           handleCaptchaChange={handleCaptchaChange}
  //           navigate={navigate}
  //         />
  //       )}
  //     </div>
  //   </main>
  // )

  return <></>
}
