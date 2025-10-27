// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { TextField, CircularProgress } from '@mui/material'
// import axios from 'axios'
// import { BASE_URL, LOGO } from '../lib/config'
// import { loginSuccess } from '../redux/slice/UserSlice'

// export default function CompleteProfile() {
//   const { user } = useSelector((s) => s.auth)
//   const dispatch = useDispatch()

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     phone: user?.phone || '',
//     email: user?.email || ''
//   })

//   const [sendingOtp, setSendingOtp] = useState({ phone: false, email: false })

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const sendOtp = async (type) => {
//     const value = formData[type]
//     if (!value) {
//       alert(`Please enter a valid ${type}`)
//       return
//     }
//     setSendingOtp((prev) => ({ ...prev, [type]: true }))
//     try {
//       await axios.post(
//         `${BASE_URL}/api/verify/send-otp`,
//         { type, value },
//         { withCredentials: true }
//       )
//       alert(`OTP sent to your ${type}`)
//     } catch (err) {
//       console.error(err)
//       alert(`Failed to send OTP to ${type}`)
//     } finally {
//       setSendingOtp((prev) => ({ ...prev, [type]: false }))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.put(
//         `${BASE_URL}/api/profile/complete`,
//         { ...formData, id: user._id },
//         { withCredentials: true }
//       )
//       dispatch(loginSuccess(res.data.user))
//       alert('Profile Setup Successful')
//     } catch (err) {
//       console.error(err)
//       alert('Error submitting profile')
//     }
//   }

//   return (
//     <main className='bg-black/20 absolute left-0 top-0 z-[2000] w-screen  gap-3 p-5 flex justify-center items-center h-screen'>
//       <form
//         className='flex-col bg-white p-14 rounded-xl flex gap-4 w-full max-w-md'
//         onSubmit={handleSubmit}
//       >
//         <h1 className='text-3xl text-[#111827] text-center font-[Lato] mb-3'>
//           Profile Details
//         </h1>

//         {/* Name Field */}
//         <TextField
//           size='small'
//           label='Full Name'
//           variant='outlined'
//           value={formData.name}
//           onChange={(e) => handleChange('name', e.target.value)}
//           fullWidth
//           required
//         />

//         {/* Email Field */}
//         <div className='flex items-center gap-2'>
//           <TextField
//             size='small'
//             label='Email'
//             variant='outlined'
//             type='email'
//             value={formData.email}
//             onChange={(e) => handleChange('email', e.target.value)}
//             fullWidth
//             required
//           />
//           <button
//             type='button'
//             onClick={() => sendOtp('email')}
//             disabled={sendingOtp.email}
//             className='bg-black text-white px-3 py-2 rounded-md min-w-[90px]'
//           >
//             {sendingOtp.email ? (
//               <CircularProgress size={20} color='inherit' />
//             ) : (
//               'Verify'
//             )}
//           </button>
//         </div>

//         {/* Phone Field */}
//         <div className='flex items-center gap-2'>
//           <TextField
//             size='small'
//             label='Phone Number'
//             variant='outlined'
//             type='tel'
//             value={formData.phone}
//             onChange={(e) => handleChange('phone', e.target.value)}
//             fullWidth
//             required
//           />
//           <button
//             type='button'
//             onClick={() => sendOtp('phone')}
//             disabled={sendingOtp.phone}
//             className='bg-black text-white px-3 py-2 rounded-md min-w-[90px]'
//           >
//             {sendingOtp.phone ? (
//               <CircularProgress size={20} color='inherit' />
//             ) : (
//               'Verify'
//             )}
//           </button>
//         </div>

//         <div className='flex flex-col gap-3'>
//           <p className='text-xs text-gray-500'>
//             By continuing you agree to our{' '}
//             <a href='/' className='underline'>
//               Terms & Conditions
//             </a>
//           </p>
//           <button
//             type='submit'
//             className='py-3 mt-2 bg-black text-white rounded-full'
//           >
//             Submit Profile
//           </button>
//         </div>
//       </form>
//     </main>
//   )
// }

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  IconButton,
  Autocomplete,
  TextField,
  debounce
} from '@mui/material'
import { ArrowBackIos, Close, EditOutlined } from '@mui/icons-material'
import profileData from './profileData.json'
import { BASE_URL, LOGO } from '../lib/config'
import axios from 'axios'
import { loginSuccess } from '../redux/slice/UserSlice'
// import { useSnackbar } from '../context/SnackBarContext'
import {
  PersonArrowLeft16Filled,
  SignOut20Filled,
  SignOut20Regular
} from '@fluentui/react-icons'
import { logOutUser } from '../redux/reducers/UserThunks'

