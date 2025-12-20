import {
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
