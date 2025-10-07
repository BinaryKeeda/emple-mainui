import React, { useEffect, Suspense } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { Button, Chip, CircularProgress } from '@mui/material'
import {
  LanOutlined as LanOutlinedIcon,
  CalculateOutlined as CalculateOutlinedIcon,
  Hub as HubIcon
} from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useLoginModal } from '../../context/LoginModalContext'

// Icons
const ICONS = [<CalculateOutlinedIcon />, <HubIcon />, <LanOutlinedIcon />]

// Quiz Cards
const QUIZ_CARDS = [
  {
    head: 'Core Subjects',
    description:
      'Master CS fundamentals like DSA, DBMS, OS, CN, and System Design.',
    points: ['DSA', 'OS', 'DBMS', 'CN', 'System Design'],
    link: '/user/practice/Core',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
  },
  {
    head: 'Aptitude',
    description:
      'Sharpen your logic, math, and verbal reasoning to boost placement readiness.',
    points: ['Quantitative', 'Verbal Ability', 'Logical Reasoning'],
    link: '/user/practice/Aptitude',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/apti_buxabi.png'
  },
  {
    head: 'Miscellaneous',
    description:
      'Explore puzzles, GK, and tricky challenges to test your intellect.',
    points: ['Puzzles', 'General Knowledge', 'Fun Challenges'],
    link: '/user/practice/Miscellaneous',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/miscellaneous_dmmthp.png'
  }
]

// Test Series Cards
const TEST_SERIES_CARDS = [
  {
    head: 'Placement',
    description:
      'Prepare for company placements with full-length mock tests and practice modules.',
    points: ['Mock Tests', 'Practice Sets', 'Interview Prep'],
    link: '/user/test-series/Placement',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/placement_fnrrks.png'
  },
  {
    head: 'GATE',
    description:
      'Coming soon: GATE preparation modules for CS and IT aspirants.',
    points: ['Coming Soon'],
    link: null,
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.13-removebg-preview_vrn64y.png'
  }
]

// Landing Cards (Quiz / Test Series)
const LANDING_CARDS = [
  { head: 'Quiz', type: 'quiz', image: "https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/quiz_ptz1ft.png" },
  { head: 'Test Series', type: 'testSeries', image: "https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.06-removebg-preview_losyhk.png" }
]

function PracticePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = searchParams.get('tab')
  const { openLogin } = useLoginModal()
  const user = useSelector((state) => state.auth.user)
  const location = useLocation() // to build redirect URL

  useEffect(() => {
    document.title = 'BinaryKeeda | Practice'
    window.scrollTo(0, 0)
  }, [])

  const cards = selectedTab === 'quiz' ? QUIZ_CARDS : selectedTab === 'testSeries' ? TEST_SERIES_CARDS : []

  const handleSelectTab = (tab) => {
    // if (!user) {
    //   // pass redirect url including query param
    //   openLogin(`${location.pathname}?tab=${tab}`)
    //   return
    // }
    setSearchParams({ tab })
  }

  return (
    <>
      <Helmet>
        <title>BinaryKeeda | Practice</title>
      </Helmet>

      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-[300px]'>
            <CircularProgress />
            <span className='ml-3 text-gray-600 dark:text-gray-300'>
              Loading modules...
            </span>
          </div>
        }
      >
        <section className={`grid gap-6 p-5 sm:grid-cols-2 ${selectedTab ? 'lg:flex' : 'lg:grid-cols-3'}`}>
          {/* Landing Cards */}
          {!selectedTab &&
            LANDING_CARDS.map((card, idx) => (
              <div
                key={idx}
                className='flex items-center px-5 cursor-pointer flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
                onClick={() => handleSelectTab(card.type)}
              >
                <img
                  src={card.image}
                  alt={card.head}
                  className='h-[200px] w-full object-contain'
                />
                <hr className='mt-5 mx-5 w-52 ' />
                <div className='flex flex-1 items-center justify-center p-5'>
                  <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    {card.head}
                  </h2>
                </div>
              </div>
            ))}

          {/* Selected Tab Cards */}
          {selectedTab &&
            cards.map((card, idx) => (
              <Link to={card.link}
                key={idx}
                className='flex pt-4 pb-2 mx-auto px-2 w-[320px] flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
              >
                <img
                  src={card.image}
                  alt={card.head}
                  className='h-[100px] w-full object-contain'
                />

                <div className='my-2 mt-4 flex justify-center'>
                  <hr className='w-[90%] border-t-[1.5px] border-gray-300 dark:border-gray-400' />
                </div>

                <div className='flex flex-1 flex-col justify-between px-5 pb-5'>
                  <div className='mb-2 flex items-center gap-2'>
                    <span className='text-blue-600 dark:text-blue-400'>
                      {ICONS[idx % ICONS.length]}
                    </span>
                    <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                      {card.head}
                    </h2>
                  </div>

                  <p className='mb-3 text-sm text-gray-600 dark:text-gray-300'>
                    {card.description}
                  </p>

                  {/* <div className='mb-4 flex flex-wrap gap-2'>
                    {card.points.map((pt, i) => (
                      <Chip
                        key={i}
                        label={pt}
                        size='small'
                        sx={{
                          fontSize: '0.7rem',
                          backgroundColor: '#fff7ed',
                          color: '#f97316',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </div> */}

                  {card.link ? (
                    <Link to={card.link}>
                      {/* <Button
                        size='small'
                        variant='contained'
                        sx={{
                          fontSize: 8,
                          px: 4,
                          py: 1,
                          // background: 'linear-gradient(90deg, #1e293b, #3b4252)',
                          // '&:hover': {
                          //   background: 'linear-gradient(90deg, #3b4252, #1e293b)'
                          // }
                        }}
                      >
                        Explore
                      </Button> */}
                    </Link>
                  ) : (
                    <Button
                      variant='outlined'
                      disabled
                      size='small'
                      sx={{
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        color: '#ccc'
                      }}
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Link>
            ))}
        </section>
      </Suspense>
    </>
  )
}

export default PracticePage
