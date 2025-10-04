import React from "react";
import { FaChalkboardTeacher, FaLaptopCode, FaRobot } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const eventsData = [
  {
    title: "MERN Stack Bootcamp",
    date: "June 20 - July 15, 2025",
    description:
      "Build full-stack apps using MongoDB, Express, React, and Node.",
    icon: <FaLaptopCode size={30} className="text-blue-500" />,
    link: "https://binarykeeda.com/events/mern-bootcamp",
  },
  {
    title: "AI/ML Hackathon",
    date: "July 22 - July 24, 2025",
    description:
      "Compete, learn, and build real-world AI solutions in 48 hours.",
    icon: <FaChalkboardTeacher size={30} className="text-green-500" />,
    link: "https://binarykeeda.com/events/ai-hackathon",
  },
  {
    title: "Web Dev Workshop",
    date: "August 1, 2025",
    description: "One-day intensive workshop on responsive frontend design.",
    icon: <MdDateRange size={30} className="text-purple-500" />,
    link: "https://binarykeeda.com/events/webdev-workshop",
  },
  {
    title: "Data Structures & Algorithms",
    date: "August 10 - Sept 5, 2025",
    description: "Master core coding concepts to crack top tech interviews.",
    icon: <FaLaptopCode size={30} className="text-red-500" />,
    link: "https://binarykeeda.com/events/dsa-bootcamp",
  },
  {
    title: "AI for Beginners",
    date: "Sept 10 - Oct 10, 2025",
    description: "Start your journey into Artificial Intelligence with Python.",
    icon: <FaRobot size={30} className="text-pink-500" />,
    link: "https://binarykeeda.com/events/ai-beginners",
  },
  {
    title: "DevOps with Docker & CI/CD",
    date: "Oct 15 - Nov 15, 2025",
    description:
      "Hands-on training on deploying apps efficiently and securely.",
    icon: <MdDateRange size={30} className="text-yellow-500" />,
    link: "https://binarykeeda.com/events/devops-workshop",
  },
];
const sponsorsData = [
  {
    name: "AlgoChamp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png",
    url: "https://algochamp.com",
    sponsorship: "Hackathon Prize Sponsor",
    date: "July 2024",
  },
  {
    name: "CodeNest",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png",
    url: "https://codenest.dev",
    sponsorship: "Workshop Supporter",
    date: "August 2024",
  },

  {
    name: "CloudHive",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/512px-Git_icon.svg.png",
    url: "https://cloudhive.io",
    sponsorship: "Gold Sponsor - MERN Bootcamp",
    date: "June 2024",
  },
  {
    name: "ByteForge",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
    url: "https://byteforge.dev",
    sponsorship: "Hackathon Prize Sponsor",
    date: "July 2024",
  },
  {
    name: "NeoCoder",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png",
    url: "https://neocoder.com",
    sponsorship: "Workshop Supporter",
    date: "August 2024",
  },
  {
    name: "Scriptly",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    url: "https://scriptly.app",
    sponsorship: "Gold Sponsor - MERN Bootcamp",
    date: "June 2024",
  },
];

const EventsAndSponsors = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">BinaryKeeda Events & Sponsors</h1>
        <p className="mt-2 text-lg">
          Level up your skills with our workshops & amazing partners
        </p>
      </div>

      {/* Events Section */}
      <section className="py-10 px-5 md:px-20">
        <h2 className="text-3xl font-semibold mb-6">
          Ongoing Events & Workshops
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event, index) => (
            <a
              href={event.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border shadow-md rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition"
            >
              <div className="mb-3">{event.icon}</div>
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.date}</p>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-10 px-5 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Our Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
          {sponsorsData.map((sponsor, idx) => (
            <a
              key={idx}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition text-center"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full max-h-[60px] h-auto object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-800">
                {sponsor.sponsorship}
              </p>
              <p className="text-xs text-gray-500">{sponsor.date}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsAndSponsors;
