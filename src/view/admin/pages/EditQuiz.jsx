// import {
//   Add,
//   ArrowDropDown,
//   Cloud,
//   Delete,
//   UploadFile
// } from '@mui/icons-material'
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Button,
//   CircularProgress,
//   FormControl,
//   Icon,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Radio,
//   Select,
//   TextField
// } from '@mui/material'
// import axios from 'axios'
// import { lazy, Suspense, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { calcMarks } from './utils/lib/calcMarks'
// import { useSelector } from 'react-redux'
// import { BASE_URL } from '../../lib/config'
// import JsonModal from './modals/JsonModal'
// import AikenModal from './modals/AikenModal'
// const ExcelModal = lazy(() => import('./modals/ExcelModal'))

// export default function EditQuiz () {
//   const {
//     data
//   } = useSelector(s => s.quiz)
//   const [ModalClose, setModalClose] = useState(true);
//   const [showJsonModal, setShowJsonModal] = useState(false);
//   const [showAiken, setShowAiken] = useState(true);
//   const [currentQuiz, setCurrentQuiz] = useState(null)
//   const { id } = useParams()
//   const [isVisible, setIsVisible] = useState(false)
//   const [currentMarks, setCurrentMarks] = useState(0)
//   const [maxMarks, setMaxMarks] = useState(0)
//   const [formData, setFormData] = useState({
//     quizId: id,
//     question: '',
//     image: '',
//     marks: 0,
//     category: '',
//     answer: '',
//     negative: 0,
//     options: [
//       { text: '', isCorrect: false },
//       { text: '', isCorrect: false },
//       { text: '', isCorrect: false },
//       { text: '', isCorrect: false }
//     ]
//   })

//   const getQuiz = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/quiz/${id}` , {withCredentials:true})
//       if (res.data) {
//         setCurrentQuiz(res.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getQuiz()
//   }, [])

//   useEffect(() => {
//     setMaxMarks(currentQuiz?.marks)
//     setCurrentMarks(calcMarks(currentQuiz ? currentQuiz.questions : []))
//   }, [currentQuiz])

//   const deleteQuiz = async id => {
//     axios
//       .get(
//         `${BASE_URL}/api/v1//quiz/question/del/?quizId=${currentQuiz._id}&questionId=${id}`
//       )
//       .then(res => {
//         window.location.reload();
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
//   return (
//     <section className='flex flex-col gap-5'>
//       {currentQuiz == null ? (
//         <div className='h-screen w-screen fixed justify-center flex items-center bg-opacity-20 bg-black left-0 top-0 z-[2999] '>
//           <CircularProgress size={'27px'} />
//         </div>
//       ) : (
//         <>
//           <div className='flex shadow-sm rounded-md bg-white p-5 justify-between'>
//             <div className='flex flex-col gap-1'>
//               <i className='text-sm'>
//                 {!currentQuiz.isAvailable
//                   ? 'Currently Not Available'
//                   : 'Available'}
//               </i>{' '}
//               <i>
//                 Current Marks : {currentMarks} / {maxMarks}
//               </i>
//             </div>
//             <div className='flex gap-2 items-center'>
//               <Button onClick={() => setModalClose(false)} variant='outlined'>
//                 Upload Excel <Cloud sx={{ marginLeft: '10px' }} />
//               </Button>
//               <Button
//                 onClick={() => setShowJsonModal(true)}
//                 variant='contained'
//               >
//                 Upload JSON <UploadFile sx={{ marginLeft: '10px' }} />
//               </Button>
//               <Button
//                 onClick={() => setShowJsonModal(true)}
//                 variant='contained'
//               >
//                 Upload Aiken <UploadFile sx={{ marginLeft: '10px' }} />
//               </Button>
//             </div>
//           </div>
//           <QuizEdit data={currentQuiz} />
//         </>
//       )}

