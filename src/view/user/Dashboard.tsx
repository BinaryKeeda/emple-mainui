// import { Helmet } from 'react-helmet-async'
// import { useUser } from '../../context/UserContext'
// import ProfileCard from './components/ProfileCard';
// import QuizSubmissions from './components/SubmissionsList'
// import SubmissionList from './components/SubmissionsList';
// import SubmissionListTest from './components/SubmissionListTest';
// import Leaderboard from './components/LeaderBoard';
// import ProgressArea from './components/ProgressArea';
// import CalendarComponent from './components/CalendarComponent';  // ← FIXED: ./ instead of ../
// import { useRankData } from '../../hooks/user/UserApi';
// import { useEffect } from 'react';

// export default function Dashboard() {
//   const { user } = useUser();
//   const { data: rankData, loading: rankDataLoading, error  , networkStatus} = useRankData({
//     id: user?._id!,
//     college: user?.university!
//   })

//   useEffect(() => {
//     console.log(rankData, rankDataLoading, error, networkStatus)
//     if (!rankDataLoading) console.log(error);
//   }, [rankDataLoading]);
  
//   return (
//     <div>
//       <div className='p-5 min-h-screen flex flex-col gap-6'>
//         <Helmet>
//           <title>BinaryKeeda | Dashboard</title>
//         </Helmet>
//         <section className='flex flex-col lg:flex-row gap-6 w-full dark:text-gray-50 text-gray-700'>
//           {/* Left Column */}
//           <div className='flex flex-col flex-1 gap-6'>
//             <div className='flex flex-col lg:flex-row gap-6 min-h-[300px]'>
//               <CalendarComponent />
//               <ProgressArea rankData={rankData} rankDataLoading={rankDataLoading} />
//             </div>

//             <div className=' overflow-y-auto'>
//               <SubmissionList />
//             </div>
//           </div>

//           <div className='flex flex-col gap-3 w-full lg:w-1/3'>
//             <Leaderboard rankData={rankData} rankDataLoading={rankDataLoading} />
//             <div className='flex-1 lg:min-h-[350px] overflow-y-auto'>
//               <SubmissionListTest />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }


import { Helmet } from 'react-helmet-async'
import { useUser } from '../../context/UserContext'
import ProfileCard from './components/ProfileCard';
import QuizSubmissions from './components/SubmissionsList'
import SubmissionList from './components/SubmissionsList';
import SubmissionListTest from './components/SubmissionListTest';
import Leaderboard from './components/LeaderBoard';
import CalendarComponent from './components/CalendarComponent';
import UnlockProFeatures from './components/UnlockProFeatures';
import { useRankData } from '../../hooks/user/UserApi';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('test');
  
  const { data: rankData, loading: rankDataLoading, error, networkStatus } = useRankData({
    id: user?._id!,
    college: user?.university!
  })

  useEffect(() => {
    console.log(rankData, rankDataLoading, error, networkStatus)
    if (!rankDataLoading) console.log(error);
  }, [rankDataLoading]);
  
  return (
    <div>
      <div className='p-5 min-h-screen flex flex-col gap-6 md:ml-[60px]'>
        <Helmet>
          <title>BinaryKeeda | Dashboard</title>
        </Helmet>
        <section className='flex flex-col lg:flex-row gap-6 w-full dark:text-gray-50 text-gray-700'>
          {/* Left Column */}
          <div className='flex flex-col flex-1 gap-6'>
            {/* TOP ROW - 3 Equal Width Cards */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
              <CalendarComponent />
              <Leaderboard rankData={rankData} rankDataLoading={rankDataLoading} />
              <UnlockProFeatures />
            </div>

            {/* Toggle Button */}
            <div className='flex justify-end mb-4'>
              <div className='bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg inline-flex gap-1'>
                <button
                  onClick={() => setActiveTab('test')}
                  className={`px-10 py-3 rounded-full font-semibold text-sm transition-all ${
                    activeTab === 'test'
                      ? 'bg-[#f7782a] ... text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Test Submissions
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-10 py-3 rounded-full font-semibold text-sm transition-all ${
                    activeTab === 'quiz'
                      ? 'bg-[#f7782a] ... text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Quiz Submissions
                </button>
              </div>
            </div>

            {/* Conditional Rendering */}
            <div className='overflow-y-auto'>
              {activeTab === 'test' ? <SubmissionListTest /> : <SubmissionList />}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}