import { Helmet } from 'react-helmet-async'
import { useUser } from '../../context/UserContext'
import ProfileCard from './components/ProfileCard';
import QuizSubmissions from './components/SubmissionsList'
import SubmissionList from './components/SubmissionsList';
import SubmissionListTest from './components/SubmissionListTest';
import Leaderboard from './components/LeaderBoard';
import ProgressArea from './components/ProgressArea';
import { useRankData } from '../../hooks/user/UserApi';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useUser();
  const { data: rankData, loading: rankDataLoading, error  , networkStatus} = useRankData({
    id: user?._id!,
    college: user?.university!
  })

  useEffect(() => {
    console.log(rankData, rankDataLoading, error, networkStatus)
    if (!rankDataLoading) console.log(error);
  }, [rankDataLoading]);
  return (
    <div>

      <div className='p-5 min-h-screen flex flex-col gap-6'>
        <Helmet>
          <title>BinaryKeeda | Dashboard</title>
        </Helmet>
        <section className='flex flex-col lg:flex-row gap-6 w-full dark:text-gray-50 text-gray-700'>
          {/* Left Column */}
          <div className='flex flex-col flex-1 gap-6'>
            <div className='flex flex-col lg:flex-row gap-6 min-h-[300px]'>
              <ProfileCard rankData={rankData} />
              <ProgressArea rankData={rankData} rankDataLoading={rankDataLoading}
              />
            </div>

            <div className=' overflow-y-auto'>
              <SubmissionList />
            </div>
          </div>

          <div className='flex flex-col gap-3 w-full lg:w-1/3'>
            {/* <div className='flex-1 '> */}

            <Leaderboard rankData={rankData} rankDataLoading={rankDataLoading} />
            {/* </div> */}
            <div className='flex-1 lg:min-h-[350px] overflow-y-auto'>
              <SubmissionListTest />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
