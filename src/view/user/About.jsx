import React, { useEffect } from "react";
import Header from "../../layout/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out-quad",
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen text-gray-800 dark:text-gray-100 overflow-hidden">
      <Header />

      {/* Mission Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right" data-aos-delay="100">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team collaborating"
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-medium">
                  Team BinaryKeeda – Building the Future of Tech Education
                  {/* Together We Build, Teach, and Inspire */}
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
              At BinaryKeeda, we're revolutionizing tech education by making it{" "}
              <span className="font-medium text-orange-600 dark:text-orange-400">
                accessible, practical, and deeply engaging
              </span>
              . We bridge the gap between theoretical knowledge and real-world
              applications, offering cutting-edge courses in full-stack
              development, AI, DSA, cloud computing, and beyond.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Founded by industry veterans passionate about education
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    1000+ students transformed into confident developers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    90% placement rate for our career-track students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2  to-transparent"></div>
        </div>

        <div
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          data-aos="zoom-in"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 italic mb-8">
                "BinaryKeeda transformed my career. Within 6 months of their
                Full-Stack program, I went from basic HTML knowledge to landing
                my dream job at a FAANG company. The hands-on projects and
                mentor support were game-changers."
              </blockquote>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-orange-500">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah Johnson"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Sarah Johnson
                  </p>
                  <p className="text-orange-600 dark:text-orange-400">
                    Software Engineer @ Google
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy student"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/80 to-white/20 dark:from-gray-800/80 dark:to-gray-800/20"></div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div
          className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
          data-aos="fade-up"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full filter blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full filter blur-xl"></div>

          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of students who've accelerated their careers with
              BinaryKeeda
            </p>
            <div className="flex flex-rol sm:flex-row justify-center gap-4">
              <Link to="/user/binarykeeda-roadmap-sheet">
                <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Explore Resources
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </Link>

              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-md hover:bg-white/10 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Contact Our Team
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