//       <AddQuestion
//         setCurrentMarks={setCurrentMarks}
//         maxMarks={maxMarks}
//         currentMarks={currentMarks}
//         formData={formData}
//         setFormData={setFormData}
//       />
//       <section className='p-5 bg-white flex-col flex gap-1'>
//         {!(currentQuiz?.questions.length == 0) ? (
//           currentQuiz?.questions.map((item, index) => (
//             <div key={index} className=''>
//               <Accordion className=''>
//                 <AccordionSummary
//                   expandIcon={<ArrowDropDown />}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row-reverse', // This moves the expand icon to the left
//                     alignItems: 'center' // Center-align content
//                   }}
//                 >
//                   <div className='flex w-full justify-between'>
//                     <h1 className='flex gap-1 text-sm'>
//                       Question {index + 1}
//                       <p className='ml-2'> {item.question}</p>
//                     </h1>
//                     <div className='flex relative w-24 justify-end gap-5'>
//                       <IconButton
//                         onClick={() => {
//                           deleteQuiz(item._id)
//                         }}
//                       >
//                         <Delete
//                           className='absolute left-0 z-40'
//                           sx={{
//                             color: 'gray'
//                           }}
//                         />
//                       </IconButton>
//                       <small>
//                         <i>{item.marks + ' '} Marks</i>
//                       </small>
//                     </div>
//                   </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <div className='flex flex-col text-sm px-5'>
//                     <h1 className='flex gap-1 text-sm'>
//                       Type : {item.category}
//                     </h1>
//                     {item.image && (
//                       <div className='flex justify-start'>
//                         <img
//                           className='my-2 h-[100px] object-contain'
//                           src={item.image}
//                         />
//                       </div>
//                     )}
//                     {item.category == 'Text' && (
//                       <TextField
//                         disabled
//                         label='Answer'
//                         value={item.answer}
//                         variant='standard'
//                       />
//                     )}
//                     {item.category == 'MCQ' && (
//                       <>
//                         {item.options.map((i, k) => (
//                           <div
//                             key={k}
//                             className='flex gap-2 text-sm items-center'
//                           >
//                             <h1 className='flex gap-1 text-sm'>
//                               Option {k + 1}.
//                             </h1>
//                             <h1 className='flex gap-1 text-sm'>{i.text}</h1>
//                             <input type='radio' checked={i.isCorrect} id='' />
//                             Is Correct
//                           </div>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                   <div className='flex mt-1 justify-end'>
//                     <Button variant='contained'>Save</Button>
//                   </div>
//                 </AccordionDetails>
//               </Accordion>
//             </div>
//           ))
//         ) : (
//           <small>No Questions to display</small>
//         )}
//       </section>

//       {!ModalClose && (
//         <Suspense fallback={<div><div className='loader'></div></div>}>
//           <ExcelModal id={id} setModalClose={setModalClose} />
//         </Suspense>
//       )}
//       {
//         showJsonModal && 
//         <JsonModal setModalClose={() => setShowJsonModal(false)} id={id}/>
//       }
//       {
//         showAiken && <AikenModal/>
//       }
//     </section>
//   )
// }

// 

//   const handleFullScreen = () => {
//     const imageElement = document.getElementById('preview-image')
//     if (imageElement.requestFullscreen) {
//       imageElement.requestFullscreen()
//     } else if (imageElement.webkitRequestFullscreen) {
//       imageElement.webkitRequestFullscreen()
//     } else if (imageElement.msRequestFullscreen) {
//       imageElement.msRequestFullscreen()
//     }
//   }
//   return (
//     <form
//       className='items-center space-y-3 p-5 bg-white'
//       onSubmit={handleSubmit}
//     >
//       <div className='items-center flex-wrap gap-3 min-h-10 flex'>
//         <TextField
//           onChange={changeHandler}
//           name='quizId'
//           value={formData.quizId}
//           variant='standard'
//           label='Quiz ID'
//           disabled
//           required
//         />
//         <TextField
//           rows={2}
//           multiline
          
//           onChange={changeHandler}
//           value={formData.question}
//           name='question'
//           sx={{ width: 340 }}
//           variant='standard'
//           label='Question text'
//           required
//         />
//         <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={formData.category}
//             onChange={changeHandler}
//             name='category'
//             variant='standard'
//             required
//           >
//             <MenuItem value='MCQ'>MCQ</MenuItem>
//             <MenuItem value='MSQ'>MSQ</MenuItem>
//             <MenuItem value='Text'>Text</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           name='negative'
//           type='number'
//           value={formData.negative}
//           onChange={e =>
//             setFormData({
//               ...formData,
//               [e.target.name]: parseInt(e.target.value)
//             })
//           }
//           sx={{ width: 140 }}
//           variant='standard'
//           label='Negative'
//           required
//         />

//         {formData.category === 'Text' && (
//           <TextField
//             onChange={changeHandler}
//             value={formData.answer}
//             name='answer'
//             type='text'
//             variant='standard'
//             label='Answer'
//             required
//           />
//         )}
//         <TextField
//           min='1'
//           onChange={changeHandler}
//           value={formData.marks}
//           name='marks'
//           error={maxMarks < currentMarks}
//           type='number'
//           variant='standard'
//           label='Marks'
//           required
//         />

