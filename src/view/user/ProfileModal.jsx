import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../lib/config'
import { Edit } from '@mui/icons-material'
import MailIcon from '@mui/icons-material/Mail'
import Cookies from 'js-cookie'
import { logOutUser } from '../../redux/reducers/UserThunks'
import { Avatar } from '@mui/material'
import profileData from '../../pages/profileData.json'
const avatars = [
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_20.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_17.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_19.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_6.png',
  'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png'
]

const Specialisations = profileData.specialization
const years = profileData.yearofgraduation
const sem = () => {}

const getMaxSemesters = programName => {
  const matched = profileData.programs.find(p => p.name === programName)
  const count = matched?.maxSemester || 0
  return Array.from({ length: count }, (_, i) => `${i + 1}`)
}

const programs = profileData.programs

const ProfileModal = ({onClose}) => {
  const dropdownRefs = useRef({})

  // Function to check if dropdown should open upwards
  const shouldOpenUpwards = field => {
    const inputElement = dropdownRefs.current[`${field}-input`]
    if (!inputElement) return false

    const inputRect = inputElement.getBoundingClientRect()
    const spaceBelow = window.innerHeight - inputRect.bottom
    const dropdownHeight = 200 // Same as max-h-[200px]

    return spaceBelow < dropdownHeight
  }
  const user = useSelector(state => state.auth.user)
  const [formData, setFormData] = useState({
    yearOfGraduation: '',
    university: '',
    program: '',
    semester: '',
    specialisation: ''
  })

  const [avatarSelectedUrl, setAvatarSelectedUrl] = useState(user?.avatar || '')
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [universitySuggestions, setUniversitySuggestions] = useState([])
  const [showUniversitySuggestions, setShowUniversitySuggestions] =
    useState(false)
  const [showDropdowns, setShowDropdowns] = useState({
    program: false,
    specialisation: false,
    yearOfGraduation: false,
    semester: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setFormData({
        yearOfGraduation: user.yearOfGraduation || '',
        university: user.university || '',
        program: user.program || '',
        semester: user.semester || '',
        specialisation: user.specialisation || ''
      })
      setAvatarSelectedUrl(user.avatar || '')
    }
  }, [user])

  const handleChange = e => {
    // Only allow changes for university field (other fields are select-only)
    if (e.target.name === 'university') {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      fetchUniversities(e.target.value)
      setShowUniversitySuggestions(e.target.value.length > 0)
      console.log('Show suggestions:', e.target.value.length > 0)
    }
  }

  // const fetchUniversities = async (query) => {
  //   if (!query) return;
  //   try {
  //     // const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  //     // const response = await axios.get(`${backendURL}/university/data/${query}`);
  //     const response = await axios.get(`${BASE_URL}/university/data/${query}`);
  //     setUniversitySuggestions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching universities:", error);
  //   }
  // };
  const fetchUniversities = async query => {
    if (!query) return
    try {
      const response = await axios.get(`${BASE_URL}/api/university/${query}`, {
        withCredentials: true
      })
      // Extract just the names from the university objects
      const universityNames = response.data.map(uni => uni.name)
      setUniversitySuggestions(universityNames)
    } catch (error) {
      console.error('Error fetching universities:', error)
    }
  }

  const handleUniversitySelect = university => {
    setFormData({ ...formData, university })
    setShowUniversitySuggestions(false)
  }

  const handleSelectOption = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setShowDropdowns({ ...showDropdowns, [field]: false })
  }

  const toggleDropdown = field => {
    // Close all other dropdowns when opening one
    const newState = Object.keys(showDropdowns).reduce((acc, key) => {
      acc[key] = key === field ? !showDropdowns[key] : false
      return acc
    }, {})
    setShowDropdowns(newState)
    setShowUniversitySuggestions(false) // Ensure university suggestions are closed
  }

  const handleClickOutside = e => {
    const dropdowns = document.querySelectorAll('.dropdown-container')
    let isInsideDropdown = false

    dropdowns.forEach(dropdown => {
      if (dropdown.contains(e.target)) {
        isInsideDropdown = true
      }
    })

    if (!isInsideDropdown) {
      setShowDropdowns({
        program: false,
        specialisation: false,
        yearOfGraduation: false,
        semester: false
      })
      setShowUniversitySuggestions(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAvatarSelect = url => {
    setAvatarSelectedUrl(url)
    setShowAvatarModal(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user?._id) return setMessage('User not authenticated')

    try {
      setLoading(true)
      // const backendURL =
      //   import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

      const payload = {
        ...formData,
        id: user._id,
        avatar: avatarSelectedUrl
      }

      await axios.put(`${BASE_URL}/api/profile/complete`, payload, {
        withCredentials: true
      })

      // navigate(`/profile/${user._id}`, { replace: true })
      window.location.reload()
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Update failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }
  const dispacth = useDispatch()

  const handleLogout = () => {
    try {
      console.log('Btn clicked')
      dispacth(logOutUser(Cookies.get('token')))
      navigate('/')
    } catch (error) {
      console.log(error, 'logout')
    }
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      {/* Main Profile Edit Modal */}
      <div className='w-full max-w-2xl overflow-visible bg-white rounded-xl shadow-lg overflow-hidden'>
        {/* Profile Header with Image */}
        <div
          style={{
            background:
              'linear-gradient(90deg, #db5602 0%, #e67a34 50%, #f9a03f 100%)'
          }}
          className='relative h-20
'
        >
          <div className='absolute -bottom-12 left-6'>
            <div className='relative'>
              <Avatar
                src={
                  avatarSelectedUrl ||
                  user?.avatar ||
                  'https://randomuser.me/api/portraits/men/1.jpg'
                }
                sx={{
                  width: 96,
                  height: 96,
                  border: '4px solid white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <button
                onClick={() => setShowAvatarModal(true)}
                className='absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md'
              >
                <Edit className='text-[#db5602]' fontSize='small' />
              </button>
            </div>
          </div>

          <button
            className='absolute top-4 right-4 text-white hover:text-gray-200'
            onClick={onClose} // Close modal
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Profile Content */}
        <div className='pt-16 px-6 pb-6'>
          {/* Name and Email */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-gray-800'>
              {user?.name || 'Thomas Holmes'}
            </h2>
            <p className='text-[#7e7e7e]'>
              <span className='mr-1'>
                <MailIcon className='text-[#db5602]' fontSize='small' />
              </span>

              {user?.email || 'heythomas@gmail.com'}
            </p>
          </div>

          {/* Logout Button - Moved to top right */}
          <button
            className='absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-200 text-sm'
            onClick={() => handleLogout()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Logout
          </button>

          {/* Editable Fields */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* University Field */}
              <div className='space-y-1 relative dropdown-container'>
                <label className='text-sm font-medium text-gray-700'>
                  University
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    name='university'
                    value={formData.university}
                    onChange={handleChange}
                    required
                    placeholder='Search for your university'
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent'
                  />
                  {showUniversitySuggestions &&
                    universitySuggestions.length > 0 && (
                      <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-auto'>
                        {universitySuggestions.map((uni, index) => (
                          <div
                            key={index}
                            className='px-4 py-2 hover:bg-orange-50 cursor-pointer'
                            onClick={() => handleUniversitySelect(uni)}
                          >
                            {uni}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* Program Field */}
              <div className='space-y-1 relative dropdown-container'>
                <label className='text-sm font-medium text-gray-700'>
                  Program
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative'>
                  <div
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex items-center truncate'
                    onClick={() => toggleDropdown('program')}
                  >
                    <span className='truncate flex-1'>
                      {formData.program || 'Select your program'}
                    </span>
                    <svg
                      className='h-5 w-5 text-gray-400 ml-2 shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {showDropdowns.program && (
                    <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto'>
                      {programs.map((program, index) => (
                        <div
                          key={index}
                          className='px-4 py-2 hover:bg-orange-50 cursor-pointer'
                          onClick={() =>
                            handleSelectOption('program', program.name)
                          }
                        >
                          {program.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Specialisation Field */}
              <div className='space-y-1 relative dropdown-container'>
                <label className='text-sm font-medium text-gray-700'>
                  Specialisation
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative'>
                  <div
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex items-center truncate'
                    onClick={() => toggleDropdown('specialisation')}
                  >
                    <span className='truncate flex-1'>
                      {formData.specialisation || 'Select your specialisation'}
                    </span>
                    <svg
                      className='h-5 w-5 text-gray-400 ml-2 shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {showDropdowns.specialisation && (
                    <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[130px] overflow-auto'>
                      {Specialisations.map((spec, index) => (
                        <div
                          key={index}
                          className='px-4 py-2 hover:bg-orange-50 cursor-pointer'
                          onClick={() =>
                            handleSelectOption('specialisation', spec)
                          }
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Semester Field */}
              <div className='space-y-1 relative dropdown-container'>
                <label className='text-sm font-medium text-gray-700'>
                  Semester
                </label>
                <div className='relative'>
                  <div
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex justify-between items-center'
                    onClick={() => toggleDropdown('semester')}
                  >
                    {formData.semester || 'Select your semester'}
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {showDropdowns.semester && (
                    <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[130px] overflow-auto'>
                      {getMaxSemesters(formData.program).map((semester, index) => (
                        <div
                          key={index}
                          className='px-4 py-2 hover:bg-orange-50 cursor-pointer'
                          onClick={() =>
                            handleSelectOption('semester', semester)
                          }
                        >
                          {semester}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Year of Graduation Field */}
              <div className='space-y-1 relative dropdown-container'>
                <label className='text-sm font-medium text-gray-700'>
                  Graduation Year
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative'>
                  <div
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex justify-between items-center truncate overflow-x-auto whitespace-nowrap'
                    onClick={() => toggleDropdown('yearOfGraduation')}
                    ref={el =>
                      (dropdownRefs.current['yearOfGraduation-input'] = el)
                    }
                  >
                    {formData.yearOfGraduation || 'Select graduation year'}
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {showDropdowns.yearOfGraduation && (
                    <div
                      className={`absolute z-10 ${
                        shouldOpenUpwards('yearOfGraduation')
                          ? 'bottom-full mb-1'
                          : 'mt-1'
                      } w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[130px] overflow-y-auto`}
                      ref={el =>
                        (dropdownRefs.current['yearOfGraduation-dropdown'] = el)
                      }
                    >
                      {years.map((year, index) => (
                        <div
                          key={index}
                          className='px-4 py-2 hover:bg-orange-50 cursor-pointer'
                          onClick={() =>
                            handleSelectOption('yearOfGraduation', year)
                          }
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end gap-4 pt-6 border-t border-gray-200 mt-6'>
              <button
                type='button'
                onClick={onClose} // Go back to previous route
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition'
              >
                Discard
              </button>
              <button
                type='submit'
                disabled={loading}
                className='px-4 py-2 text-sm font-medium text-white bg-[#db5602] hover:bg-[#b34600] rounded-md transition flex items-center justify-center'
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl p-6 max-w-md w-full shadow-xl border border-orange-100'>
            <h3 className='text-xl font-bold text-center mb-4 text-[#db5602]'>
              Choose Your Avatar
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {avatars.map(url => (
                <img
                  key={url}
                  src={url}
                  alt='avatar'
                  onClick={() => handleAvatarSelect(url)}
                  className={`w-16 h-16 rounded-full cursor-pointer transition-all ${
                    avatarSelectedUrl === url
                      ? 'ring-4 ring-[#db5602] scale-110'
                      : 'hover:ring-2 hover:ring-[#db5602]/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setShowAvatarModal(false)}
              className='mt-6 w-full py-2 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-[#db5602] font-medium border border-orange-100'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProfileModal
