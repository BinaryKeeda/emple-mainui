import React, { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@mui/material'
import { Add16Regular } from '@fluentui/react-icons'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import AddGroupAdminModal from '../modals/AddGroupAdmin'
import { Add } from '@mui/icons-material'

// Lazy-loaded modals
const AddQuizModal = lazy(() => import('../modals/Addquiz'))
const AddTestModal = lazy(() => import('../modals/AddTest'))
const AddCampusTestModal = lazy(() => import('../modals/AddCampusTest'))
const AddProblem = lazy(() => import('../modals/AddProblem'))
const AddQuestionBank = lazy(() => import('../modals/AddQuestionBank'))
export default function Home () {
  const [showAddGroupAdmin, setShowAddGroupadmin] = useState(false)
  const [showAddQuiz, setShowAddQuiz] = useState(false)
  const [showAddTest, setShowAddTest] = useState(false)
  const [showAddCampustest, setshowAddCampustest] = useState(false)
  const [showAddProblem, setShowAddProblem] = useState(false)
  const [showAddQuestionBank, setShowAddQuestionBank] = useState(false)
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['adminSummary'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/admin/summary`, {
        withCredentials: true
      })
      return res.data.data
    },
    staleTime: 300000
  })

  const renderCards = () => {
    if (isLoading || !data) {
      return Array.from({ length: 6 }).map((_, idx) => (
        <DashboardCard key={idx} isLoading />
      ))
    }

    const {
      counts: {
        quizzes,
        tests,
        campusTests,
        groups,
        problems,
        users,
        questionBank
      },
      todayUsers
    } = data

    return (
      <>
        <DashboardCard title='Total Users' count={users} disabled />
        <DashboardCard title="Today's Signups" count={todayUsers} disabled />
        <DashboardCard title='Total Groups' count={groups} onAdd={() => {}} />
        <DashboardCard
          title='Total Quizzes'
          count={quizzes}
          onAdd={() => setShowAddQuiz(true)}
        />
        <DashboardCard
          title='Total Tests'
          count={tests}
          onAdd={() => setShowAddTest(true)}
        />
        <DashboardCard
          title='Campus Tests'
          count={campusTests}
          onAdd={() => {}}
        />
        <DashboardCard title='Problems' count={problems} onAdd={() => {}} />
        {/* <DashboardCard title='Question Bank' count={questionBank} onAdd={() => {}} /> */}
      </>
    )
  }

  return (
    <main className='px-2 md:px-4 py-2'>
      {/* Header */}
      <section className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10'>
        <h1 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h1>
        <div className='flex gap-3 flex-wrap'>
          <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 2
            }}
            endIcon={<Add />}
            onClick={() => {
              setShowAddGroupadmin(true)
            }}
          >
            Add Group Admin
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              borderRadius: 2
            }}
            onClick={() => setShowAddTest(true)}
          >
            Create Test <Add16Regular />
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              borderRadius: 2
            }}
            onClick={() => setShowAddQuestionBank(true)}
          >
            Create Question Bank <Add16Regular />
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              borderRadius: 2
            }}
            onClick={() => setShowAddQuiz(true)}
          >
            Add Quiz <Add16Regular />
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              borderRadius: 2
            }}
            onClick={() => setshowAddCampustest(true)}
          >
            Add Campus Test <Add16Regular />
          </Button>
          {/* <Button
            variant='contained'
            sx={{
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              borderRadius: 2
            }}
            onClick={() => setShowAddProblem(true)}
          >
            Add Problem <Add16Regular />
          </Button> */}
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className='grid grid-cols-7 sm:grid-cols-2 lg:grid-cols-7 gap-6'>
        {renderCards()}
      </section>

      {/* User Growth Graph */}
      {data?.userGrowthLast7Days && (
        <section className='mt-10'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>
            User Growth (Last 7 Days)
          </h2>
          <div className='w-full h-[300px] bg-white p-4 rounded-xl shadow-md'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data.userGrowthLast7Days}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='#3b82f6'
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Modals */}
      {showAddQuiz && (
        <Suspense fallback={<Loader />}>
          <AddQuizModal setModalClose={setShowAddQuiz} />
        </Suspense>
      )}
      {showAddTest && (
        <Suspense fallback={<Loader />}>
          <AddTestModal setModalClose={setShowAddTest} />
        </Suspense>
      )}
      {showAddCampustest && (
        <Suspense fallback={<Loader />}>
          <AddCampusTestModal onClose={() => setshowAddCampustest(false)} />
        </Suspense>
      )}
      {showAddProblem && (
        <Suspense fallback={<Loader />}>
          <AddProblem onClose={() => setShowAddProblem(false)} />
        </Suspense>
      )}
      {showAddQuestionBank && (
        <Suspense fallback={<Loader />}>
          <AddQuestionBank onClose={() => setShowAddQuestionBank(false)} />
        </Suspense>
      )}
      {showAddGroupAdmin && (
        <Suspense fallback={<Loader />}>
          <AddGroupAdminModal
            onClose={() => {
              setShowAddGroupadmin(false)
            }}
          />
        </Suspense>
      )}
    </main>
  )
}

// Dashboard Card Component
const DashboardCard = ({
  title = '',
  count = 0,
  onAdd = () => {},
  disabled = false,
  isLoading = false
}) => (
  <div className='bg-white border border-gray-200 rounded-2xl shadow-md p-6 min-h-[140px] flex flex-col justify-between items-center hover:shadow-lg transition duration-300'>
    {isLoading ? (
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin h-6 w-6 rounded-full border-2 border-black border-t-transparent'></div>
      </div>
    ) : (
      <>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='text-sm text-gray-500 mb-1'>{title}</h3>
          <p className='text-4xl font-extrabold text-gray-800'>{count}</p>
        </div>
        {/* {!disabled && (
          <Button
            onClick={onAdd}
            variant='outlined'
            sx={{
              mt: 2,
              fontSize: 12,
              textTransform: 'none',
              borderColor: '#000',
              color: '#000',
              borderRadius: 1.5
            }}
          >
            Add More
          </Button>
        )} */}
      </>
    )}
  </div>
)

// Loader Component
const Loader = () => (
  <div className='flex items-center justify-center h-[200px] w-full'>
    <div className='animate-spin h-8 w-8 rounded-full border-2 border-black border-t-transparent' />
  </div>
)
