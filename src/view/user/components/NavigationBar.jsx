import { useEffect, useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { LOGO } from '../../../lib/config'
import AccountMenu from '../../admin/utils/HeaderMenu'
export default function NavigationBar () {
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [studyOpen, setStudyOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
      document.getElementById('root').classList.add('dark')
      setDarkMode(true)
    } else {
      document.getElementById('root').classList.remove('dark')
      setDarkMode(false)
    }
  }, [darkMode])

  return (
    <>
      <header className='relative  bg-primary h-[60px] w-full'>
        <nav
          onMouseLeave={() => {
            setPracticeOpen(false)
            setStudyOpen(false)
          }}
          className='fixed shadow-sm  bg-bg-primary dark:bg-support flex items-center px-28 pr-16 justify-between h-[60px] w-full  z-10'
        >
          <Link to={"/"}>
            <img src={LOGO} className='h-10' alt='Logo' />
          </Link>
          <ul className='list-none gap-4 text-sm flex items-center'>
            <li className='nav-link mr-2 cursor-pointer'>
              <Link to={'/'}>Home</Link>
            </li>
            <li className='nav-link mr-2 cursor-pointer'>
              <Link to={'/user'}>Dashboard</Link>
            </li>

            <li
              className='nav-link cursor-pointer  flex items-center'
              onMouseEnter={() => {
                setStudyOpen(true), setPracticeOpen(false)
              }}
            >
              Study
              <ExpandMore
                sx={{
                  fontSize: 20,
                  transition: 'transform 0.5s ease',
                  transform: studyOpen ? 'rotate(360deg)' : 'rotate(0deg)'
                }}
              />
              {studyOpen && (
                <ul className='dropdown-header'>
                  <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-dsa-sheet'}>DSA Sheet</Link>
                  </li>
                  <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-210-sheet'}>
                      210 Roadmaps Sheet
                    </Link>
                  </li>
                  <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-roadmap-sheet'}>Roadmaps</Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className='nav-link  cursor-pointer  flex items-center'
              onMouseEnter={() => {
                setPracticeOpen(true)
                setStudyOpen(false)
              }}
            >
              Practice
              <ExpandMore
                sx={{
                  fontSize: 20,
                  transition: 'transform 0.2s ease',
                  transform: practiceOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
              {practiceOpen && (
                <ul className='dropdown-header'>
                  <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/test-series'}>Test Series</Link>
                  </li>
                  <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/practice'}>Go to quiz section</Link>
                  </li>
                </ul>
              )}
            </li>

            <AccountMenu />
          </ul>
        </nav>
      </header>
    </>
  )
}
