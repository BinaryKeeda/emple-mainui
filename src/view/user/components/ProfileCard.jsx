import React, { useState, useMemo } from 'react'
import { Avatar, Tooltip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Edit } from '@mui/icons-material'
import ProfileModal from '../ProfileModal'
import { SectionHeader } from '../utils/Helpers'
import { useTheme } from '@mui/material/styles'

const MiniBarChart = React.memo(() => {
  const { data: rankData } = useSelector(s => s.auth.rankData)
  const solutions = rankData?.userRank?.solutions || {}

  const categories = [
    { key: 'aptitude', label: 'Aptitude', color: '#FFDAB3' },
    { key: 'core', label: 'Core', color: '#FFBC80' },
    { key: 'miscellaneous', label: 'Misc', color: '#FFA64D' },
    { key: 'easy', label: 'Easy', color: '#C8F0F0' },
    { key: 'medium', label: 'Medium', color: '#FFE5B4' },
    { key: 'hard', label: 'Hard', color: '#FFB3B3' }
  ]

  const maxAttempts = useMemo(
    () => Math.max(...categories.map(c => solutions[c.key]?.attempted || 0), 1),
    [solutions]
  )

  return (
    <div className='flex flex-col  w-full mt-4 px-6 pb-4 overflow-hidden'>
      <SectionHeader title='Solved Problems' />
      <hr className='border-gray-300 mb-2' />
      {categories.map(c => {
        const attempted = solutions[c.key]?.attempted || 0
        const widthPercent = (attempted / maxAttempts) * 100

        return (
          <div key={c.key} className='flex items-center gap-3 h-6'>
            {/* Label */}
            <span className='w-16 text-xs font-medium text-gray-700 dark:text-gray-300'>
              {c.label}
            </span>

            {/* Bar */}
            <Tooltip title={`${attempted} solved`} arrow>
              <div className='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative'>
                <div
                  style={{ width: `${widthPercent}%`, background: c.color }}
                  className='h-full rounded-full transition-all duration-700 ease-out shadow-sm'
                />
              </div>
            </Tooltip>

            {/* Count */}
            <span className='w-6 text-xs text-right font-semibold text-gray-800 dark:text-gray-200'>
              {attempted}
            </span>
          </div>
        )
      })}
    </div>
  )
})

const ProfileCard = React.memo(({ user }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const theme = useTheme()

  const fallback = (value, defaultValue = 'Not Provided') =>
    value || defaultValue

  return (
    <div className='flex relative flex-col flex-1 pb-4 overflow-visible bg-white dark:bg-[#1e1e1e] shadow-lg rounded-xl w-full max-w-sm'>
      {/* Avatar + Name + Email */}
      <div className='flex flex-col overflow-visible h-max items-center px-6 mt-[-14px] mb-1'>
        <Avatar
          alt={user?.name}
          src={user?.avatar}
          sx={{
            width: 80,
            height: 80,
            border: `3px solid ${
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff'
            }`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        />
        <div className='mt-1 flex flex-col items-center justify-center'>
          <Typography
            variant='subtitle1'
            className='text-gray-900 dark:text-white'
          >
            {fallback(user?.name, 'Unknown')}
          </Typography>
          <Typography
            variant='body2'
            className='text-gray-500 dark:text-gray-300'
          >
            {fallback(user?.email, 'No email')}
          </Typography>
        </div>
      </div>

      {/* Profile Details */}
      <div className='mt-2 px-6 text-xs flex flex-col gap-2 h-max overflow-hidden text-gray-700 dark:text-gray-400'>
        <div className='flex justify-between text-gray-900'>
          <span className='font-medium'>Semester:</span>
          <span>{fallback(user?.semester)}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='font-medium'>Program:</span>
          <span className='text-wrap'>{fallback(user?.program)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium'>University:</span>
          <span>{fallback(user?.university)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium'>Specialisation:</span>
          <span>{fallback(user?.specialisation)}</span>
        </div>
        {/* <div className='flex justify-between'>
          <span className='font-medium'>Joined:</span>
          <span>
            {user?.createdAt
              ? new Date(user.createdAt).toDateString()
              : 'Unknown'}
          </span>
        </div> */}
        <div className='flex justify-between'>
          <span className='font-medium'>Status:</span>
          <span className='text-green-600 font-medium'>Active</span>
        </div>
      </div>

      {/* Edit Button */}
      <div className='absolute right-0 top-0 p-3'>
        <Tooltip title='Edit Profile'>
          <span
            role='button'
            aria-label='Edit Profile'
            className='cursor-pointer'
            onClick={() => setShowEditModal(true)}
          >
            <Edit sx={{ fontSize: 14 }} />
          </span>
        </Tooltip>
      </div>

      {/* Mini Bar Chart */}
      <div className='mt-4' style={{ minHeight: 180 }}>
        <MiniBarChart />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <ProfileModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
})

export default ProfileCard
