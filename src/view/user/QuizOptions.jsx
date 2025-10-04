import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Button, Chip, CircularProgress } from '@mui/material'
import {
  Psychology as PsychologyIcon,
  Hub as HubIcon,
  School as SchoolIcon
} from '@mui/icons-material'
import { useEffect } from 'react'
import LanOutlinedIcon from '@mui/icons-material/LanOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { Helmet } from 'react-helmet-async'
const ICONS = [<CalculateOutlinedIcon />, <HubIcon />, <LanOutlinedIcon />]

const CARDS = [
  {
    head: 'Aptitude',
    description:
      'Sharpen your logic, math, and verbal reasoning to boost placement readiness.',
    points: ['Quantitative', 'Verbal Ability', 'Logical Reasoning'],
    link: '/user/practice/Aptitude',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.06-removebg-preview_losyhk.png'
  },
  {
    head: 'Miscellaneous',
    description:
      'Explore puzzles, GK, and tricky challenges to test your intellect.',
    points: ['Puzzles', 'General Knowledge', 'Fun Challenges'],
    link: '/user/practice/Miscellaneous',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.13-removebg-preview_vrn64y.png'
  },
  {
    head: 'Core Subjects',
    description:
      'Master CS fundamentals like DSA, DBMS, OS, CN, and System Design.',
    points: ['DSA', 'OS', 'DBMS', 'CN', 'System Design'],
    link: '/user/practice/Core',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
  }
]

function PracticePage () {
  useEffect(() => {
    document.title = 'BinaryKeeda | Practice'

    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>BinaryKeeda | Practice</title>
        <meta
          name='description'
          content='Practice aptitude, core CS subjects, puzzles, and more. Boost your placement readiness with our handpicked challenges tailored for competitive exams and interviews.'
        />
        <meta
          name='keywords'
          content='practice, aptitude, puzzles, CS subjects, DSA, DBMS, OS, CN, system design, placement preparation'
        />
        <meta name='author' content='BinaryKeeda' />

        {/* Open Graph */}
        <meta property='og:title' content='BinaryKeeda | Practice' />
        <meta
          property='og:description'
          content='Sharpen your skills with aptitude, core CS subjects, puzzles, and logic games. Perfect for placement and interview preparation.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://binarykeeda.com/user/practice'
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
        />

        {/* Twitter Cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='BinaryKeeda | Practice' />
        <meta
          name='twitter:description'
          content='Sharpen your skills with aptitude, core CS subjects, puzzles, and logic games. Perfect for placement and interview preparation.'
        />
        <meta
          name='twitter:image'
          content='https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
        />

        {/* Favicon and canonical */}
        <link rel='canonical' href='https://binarykeeda.com/user/practice' />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
        />
        <link
          rel='apple-touch-icon'
          href='https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.20-removebg-preview_ohb9ht.png'
        />
      </Helmet>
      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-[300px]'>
            <CircularProgress />
            <span className='ml-3 text-gray-600 dark:text-gray-300'>
              Loading test series modules...
            </span>
          </div>
        }
      >
        <section className='grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3'>
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className='flex flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
            >
              <img
                src={card.image}
                alt={card.head}
                className='h-[200px] w-full object-contain'
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

                <div className='mb-4 flex flex-wrap gap-2'>
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
                </div>

                {card.link ? (
                  <Link to={card.link}>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      sx={{ fontWeight: 'bold', borderRadius: '8px' }}
                    >
                      Start Solving
                    </Button>
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
            </div>
          ))}
        </section>
      </Suspense>
    </>
  )
}

export default PracticePage