//         <Button type='button' className='relative w-28' variant='contained'>
//           <input
//             name='image'
//             type='file'
//             className='opacity-0 absolute'
//             onChange={changeHandler}
//           />
//           <UploadFile />
//         </Button>
//         {preview && (
//           <img
//             id='preview-image'
//             onClick={handleFullScreen}
//             className='h-44'
//             src={preview}
//             alt='Preview'
//           />
//         )}
//       </div>

//       <div className='flex flex-col gap-3 p-2'>
//         {(formData.category == 'MCQ' || formData.category == 'MSQ') &&
//           formData.options.map((option, index) => (
//             <div key={index} className='items-center flex gap-2'>
//               <h1 className='text-gray-900 font-semibold'>{`Option ${
//                 index + 1
//               }`}</h1>
//               <div className='w-full max-w-sm min-w-[200px]'>
//                 <input
//                   required
//                   name={`option-${index}`}
//                   className='inputOption'
//                   placeholder='Type here...'
//                   value={option.text}
//                   onChange={e =>
//                     setFormData(prev => {
//                       const updatedOptions = [...prev.options]
//                       updatedOptions[index].text = e.target.value
//                       return { ...prev, options: updatedOptions }
//                     })
//                   }
//                 />
//               </div>
//               {formData.category == 'MCQ' ? (
//                 <>
//                   <input
//                     type='radio'
//                     required
//                     className='correctOption'
//                     name='correctOption'
//                     checked={option.isCorrect}
//                     onChange={() =>
//                       setFormData(prev => ({
//                         ...prev,
//                         options: prev.options.map((opt, idx) => ({
//                           ...opt,
//                           isCorrect: idx === index
//                         }))
//                       }))
//                     }
//                   />
//                 </>
//               ) : (
//                 <>
//                   {' '}
//                   <input
//                     type='checkbox'
//                     onChange={e => {
//                       setFormData(prev => {
//                         const updatedOptions = [...prev.options] // Create a copy of the options array
//                         updatedOptions[index].isCorrect = e.target.checked // Update the specific option
//                         return { ...prev, options: updatedOptions } // Return the new state
//                       })
//                     }}
//                     checked={formData.options[index]?.isChecked || false} // Ensure it's checked based on the state
//                     name=''
//                     id=''
//                   />
//                 </>
//               )}{' '}
//               Is Correct
//             </div>
//           ))}
//       </div>
//       <Button type='submit' variant='contained' color='primary'>
//         Add Question <Add />
//       </Button>

//       {loading && <LoadingModal />}
//     </form>
//   )
// }

// const QuizEdit = ({ data }) => {
//   const { user } = useSelector(s => s.auth)
//   const [formData, setFormData] = useState({
//     title: data.title,
//     creator: user._id,
//     duration: data.duration,
//     questions: data.questions,
//     marks: data.marks,
//     category: data.category,
//     difficulty: data.difficulty,
//     isAvailable: data.isAvailable
//   })

//   const changeHandler = e => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: name === 'marks' || name === 'duration' ? parseInt(value) : value
//     })
//   }

//   const submitHandler = async e => {
//     e.preventDefault()

