
// export default Profile;
// import React, { useEffect, useState } from "react";
// import { DarkMode, Edit, ExpandMore, LightMode } from "@mui/icons-material";
// import { LOGO } from "../../lib/config";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Avatar } from "@mui/material";
// import ProfileModal from "./ProfileModal";

// export default function Profile() {
//   const [practiceOpen, setPracticeOpen] = useState(false);
//   const [studyOpen, setStudyOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [currUser, setCurrUser] = useState(null);
//   const { user } = useSelector((s) => s.auth);
//   const {data:rankData} = useSelector(s=>s.auth.rankData)

//   useEffect(() => {
//     const mode = localStorage.getItem("mode");
//     if (mode === "dark") {
//       document.getElementById("root").classList.add("dark");
//       setDarkMode(true);
//     } else {
//       document.getElementById("root").classList.remove("dark");
//       setDarkMode(false);
//     }
//   }, [darkMode]);

//   useEffect(() => {
//     setCurrUser(user);
//   }, [user]);
  
//   useEffect(() => {
//     console.log(rankData)
//   }, [rankData])

//   const [showModal, setShowModal] = useState(false);

//   // ✅ Compute totals dynamically
//   const solutions = rankData?.userRank?.solutions || {};
//   const totalAttempted = Object.values(solutions).reduce(
//     (sum, cat) => sum + (cat?.attempted || 0),
//     0
//   );

//   return (
//     <>
//       {/* Header Navbar */}
//       <header className="relative bg-primary h-[60px] w-full">
//         <nav
//           onMouseLeave={() => {
//             setPracticeOpen(false);
//             setStudyOpen(false);
//           }}
//           className="fixed shadow-sm bg-bg-primary dark:bg-support flex items-center px-3 pr-16 justify-between h-[60px] w-full z-10"
//         >
//           <img src={LOGO} className="h-10" alt="Logo" />
//           <ul className="list-none gap-4 text-sm flex items-center">
//             <li className="nav-link mr-2 cursor-pointer">
//               <Link to={"/"}>Home</Link>
//             </li>
//             <li className="nav-link mr-2 cursor-pointer">
//               <Link to={"/user"}>Dashboard</Link>
//             </li>

//             {/* Study Dropdown */}
//             <li
//               className="nav-link cursor-pointer flex items-center"
//               onMouseEnter={() => {
//                 setStudyOpen(true);
//                 setPracticeOpen(false);
//               }}
//             >
//               Study
//               <ExpandMore
//                 sx={{
//                   fontSize: 20,
//                   transition: "transform 0.5s ease",
//                   transform: studyOpen ? "rotate(360deg)" : "rotate(0deg)",
//                 }}
//               />
//               {studyOpen && (
//                 <ul className="dropdown-header">
//                   <li className="px-4 py-1 text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer">
//                     <Link to={"/user/binarykeeda-dsa-sheet"}>DSA Sheet</Link>
//                   </li>
//                   <li className="px-4 py-1 text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer">
//                     <Link to={"/user/binarykeeda-210-sheet"}>
//                       210 Roadmaps Sheet
//                     </Link>
//                   </li>
//                   <li className="px-4 py-1 text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer">
//                     <Link to={"/user/binarykeeda-roadmap-sheet"}>Roadmaps</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Practice Dropdown */}
//             <li
//               className="nav-link mr-2 cursor-pointer flex items-center"
//               onMouseEnter={() => {
//                 setPracticeOpen(true);
//                 setStudyOpen(false);
//               }}
//             >
//               Practice
//               <ExpandMore
//                 sx={{
//                   fontSize: 20,
//                   transition: "transform 0.2s ease",
//                   transform: practiceOpen ? "rotate(180deg)" : "rotate(0deg)",
//                 }}
//               />
//               {practiceOpen && (
//                 <ul className="dropdown-header">
//                   <li className="px-4 py-1 text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer">
//                     <Link to={"/user/test-series"}>Test Series</Link>
//                   </li>
//                   <li className="px-4 py-1 text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer">
//                     <Link to={"/user/practice"}>Go to quiz section</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="bg-secondary min-h-[calc(100vh-60px)] w-full p-4 sm:p-6 text-black ">
//         <section className="flex flex-col gap-6">
//           {/* Profile Card */}
//           <div className="dark:bg-support bg-white shadow-md rounded-md p-6 sm:p-10 flex flex-col md:flex-row gap-6">
//             {/* Profile Info */}
//             <div className="flex flex-col items-center border-b md:border-r md:border-b-0 pb-6 md:pb-0 md:pr-6">
//               <Avatar
//                 src={currUser?.avatar}
//                 sx={{ height: 130, width: 130 }}
//                 className="mb-4"
//               />
//               <h2 className="text-lg font-semibold">{currUser?.name}</h2>
//               <p className="text-sm text-gray-500 mt-1">{currUser?.email}</p>
//             </div>

