import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./Efffects";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        id="about"
        className=" py-10 pb-10 relative   "
      >
        <div className="flex  max-w-7xl mx-auto gap-20 px-6 lg:flex-row flex-col">
          <div className="w-full flex-[.6] justify-center items-start gap-6  lg:order-first order-last">
            <div className="lg:justify-center sm:justify-end justify-center items-start gap-2.5 flex">
              <img
                src="https://res.cloudinary.com/drzyrq7d5/image/upload/v1749564785/3_uh8i99.png"
                className=" ounded-xl"
              ></img>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full text-sm flex-1 flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full  flex-col justify-center lg:items-start items-center gap-3 flex">
                <h2 className="text-gray-900 w-full text-4xl font-bold font-manrope leading-normal text-left">
                  About Us
                </h2>
                <p className="text-gray-700 md:md:text-lg  sm:text-sm font-normal leading-relaxed  text-justify">
                  We are Binary Keeda, an innovative E-learning and Testing
                  startup on a mission to transform education for the digital
                  generation. Our platform empowers students with personalized
                  learning paths, expert-led courses, and real-time assessments
                  designed to sharpen their skills and prepare them for the
                  future.
                  <p className="text-gray-700 md:text-lg sm:text-sm  font-normal leading-relaxed text-justify">
                    Whether you're looking to master coding, cybersecurity,
                    digital marketing, or other in-demand fields, Binary Keeda
                    bridges the gap between knowledge and real-world
                    application. Learn. Practice. Excel. Join the movement
                    that's redefining how students learn, grow, and succeed.
                  </p>
                </p>
              </div>
              <div className="w-full hidden  lg:justify-start justify-center items-center sm:gap-10 gap-5 md:inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    50+
                  </h3>
                  <h6 className="text-gray-500 md:text-lg sm:text-sm  font-normal leading-relaxed">
                    Interactive Quizzes
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal ">
                    1000+
                  </h4>
                  <h6 className="pl-2 text-gray-500 md:text-lg sm:text-sm  font-normal leading-relaxed">
                    Users
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    95%
                  </h4>
                  <h6 className="text-gray-500 md:text-lg sm:text-sm  font-normal leading-relaxed">
                    User Satisfaction
                  </h6>
                </div>
              </div>

              <div className="flex justify-start items-center w-full">
                <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                  <button
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ca5a27] to-[#e67e22] px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out hover:animate-none"
                    style={{
                      animation: "gentle-float 2.5s ease-in-out infinite",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Read More
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e67e22] to-[#ca5a27] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

// // Replace with actual image pat
// export default function Outing () {
//   return (
//     <section id='about' className='bg-white pt-20 pb-10 dark:bg-gray-900'>
//       <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-5 lg:px-6'>
//         <div className=' text-[#111] sm:md:text-lg sm:text-sm  dark:text-gray-400'>
//           <h2 className='mb-4  text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
//             Empowering Young Minds Through Education
//           </h2>
//           <p className='mb-4'>
//             At Tons Valley Education Trust Unit Guniyal Gaon Girls Education
//             Center, we are dedicated to providing quality education and
//             fostering the holistic development of young girls in our community.
//             Our commitment goes beyond academics; we nurture future leaders,
//             innovators, and change-makers.
//           </p>
//           <p>
//             Through our initiatives, we create opportunities for girls to
//             explore their potential, learn essential life skills, and gain the
//             confidence to achieve their dreams. Join us in our mission to
//             empower the next generation.
//           </p>
//         </div>
//         <div className='grid grid-cols-2 gap-4 mt-8'>
//           <img
//             className='w-full rounded-lg'
//             src={'/assets/hero.png'}
//             alt='Students during an outing 1'
//           />
//           <img
//             className='mt-4 w-full lg:mt-10 rounded-lg'
//             src={'/assets/about2.jpg'}
//             alt='Students during an outing 2'
//           />
//         </div>
//       </div>
//     </section>
//   )
// }