export default function CompleteProfile () {
  const { user } = useSelector(s => s.auth)
  const [step, setStep] = useState(1)
  const [AvatarModal, showAvatarModal] = useState(false)
  // const { showSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const [formData, setFormData] = useState({
    avatar: user?.avatar || '',
    name: user?.name || '',
    phone: user?.phone || '',
    program: user?.program || '',
    specialisation: user?.specialisation || '',
    semester: user?.semester || '',
    yearOfGraduation: user?.yearOfGraduation || '',
    university: user?.university || '',
    password: ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isValidPassword = password => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return regex.test(password)
  }

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.name?.trim() &&
        formData.password?.trim() &&
        isValidPassword(formData.password)
      )
    }
    if (step === 2) {
      return (
        formData.program &&
        formData.specialisation &&
        formData.yearOfGraduation &&
        formData.semester &&
        formData.university
      )
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1)
    } else {
      // showSnackbar('Please complete all required fields', 'error')
    }
  }

  useEffect(() => {
    if (step > totalSteps) {
      handleSubmit()
    }
  }, [step])

  const handlePrevious = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const handleSubmit = e => {
    e?.preventDefault()
    if (!validateStep()) {
      // showSnackbar('Please complete all required fields', 'error')
      return
    }

    axios
      .put(
        `${BASE_URL}/api/profile/complete`,
        { ...formData, id: user._id },
        { withCredentials: true }
      )
      .then(data => {
        // showSnackbar('Profile Setup Successful', 'success')
        dispatch(loginSuccess(data.data.user))
      })
      .catch(e => console.log(e))
  }

  // Fetch universities
  const fetchUniversities = useMemo(
    () =>
      debounce(async query => {
        if (!query) return
        setLoadingUniversities(true)
        try {
          const res = await axios.get(`${BASE_URL}/api/university/${query}`, {
            withCredentials: true
          })
          const data = res.data.map(item => item.name)
          setUniversityOptions(
            data.includes('Others') ? data : [...data, 'Others']
          )
        } catch (error) {
          console.error('Error fetching universities:', error)
        } finally {
          setLoadingUniversities(false)
        }
      }, 500),
    []
  )

  const [universityOptions, setUniversityOptions] = useState([])
  const [loadingUniversities, setLoadingUniversities] = useState(false)

  const selectedProgramObj = useMemo(() => {
    return profileData.programs.find(p => p.name === formData.program)
  }, [formData.program])

  const semesterOptions = useMemo(() => {
    if (!selectedProgramObj?.maxSemester) return []
    return Array.from({ length: selectedProgramObj.maxSemester }, (_, i) =>
      (i + 1).toString()
    )
  }, [selectedProgramObj])

  useEffect(() => {
    fetchUniversities(formData.university)
  }, [formData.university, fetchUniversities])

  const handleLogout = () => {
    try {
      dispatch(logOutUser())
    } catch (error) {
      console.log(error, 'logout')
    }
  }

  return (
    <>
      {/* <header className='h-[50px] border-b flex items-center px-5 justify-between'>
        <img src={LOGO} className='h-9' alt='' />
        <button onClick={handleLogout}>
          <SignOut20Regular
            style={{
              height: '26px',
              width: '26px',
              color: '#000',
              cursor: 'pointer'
            }}
          />
        </button>
      </header> */}
      {/* MODAL */}
      {AvatarModal && (
        <>
          <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'></div>
          <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lge'>
            <div className='flex justify-end'>
              <IconButton onClick={() => showAvatarModal(false)}>
                <Close />
              </IconButton>
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {profileData.avatars.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  onClick={() => {
                    handleChange('avatar', url)
                    showAvatarModal(false)
                  }}
                  className='hover:shadow-lg hover:scale-105 transition-all duration-100 cursor-pointer rounded-full h-[100px] w-[100px]'
                />
              ))}
            </div>
          </div>
        </>
      )}

      <main className='bg-white gap-3 flex justify-center items-center h-screen'>
        <img className='absolute top-2 left-2 h-10' src={LOGO} alt="" />
          <form className='flex-col flex w-[420px] overflow-hidden gap-4 ' onSubmit={handleSubmit}>
            <div className='flex gap-3 w-full'>
              <div className='flex flex-1 gap-4 justify-center flex-col'>
                <h1 className='text-3xl text-[#111827] text-center font-[Lato]'>
                  Complete Your Profile
                </h1>
                <TextField
                  size='small'
                  label='Full Name'
                  variant='outlined'
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  fullWidth
                  required
                />
              </div>
              <div className='relative justify-center flex'>
                <Avatar
                  src={formData.avatar}
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton
                  onClick={() => showAvatarModal(true)}
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    marginLeft: '110px'
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </div>
            </div>

            <TextField
              size='small'
              label='Set up a Password'
              variant='outlined'
              type='password'
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              fullWidth
              required
              error={!!formData.password && !isValidPassword(formData.password)}
              helperText={
                formData.password && !isValidPassword(formData.password)
                  ? 'Min 8 characters with at least 1 letter, 1 number, and 1 special character.'
                  : ''
              }
            />

            <Autocomplete
              size='small'
              options={profileData.programs.map(p => p.name)}
              value={formData.program}
              onChange={(e, value) => handleChange('program', value)}
              renderInput={params => (
                <TextField
                  size='small'
                  {...params}
                  required
                  label='Program'
                  variant='outlined'
                />
              )}
            />
            <Autocomplete
              size='small'
              options={profileData.specialization}
              value={formData.specialisation}
              onChange={(e, value) => handleChange('specialisation', value)}
              renderInput={params => (
                <TextField
                  size='small'
                  {...params}
                  required
                  label='Specialisation'
                  variant='outlined'
                />
              )}
            />
            <Autocomplete
              size='small'
              options={profileData.yearofgraduation}
              value={formData.yearOfGraduation}
              onChange={(e, value) => handleChange('yearOfGraduation', value)}
              renderInput={params => (
                <TextField
                  size='small'
                  {...params}
                  required
                  label='Year of Graduation'
                  variant='outlined'
                />
              )}
            />
            <Autocomplete
              size='small'
              options={semesterOptions}
              value={formData.semester}
              onChange={(e, value) => handleChange('semester', value)}
              renderInput={params => (
                <TextField
                  size='small'
                  {...params}
                  required
                  label='Semester'
                  variant='outlined'
                />
              )}
            />
            <Autocomplete
              size='small'
              loading={loadingUniversities}
              options={universityOptions}
              value={formData.university}
              onChange={(e, value) => handleChange('university', value)}
              onInputChange={(e, value) => fetchUniversities(value)}
              freeSolo={false}
              renderInput={params => (
                <TextField
                  {...params}
                  required
                  label='University'
                  variant='outlined'
                />
              )}
            />

            <div className='flex animate-slide-left flex-col gap-4'>
              <p className='text-xs'>
                By continuing you agree to our{' '}
                <a href='/' className='underline'>
                  Terms & Conditions
                </a>
              </p>
              <button
                type='submit'
                className='py-3 mt-2 bg-black text-white rounded-full'
              >
                Submit Profile
              </button>
            </div>
          </form>    
      </main>
    </>
  )
}