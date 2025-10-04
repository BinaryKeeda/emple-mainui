import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Button, Chip, CircularProgress } from '@mui/material'
import {
  Psychology as PsychologyIcon,
  Hub as HubIcon,
  School as SchoolIcon
} from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'

const ICONS = [<PsychologyIcon />, <HubIcon />, <SchoolIcon />]
const CARDS = [
  {
    head: 'Placement Test Series',
    description:
      'Prepare for top IT companies with AMCAT-style modules covering coding, aptitude, and automata fix questions.',
    points: ['Coding', 'Aptitude', 'Automata Fix'],
    link: '/user/test-series/Placement',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46__3_-removebg-preview_thc0pa.png'
  },
  {
    head: 'GATE Test Series',
    description:
      'Get exam-ready with subject-specific questions, mock tests, and detailed solutions tailored for the GATE exam.',
    points: ['Mock Tests', 'Topic-wise Practice', 'Solution Analysis'],
    link: '', // Update this route once available
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46__4_-removebg-preview_ptn2fn.png'
  },
  {
    head: 'Behavioral Test Series',
    description:
      'Master HR rounds with real-world behavioral questions and situational judgment tests to enhance your soft skills.',
    points: [
      'Situational Judgement',
      'HR Interview Prep',
      'Personality Insights'
    ],
    link: '',
    image:
      'https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46-removebg-preview_ubjojh.png' // Replace with actual icon path
  }
]

const TestOptions = () => {
  return (
    <>
      <Helmet>
        <title>BinaryKeeda | Test Series</title>
        <meta
          name='description'
          content='Explore our comprehensive test series for placements, GATE, and behavioral assessments. Prepare effectively with coding challenges, aptitude tests, and HR interview simulations.'
        />
        <meta
          name='keywords'
          content='test series, placement preparation, GATE test series, behavioral tests, coding challenges, aptitude tests, HR interview preparation'
        />
        <meta name='author' content='BinaryKeeda' />

        {/* Open Graph for social sharing */}
        <meta property='og:title' content='BinaryKeeda | Test Series' />
        <meta
          property='og:description'
          content='Explore our comprehensive test series for placements, GATE, and behavioral assessments. Prepare effectively with coding challenges, aptitude tests, and HR interview simulations.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://binarykeeda.com/user/test-series'
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46-removebg-preview_ubjojh.png'
        />

        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='BinaryKeeda | Test Series' />
        <meta
          name='twitter:description'
          content='Explore our comprehensive test series for placements, GATE, and behavioral assessments. Prepare effectively with coding challenges, aptitude tests, and HR interview simulations.'
        />
        <meta
          name='twitter:image'
          content='https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46-removebg-preview_ubjojh.png'
        />

        {/* Canonical & Favicons */}
        <link rel='canonical' href='https://binarykeeda.com/user/test-series' />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46-removebg-preview_ubjojh.png'
        />
        <link
          rel='apple-touch-icon'
          href='https://res.cloudinary.com/dkybjjott/image/upload/v1750260945/WhatsApp_Image_2025-06-18_at_13.10.46-removebg-preview_ubjojh.png'
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

export default TestOptions
