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

const GitHubIcon = () => (
  <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const { data: rankData } = useSelector((s) => s.auth.rankData);
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showAccountSettingsModal, setShowAccountSettingsModal] = useState(false);

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

  const handleConnectGitHub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=repo,user`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full">

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 relative hover:shadow-xl transition-shadow">
          <button onClick={() => setShowProfileModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
            <Edit sx={{ fontSize: 18 }} />
          </button>
          <div className="flex items-center gap-6 mb-6">
            <Avatar src={user?.avatar} sx={{ width: 100, height: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{user?.name || "User Name"}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
              <span className="text-sm font-bold text-orange-600">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
            </div>
            {completionPercentage < 100 && (
              <p className="text-xs text-gray-500 mt-2">Complete your profile to unlock all features!</p>
            )}
          </div>
        </div>

        {/* ROW 1 - 3 columns: Personal Info + Education + Skills & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow h-full">
            <button onClick={() => setShowPersonalInfoModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Date of Birth:</span>
                <span className="text-gray-500">{user?.dob || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Contact Number:</span>
                <span className="text-gray-500">{user?.contact || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="text-gray-500 text-right max-w-xs">{user?.address || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow h-full">
            <button onClick={() => setShowEducationModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Education Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">University:</span>
                <span className="text-gray-500 text-right max-w-[150px] truncate">{user?.university || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Program:</span>
                <span className="text-gray-500 text-right max-w-[150px] truncate">{user?.program || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Semester:</span>
                <span className="text-gray-500">{user?.semester || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">Specialisation:</span>
                <span className="text-gray-500 text-right max-w-[150px] truncate">{user?.specialisation || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">CGPA:</span>
                <span className="text-gray-500">{user?.cgpa || "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">10th Marks:</span>
                <span className="text-gray-500">{user?.marks10th ? `${user.marks10th}%` : "Not Provided"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-700">12th Marks:</span>
                <span className="text-gray-500">{user?.marks12th ? `${user.marks12th}%` : "Not Provided"}</span>
              </div>
            </div>
          </div>

          {/* Skills & Projects */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow h-full">
            <button onClick={() => setShowSkillsModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Skills & Projects</h3>

            {/* GitHub Connect Button - directly visible */}
            <div className="mb-4 p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-800"><GitHubIcon /></span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.github ? 'GitHub Connected ✓' : 'Connect GitHub'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.github ? user.github : 'View projects & repositories'}
                  </p>
                </div>
              </div>
              {user?.github ? (
                <a href={user.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: '#24292e' }}>
                  <GitHubIcon /> View
                </a>
              ) : (
                <button onClick={handleConnectGitHub}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all"
                  style={{ background: '#24292e' }}>
                  <GitHubIcon /> Connect
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700 block mb-2">Skills:</span>
                {user?.skills && user.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">Not Provided</span>
                )}
              </div>
              <div>
                <span className="font-semibold text-gray-700 block mb-2">Projects:</span>
                {user?.projectsLink ? (
                  <a href={user.projectsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Projects</a>
                ) : (
                  <span className="text-gray-500 italic">Not Provided</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 - Professional Links + Account Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Professional Links */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button onClick={() => setShowLinksModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Professional Links</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">GitHub:</span>
                {user?.github ? (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    <GitHubIcon /> View Profile
                  </a>
                ) : (
                  <span className="text-gray-500">Not Provided</span>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">LinkedIn:</span>
                {user?.linkedin ? (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Profile</a>
                ) : (
                  <span className="text-gray-500">Not Provided</span>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Coding Profile:</span>
                {user?.codingProfile ? (
                  <a href={user.codingProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Profile</a>
                ) : (
                  <span className="text-gray-500">Not Provided</span>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Resume:</span>
                {user?.resume ? (
                  <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a>
                ) : (
                  <span className="text-gray-500">Not Provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow">
            <button onClick={() => setShowAccountSettingsModal(true)} className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <Edit sx={{ fontSize: 18 }} />
            </button>
            <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Account Settings</h3>
            <div className="space-y-3">
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