//             {/* Details */}
//             <div className="flex-1 md:pl-6 flex flex-col justify-between">
//               <div>
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-500">Institution</p>
//                   <p className="text-base font-medium">
//                     {currUser?.university || "N/A"}
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <p className="text-sm text-gray-500">Ranking (Global)</p>
//                   <div className="flex items-center gap-2">
//                     <img src="/icons/medal-first.png" className="h-6" alt="Rank" />
//                     <p className="text-base font-medium">
//                       Rank {rankData?.globalRank || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <p className="text-sm text-gray-500">Ranking (University)</p>
//                   <div className="flex items-center gap-2">
//                     <img src="/icons/medal-first.png" className="h-6" alt="Rank" />
//                     <p className="text-base font-medium">
//                       Rank {rankData?.universityRank || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Totals */}
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div>
//                   <p className="text-gray-600 text-sm">Total Quizzes Attempted</p>
//                   <p className="font-medium">{totalAttempted}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 text-sm">Total Tests Attempted</p>
//                   <p className="font-medium">
//                     {currUser?.solutions?.totalTestSolutions || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Edit Button */}
//             <div
//               onClick={() => setShowModal(true)}
//               className="flex gap-2 items-center text-primary hover:text-orange-500 cursor-pointer transition"
//             >
//               <Edit sx={{ fontSize: 16 }} className="w-5 h-5" />
//               <span className="text-sm font-medium">Edit</span>
//             </div>
//           </div>

//           {/* Profile Modal - UPDATED */}
//           {showModal && (
//             <ProfileModal 
//               user={currUser}
//               onClose={() => setShowModal(false)} 
//             />
//           )}

//           {/* Quiz Breakdown */}
//           <div className="dark:bg-support bg-primary shadow-md rounded-md p-6">
//             <h4 className="font-semibold text-lg mb-4">
//               Quiz Category Breakdown
//             </h4>
//             <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[
//                 { key: "aptitude", label: "Aptitude" },
//                 { key: "core", label: "Core" },
//                 { key: "miscellaneous", label: "Miscellaneous" },
//                 { key: "ease", label: "Ease" },
//                 { key: "medium", label: "Medium" },
//                 { key: "hard", label: "Hard" },
//               ].map(({ key, label }) => {
//                 const stats = solutions[key] || {};
//                 return (
//                   <li
//                     key={key}
//                     className="flex items-center justify-between gap-4 p-5 bg-white dark:bg-support dark:text-wg dark:border-gray-600 rounded-2xl shadow-md border hover:shadow-lg transition-shadow duration-300"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-base font-bold">{label}</span>
//                       <span className="text-sm mt-1">
//                         {stats.attempted ?? 0} attempted
//                         <br />
//                         Average {stats.average ?? 0}
//                       </span>
//                     </div>
//                     <img
//                       src={`/profile/chart-${key}.png`}
//                       alt={`${label} Chart`}
//                       className="h-14 w-14 object-contain"
//                     />
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// // }
































// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Avatar } from "@mui/material";
// import { Edit } from "@mui/icons-material";
// import ProfileModal from "./ProfileModal";

// export default function Profile() {
//   const { user } = useSelector((s) => s.auth);
//   const { data: rankData } = useSelector((s) => s.auth.rankData);
//   const [showModal, setShowModal] = useState(false);

