import { motion } from 'framer-motion'
import { fadeIn } from './Efffects'
import { useNavigate } from 'react-router-dom'
// export default function Showcase () {
//   const projects = [
//     {
//       id: 1,
//       title: 'Practice Quizzes',
//       icon:'/icons/quiz.png',
//       content:
//         'Interactive quizzes to help you strengthen your knowledge across various subjects and skills.',
//       image:
//         'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-01.jpg'
//     },
//     {
//       id: 2,
//       title: 'Roadmaps',
//       icon:'/icons/roadmap.png',
//       content:
//         'Detailed learning paths to guide you step-by-step in mastering your desired field or skill.',
//       image:
//         'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-02.jpg'
//     },
//     {
//       id: 3,
//       title: 'Mentorship',
//       icon: '/icons/mentorship.png' ,
//       content:
//         'One-on-one or group mentoring sessions with industry experts to accelerate your growth.',
//       image:
//         'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-03.jpg'
//     },
//     {
//       id: 4,
//       title: 'Jobs & Hackathon',
//       icon:'/icons/jobs.png',
//       content:
//         'Professional design services, including logos, business cards, and branding to elevate your business.',
//       image:
//         'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-04.jpg'
//     }
//   ]

//   return (
//     <motion.section
//     id='features'
//     initial="hidden"
//     whileInView="visible"
//     viewport={{ once: true, amount: 0.2 }}
//     variants={fadeIn}
//       className='pt-20 lg:pt-[60px] dark:bg-dark'
//     >
//     <div className='w-full max-w-7xl px-5 md:px-5 lg:px-5 mx-auto'>
//         <div className='-mx-4 flex flex-wrap'>
//           <div className='w-full px-4'>
//             <div className=' mb-[60px] text-gray-900 w-full text-start'>
//               <h2 className='mb-4  text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>
//                 Dream big , Learn More
//               </h2>
//               {/* <p className='text-body-color text-base dark:text-dark-6'>
//                 Your Journey Begins Here
//               </p> */}
//             </div>
//           </div>
//         </div>
//         <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-5'>
//           {projects.map(project => (
//             // <div key={project.id} className='w-full px-4 md:w-1/2 xl:w-1/4'>
//             //   <div className='relative mb-5'>
//             //     <div className='shadow-xl overflow-hidden rounded-[10px]'>
//             //       <img
//             //         src={project.image}
//             //         alt={project.content}
//             //         className='w-full shadow-xl'
//             //       />
//             //     </div>
//             //     <div className='relative shadow-md z-10 mx-7 -mt-20 rounded-lg bg-white dark:bg-dark-2 py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark'>
//             //       <span className='text-primary mb-2 block text-sm font-medium'>
//             //         {project.content.charAt(0).toUpperCase() +
//             //           project.content.slice(1)}
//             //       </span>
//             //       <h3 className='text-dark dark:text-white mb-5 text-xl font-bold'>
//             //         {project.title}
//             //       </h3>
//             //       <a
//             //         href='#'
//             //         className='text-body-color dark:text-dark-6 hover:border-primary hover:bg-primary inline-block rounded-md border border-stroke dark:border-dark-3 py-[10px] px-7 text-sm font-medium transition hover:text-gray-900'
//             //       >
//             //         View Details
//             //       </a>
//             //     </div>
//             //   </div>
//             // </div>
//             <Card
//             icon={project.icon || null}
//               description={project.content}
//               heading={project.title}
//               index={project.id}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   )
// }

// end of previous code


const Showcase = () => {
  const navigate = useNavigate()
  const features = [
    {
      title: "Practice Quizzes",
      desc: "Interactive quizzes to help you strengthen your knowledge across various subjects and skills.",
      hoverBorder: "hover:border-orange-400 hover:shadow-orange-100",
      iconBg: "bg-orange-50 dark:bg-orange-900/20 group-hover:bg-orange-100 dark:group-hover:bg-orange-800/30",
      link: "/user/practice",
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
    {
      title: "Roadmaps",
      desc: "Detailed learning paths to guide you step-by-step in mastering your desired field or skill.",
      hoverBorder: "hover:border-blue-400 hover:shadow-blue-100",
      iconBg: "bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30",
      link: "/user/binarykeeda-roadmap-sheet",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      ),
    },
    {
      title: "Mentorship",
      desc: "One-on-one or group mentoring sessions with industry experts to accelerate your growth.",
      hoverBorder: "hover:border-green-400 hover:shadow-green-100",
      iconBg: "bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-800/30",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
    },
    {
      title: "Jobs & Hackathons",
      desc: "Discover exciting job opportunities and participate in hackathons to showcase your skills and connect with the tech community.",
      hoverBorder: "hover:border-purple-400 hover:shadow-purple-100",
      iconBg: "bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/30",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2"/>
          <path d="M16 3v4M8 3v4M3 11h18"/>
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      id='features'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className='pt-20 lg:pt-[60px] dark:bg-dark'
    > 
      <article className="relative flex flex-col items-center justify-center dark:bg-slate-900 px-4 pb-16 md:pb-24 overflow-hidden">
        {/*  background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5">
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-xl"></div>
        </div>
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dream Big, Learn More
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your journey to success begins here with our comprehensive learning platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-fit md:w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`relative group flex flex-col p-6 tracking-tight text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 shadow-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 ${feature.hoverBorder} transition-all duration-300 items-center justify-between h-80 overflow-hidden hover:scale-[1.02] hover:shadow-2xl focus-within:scale-[1.02] focus-within:shadow-2xl cursor-pointer`}
              tabIndex={0}
              onClick={() => {
                if (feature.link) {
                  navigate(feature.link)
                }
              }}
            >
              {/*  background glow on hover */}
              <span className="absolute inset-0 z-0 rounded-2xl pointer-events-none group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:to-orange-500/10 dark:group-hover:from-white/5 dark:group-hover:to-orange-500/10 transition-all duration-300 shadow-md" />

              <div className="mb-4 flex items-center justify-center z-10">
                <div className={`w-12 h-12 flex items-center justify-center ${feature.iconBg} rounded-full transition-colors duration-300 ease-in-out`}>
                  {feature.icon}
                </div>
              </div>
              
              
              <h3 className="max-w-xs pb-2 m-0 font-bold text-lg text-center z-10 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <div className="text-base m-0 p-0 font-normal text-center z-10">
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </motion.section>
  )
}

export default Showcase