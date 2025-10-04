import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Eye24Regular,
  EyeOff24Regular,
  Home20Regular
} from '@fluentui/react-icons'
import axios from 'axios'
import { BASE_URL, LOGO2 } from '../lib/config'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loader from '../layout/Loader'
import { loginSuccess } from '../redux/slice/UserSlice'
import { useSnackbar } from 'notistack'
import { Tooltip } from '@mui/material'

export default function SetUpPassword () {
  const { id } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const validatePassword = pwd => {
    return (
      pwd.length >= 8 &&
      /[A-Za-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[@$!%*#?&^()[\]{}<>]/.test(pwd)
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(
        `${BASE_URL}/auth/verify`,
        { password },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${decodeURIComponent(id)}`
          }
        }
      )
      dispatch(loginSuccess(res.data.user))
    } catch (e) {
      // showSnackbar('Invalid Token', 'error')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getIndicator = condition => (condition ? true : false)
  const isPasswordValid =
    validatePassword(password) && password === confirmPassword

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
        <title>BinaryKeeda | Setup Password</title>
        <meta
          name='description'
          content='Login to BinaryKeeda Campus to access your courses and resources.'
        />
        <link rel='canonical' href='https://binarykeeda.com/login' />
      </Helmet>

      <header className='absolute flex justify-between w-full z-50'>
        <div className='flex px-5 py-2 text-gray-50 cursor-pointer items-center'>
          <img src={LOGO2} className='h-10' alt='' />
          BinaryKeeda
        </div>
        <div className='flex px-5 py-2 text-gray-50 cursor-pointer items-center'>
          <Tooltip title='Home'>
            <Link to={'/'}>
              <Home20Regular />
            </Link>
          </Tooltip>
        </div>
      </header>

      <div className='fixed inset-0 cursor-pointer'>
        <img
          src='https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?cs=srgb&dl=pexels-hillaryfox-1595385.jpg&fm=jpg'
          alt='Background'
          className='w-full h-full object-[100%_bottom]'
        />
        <div className='absolute inset-0 bg-black/70' />
      </div>

      <main className='h-[calc(100vh-80px)] py-20 items-center flex md:px-20 px-4 justify-end relative z-10 w-full'>
        <form
          onSubmit={handleSubmit}
          className='w-[500px] flex flex-col relative text-gray-200 bg-white/10 backdrop-blur-md py-14 p-8 h-max rounded-lg shadow-lg'
        >
          <h1 className='text-2xl text-start font-semibold mb-7'>
            Setup Password
          </h1>

          {/* Password */}
          <div className='relative'>
            <input
              required
              onChange={e => setPassword(e.target.value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-200 text-gray-200 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
              placeholder='Enter Your Password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-200'
            >
              {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className='relative my-6'>
            <input
              required
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={showPassword ? 'text' : 'password'}
              className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-200 text-gray-200 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 shadow-sm'
              placeholder='Confirm Your Password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-200'
            >
              {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
            </button>
          </div>

          {/* Password Rules Checklist - Inline
          <div className='text-xs text-white/80 mb-4 ml-1 flex flex-wrap gap-x-4 gap-y-1'>
            <p className={getIndicator(password.length >= 8) ? 'text-green-500' : ''}>
              Minimum 8 characters
            </p>
            <span>•</span>
            <p className={getIndicator(/[A-Za-z]/.test(password)) ? 'text-green-500' : ''}>
              At least one letter
            </p>
            <span>•</span>
            <p className={getIndicator(/\d/.test(password)) ? 'text-green-500' : ''}>
              At least one number
            </p>
            <span>•</span>
            <p className={getIndicator(/[@$!%*#?&^()[\]{}<>]/.test(password)) ? 'text-green-500' : ''}>
              At least one special character
            </p>
            <span>•</span>
            <p className={getIndicator(password && password === confirmPassword) ? 'text-green-500' : ''}>
              Passwords Match
            </p>
          </div> */}
          <p className='text-xs'>
            Password must contain at least one uppercase letter, one lowercase
            letter, one number, and one special character, and be at least 8
            characters long.
          </p>

          {/* Submit Button - Enabled only when valid */}
          <button
            type='submit'
            disabled={!isPasswordValid}
            className={`sticky bottom-0 mt-4 py-2 rounded-md transition-colors ${
              isPasswordValid
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </form>
      </main>
    </>
  )
}
