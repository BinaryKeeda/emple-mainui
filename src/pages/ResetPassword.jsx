import { BASE_URL, LOGO, MESSAGE_QUEUE_URL } from '../lib/config'
import { GoogleLogo } from '../components/Logo/GoogleLogo'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider'
import { useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSnackbar } from '../context/SnackBarContext'
export default function Signup () {
  const { showSnackbar } = useSnackbar()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios.post(
        `${MESSAGE_QUEUE_URL}/api/v4/mail/forget-password`,
        { email: email.toLowerCase() },
        { withCredentials: true }
      )
      showSnackbar('Password reset request sent successfully', 'success')
    } catch (e) {
      showSnackbar(e.response.data.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const changeHandler = e => {
    setEmail(e.target.value)
  }
  return (
    <>
      <Helmet>
        <title>Reset Password | BinaryKeeda</title>
        <meta
          name='description'
          content='Recover your Binary Keeda account password and regain access to your personalized coding dashboard.'
        />
        <meta name='robots' content='noindex, nofollow' />
        <link rel='canonical' href='https://binarykeeda.com/reset' />
      </Helmet>

      <header className='relative bg-white   p-3 h-[70px] w-full'>
        <nav className='fixed justify-between items-center flex h-[50px] top-0 pr-6 w-full'>
          <Link to={'/'}>
            <img src={LOGO} className='h-9' alt='' />
          </Link>
        </nav>
      </header>
      <main className='h-[calc(100vh-70px)] transition-all ease-linear  bg-white flex-col flex justify-center  items-center'>
        <h1 className='text-3xl mb-6 font-[Lato] '>Enter your Email</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            required
            className='border dark:border-[1px] bg-white text-black py-3 px-4 w-[350px] rounded-full'
            type='email'
            placeholder='Enter Email'
            name='email'
            value={email}
            onChange={changeHandler}
          />

          <button
            disabled={loading}
            className='py-3 bg-black text-white rounded-full'
          >
            {loading ? (
              <div className='flex justify-center items-center p-1'>
                <div className='h-[15px] animate-spin w-[15px] border-t-transparent border-[3px] dark:border-black dark:border-t-transparent rounded-full '></div>
              </div>
            ) : (
              'Continue'
            )}
          </button>
          <p className='text-center text-gray-900  text-sm'>
            Already a user ?{' '}
            <Link className='ml-1 underline text-sky-600' to='/login'>
              Login
            </Link>
          </p>

          {/* <div className='flex items-center gap-4 p-3'>
            <hr className='w-full' />
            Or
            <hr className='w-full' />
          </div>

          <a
            href={`${BASE_URL}/auth/google`}
            className='py-3 items-center flex px-6 border rounded-full'
          >
            <GoogleLogo />
            <span className='ml-6'>Continue with Google</span>
          </a> */}

          {/* <a className='text-xs underline text-center mt-4' href="/">Terms & Conditions</a> */}
        </form>
      </main>
    </>
  )
}
