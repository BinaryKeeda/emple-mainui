import React, { useEffect, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Button, Chip, CircularProgress } from '@mui/material'
import {
  School as SchoolIcon,
  AutoStories as AutoStoriesIcon,
  Route as RouteIcon
} from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'

// Icons
const ICONS = [<SchoolIcon />, <AutoStoriesIcon />, <RouteIcon />]

// Resource Cards
const RESOURCE_CARDS = [
  {
    head: 'BK-210 Roadmaps',
    description:
      'A curated roadmap for cracking placements with 210-day structured guidance.',
    points: ['210 Days Plan', 'Structured Learning', 'Placement Ready'],
    link: '/user/binarykeeda-210-sheet',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/roadmap1_bzxxmd.png'
  },
  {
    head: 'BK-DSA',
    description:
      'Comprehensive Data Structures & Algorithms material to ace coding interviews.',
    points: ['DSA Sheets', 'Problems & Solutions', 'Interview Prep'],
    link: '/user/binarykeeda-dsa-sheet',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/roadmap2_wqji85.png'
  },
  {
    head: 'BK-Roadmaps',
    description:
      'Guided roadmaps for various tech domains to kickstart your career.',
    points: ['Web Dev', 'AI/ML', 'System Design'],
    link: '/user/binarykeeda-roadmap-sheet',
    image:
      'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/roadmap3_nahgat.png'
  }
]

function ResourcePage () {
  useEffect(() => {
    document.title = 'BinaryKeeda | Resources'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>BinaryKeeda | Resources</title>
      </Helmet>

      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-[300px]'>
            <CircularProgress />
            <span className='ml-3 text-gray-600 dark:text-gray-300'>
              Loading resources...
            </span>
          </div>
        }
      >
        <section className='grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3'>
          {RESOURCE_CARDS.map((card, idx) => (
            <Link to={card.link}
              key={idx}
              className='flex justify-center items-center px-4 py-1 flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
            >
              <img
                src={card.image}
                alt={card.head}
                className='h-[200px] w-full object-contain'
              />
              <hr className='mt-4 w-52 ' />
              <div className='my-2 mt-4 flex justify-center'>
                {/* <hr className='w-[90%] border-t-[1.5px] border-gray-300 dark:border-gray-400' /> */}
              </div>

              <div className='flex flex-1 flex-col justify-between px-5 pb-5'>
                <div className='mb-2 flex justify-center items-center gap-2'>
                  <span className='text-blue-600 dark:text-blue-400'>
                    {/* {ICONS[idx % ICONS.length]} */}
                  </span>
                  <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    {card.head}
                  </h2>
                </div>

                {/* <p className='mb-3 text-sm text-gray-600 dark:text-gray-300'>
                  {card.description}
                </p> */}

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
{/* 
                {card.link ? (
                  <Link to={card.link}>
                    <Button
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
                )} */}
              </div>
            </Link>
          ))}
        </section>
      </Suspense>
    </>
  )
}

export default ResourcePage
