// import React, { useEffect, useMemo, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   Avatar,
//   IconButton,
//   Autocomplete,
//   TextField,
//   debounce
// } from '@mui/material'
// import { ArrowBackIos, Close, EditOutlined } from '@mui/icons-material'
// import profileData from './profileData.json'
// import { BASE_URL, LOGO } from '../lib/config'
// import axios from 'axios'
// import { loginSuccess } from '../redux/slice/UserSlice'
// import { useSnackbar } from '../context/SnackBarContext'

// export default function CompleteProfile () {
//   const { user } = useSelector(s => s.auth)
//   const [step, setStep] = useState(1)
//   const [AvatarModal, showAvatarModal] = useState(false)
//   const { showSnackbar } = useSnackbar()
//   const dispatch = useDispatch()
//   const totalSteps = 3
//   const progress = (step / totalSteps) * 100

//   const [formData, setFormData] = useState({
//     avatar: user?.avatar || '',
//     name: user?.name || '',
//     phone: user?.phone || '',
//     program: user?.program || '',
//     specialisation: user?.specialisation || '',
//     semester: user?.semester || '',
//     yearOfGraduation: user?.yearOfGraduation || '',
//     university: user?.university || '',
//     password: ''
//   })

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   // Password regex: min 8 chars, at least one letter, number and special char
//   const isValidPassword = password => {
//     const regex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
//     return regex.test(password)
//   }

//   const validateStep = () => {
//     if (step === 1) {
//       return (
//         formData.name?.trim() &&
//           (formData.password?.trim() && isValidPassword(formData.password))
//       )
//     }
//     if (step === 2) {
//       return (
//         formData.program &&
//         formData.specialisation &&
//         formData.yearOfGraduation &&
//         formData.semester &&
//         formData.university
//       )
//     }
//     return true
//   }

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep(prev => prev + 1)
//     } else {
//       showSnackbar('Please complete all required fields', 'error')
//     }
//   }

//   useEffect(() => {
//     if (step > totalSteps) {
//       handleSubmit()
//     }
//   }, [step])

//   const handlePrevious = () => {
//     if (step > 1) setStep(prev => prev - 1)
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     if (!validateStep()) {
//       showSnackbar('Please complete all required fields', 'error')
//       return
//     }

//     axios
//       .put(
//         `${BASE_URL}/api/profile/complete`,
//         { ...formData, id: user._id },
//         { withCredentials: true }
//       )
//       .then(data => {
//         showSnackbar('Profile Setup Successful', 'success')
//         dispatch(loginSuccess(data.data.user))
//       })
//       .catch(e => console.log(e))
//   }

//   // Fetch universities
//   const fetchUniversities = useMemo(
//     () =>
//       debounce(async query => {
//         if (!query) return
//         setLoadingUniversities(true)
//         try {
//           const res = await axios.get(`${BASE_URL}/api/university/${query}`, {
//             withCredentials: true
//           })
//           const data = res.data
//           setUniversityOptions(data.map(data => data.name) || [])
//         } catch (error) {
//           console.error('Error fetching universities:', error)
//         } finally {
//           setLoadingUniversities(false)
//         }
//       }, 500),
//     []
//   )

//   const [universityOptions, setUniversityOptions] = useState([])
//   const [loadingUniversities, setLoadingUniversities] = useState(false)

//   useEffect(() => {
//     fetchUniversities(formData.university)
//   }, [formData.university, fetchUniversities])

//   useEffect(() => {
//     const handleKeyDown = e => {
//       if (e.key === 'Enter') {
//         e.preventDefault()
//         handleNext()
//       }
//     }
//     window.addEventListener('keydown', handleKeyDown)
//     return () => window.removeEventListener('keydown', handleKeyDown)
//   }, [step, formData])

//   return (
//     <>
//       {AvatarModal && (
//         <>
//           <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'></div>
//           <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md'>
//             <div className='flex justify-end'>
//               <IconButton onClick={() => showAvatarModal(false)}>
//                 <Close />
//               </IconButton>
//             </div>
//             <div className='grid grid-cols-4 gap-2'>
//               {profileData.avatars.map((url, idx) => (
//                 <img
//                   key={idx}
//                   src={url}
//                   onClick={() => {
//                     handleChange('avatar', url)
//                     showAvatarModal(false)
//                   }}
//                   className='hover:shadow-lg hover:scale-105 transition-all duration-100 cursor-pointer rounded-full h-[100px] w-[100px]'
//                 />
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       <header className='relative bg-white p-3 h-[70px] w-full'>
//         <nav className='fixed justify-between items-center flex h-[50px] top-0 pr-6 w-full'>
//           <img src={LOGO} className='h-9' alt='Logo' />
//         </nav>
//       </header>

//       <main className='h-[calc(100vh-70px)] bg-white flex-col flex pt-[100px] items-center'>
//         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//           <div className='flex gap-3 justify-between items-center mb-2'>
//             {step > 1 && (
//               <IconButton onClick={handlePrevious}>
//                 <ArrowBackIos />
//               </IconButton>
//             )}
//             <h1 className='text-3xl text-center flex-1 font-[Lato]'>
//               Complete Your Profile
//             </h1>
//           </div>

//           <div className='mb-7 bg-gray-200 rounded-full h-2.5'>
//             <div
//               className='bg-gray-900 transition-all duration-1000 h-2.5 rounded-full'
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <div className='h-[40vh] flex flex-col gap-4 w-[350px]'>
//             {step === 1 && (
//               <div className='animate-slide-left flex flex-col gap-6'>
//                 <div className='relative justify-center flex'>
//                   <Avatar
//                     src={formData.avatar}
//                     sx={{ width: 140, height: 140 }}
//                   />
//                   <IconButton
//                     onClick={() => showAvatarModal(true)}
//                     sx={{
//                       position: 'absolute',
//                       bottom: -10,
//                       marginLeft: '110px'
//                     }}
//                   >
//                     <EditOutlined />
//                   </IconButton>
//                 </div>
//                 <TextField
//                   label='Full Name'
//                   variant='outlined'
//                   value={formData.name}
//                   onChange={e => handleChange('name', e.target.value)}
//                   fullWidth
//                   required
//                 />
//                 <TextField
//                   label='Set up a Password'
//                   variant='outlined'
//                   type='password'
//                   value={formData.password}
//                   onChange={e => handleChange('password', e.target.value)}
//                   fullWidth
//                   required
//                   error={
//                     !!formData.password && !isValidPassword(formData.password)
//                   }
//                   helperText={
//                     formData.password && !isValidPassword(formData.password)
//                       ? 'Minimum 8 characters with at least 1 letter, 1 number, and 1 special character.'
//                       : ''
//                   }
//                 />
//                 <button
//                   type='button'
//                   onClick={handleNext}
//                   disabled={!validateStep()}
//                   className='py-3 bg-black text-white rounded-full disabled:opacity-50'
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}

