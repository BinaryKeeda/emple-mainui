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
  VolunteerActivism
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

  const NAV_ITEMS : {
    icon: React.ReactNode;
    label: string;
    path: string;
    type?: 'private' | 'public';
    upcoming?: string;
  }[] = [
    {
      icon: <DashboardOutlined sx={{ fontSize: '18px' }} />,
      label: 'Dashboard',
      path: '/user/',
      type: 'private'
    },
    {
      icon: <QuizOutlined sx={{ fontSize: '18px' }} />,
      label: 'Quiz',
      path: '/admin/quiz',
      type: 'private'
    },
    {
      icon: <BallotOutlined sx={{ fontSize: '18px' }} />,
      label: 'Test',
      path: '/admin/test',
      type: 'private'
    },
    // {
    //   icon: <ApartmentOutlined sx={{ fontSize: '18px' }} />,
    //   label: 'Campus Test',
    //   path: '/admin/campustest',
    //   type: 'private'
    // },
    {
      icon: <SchemaOutlined sx={{ fontSize: '18px' }} />,
      label: 'Problems',
      path: '/admin/problems',
      type: 'private'
    },
    {
      icon: <Pool />,
      label: 'Question Bank',
      path: '/admin/questionbank',
      type: 'private'
    },
    {
      icon: <GroupOutlined sx={{ fontSize: '18px' }} />,
      label: 'Groups',
      path: '/admin/groups',
      type: 'private',
      // upcoming: 'true
    },
    // {
    //   icon: <PeopleAltOutlined sx={{ fontSize: '18px' }} />,
    //   label: 'Users',
    //   path: '/admin/users',
    //   type: 'private',
    //   upcoming: 'true'
    // },
    // {
    //   icon: <ViewListOutlined sx={{ fontSize: '18px' }} />,
    //   label: 'Sections',
    //   path: '/admin/sections',
    //   type: 'private',
    //   upcoming: 'true'
    // }
  ]

  const path = useLocation().pathname

  return (
    <>
      <aside
        // onMouseEnter={() => setShowMenu(true)} // Adjust menu state on hover
        // onMouseLeave={() => setShowMenu(false)} // Adjust menu state on hover
        className={`
                    z-40 h-[calc(100vh-59px)] top-[60px] fixed left-0
                    bg-primary
                    transition-all duration-300 ease-in-out
                    ${showMenu
            ? 'lg:w-[150px] md:w-[100px]  '
            : 'w-0 lg:w-[87px]'
          }
                    overflow-hidden
                `}
      >
        <ul className='pt-5'>
          {NAV_ITEMS.map((item, i) => {
            const isActive = item.path === path
            if (!user && item.type == 'private') return
            return (
              <Link
                to={item.upcoming ? '' : item.path}
                key={i}
                className={`
                  ${item.upcoming ? "cursor-not-allowed" : ''}
          flex flex-col relative items-center gap-1
          ${showMenu ? 'justify-start' : 'lg:justify-center'}
          py-3
           dark:text-white text-black hover:bg-gray-500 hover:text-gray-100
          transition-all mx-2 duration-300 ease-in-out
          ${!showMenu ? 'hidden lg:flex' : ''}
          ${isActive ? 'bg-secondary dark:bg-support ' : ''}
        `}
              >
                <span className='text-end'>{item.icon}</span>
                {item.upcoming && <span className='text-[7px] text-white bg-red-600 p-1 absolute rotate-45 rounded-lg top-0 right-0'>New</span>}
                <span className='text-xs text-nowrap text-start'>
                  {item.label}
                </span>
                {/* {showMenu && (
                  <span className='text-nowrap ml-2'>{item.label}</span>
                )} */}
              </Link>
            )
          })}
        </ul>
      </aside>
    </>
  )
})

export default Drawer
