import React, { useState } from "react";
import { MdWork, MdEmail } from "react-icons/md";

const jobs = [
  {
    role: "Full Stack Developer",
    company: "BinaryKeeda",
    location: "Remote / India",
    posted: "June 10, 2025",
    applyLink: "https://binarykeeda.com/jobs/fullstack-dev",
  },
  {
    role: "React Intern",
    company: "TechNova",
    location: "Bangalore",
    posted: "June 12, 2025",
    applyLink: "https://binarykeeda.com/jobs/react-intern",
  },
];

const JobListings = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with ${email} to job alerts!`);
    setEmail("");
    // you can integrate EmailJS/Firebase here
  };

  return (
    <section className="py-10 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6">💼 Job Listings</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {jobs.map((job, idx) => (
          <a
            key={idx}
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border shadow-md rounded-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 text-green-600 mb-2">
              <MdWork size={22} />
              <h3 className="text-xl font-bold">{job.role}</h3>
            </div>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <p className="text-gray-400 text-xs mt-1">
              Posted on: {job.posted}
            </p>
          </a>
        ))}
      </div>

      {/* Subscribe box */}
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
        <h4 className="text-lg font-semibold mb-2">
          📬 Subscribe to Job Alerts
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border px-4 py-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
