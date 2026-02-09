import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsonData from "./data/grouped_topics.json";
import { Close, ExpandMore } from "@mui/icons-material";
import { IconButton, LinearProgress } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

export default function RoadMapSheet() {
  const [completed, setCompleted] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("day")) || {};
    setCompleted(stored);
  }, []);

  const handleCheckboxChange = (topicIdx, problemIdx) => {
    try {
      setCompleted((prev) => {
        const updated = { ...prev };
        const key = `day-${topicIdx}`;
        if (!updated[key]) updated[key] = [];

        const index = updated[key].indexOf(problemIdx);
        if (index === -1) {
          updated[key].push(problemIdx);
        } else {
          updated[key].splice(index, 1);
        }

        localStorage.setItem("day", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Error updating checkbox state:", e);
    }
  };

  const openVideoModal = (url) => {
    try {
      let videoId = "";

      if (url.includes("youtu.be/")) {
        // Short link format: https://youtu.be/VIDEO_ID
        videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
      } else if (url.includes("youtube.com/watch")) {
        // Full URL format: https://www.youtube.com/watch?v=VIDEO_ID
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      }

      if (videoId) {
        setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
        setModalOpen(true);
      } else {
        console.warn("Could not extract video ID:", url);
        window.open(url, "_blank"); // fallback
      }
    } catch (err) {
      console.error("Invalid URL:", url, err);
      window.open(url, "_blank"); // fallback
    }
  };

  return (
    <section className="flex justify-between gap-5 p-3 md:ml-[80px]">
      <Helmet>
        <title>BinaryKeeda | Roadmaps Sheet</title>
        <meta
          name="description"
          content="Follow BinaryKeeda's structured 210 Days DSA Roadmap to master Data Structures and Algorithms step by step. Perfect for interviews and placements."
        />
        <meta
          name="keywords"
          content="210 Days DSA Roadmap, BinaryKeeda, DSA preparation, coding roadmap, interview prep, placements, data structures, algorithms"
        />
        <meta name="author" content="BinaryKeeda" />
        <meta
          property="og:title"
          content="210 Days DSA Roadmap | BinaryKeeda"
        />
        <meta
          property="og:description"
          content="Crack your next interview with our 210-day roadmap covering DSA from basics to advanced topics. Designed for serious learners."
        />
        <meta
          property="og:image"
          content="https://binarykeeda.com/assets/roadmap-210-preview.png"
        />
        <meta
          property="og:url"
          content="https://binarykeeda.com/roadmap/210-days"
        />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="210 Days DSA Roadmap | BinaryKeeda"
        />
        <meta
          name="twitter:description"
          content="Learn DSA systematically in 210 days with BinaryKeeda's complete roadmap. From zero to hero!"
        />
        <meta
          name="twitter:image"
          content="https://binarykeeda.com/assets/roadmap-210-preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="flex-1 w-full flex-col flex font-[Lato] dark:text-white rounded-lg">
        <Intro />
        <div className="mt-6">
          {Object.entries(jsonData).map(([topic, data], index) => (
            <Accordion
              key={index}
              title={topic}
              idx={index}
              completed={completed[`day-${index}`] || []}
              data={data}
              handleCheck={handleCheckboxChange}
              openVideoModal={openVideoModal}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 pt-3 relative w-full max-w-4xl">
            <IconButton
              onClick={() => setModalOpen(false)}
              sx={{
                position:"absolute" ,
                top :1,
                right:1,
                bgcolor:"black",
                color:"white"
              }}
              className="absolute top-1 right-1 text-black dark:text-white font-bold text-xl"
            >
              <Close/>
            </IconButton>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-[470px] rounded-md"
                src={videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const Accordion = ({
  title,
  idx,
  data,
  completed,
  handleCheck,
  openVideoModal,
}) => {
  const [showData, setShowData] = useState(false);
  const progressValue = (completed.length / data.length) * 100;

  return (
    <div className="w-full flex flex-col bg-primary dark:bg-support border-b">
      <button
        onClick={() => setShowData((prev) => !prev)}
        className="w-full px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex flex-row  sm:flex-row sm:items-center gap-1 sm:gap-4 w-full">
          <div className="flex items-center">
            <ExpandMore
              className={`transition-transform duration-300 ${
                showData ? "rotate-360" : "-rotate-90"
              }`}
            />
            <span className="ml-2 font-semibold md:text-lg">{`Topic ${
              idx + 1
            }`}</span>
          </div>
          <div className="ml-8 sm:ml-0 mt-1 sm:mt-0">
            <span className="font-semibold md:text-lg text-left block">
              {title}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2">
          <div className="w-full sm:w-64 lg:w-[300px] flex items-center pl-8">
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                width: "100%",
                height: 8,
                borderRadius: 5,
                padding: 0, // Ensure no extra padding
                backgroundColor: "e0e0e0", // no `#inherit`
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor: "#f7931e",
                },
              }}
            />
          </div>

          <span className="text-sm w-[40px] text-gray-800 whitespace-nowrap">
            {completed.length} / {data.length}
          </span>
        </div>
      </button>

      {showData && (
        <div className="px-7 pb-4">
          <ProblemTable
            topicIdx={idx}
            data={data}
            completed={completed}
            handleCheck={handleCheck}
            openVideoModal={openVideoModal}
          />
        </div>
      )}
    </div>
  );
};

const ProblemTable = ({
  data,
  topicIdx,
  completed,
  handleCheck,
  openVideoModal,
}) => {
  return (
    <div className="relative border-t mt-4 flex flex-col w-full h-full dark:text-white dark:bg-bg-secondary text-gray-700 bg-white shadow-md rounded-xl bg-clip-border overflow-x-auto">
      <table className="min-w-[900px] w-full rounded-md text-left table-auto">
        <thead>
          <tr>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Day
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Type
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Content
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Links
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((problem, idx) => {
            const isCompleted = completed.includes(idx);
            return (
              <React.Fragment key={idx}>
                <tr>
                  <td className="p-4 border-b" rowSpan={2}>
                    {problem.Day}
                  </td>
                  <td className="p-4 border-b font-semibold">Task</td>
                  <td className="p-4 border-b">{problem.Task}</td>
                  <td className="p-4 border-b">
                    {problem?.Resource?.hyperlink && (
                      <button
                        onClick={() =>
                          openVideoModal(problem.Resource.hyperlink)
                        }
                        className="text-blue-600 underline"
                      >
                        {problem.Resource.value}
                      </button>
                    )}
                  </td>
                  <td className="p-4 border-b" rowSpan={2}>
                    <input
                      type="checkbox"
                      aria-checked={isCompleted}
                      checked={isCompleted}
                      onChange={() => handleCheck(topicIdx, idx)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-semibold">Project</td>
                  <td className="p-4 border-b">{problem?.ProjectWork}</td>
                  <td className="p-4 border-b">
                    {problem?.ProjectResource?.hyperlink && (
                      <button
                        onClick={() =>
                          openVideoModal(problem.ProjectResource.hyperlink)
                        }
                        className="text-blue-600 underline"
                      >
                        {problem.ProjectResource.value}
                      </button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Intro = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">BinaryKeeda Placement Roadmap</h2>
      <div className="mt-3 dark:text-gray-100">
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          Welcome to the BinaryKeeda 210 Prep Sheet! This structured plan covers
          core subjects and aptitude essentials tailored for placement
          preparation. Track your progress, explore curated resources, and
          systematically complete each topic to strengthen your foundation.
        </p>
      </div>
      <div className="mb-3">
        <p>
          <strong className="text-orange-500">Note:</strong> Complete the topics
          sequentially. Each topic includes subtopics and free resources. Mark
          them done as you go. Weekly goal: 20 hrs (10 study + 10 projects).
        </p>
      </div>
    </>
  );
};