//             {step === 2 && (
//               <div className='animate-slide-left flex flex-col gap-4'>
//                 <Autocomplete
//                   options={profileData.programs}
//                   value={formData.program}
//                   onChange={(e, value) => handleChange('program', value)}
//                   renderInput={params => (
//                     <TextField
//                       required
//                       {...params}
//                       label='Program'
//                       variant='outlined'
//                     />
//                   )}
//                 />
//                 <Autocomplete
//                   options={profileData.specialization}
//                   value={formData.specialisation}
//                   onChange={(e, value) => handleChange('specialisation', value)}
//                   renderInput={params => (
//                     <TextField
//                       required
//                       {...params}
//                       label='Specialisation'
//                       variant='outlined'
//                     />
//                   )}
//                 />
//                 <Autocomplete
//                   options={profileData.yearofgraduation}
//                   value={formData.yearOfGraduation}
//                   onChange={(e, value) =>
//                     handleChange('yearOfGraduation', value)
//                   }
//                   renderInput={params => (
//                     <TextField
//                       required
//                       {...params}
//                       label='Year of Graduation'
//                       variant='outlined'
//                     />
//                   )}
//                 />
//                 <Autocomplete
//                   options={['1', '2', '3', '4', '5', '6']}
//                   value={formData.semester}
//                   onChange={(e, value) => handleChange('semester', value)}
//                   renderInput={params => (
//                     <TextField
//                       required
//                       {...params}
//                       label='Semester'
//                       variant='outlined'
//                     />
//                   )}
//                 />
//                 <Autocomplete
//                   loading={loadingUniversities}
//                   options={universityOptions}
//                   value={formData.university}
//                   onChange={(e, value) => handleChange('university', value)}
//                   onInputChange={(e, value) =>
//                     handleChange('university', value)
//                   }
//                   renderInput={params => (
//                     <TextField
//                       {...params}
//                       label='University'
//                       variant='outlined'
//                       fullWidth
//                     />
//                   )}
//                 />
//                 <small>
//                   Note: Try searching full name of your university for better
//                   results.
//                 </small>
//                 <button
//                   type='button'
//                   onClick={handleNext}
//                   disabled={!validateStep()}
//                   className='py-3 bg-black text-white rounded-full disabled:opacity-50'
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}

//             {step === 3 && (
//               <div className='animate-slide-left flex flex-col gap-4'>
//                 <p className='text-xs'>
//                   By continuing you agree to our{' '}
//                   <a href='/' className='underline'>
//                     Terms & Conditions
//                   </a>
//                 </p>
//                 <button
//                   type='submit'
//                   className='py-3 mt-2 bg-black text-white rounded-full'
//                 >
//                   Submit Profile
//                 </button>
//               </div>
//             )}
//           </div>
//         </form>
//       </main>
//     </>
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

      <main className='bg-white gap-3 xs:p-5  flex justify-center items-center h-screen'>
        <img className='absolute min-w top-2 left-2 h-10' src={LOGO} alt="" />
          <form className='flex-col flex gap-4 ' onSubmit={handleSubmit}>
            <div className='flex gap-3 w-full'>
              <div className='flex flex-1 gap-4 justify-center flex-col'>
                <h1 className='text-3xl lg:mb-0 mb-42 text-[#111827] text-center font-[Lato]'>
                  Profile Details
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
