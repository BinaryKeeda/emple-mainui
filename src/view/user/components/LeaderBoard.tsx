// import React, { useState, useMemo, useEffect } from "react";
// import { Avatar, CircularProgress } from "@mui/material";
// import { useSelector } from "react-redux";
// import { SectionHeader } from "../utils/Helpers";
// import { useUser } from "../../../context/UserContext";
// import { useRankData } from "../../../hooks/user/UserApi";

// const getMedal = (rank: number) => {
//   if (rank === 1) return "/icons/medal-first.png";
//   if (rank === 2) return "/icons/medal-second.png";
//   if (rank === 3) return "/icons/medal-third.png";
//   return null;
// };

// function Leaderboard({ rankData, rankDataLoading }: {
//   rankData: any;
//   rankDataLoading: boolean
// }) {
//   // Safely extract Redux data
//   const { user } = useUser()


//   const [tab, setTab] = useState("university");

//   const topUniversity =
//     rankData?.getRank?.topUniversity
//     ?? [];

//   const topGlobal = rankData?.getRank?.topGlobal ?? []

//   const activeLeaderboard =
//     tab === "university" ? topUniversity : topGlobal;

//   // No university case
//   if (!user) {
//     return null
//   }
//   if (!user.university) {
//     return (
//       <div className="w-full bg-white rounded-xl shadow flex flex-col h-[300px] items-center justify-center">
//         No university
//       </div>
//     );
//   }

//   // Loading state
//   if (rankDataLoading) {
//     return (
//       <div className="flex items-center justify-center flex-[.7] p-6 bg-white rounded-xl shadow">
//         <CircularProgress size={30} />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white rounded-xl shadow flex flex-col">
//       <div className="m-4 pl-2">
//         <SectionHeader title="Leaderboards" />

//         <div className="relative mt-4 flex bg-gray-200 p-1 rounded-full w-full max-w-xs">
//           <div
//             className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#111827] transition-all duration-300 ease-in-out ${tab === "university" ? "left-1" : "left-1/2"
//               }`}
//           />

//           <button
//             className={`z-10 w-1/2 text-sm font-medium p-2 ${tab === "university" ? "text-white" : "text-gray-700"
//               }`}
//             onClick={() => setTab("university")}
//           >
//             University
//           </button>

//           <button
//             className={`z-10 w-1/2 text-sm font-medium p-2 ${tab === "global" ? "text-white" : "text-gray-700"
//               }`}
//             onClick={() => setTab("global")}
//           >
//             Global
//           </button>
//         </div>
//       </div>

//       {/* Leaderboard List */}
//       <div className="flex mx-4 flex-col gap-3">
//         {activeLeaderboard.length === 0 && (
//           <div className="text-center text-gray-500 py-4">
//             No leaderboard data available.
//           </div>
//         )}

//         {activeLeaderboard.map((entry: any, index: number) => {
//           const safeEntry = entry || {};
//           const medal = getMedal(safeEntry.rank);

//           return (
//             <div
//               key={safeEntry?.userId || `${tab}-entry-${index}`}
//               className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-md shadow-sm"
//             >
//               <div className="flex items-center gap-3">
//                 {medal && <img src={medal} className="h-6" alt="Rank" />}

//                 <Avatar
//                   src={safeEntry.avatar || "/default-avatar.png"}
//                   className="w-8 h-8"
//                 />

//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {safeEntry.name || "Unknown User"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {safeEntry.university || "N/A"}
//                   </p>
//                 </div>
//               </div>

//               <span className="text-xs font-semibold text-[#111827]">
//                 {safeEntry.points ?? 0} pts
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-6 mb-3 mx-4 bg-gray-100 rounded-md p-4 shadow-sm">
//         <div className="flex justify-between items-center mb-2">
//           <p className="text-sm font-semibold text-gray-700">Your Rank</p>
//           <p className="text-sm font-semibold text-gray-800">
//             {tab === "university"
//               ? rankData?.universityRank ?? "–"
//               : rankData?.globalRank ?? "–"}
//           </p>
//         </div>

