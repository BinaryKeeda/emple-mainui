import { shallowEqual, useSelector } from 'react-redux'
import QuizSubmissions from './components/SubmissionsList'
import TestSubmissions from './components/SubmissionListTest'
import Leaderboard from './components/LeaderBoard'
import ProgressArea from './components/ProgressArea'
import ProfileCard from './components/ProfileCard'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLoginModal } from '../../context/LoginModalContext'

function Home () {
  const user = useSelector(s => s.auth.user, shallowEqual)
  const { openLogin, closeLogin } = useLoginModal()

  useEffect(() => {
    if (!user) {
      openLogin()
    } else {
      closeLogin()
    }
  }, [user, openLogin, closeLogin])

  // If not logged in, we can return null or a placeholder
  if (!user) {
    return null // The login modal will show, so we hide the dashboard
  }

  return (
    <div className='p-5 min-h-screen flex flex-col gap-6'>
      <Helmet>
        <title>BinaryKeeda | Dashboard</title>
      </Helmet>
      <section className='flex flex-col lg:flex-row gap-6 w-full dark:text-gray-50 text-gray-700'>
        {/* Left Column */}
        <div className='flex flex-col flex-1 gap-6'>
          <div className='flex flex-col lg:flex-row gap-6 min-h-[300px]'>
            <ProfileCard user={user} className='flex-1 min-h-[300px]' />
            <ProgressArea
              solutions={user.solutions}
              className='flex-1 min-h-[300px]'
            />
          </div>

          <div className='flex-1 md:min-h-[300px] overflow-y-auto'>
            <QuizSubmissions />
          </div>
        </div>

        {/* Right Column */}
        <div className='flex flex-col gap-3 w-full lg:w-1/3'>
          <div className='flex-1 min-h-[250px]'>
            <Leaderboard user={user} userUniversity={user.university} />
          </div>
          <div className='flex-1 min-h-[350px] overflow-y-auto'>
            <TestSubmissions />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