//     try {
//       await axios.post(`${BASE_URL}/api/v1/quiz/edit/${data._id}`, formData)
//       //   toast.success('Quiz added successfully!');
//       window.location.reload()
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   return (
//     <>
//       <section className='p-5 bg-white'>
//         <h1 className='text-lg font-semibold'>Edit Quiz</h1>
//         <form onSubmit={submitHandler} className=''>
//           <div className='mb-5 grid grid-cols-1 sm:grid-cols-3 gap-5'>
//             <div class='w-full max-w-sm min-w-[200px]'>
//               <label className='text-xs ml-1 font-semibold'>Creator</label>
//               <input
//                 readOnly
//                 type='text'
//                 value={user._id}
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//               />
//             </div>
//             <div class='w-full max-w-sm min-w-[200px]'>
//               <label className='text-xs ml-1 font-semibold'>Title</label>
//               <input
//                 type='text'
//                 value={formData.title}
//                 onChange={changeHandler}
//                 name='title'
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//               />
//             </div>

//             <div class='w-full max-w-sm min-w-[200px]'>
//               <label className='text-xs ml-1 font-semibold'>Marks</label>
//               <input
//                 type='number'
//                 min={0}
//                 value={formData.marks}
//                 onChange={changeHandler}
//                 name='marks'
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//               />
//             </div>
//             <div class='w-full max-w-sm min-w-[200px]'>
//               <label className='text-xs ml-1 font-semibold'>Duration</label>
//               <input
//                 type='number'
//                 min={0}
//                 value={formData.duration}
//                 onChange={changeHandler}
//                 name='duration'
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//               />
//             </div>
//             <div className='w-full max-w-sm min-w-[200px]'>
//               <label className='text-xs ml-1 font-semibold'>Category</label>
//               <select
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//                 name='category'
//                 value={formData.category}
//                 onChange={changeHandler}
//               >
//                 <option value='Aptitude'>Aptitude</option>
//                 <option value='Core'>Core</option>
//                 <option value='Miscellaneous'>Miscellaneous</option>
//               </select>
//             </div>

//             <div className='text-xs  font-semibold min-w-[200px] max-w-sm ' >
//               <label className='text-xs ml-1 font-semibold min-w-[200px] max-w-sm '>Difficulty</label>
//               <select
//                 class='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
//                 placeholder='Type here...'
//                 name='difficulty'
//                 value={formData.difficulty}
//                 onChange={changeHandler}
//               >
//                 <option value='Easy'>Easy</option>
//                 <option value='Medium'>Medium</option>
//                 <option value='Hard'>Hard</option>
//               </select>
//             </div>
//             <div className='flex gap-2 items-end'>
//               <label className='text-xs font-semibold'>Is Available</label>
//               <input
//                 className=''
//                 type='checkbox'
//                 checked={formData.isAvailable}
//                 onChange={e => {
//                   setFormData({
//                     ...formData,
//                     [e.target.name]: e.target.checked ? true : false
//                   })
//                 }}
//                 name='isAvailable'
//               />
//             </div>
//           </div>
//           <Button
//             type='submit'
//             variant='contained'
//             color='primary'
//             sx={{ color: '#f1f1f1', fontWeight: 'bold' }}
//           >
//             Update Quiz
//           </Button>
//         </form>
//       </section>
//     </>
//   )
// }

// Refactored EditQuiz component with Toast, clean reload-less state update, structured sections

import {
  Add,
  ArrowDropDown,
  Cloud,
  Delete,
  UploadFile
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import axios from 'axios'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calcMarks } from '../utils/lib/calcMarks'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../../lib/config'
import { toast } from 'react-toastify'
import AddQuestion from '../Quiz/AddQuestion'

const AddQuestonJSON = lazy(() => import('../Quiz/AddQuestionJson'));
const AddQuestionExcel = lazy(() => import('../Quiz/AddQuestionExcel'));
export default function EditQuiz () {
  const { data } = useSelector(s => s.quiz)
  const [ModalClose, setModalClose] = useState(true)
  const [showJsonModal, setShowJsonModal] = useState(false)
  const [showAiken, setShowAiken] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const [currentMarks, setCurrentMarks] = useState(0)
  const [maxMarks, setMaxMarks] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/quiz/${id}`, { withCredentials: true })
        if (res.data) {
          setCurrentQuiz(res.data)
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to load quiz")
      }
    }
    getQuiz()
  }, [id, refresh])

  useEffect(() => {
    if (currentQuiz) {
      setMaxMarks(currentQuiz?.marks)
      setCurrentMarks(calcMarks(currentQuiz.questions || []))
    }
  }, [currentQuiz])

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.get(`${BASE_URL}/api/v1/quiz/question/del/?quizId=${currentQuiz._id}&questionId=${questionId}`)
      toast.success('Question deleted')
      setRefresh(prev => !prev)
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete question')
    }
  }

  if (!currentQuiz) {
    return (
      <div className='h-screen w-screen fixed justify-center flex items-center bg-opacity-20 bg-black left-0 top-0 z-[2999] '>
        <CircularProgress size={'27px'} />
      </div>
    )
  }

  return (
    <section className='flex flex-col gap-5'>
      <div className='flex shadow-sm rounded-md bg-white p-5 justify-between'>
        <div className='flex flex-col gap-1'>
          <i className='text-sm'>
            {!currentQuiz.isAvailable ? 'Currently Not Available' : 'Available'}
          </i>
          <i>Current Marks : {currentMarks} / {maxMarks}</i>
        </div>
        <div className='flex gap-2 items-center'>
          <Button onClick={() => setModalClose(false)} variant='outlined'>
            Upload Excel <Cloud  sx={{ marginLeft: '10px' }} />
          </Button>
          <Button onClick={() => setShowJsonModal(true)} variant='contained'>
            Upload JSON <UploadFile sx={{ marginLeft: '10px' }} />
          </Button>
          {/* <Button onClick={() => setShowAiken(true)} variant='contained'>
            Upload Aiken <UploadFile sx={{ marginLeft: '10px' }} />
          </Button> */}
        </div>
      </div>

      <QuizEdit data={currentQuiz} onRefresh={() => setRefresh(prev => !prev)} />

      <AddQuestion
        quizId={id}
        maxMarks={maxMarks}
        currentMarks={currentMarks}
        setCurrentMarks={setCurrentMarks}
        onRefresh={() => setRefresh(prev => !prev)}
      />

      <section className='p-5 bg-white flex-col flex gap-1'>
        {currentQuiz.questions.length > 0 ? (
          currentQuiz.questions.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDown />}
                sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}
              >
                <div className='flex w-full justify-between'>
                  <h1 className='flex gap-1 text-sm'>
                    Question {index + 1}: <span className='ml-2'>{item.question}</span>
                  </h1>
                  <div className='flex relative w-24 justify-end gap-5'>
                    <IconButton onClick={() => handleDeleteQuestion(item._id)}>
                      <Delete className='absolute left-0 z-40' sx={{ color: 'gray' }} />
                    </IconButton>
                    <small><i>{item.marks} Marks</i></small>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='flex flex-col text-sm px-5'>
                  <p>Type: {item.category}</p>
                  {item.image && (
                    <img className='my-2 h-[100px] object-contain' src={item.image} alt='Question' />
                  )}
                  {item.category === 'Text' && (
                    <TextField disabled label='Answer' value={item.answer} variant='standard' />
                  )}
                  {item.category === 'MCQ' || item.category == "MSQ" && (
                    item.options.map((opt, k) => (
                      <div key={k} className='flex gap-2 items-center'>
                        <p>Option {k + 1}: {opt.text}</p>
                        <input type='radio' checked={opt.isCorrect} readOnly /> Is Correct
                      </div>
                    ))
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <small>No Questions to display</small>
        )}
      </section>
{/* 
      {!ModalClose && (
        <Suspense fallback={<div className='loader'></div>}>
          <ExcelModal id={id} setModalClose={setModalClose} />
        </Suspense>
      )} */}
      {!ModalClose &&  <Suspense fallback={<div className='loader'></div>}>
          <AddQuestionExcel id={id} setModalClose={setModalClose} />
        </Suspense>
      
      }
      {showJsonModal && <AddQuestonJSON setModalClose={() => setShowJsonModal(false)} id={id} />}
      {/* {showAiken && <AikenModal setModalClose={() => setShowAiken(false)} id={id} />} */}
    </section>
  )
}

export const QuizEdit = ({ data, onRefresh }) => {
  const { user } = useSelector(s => s.auth)
  const [formData, setFormData] = useState({
    title: data.title,
    creator: user._id,
    duration: data.duration,
    questions: data.questions,
    marks: data.marks,
    category: data.category,
    difficulty: data.difficulty,
    isAvailable: data.isAvailable
  })

  const changeHandler = e => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'marks' || name === 'duration' ? parseInt(value) : value
    })
  }

  const submitHandler = async e => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/api/admin/quiz/edit/${data._id}`, formData , {withCredentials:true})
      toast.success("Quiz updated successfully")
      onRefresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update quiz")
    }
  }

  return (
    <section className='p-5 bg-white'>
      <h1 className='text-lg font-semibold'>Edit Quiz</h1>
      <form onSubmit={submitHandler} className='grid gap-5 grid-cols-1 sm:grid-cols-3'>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Creator</label>
          <input readOnly type='text' value={user._id} className='inputBox' />
        </div>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Title</label>
          <input type='text' value={formData.title} onChange={changeHandler} name='title' className='inputBox' />
        </div>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Marks</label>
          <input type='number' min={0} value={formData.marks} onChange={changeHandler} name='marks' className='inputBox' />
        </div>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Duration</label>
          <input type='number' min={0} value={formData.duration} onChange={changeHandler} name='duration' className='inputBox' />
        </div>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Category</label>
          <select name='category' value={formData.category} onChange={changeHandler} className='inputBox'>
            <option value='Aptitude'>Aptitude</option>
            <option value='Core'>Core</option>
            <option value='Miscellaneous'>Miscellaneous</option>
          </select>
        </div>
        <div className='w-full'>
          <label className='text-xs ml-1 font-semibold'>Difficulty</label>
          <select name='difficulty' value={formData.difficulty} onChange={changeHandler} className='inputBox'>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </div>
        <div className='flex gap-2 items-end'>
          <label className='text-xs font-semibold'>Is Available</label>
          <input type='checkbox' checked={formData.isAvailable} onChange={changeHandler} name='isAvailable' />
        </div>
        <div className='col-span-full'>
          <Button type='submit' variant='contained' color='primary'>Update Quiz</Button>
        </div>
      </form>
    </section>
  )
}
