import React from "react";
import { FaTrophy } from "react-icons/fa";

const hackathons = [
  {
    title: "AI Innovation Sprint",
    date: "June 25 - June 30, 2025",
    description:
      "Compete in an intense 5-day AI coding battle with real-world problem statements.",
    prize: "₹1,00,000",
    link: "https://binarykeeda.com/hackathon/ai-sprint",
  },
  {
    title: "Full Stack CodeWar",
    date: "July 10 - July 15, 2025",
    description: "Build full-stack web apps with MERN and compete globally.",
    prize: "₹50,000 + Goodies",
    link: "https://binarykeeda.com/hackathon/fullstack-codewar",
  },
];

const ActiveHackathons = () => {
  return (
    <section className="py-10 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-semibold mb-6">🧠 Active Hackathons</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {hackathons.map((hack, idx) => (
          <a
            key={idx}
            href={hack.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border rounded-lg shadow hover:shadow-xl hover:scale-[1.02] transition bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-2 text-blue-600">
              <FaTrophy size={22} />
              <h3 className="text-xl font-bold">{hack.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-1">{hack.date}</p>
            <p className="text-gray-700 mb-2">{hack.description}</p>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
              🏆 Prize: {hack.prize}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ActiveHackathons;
