import { Link } from 'react-router-dom'
import { fadeIn } from './Efffects'
import {motion} from 'framer-motion'
const Content = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      id='content'
      className='overflow-hidden bg-white py-8 sm:py-16'
    >
      <div className='w-full max-w-7xl px-5 md:px-5 lg:px-5 mx-auto'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              {/* <h2 className='text-base font-semibold leading-7 text-[#ca5a27]'>
                Empower Learning
              </h2> */}
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Pariksha Portal
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                A platform designed for students to learn & grow
              </p>
              <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#ca5a27]'
                    >
                      <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z' />
                      <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z' />
                      <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z' />
                    </svg>
                    Practice Quizes
                  </dt>
                  <dd className='inline ml-1'>
                    Create and manage templated exam schedules, notifications,
                    and result generation with ease.
                  </dd>
                </div>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#ca5a27]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Mentorship Roadmaps
                  </dt>
                  <dd className='inline ml-1'>
                    Personalized guidance for students to achieve academic and
                    career success.
                  </dd>
                </div>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#ca5a27]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Job Updates
                  </dt>
                  <dd className='inline ml-1'>
                    Regular updates on the latest job opportunities in various
                    industries.
                  </dd>
                </div>
              </dl>
              <div className='mt-10 flex items-center gap-x-6'>
                <Link
                  to='/signup'
                  className='text-sm font-semibold leading-6 bg-gradient-to-r from-orange-400 to-[#ca5a27] text-white  rounded-2xl px-4 py-1 hover:shadow-xl hover:bg-opacity-80 transition-all duration-200'
                >
                  Register <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </div>
          </div>
          {/* <video
            src=''
            autoPlay
            controls
            className='w-[48rem] rounded-xl shadow-xl ring-1 mb-8 ring-gray-400/10 sm:w-[57rem] md:mt-20 md:-ml-4 lg:-ml-0'
            width='2432'
            height='1442'
          /> */}
        </div>
      </div>
    </motion.section>
  )
}

export default Content
