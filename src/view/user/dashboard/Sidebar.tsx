import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  DashboardOutlined,
  BookOutlined,
  SchoolOutlined,
  Close,
  ReceiptLong,
  SmartToyOutlined,
  ShoppingCartOutlined,
  MapOutlined,
  FolderOutlined,
  ChatBubbleOutlineOutlined
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
  const { user } = useUser();
  const { id } = useParams()
  const location = useLocation()
  const { data } = useGroupData({ userId: user?._id as string });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const NAV_ITEMS = [
    {
      icon: <DashboardOutlined sx={{ fontSize: 18 }} />,
      label: 'Dashboard',
      path: '/user',
      type: 'private',
      badge: null
    },
    {
      icon: <BookOutlined sx={{ fontSize: 18 }} />,
      label: 'Practice',
      path: '/user/practice',
      type: 'private',
      badge: 'New'
    },
    {
      icon: <FolderOutlined sx={{ fontSize: 18 }} />,
      label: 'Resources',
      path: '/user/resources',
      type: 'public',
      badge: null
    },
    {
      icon: <ReceiptLong sx={{ fontSize: 18 }} />,
      label: 'ATS',
      path: '/user/resume',
      type: 'private',
      badge: null
    },
    {
      icon: <ChatBubbleOutlineOutlined sx={{ fontSize: 18 }} />,
      label: 'AI Interview',
      path: '/user/interview',
      type: 'public',
      badge: null
    },
    {
      icon: <ShoppingCartOutlined sx={{ fontSize: 18 }} />,
      label: 'Tech Shop',
      path: '/user/shop',
      type: 'public',
      badge: 'Sale'
    },
    {
      icon: <MapOutlined sx={{ fontSize: 18 }} />,
      label: 'Roadmaps',
      path: '/user/Roadmaps',
      type: 'public',
      badge: null
    },
    {
      icon: <SchoolOutlined sx={{ fontSize: 18 }} />,
      label: 'UPES',
      path: '/user/group/692477a42c83325f0e199afb',
      type: 'public',
      badge: null
    },
  ]

  return (
    <>
      {/* Desktop Sidebar - White UI */}
      <aside 
        className='fixed md:flex hidden flex-col bg-white top-[60px] left-0 w-[210px] h-[calc(100vh-60px)] z-[999]'
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.02)'
        }}
      >
        {/* Navigation Header */}
        <div style={{
          padding: '1.5rem 1rem 1rem 1rem'
        }}>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.05em',
            color: '#9ca3af',
            textTransform: 'uppercase'
          }}>
            Navigation
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'private' && !user) return null
            const isActive = location.pathname === item.path
            const isHovered = hoveredItem === index

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: '0.65rem 1rem',
                  margin: '0 0.75rem 0.375rem 0.75rem',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  background: isActive 
                    ? 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)'
                    : isHovered
                      ? 'rgba(255, 107, 53, 0.08)'
                      : 'transparent',
                  color: isActive ? 'white' : isHovered ? '#ff6b35' : '#6b7280',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '0.875rem',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive 
                    ? '0 4px 12px rgba(255, 107, 53, 0.25), 0 2px 4px rgba(255, 107, 53, 0.15)' 
                    : 'none',
                  transform: isHovered && !isActive ? 'translateX(4px)' : 'translateX(0)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    width: '100%',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '60%',
                      background: 'white',
                      borderRadius: '0 4px 4px 0',
                      opacity: 0.6
                    }} />
                  )}
                  
                  {/* Icon */}
                  <span 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.25s ease',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      color: 'inherit'
                    }}
                  >
                    {item.icon}
                  </span>
                  
                  {/* Label */}
                  <span style={{ flex: 1 }}>{item.label}</span>
                  
                  {/* Badge for specific items */}
                  {item.badge && (
                    <span style={{
                      background: isActive 
                        ? 'rgba(255, 255, 255, 0.25)' 
                        : item.badge === 'New'
                          ? 'rgba(255, 107, 53, 0.1)'
                          : 'rgba(239, 68, 68, 0.1)',
                      color: isActive 
                        ? 'white' 
                        : item.badge === 'New'
                          ? '#ff6b35'
                          : '#ef4444',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      lineHeight: '1.5'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Menu */}
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
                    className={`group relative w-full px-4 py-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${
                      isActive
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
              {data?.data?.map((item: any) => (
                <Link
                  key={item._id}
                  to={`/user/group/${item?.group?._id}`}
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