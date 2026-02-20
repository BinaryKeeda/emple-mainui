
import { motion, AnimatePresence } from 'framer-motion'
import {
  ApartmentOutlined,
  ArrowLeft,
  Assessment,
  AssessmentOutlined,
  AutoStories,
  AutoStoriesOutlined,
  BallotOutlined,
  Book,
  BookOutlined,
  Code,
  CodeOutlined,
  Dashboard,
  DashboardOutlined,
  Edit,
  GroupOutlined,
  Home,
  HomeMax,
  LocationCity,
  PeopleAltOutlined,
  Person,
  Pool,
  QuizOutlined,
  SchemaOutlined,
  School,
  SchoolOutlined,
  ShortText,
  Summarize,
  Upcoming,
  ViewListOutlined,
  VolunteerActivism,
  Close
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../../../context/UserContext'

const Drawer = React.memo(({ showMenu, setShowMenu }: {
  showMenu: boolean,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { user } = useUser();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const NAV_ITEMS : {
    icon: React.ReactNode;
    label: string;
    path: string;
    type?: 'private' | 'public';
    upcoming?: string;
    badge?: string | null;
  }[] = [
    {
      icon: <DashboardOutlined sx={{ fontSize: 24 }} />,
      label: 'Dashboard',
      path: '/admin',
      type: 'private',
      badge: null
    },
    {
      icon: <QuizOutlined sx={{ fontSize: 24 }} />,
      label: 'Quiz',
      path: '/admin/quiz',
      type: 'private',
      badge: null
    },
    {
      icon: <BallotOutlined sx={{ fontSize: 24 }} />,
      label: 'Test',
      path: '/admin/test',
      type: 'private',
      badge: null
    },
    // {
    //   icon: <ApartmentOutlined sx={{ fontSize: 18 }} />,
    //   label: 'Campus Test',
    //   path: '/admin/campustest',
    //   type: 'private',
    //   badge: null
    // },
    {
      icon: <SchemaOutlined sx={{ fontSize: 24 }} />,
      label: 'Problems',
      path: '/admin/problems',
      type: 'private',
      badge: null
    },
    {
      icon: <Pool sx={{ fontSize: 24 }} />,
      label: 'Question Bank',
      path: '/admin/questionbank',
      type: 'private',
      badge: null
    },
    {
      icon: <GroupOutlined sx={{ fontSize: 24 }} />,
      label: 'Groups',
      path: '/admin/groups',
      type: 'private',
      badge: null
      // upcoming: 'true'
    },
    // {
    //   icon: <PeopleAltOutlined sx={{ fontSize: 18 }} />,
    //   label: 'Users',
    //   path: '/admin/users',
    //   type: 'private',
    //   upcoming: 'true',
    //   badge: 'New'
    // },
    // {
    //   icon: <ViewListOutlined sx={{ fontSize: 18 }} />,
    //   label: 'Sections',
    //   path: '/admin/sections',
    //   type: 'private',
    //   upcoming: 'true',
    //   badge: 'New'
    // }
  ]

  const path = useLocation().pathname

  return (
    <>
      {/* Desktop Sidebar - White UI */}
      <aside 
        className='fixed md:flex hidden flex-col bg-white top-[71px] left-0 w-[210px] h-[calc(100vh-71px)] z-[999]'
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.02)'
        }}
      >
        {/* Navigation Items */}
        <nav style={{ flex: 1, paddingTop: '1.5rem' }}>
          {NAV_ITEMS.map((item, index) => {
            if (!user && item.type === 'private') return null
            const isActive = item.path === path
            const isHovered = hoveredItem === index

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: '0.65rem 1rem',
                  margin: '0 0.75rem 0.375rem 0.75rem',
                  borderRadius: '4px',
                  cursor: item.upcoming ? 'not-allowed' : 'pointer',
                  background: isActive 
                    ? 'linear-gradient(135deg, #ff6200 35%, #f13000 100%)'
                    : isHovered
                      ? 'rgba(255, 107, 53, 0.08)'
                      : 'transparent',
                  color: isActive ? 'white' : isHovered ? '#ff6200' : '#000000',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '0.875rem',
                  // transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  // NAYA:
                    transition: 'background 0.8s cubic-bezier(0.65, 0, 0.35, 1), color 0.8s cubic-bezier(0.65, 0, 0.35, 1), box-shadow 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
                  boxShadow: isActive 
                    ? '0 4px 12px rgba(255, 107, 53, 0.25), 0 2px 4px rgba(255, 107, 53, 0.15)' 
                    : 'none',
                   transform: isHovered && !isActive ? 'translateX(4px)' : 'translateX(0)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: item.upcoming ? 0.5 : 1
                }}
              >
                <Link
                  to={item.upcoming ? '' : item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    width: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                    pointerEvents: item.upcoming ? 'none' : 'auto'
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
                  
                  {/* Badge for upcoming or new items */}
                  {item.upcoming && (
                    <span style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      lineHeight: '1.5'
                    }}>
                      New
                    </span>
                  )}
                  
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
                const isActive = path === item.path
                return (
                  <Link
                    key={index}
                    to={item.upcoming ? '' : item.path}
                    className={`group relative w-full px-4 py-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#0e0e0e] w-[120%] shadow-lg translate-x-0 rounded-md'
                        : 'hover:bg-white/10 hover:scale-[1.03]'
                    } ${item.upcoming ? 'cursor-not-allowed opacity-50' : ''}`}
                    style={{
                      pointerEvents: item.upcoming ? 'none' : 'auto'
                    }}
                  >
                    <span className='mt-1 text-sm text-white text-center'>
                      {item.label}
                    </span>
                    {item.upcoming && (
                      <span className='text-[7px] text-white bg-red-600 px-1 py-0.5 absolute top-1 right-1 rounded-md'>
                        New
                      </span>
                    )}
                  </Link>
                )
              })}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
})

export default Drawer