//   const solutions = rankData?.userRank?.solutions || {};

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
//         {/* Edit Button */}
//         <button
//           onClick={() => setShowModal(true)}
//           className="absolute top-4 right-4 text-gray-600 hover:text-orange-500"
//         >
//           <Edit />
//         </button>

//         {/* Avatar */}
//         <div className="flex flex-col items-center mb-6">
//           <Avatar
//             src={user?.avatar}
//             sx={{ width: 96, height: 96 }}
//             className="mb-4"
//           />
//           <h2 className="text-xl font-bold">{user?.name || "User Name"}</h2>
//           <p className="text-gray-500 text-sm">{user?.email}</p>
//         </div>

//         {/* User Info */}
//         <div className="space-y-3 mb-8">
//           <div className="flex justify-between">
//             <span className="font-semibold">Semester:</span>
//             <span className="text-gray-600">{user?.semester || "Not Provided"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold">Program:</span>
//             <span className="text-gray-600">{user?.program || "Not Provided"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold">University:</span>
//             <span className="text-gray-600">{user?.university || "Not Provided"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold">Specialisation:</span>
//             <span className="text-gray-600">{user?.specialisation || "Not Provided"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold">Status:</span>
//             <span className="text-green-600 font-semibold">Active</span>
//           </div>
//         </div>

//         {/* Solved Problems */}
//         <div>
//           <h3 className="text-lg font-bold mb-4">Solved Problems</h3>
//           <div className="space-y-3">
//             {[
//               { key: "aptitude", label: "Aptitude" },
//               { key: "core", label: "Core" },
//               { key: "miscellaneous", label: "Misc" },
//               { key: "ease", label: "Easy" },
//               { key: "medium", label: "Medium" },
//               { key: "hard", label: "Hard" },
//             ].map(({ key, label }) => {
//               const attempted = solutions[key]?.attempted || 0;
//               return (
//                 <div key={key} className="flex items-center justify-between">
//                   <span className="text-sm font-medium">{label}</span>
//                   <div className="flex items-center gap-3 flex-1 mx-4">
//                     <div className="flex-1 bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-orange-500 h-2 rounded-full"
//                         style={{ width: `${Math.min(attempted * 10, 100)}%` }}
//                       />
//                     </div>
//                     <span className="text-sm font-semibold w-8 text-right">{attempted}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Profile Modal */}
//       {showModal && (
//         <ProfileModal user={user} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   );
// }