//         <hr className="border-gray-300 mb-3" />

//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <Avatar
//               src={user?.avatar || "/default-avatar.png"}
//               className="w-9 h-9 rounded-full object-cover"
//               alt={user?.name}
//             />
//             <div>
//               <p className="text-sm font-medium text-gray-800">
//                 {user?.name || "Unknown"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {user?.university || "N/A"}
//               </p>
//             </div>
//           </div>

//           <span className="text-xs font-semibold text-[#111827]">
//             {(rankData?.userRank?.points ?? 0) + " pts"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Leaderboard;

import React, { useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { SectionHeader } from "../utils/Helpers";
import { useUser } from "../../../context/UserContext";
import ProgressArea from "./ProgressArea"; // ADD THIS IMPORT

const getMedal = (rank: number) => {
  if (rank === 1) return "/icons/medal-first.png";
  if (rank === 2) return "/icons/medal-second.png";
  if (rank === 3) return "/icons/medal-third.png";
  return null;
};

function Leaderboard({ rankData, rankDataLoading }: {
  rankData: any;
  rankDataLoading: boolean
}) {
  const { user } = useUser()
  const [tab, setTab] = useState("university");

  const topUniversity = rankData?.getRank?.topUniversity ?? [];
  const topGlobal = rankData?.getRank?.topGlobal ?? []
  const activeLeaderboard = tab === "university" ? topUniversity : topGlobal;

  if (!user) {
    return null
  }

  // SHOW PROGRESS AREA (NO UNIVERSITY) WHEN USER HAS NO UNIVERSITY
  if (!user.university) {
    return <ProgressArea rankData={rankData} rankDataLoading={rankDataLoading} />;
  }

  // Loading state
  if (rankDataLoading) {
    return (
      <div className="flex items-center justify-center flex-[.7] p-6 bg-white rounded-xl shadow">
        <CircularProgress size={30} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow flex flex-col">
      {/* ... rest of the leaderboard code stays the same ... */}
      <div className="m-4 pl-2">
        <SectionHeader title="Leaderboards" />

        <div className="relative mt-4 flex bg-gray-200 p-1 rounded-full w-full max-w-xs">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#111827] transition-all duration-300 ease-in-out ${tab === "university" ? "left-1" : "left-1/2"
              }`}
          />

          <button
            className={`z-10 w-1/2 text-sm font-medium p-2 ${tab === "university" ? "text-white" : "text-gray-700"
              }`}
            onClick={() => setTab("university")}
          >
            University
          </button>

          <button
            className={`z-10 w-1/2 text-sm font-medium p-2 ${tab === "global" ? "text-white" : "text-gray-700"
              }`}
            onClick={() => setTab("global")}
          >
            Global
          </button>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex mx-4 flex-col gap-3">
        {activeLeaderboard.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No leaderboard data available.
          </div>
        )}

        {activeLeaderboard.map((entry: any, index: number) => {
          const safeEntry = entry || {};
          const medal = getMedal(safeEntry.rank);

          return (
            <div
              key={safeEntry?.userId || `${tab}-entry-${index}`}
              className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-3">
                {medal && <img src={medal} className="h-6" alt="Rank" />}

                <Avatar
                  src={safeEntry.avatar || "/default-avatar.png"}
                  className="w-8 h-8"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {safeEntry.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {safeEntry.university || "N/A"}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-[#111827]">
                {safeEntry.points ?? 0} pts
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 mb-3 mx-4 bg-gray-100 rounded-md p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700">Your Rank</p>
          <p className="text-sm font-semibold text-gray-800">
            {tab === "university"
              ? rankData?.universityRank ?? "–"
              : rankData?.globalRank ?? "–"}
          </p>
        </div>

        <hr className="border-gray-300 mb-3" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.avatar || "/default-avatar.png"}
              className="w-9 h-9 rounded-full object-cover"
              alt={user?.name}
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.university || "N/A"}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-[#111827]">
            {(rankData?.userRank?.points ?? 0) + " pts"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

