import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  DashboardOutlined,
  BookOutlined,
  SchoolOutlined,
  Close,
  ReceiptLong,
} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useState } from 'react'
import useGroupData from '../hooks/useGroupData'
import useInviteData from '../hooks/useInviteData'
import { useUser } from '../../../context/UserContext'

export default function Sidebar({ showMenu, setShowMenu }: {
  showMenu: boolean,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // const { user } = useSelector(s => s.auth)
  const { user } = useUser();
  const { id } = useParams()
  /// user.groups = [
  //   {
  //     groupId: "68aab065376d4169212ba018",
  //     groupName: "UPES",
  //     sections: [{ _id: "68ce8cf02c704a4da7987871", name: "UPES 2026" }]
  //   }
  // ]
  const { data } = useGroupData({ userId: user?._id as string });


  const NAV_ITEMS = [
    {
      icon: <DashboardOutlined sx={{ fontSize: 25 }} />,
      label: 'Dashboard',
      path: '/user',
      type: 'private'
    },
    {
      icon: <BookOutlined sx={{ fontSize: 25 }} />,
      label: 'Practice',
      path: '/user/practice',
      type: 'private'
    },
    {
      icon: <SchoolOutlined sx={{ fontSize: 25 }} />,
      label: 'Resources',
      path: '/user/resources',
      type: 'public'
    },
    {
      icon: <ReceiptLong sx={{ fontSize: 25 }} />,
      label: 'ATS',
      path: '/user/resume',
      type: 'private'
    }
  ]

  return (
    <>
      <aside className='fixed md:flex hidden flex-col bg-[#1C1C1C] h-screen w-[90px] z-[999] left-0 top-0'>
        <ul className='flex items-center gap-3 mt-3 flex-col'>
          <span className='mb-4'>
            <Avatar src={user?.avatar as string} />
          </span>
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'private' && !user) return null
            const isActive = location.pathname === item.path

            return (
              <motion.div
                key={index}
                className='relative flex items-center justify-center w-full'
                whileHover={{ scale: 1 }}
              >
                {/* Sliding active background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layout
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 20, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                      className='absolute  left-0 top-0 w-full h-full bg-[#0e0e0e] rounded-md z-0 shadow-lg'
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={item.path}
                  className={`relative flex flex-col items-center justify-center w-full text-white p-2 transition-all duration-300 z-10 ${isActive ? 'translate-x-5' : ''
                    }`}
                >
                  <IconButton color='inherit'>{item.icon}</IconButton>
                  <span className='text-xs text-center'>{item.label}</span>
                </Link>
              </motion.div>
            )
          })}


          {data && data?.data?.map((group: any) => {
            const isActive = location.pathname === `/user/group/${group?.group?._id}`
            // const isActive = false;

            return (
              <motion.div
                // key={group._id}
                className='relative flex items-center justify-center w-full'
                whileHover={{ scale: 1 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layout
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 20, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                      className='absolute left-0 top-0 w-full h-full bg-[#0e0e0e] rounded-md z-0 shadow-lg'
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={`/user/group/${group?.group?._id}`}
                  className={`relative flex flex-col items-center justify-center w-full text-white p-2 transition-all duration-300 z-10 ${isActive ? 'translate-x-5' : ''}`}
                >
                  <IconButton color='inherit'>#</IconButton> {/* You can replace # with a group icon */}
                  <span className='text-xs text-center'>{group?.group?.groupName}</span>
                </Link>
              </motion.div>
            )
          })}

        </ul>
      </aside>
      <AnimatePresence>
        {showMenu && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-[#1C1C1C]/60 flex justify-center items-center'
          >
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className='bg-white/10 border relative border-white/20 shadow-xl rounded-2xl backdrop-blur-md p-6 w-[320px] h-[360px] flex flex-col justify-evenly items-center'
            >
              <button
                onClick={() => setShowMenu(false)}
                className='flex justify-end top-2 right-2 text-white absolute'
              >
                <Close />
              </button>
              {NAV_ITEMS.map((item, index) => {
                if (item.type === 'private' && !user) return null
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={index}
                    to={item?.path}
                    className={`group relative w-full px-4 py-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${isActive
                      ? 'bg-[#0e0e0e] w-[120%] shadow-lg translate-x-0 rounded-md'
                      : 'hover:bg-white/10 hover:scale-[1.03]'
                      }`}
                  >
                    <span className='mt-1 text-sm text-white text-center'>
                      {item.label}
                    </span>
                  </Link>
                )
              })}
              {data?.data?.map((item:any) => (
                <Link
                  key={item._id}
                  to={`/user/group/${item?.group?._id}`} // link with group id
                  className="px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-800 font-medium"
                >
                  {item.group.groupName}
                </Link>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

    </>
  )
}
