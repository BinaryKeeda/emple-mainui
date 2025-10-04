import founderImg from "/assets/hero/logo.png"; // Replace with your image
import teamImg from "/assets/web/freepik__upload__11414.jpeg"; // Replace with your image
import vdo from "/animations/a1.mp4";
import message from "/assets/hero/image.png";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  MenuBook,
  Person,
  Dashboard,
  Code,
} from "@mui/icons-material";
import { IconButton, Fade, Backdrop } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Footer from "../layout/Footer";
const navigationLinks = [
  { id: "services", label: "Services", scrollTo: "services" },
  { id: "team", label: "Team", scrollTo: "team" },
  { id: "testimonials", label: "Testimonials", scrollTo: "testimonials" },
];
const CounsellingHome = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigationClick = (scrollTo) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header className="h-20 relative">
        <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-landingPage shadow-sm">
          <div className="max-w-7xl px-3 mx-auto">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <ScrollLink
                to="home"
                smooth
                duration={500}
                className="cursor-pointer"
              >
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/drzyrq7d5/image/upload/v1749625316/keeda_o2vv8e.png"
                      className="h-12 w-12 rounded-full object-cover transition-transform group-hover:scale-105"
                      alt="BinaryKeeda Logo"
                    />
                  </div>
                  <span className="md:text-xl -ml-5 font-bold text-gray-800 text-sm sm:block transition-colors group-hover:text-gray-600">
                    BinaryKeeda
                  </span>
                </Link>
              </ScrollLink>

              {/* Desktop Navigation */}
              <div className="relative hidden lg:flex items-center space-x-1">
                {navigationLinks.map((link) => {
                  if (location.pathname === "/counselling") {
                    return (
                      <ScrollLink
                        key={link.id}
                        to={link.scrollTo}
                        smooth
                        duration={500}
                        offset={-80}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:bg-gray-50/80 cursor-pointer"
                      >
                        {link.label}
                      </ScrollLink>
                    );
                  } else {
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavigationClick(link.scrollTo)}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:bg-gray-50/80 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    );
                  }
                })}

                {/* Auth Buttons - Desktop */}
                {/* <div className="hidden lg:flex items-center gap-3">
                  {location.pathname == "/login" ? (
                    <> </>
                  ) : user ? (
                    <Link
                      to={/${user.role}}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                      <Dashboard sx={{ fontSize: 18 }} />
                      {user?.profileCompleted
                        ? "Dashboard"
                        : "Complete Profile"}
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                  )}
                </div> */}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <IconButton
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-gray-700 hover:text-gray-900"
                  size="small"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div
        style={{
          background: "linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)",
        }}
      >
        {/* Hero Section */}
        {/* <section className=" text-black py-32 text-center px-6">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            Healing Begins With Talking
          </h2>
          <p className="text-xl max-w-2xl mx-auto drop-shadow">
            Discover your potential, gain clarity, and build a better tomorrow.
            Professional therapy at your fingertips.
          </p>
          <a href="#contact">
            <button className="mt-8 bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 transition">
              Book a Free Session
            </button>
          </a>
        </section> */}
        {/* bg-gradient-to-br from-purple-50 to-blue-100 */}
        <section className="relative overflow-hidden text-black py-24 px-">
          <div className="absolute -top-20 -left-20 opacity-30 z-0">
            <svg
              width="300"
              height="300"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#a78bfa"
                d="M41.3,-62.4C53.6,-54.2,64.5,-44.2,67.6,-32.6C70.7,-21.1,65.9,-7.9,63.6,7.6C61.2,23.1,61.3,40.9,52.1,49.6C42.9,58.2,24.4,57.7,6.7,55.5C-11,53.2,-22,49.2,-34.2,42.6C-46.4,36,-60,26.8,-63.5,14.5C-67.1,2.2,-60.7,-13.3,-53.1,-27.3C-45.6,-41.2,-36.9,-53.5,-25.3,-62.2C-13.7,-71,0.7,-76.3,13.7,-71.7C26.6,-67.2,37.9,-52.7,41.3,-62.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl px-5 mx-auto flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="hero-title text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-indigo-700">
                Healing Begins With Talking
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">
                Discover your potential, gain clarity, and build a better
                tomorrow. Professional therapy at your fingertips.
              </p>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-50} // Adjust if your navbar is fixed
                className="inline-block mt-8"
              >
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition duration-300">
                  Book a Free Session
                </button>
              </ScrollLink>
            </div>
            <div className="w-full md:w-1/2">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl shadow-xl w-full max-w-md md:max-w-lg object-cover border-4 border-white"
              >
                <source src={vdo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900">Our Services</h3>
            <p className="text-lg mt-2">
              We support individuals, families, and groups through
              compassionate, research-backed therapy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "Individual Therapy",
                desc: "One-on-one sessions to understand emotions, overcome anxiety, and improve mental health.",
              },
              {
                title: "Career Counseling",
                desc: "Personalized guidance for students and professionals navigating career decisions and transitions.",
              },
              {
                title: "Relationship Therapy",
                desc: "Support for couples and families to build stronger, healthier relationships.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className=" p-6 rounded-lg shadow hover:shadow-xl transition"
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Founder */}
        <section id="team" className="py-20 px-6 ">
          <h3 className="text-4xl font-bold text-blue-900 mb-12 text-center">
            Meet Our Team
          </h3>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 1000, // Auto-slide every 5 seconds
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="max-w-6xl mx-auto"
          >
            {[
              {
                name: "Mr. Aryan Gupta",
                title: "Founder & Lead Psychologist",
                image: founderImg,
                desc: "Dr. Aryan Gupta is a certified psychologist and counselor with over two decades of experience. His passion lies in creating safe spaces for individuals to share, reflect, and heal. Through his leadership, the portal has grown to be a trusted source of mental well-being.",
              },
              {
                name: "Ms. Riya Sen",
                title: "Child Psychologist",
                image: teamImg,
                desc: "Riya specializes in helping children cope with emotional and behavioral issues. She brings warmth and creativity to each session, making therapy fun and effective.",
              },
              {
                name: "Mr. Karan Mehta",
                title: "Career Counselor",
                image: teamImg,
                desc: "Karan helps young adults and professionals find direction and purpose in their careers through personalized counseling sessions.",
              },
            ].map((member, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-10 px-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full md:w-[400px] max-h-[350px] object-cover rounded-xl shadow-lg"
                  />
                  <div className="md:w-1/2">
                    <h3 className="text-3xl font-semibold mb-1 text-blue-900">
                      {index === 0 ? "Meet Our Founder" : "Team Member"}
                    </h3>
                    <h4 className="text-xl font-medium mb-3">{member.name}</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900">
              What People Are Saying
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto ">
            {[
              {
                name: "Aditi Sharma",
                text: '"This portal changed my life. My counselor helped me gain confidence and direction."',
              },
              {
                name: "Rahul Mehta",
                text: '"The online sessions are so effective and convenient. Highly recommended!"',
              },
            ].map((t, i) => (
              <div
                key={i}
                className=" p-6 rounded-xl shadow-md text-left bg-gradient-to-br from-purple-50 to-blue-100"
              >
                <p className="italic text-gray-700 mb-4">{t.text}</p>
                <h4 className="font-semibold text-blue-900">– {t.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* <section
        id="contact"
        className="bg-gradient-to-t from-blue-400 to-[#e1ffea22] text-white py-20 px-6 text-center"
      >
        <h3 className="text-3xl font-semibold mb-4">
          Begin Your Journey Today
        </h3>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Ready to talk to someone who listens without judgment? Contact us
          today to schedule your first session.
        </p>
        <a href="/contact">
          <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Us
          </button>
        </a>
      </section> */}
      <section
        id="contact"
        className="py-20 px-4"
        style={{ backgroundColor: "#e1ffea22" }}
      >
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left - Image or Illustration */}
            <div className="bg-white flex justify-center items-center p-10">
              <img
                src={message}
                alt="Contact"
                className="w-64 h-64 object-contain"
              />
            </div>

            {/* Right - Form */}
            <div className="bg-white p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">
                Get in touch
              </h3>
              <form className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    <i className="fas fa-user"></i>
                  </span>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    rows="4"
                    placeholder="Message"
                    className="w-full pl-9  pt-3 pb-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>

                {/* Button */}
                <div className="flex justify-center ">
                  <button
                    type="submit"
                    className=" bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-12 py-2 rounded-full text-xl font-bold hover:opacity-90 transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CounsellingHome;
