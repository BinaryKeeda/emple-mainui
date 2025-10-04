import { WhatsApp } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";

const AccordionItem = ({ index, title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );

  const minusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  );

  return (
    <div className="border-b w-full border-slate-200">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex justify-between items-center py-5 text-slate-800"
      >
        <span>{title}</span>
        <span className="text-slate-800 transition-transform duration-300">
          {isOpen ? minusIcon : plusIcon}
        </span>
      </button>
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pb-5 text-sm text-slate-500">{children}</div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative flex flex-col max-w-7xl mx-auto items-center justify-center dark:bg-slate-900 px-8 pb-16  md:pb-24 overflow-hidden">
      <h2 className="text-3xl md:text-5xl  font-bold text-gray-900 mb-10">
        Frequently Asked Questions
      </h2>
      <AccordionItem
        index={1}
        title="What is Binary Keeda?"
        isOpen={openIndex === 1}
        onToggle={toggleAccordion}
      >
        Binary Keeda is an ed-tech platform designed to empower students and
        aspiring professionals through project-based learning, mentorship, and
        real-world tech exposure.
      </AccordionItem>

      <AccordionItem
        index={2}
        title="Why should I join Binary Keeda?"
        isOpen={openIndex === 2}
        onToggle={toggleAccordion}
      >
        At Binary Keeda, you'll work on practical coding challenges, build
        full-stack projects, participate in hackathons, and get guidance from
        industry mentors to prepare for SDE roles and beyond.
      </AccordionItem>

      <AccordionItem
        index={3}
        title="What resources does Binary Keeda offer?"
        isOpen={openIndex === 3}
        onToggle={toggleAccordion}
      >
        Binary Keeda provides coding interfaces, curated problem sets, mock
        interviews, resume reviews, and structured learning paths for
        technologies like MERN, DevOps, and Data Science.
      </AccordionItem>
      <AccordionItem
        index={4}
        title="Who can join Binary Keeda?"
        isOpen={openIndex === 4}
        onToggle={toggleAccordion}
      >
        Binary Keeda is open to all learners — from BCA, B.Tech, MCA students to
        self-taught coders — anyone passionate about tech, development, and
        building impactful projects.
      </AccordionItem>

      <AccordionItem
        index={5}
        title="Is Binary Keeda free?"
        isOpen={openIndex === 5}
        onToggle={toggleAccordion}
      >
        Yes, the core resources and community participation are completely free.
        We believe in democratizing education. Advanced mentorship or
        certification programs may be optional and paid.
      </AccordionItem>

      <AccordionItem
        index={6}
        title="What makes Binary Keeda different?"
        isOpen={openIndex === 6}
        onToggle={toggleAccordion}
      >
        Unlike tutorial-based platforms, Binary Keeda focuses on real projects,
        peer collaboration, and tech-driven problem-solving — helping you build
        your portfolio and confidence.
      </AccordionItem>

      <AccordionItem
        index={7}
        title="How do I get started?"
        isOpen={openIndex === 7}
        onToggle={toggleAccordion}
      >
        Just sign up, explore the learning tracks, pick your interest (MERN,
        DevOps, ML, etc.), and start building! Our mentors and community are
        always ready to guide you.
      </AccordionItem>
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-4xl mx-auto my-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 text-white p-2 rounded-full">
            <WhatsApp />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-green-800">
              Join our WhatsApp Community
            </h2>
            <p className="text-sm text-green-700">
              Get updates, learning resources & peer support directly.
            </p>
          </div>
        </div>
        <a
          href="https://chat.whatsapp.com/HCPwImL36H31EG82ankeSX"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition duration-200"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}
