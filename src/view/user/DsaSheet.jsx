import { lazy, Suspense, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Helmet } from "react-helmet-async";

const ProblemSet = lazy(() => import("./components/Problemset"));

function Coding() {
  const [stats, setStats] = useState();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 1024);
      setHideSidebar(width < 890);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>BinaryKeeda | DSA Sheet</title>
        <meta
          name="description"
          content="Practice top DSA questions curated by BinaryKeeda. Boost your problem-solving skills and ace technical interviews with categorized problems and visual progress tracking."
        />
        <meta
          name="keywords"
          content="DSA Sheet, BinaryKeeda, DSA Practice, Interview Preparation, Coding Questions, Data Structures, Algorithms, LeetCode, Striver Sheet"
        />
        <meta name="author" content="BinaryKeeda" />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="BinaryKeeda | DSA Sheet" />
        <meta
          property="og:description"
          content="Get access to the ultimate DSA sheet and prepare for your tech interviews with progress charts and categorized problems."
        />
        <meta
          property="og:url"
          content="https://binarykeeda.com/user/binarykeeda-dsa-sheet"
        />
        <link
          rel="canonical"
          href="https://binarykeeda.com/user/binarykeeda-dsa-sheet"
        />
      </Helmet>

      <section
        className={`flex gap-5  p-3 ${
          hideSidebar ? "flex-col" : "flex-row justify-between"
        }`}
      >
        {/* Left section */}
        <div
          className={`font-[Lato] dark:text-white rounded-lg ${
            hideSidebar ? "w-full" : "flex-1"
          }`}
        >
          <h2 className="text-2xl font-semibold">BinaryKeeda DSA Sheet</h2>
          <div className="mt-3 text-mdd dark:text-gray-100"></div>
          <div className="mt-4">
            <p className="mt-2">
              <strong className="text-orange-500 font-semibold mr-2">
                Note:
              </strong>
              Both brute-force and optimal approaches are provided for most
              problems. However, it's recommended that you first try to solve
              the problem on your own before looking at the solutions.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full w-full">
                <div className="loader2"></div>
              </div>
            }
          >
            <ProblemSet
              setStats={setStats}
              hideSidebar={hideSidebar}
              isSmallScreen={isSmallScreen}
            />
          </Suspense>
        </div>

        {/* Right fixed sidebar - hidden below 850px */}
        {/* {!hideSidebar && (
          <div
            className=" p-5 bg-primary items-center dark:bg-support  rounded-lg flex-col gap-6"
            style={{
              position: "fixed",
              top: "5rem",
              right: "1.5rem",
              width: isSmallScreen ? "200px" : "200px",
              height: "calc(100vh - 110px)",
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
              display: "flex",
            }}
          >
            <PieProgressChart
              done={stats?.done}
              total={stats?.total}
              label="Total"
              colors={{ done: "#3b82f6", remaining: "#d1d5db" }} // blue-500 and gray-300
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.easyDone}
              total={stats?.easy}
              label="Easy"
              colors={{ done: "#2563eb", remaining: "#c7d2fe" }} // blue-600 and indigo-200
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.mediumDone}
              total={stats?.medium}
              label="Medium"
              colors={{ done: "#22c55e", remaining: "#bbf7d0" }} // green-500 and green-200
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.hardDone}
              total={stats?.hard}
              label="Hard"
              colors={{ done: "#ef4444", remaining: "#fecaca" }} // red-500 and red-200
              isSmallScreen={isSmallScreen}
            />
          </div>
        )} */}
      </section>
    </>
  );
}

export default Coding;

// const PieProgressChart = ({ done, total, label, colors, isSmallScreen }) => {
//   const chartSize = isSmallScreen ? 130 : 170;
//   const containerWidth = isSmallScreen ? "170px" : "190px";
//   const containerHeight = isSmallScreen ? "100px" : "100px";
//   const outerRadius = isSmallScreen ? 45 : 55;
//   const innerRadius = isSmallScreen ? 18 : 20;
//   const fontSize = isSmallScreen ? "12px" : "14px";

//   const [isHovered, setIsHovered] = useState(false);

//   // Darken function: reduce brightness by 15%
//   const darken = (hex, factor = 0.85) => {
//     const f = parseInt(hex.slice(1), 16);
//     const r = Math.floor(((f >> 16) & 255) * factor);
//     const g = Math.floor(((f >> 8) & 255) * factor);
//     const b = Math.floor((f & 255) * factor);
//     return `rgb(${r}, ${g}, ${b})`;
//   };

//   return (
//     <div
//       className="flex flex-col items-center gap-2 transition-all duration-300"
//       style={{ width: containerWidth }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         style={{
//           height: containerHeight,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <PieChart
//           width={chartSize}
//           height={chartSize}
//           margin={{ right: 5, top: -4 }}
//           slotProps={{ legend: { hidden: true } }}
//           series={[
//             {
//               data: [
//                 {
//                   value: done,
//                   color: isHovered ? darken(colors.done) : colors.done,
//                   label: `Done`,
//                 },
//                 {
//                   value: Math.max(0, total - done),
//                   color: isHovered
//                     ? darken(colors.remaining)
//                     : colors.remaining,
//                   label: `Remaining`,
//                 },
//               ],
//               innerRadius: innerRadius,
//               outerRadius: outerRadius,
//               paddingAngle: 0,
//               cornerRadius: 4,
//               startAngle: -45,
//               endAngle: 360,
//               cx: chartSize / 2,
//               cy: chartSize / 2,
//               highlightScope: { faded: "global", highlighted: "item" },
//               faded: { additionalRadius: -5, color: "gray" },
//               arcLabelMinAngle: 15,
//             },
//           ]}
//         />
//       </div>
//       <div
//         className="text-center w-full truncate"
//         style={{ fontSize }}
//         title={`${label} (${done}/${total})`}
//       >
//         {label} ({done}/{total})
//       </div>
//     </div>
//   );
// };
