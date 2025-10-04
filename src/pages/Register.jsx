import React, { useRef, useState } from 'react'
import { Home20Regular, PersonMail16Regular } from '@fluentui/react-icons'
import axios from 'axios'
import { BASE_URL, LOGO2, MESSAGE_QUEUE_URL } from '../lib/config'
import { useSnackbar } from '../context/SnackBarContext'
import { Helmet } from 'react-helmet-async'
import Header from '../layout/Header'
import { Google } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slice/UserSlice'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { GoogleLogo } from '../components/Logo/GoogleLogo'

export default function SignUpForm () {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', '']) // 6-digit OTP
  const [otpSent, setOtpSent] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const otpRefs = useRef([...Array(6)].map(() => React.createRef()))

  const handleSendOTP = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(
        `${MESSAGE_QUEUE_URL}/api/v4/mail/signup/requested`,
        { email }
      )
      if (res.status === 200) {
        setMessage('OTP sent to your email', 'success')
        setOtpSent(true)
      }
    } catch (err) {
      console.error(err)
      setError(err?.response.data.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async e => {
    e.preventDefault()
    setLoading(true)
    const finalOtp = otp.join('')
    if (finalOtp.length !== 6) {
      setMessage('Enter full 6-digit OTP', 'warning')
      return
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/verify/otp`,
        {
          email,
          otp: finalOtp
        },
        { withCredentials: true }
      )
      if (res.status === 200) {
        setMessage('Login successful!', 'success')
        dispatch(loginSuccess(res.data.user))
      }
    } catch (err) {
      console.error(err)
      setError('OTP verification failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeOtp = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].current.focus()
    }
  }

  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
          <div className='relative rounded-2xl h-[100px] w-[330px] shadow-lg flex items-center justify-center space-x-4'>
            <Loader />
          </div>
        </div>
      )}
      <Helmet>
        <title>BinaryKeeda | Register</title>
        <meta
          name='description'
          content='Login to BinaryKeeda Campus to access your courses and resources.'
        />
        <link rel='canonical' href='https://binarykeeda.com/login' />
      </Helmet>

      <main className='flex  w-full h-screen justify-center items-center '>
        <div className='flex flex-col w-[380px] h-full items-center justify-center'>
          <form
            onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}
            className='w-full relative bg-white/10 backdrop-blur-md py-14 p-8 h-max rounded-lg '
          >
            <h1 className='text-2xl text-center font-semibold mb-7'>
              {otpSent
                ? 'Enter the OTP sent to your email'
                : 'Enter your email'}
            </h1>
            <div className='flex justify-center items-center '>
              <a
                className='text-[#f1f1f1] w-full justify-center flex gap-3 bg-black text-sm items-center px-4 py-3 rounded-md'
                href={`${BASE_URL}/auth/google`}
              >
                Continue with Google
                <GoogleLogo
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    padding: '5px',
                    fontSize: 26
                  }}
                  color='inherit'
                />
              </a>
            </div>
            <div className='flex gap-2 items-center text-[#111827] justify-center my-4'>
              <hr className='flex-1' />
              or
              <hr className='flex-1' />
            </div>

            <div className='relative mb-1'>
              <input
                required
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='email'
                disabled={otpSent}
                className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-600 text-gray-700 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
                placeholder='Enter Your Email'
              />
              <PersonMail16Regular className='absolute top-1/2 right-3 -translate-y-1/2 text-[#111827]' />
            </div>
            {message && (
              <p className='mb-5 pt-2 ml-1 text-green-500 text-xs'>{message}</p>
            )}
            {error && (
              <p className='mb-5 pt-2 ml-1 text-red-500 text-xs'>{error}</p>
            )}

            {otpSent && (
              <>
                <p className='mb-3'>Enter OTP</p>
                <div className='flex mb-5 gap-3 justify-evenly'>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpRefs.current[idx]}
                      required
                      maxLength={1}
                      type='text'
                      inputMode='numeric'
                      className='w-[50px] h-[50px] text-center text-xl bg-transparent text-gray-600 border border-gray-300 rounded-md focus:outline-none'
                      value={digit}
                      onChange={e => handleChangeOtp(idx, e.target.value)}
                      onKeyDown={e => handleKeyDown(idx, e)}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              type='submit'
              className='px-6 py-2 mt-4 bg-orange-500 w-full hover:bg-orange-600 text-white rounded-lg font-semibold'
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>

            {!otpSent && (
              <>
                {' '}
                <div className='text-[#111827] my-3 flex justify-end  text-xs'>
                  Already a user ?
                  <Link to='/login' className='ml-1 hover:underline '>
                    Login
                  </Link>
                </div>
              </>
            )}

            <p className='absolute  text-xs w-full left-0 bottom-4 text-center z-10 text-[#111827]  mt-4'>
              {' '}
              <a
                target='_blank'
                className='hover:underline'
                href='/terms-of-service'
              >
                {' '}
                Term & Conditions{' '}
              </a>{' '}
              |{' '}
              <a
                target='blank'
                className='hover:underline'
                href='/privacy-policy'
              >
                Privacy Policy
              </a>{' '}
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