import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import ProfileModal from "./ProfileModal";
import PersonalInfoModal from "./PersonalInfoModal";
import EducationModal from "./EducationModal";
import LinksModal from "./LinksModal";
import SkillsModal from "./SkillsModal";
import AccountSettingsModal from "./AccountSettingsModal";

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const { data: rankData } = useSelector((s) => s.auth.rankData);
  
  // Separate state for each modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showAccountSettingsModal, setShowAccountSettingsModal] = useState(false);

  const solutions = rankData?.userRank?.solutions || {};

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const fields = [
      user?.dob, user?.contact, user?.address, user?.university, 
      user?.program, user?.semester, user?.specialisation, user?.cgpa,
      user?.marks10th, user?.marks12th, user?.github, user?.linkedin,
      user?.skills?.length, user?.projectsLink
    ];
    const filled = fields.filter(f => f).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Clean Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 relative hover:shadow-xl transition-shadow">
          <button
            onClick={() => setShowProfileModal(true)}
            className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
            title="Edit Profile"
          >
            <Edit sx={{ fontSize: 18 }} />
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <Avatar 
              src={user?.avatar} 
              sx={{ 
                width: 100, 
                height: 100,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} 
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{user?.name || "User Name"}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
              <span className="text-sm font-bold text-orange-600">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            {completionPercentage < 100 && (
              <p className="text-xs text-gray-500 mt-2">Complete your profile to unlock all features!</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button
              onClick={() => setShowPersonalInfoModal(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
              title="Edit Personal Information"
            >
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Date of Birth:</span>
                <Tooltip title={!user?.dob ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.dob || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Contact Number:</span>
                <Tooltip title={!user?.contact ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.contact || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Address:</span>
                <Tooltip title={!user?.address ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500 text-right max-w-xs">{user?.address || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button
              onClick={() => setShowEducationModal(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
              title="Edit Education Details"
            >
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Education Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">University:</span>
                <Tooltip title={!user?.university ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500 text-right max-w-xs truncate">{user?.university || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Program:</span>
                <Tooltip title={!user?.program ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500 text-right max-w-xs truncate">{user?.program || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Semester:</span>
                <Tooltip title={!user?.semester ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.semester || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Specialisation:</span>
                <Tooltip title={!user?.specialisation ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500 text-right max-w-xs truncate">{user?.specialisation || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">CGPA:</span>
                <Tooltip title={!user?.cgpa ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.cgpa || "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">10th Marks:</span>
                <Tooltip title={!user?.marks10th ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.marks10th ? `${user.marks10th}%` : "Not Provided"}</span>
                </Tooltip>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">12th Marks:</span>
                <Tooltip title={!user?.marks12th ? "Click edit to add" : ""} arrow>
                  <span className="text-gray-500">{user?.marks12th ? `${user.marks12th}%` : "Not Provided"}</span>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button
              onClick={() => setShowLinksModal(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
              title="Edit Professional Links"
            >
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Professional Links</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">GitHub:</span>
                {user?.github ? (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">View Profile</a>
                ) : (
                  <Tooltip title="Click edit to add" arrow>
                    <span className="text-gray-500">Not Provided</span>
                  </Tooltip>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">LinkedIn:</span>
                {user?.linkedin ? (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">View Profile</a>
                ) : (
                  <Tooltip title="Click edit to add" arrow>
                    <span className="text-gray-500">Not Provided</span>
                  </Tooltip>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Coding Profile:</span>
                {user?.codingProfile ? (
                  <a href={user.codingProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">View Profile</a>
                ) : (
                  <Tooltip title="Click edit to add" arrow>
                    <span className="text-gray-500">Not Provided</span>
                  </Tooltip>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Resume:</span>
                {user?.resume ? (
                  <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Download</a>
                ) : (
                  <Tooltip title="Click edit to add" arrow>
                    <span className="text-gray-500">Not Provided</span>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>

          {/* Skills & Projects */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button
              onClick={() => setShowSkillsModal(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
              title="Edit Skills & Projects"
            >
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Skills & Projects</h3>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700 block mb-3">Skills:</span>
                {user?.skills && user.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Tooltip title="Click edit to add skills" arrow>
                    <span className="text-gray-500 italic">Not Provided</span>
                  </Tooltip>
                )}
              </div>
              <div className="pt-2">
                <span className="font-semibold text-gray-700 block mb-3">Projects:</span>
                {user?.projectsLink ? (
                  <a 
                    href={user.projectsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View Projects
                  </a>
                ) : (
                  <Tooltip title="Click edit to add project link" arrow>
                    <span className="text-gray-500 italic">Not Provided</span>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 relative hover:shadow-xl transition-shadow">
          <button
            onClick={() => setShowAccountSettingsModal(true)}
            className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
            title="Edit Account Settings"
          >
            <Edit sx={{ fontSize: 18 }} />
          </button>
          <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">Email Notifications:</span>
              <span className="text-green-600 font-semibold">Enabled</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">Profile Visibility:</span>
              <span className="text-gray-600">Public</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">Two-Factor Auth:</span>
              <span className="text-gray-500">Not Enabled</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">Account Created:</span>
              <span className="text-gray-600">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Modals */}
      <ProfileModal open={showProfileModal} user={user} onClose={() => setShowProfileModal(false)} />
      <PersonalInfoModal open={showPersonalInfoModal} user={user} onClose={() => setShowPersonalInfoModal(false)} />
      <EducationModal open={showEducationModal} user={user} onClose={() => setShowEducationModal(false)} />
      <LinksModal open={showLinksModal} user={user} onClose={() => setShowLinksModal(false)} />
      <SkillsModal open={showSkillsModal} user={user} onClose={() => setShowSkillsModal(false)} />
      <AccountSettingsModal open={showAccountSettingsModal} user={user} onClose={() => setShowAccountSettingsModal(false)} />
    </div>
  );
}