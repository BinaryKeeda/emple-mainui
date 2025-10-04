import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Typography
} from '@mui/material'
import { Add } from '@mui/icons-material'
import AddQuestionToSection from '../components/AddQuestionToSection'
import ManageProblems from '../components/ManageProblems'
const AdminAddSection = React.lazy(() => import('../components/AddSectionModal'))
export default function TestEdit () {
  const { id } = useParams()
  const [currTest, setCurrTest] = useState(null)
  const [currSection, setCurrSection] = useState()
  const [showSection, setShowSection] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    isAvailable: false
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: newValue }))
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v2/test/edit/${id}`,
        formData,
        { withCredentials: true }
      )
      setSnackbar({
        open: true,
        message: 'Test updated successfully!',
        severity: 'success'
      })
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update test.'
      setSnackbar({ open: true, message: msg, severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // routes importing

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v2/test/${id}`, { withCredentials: true })
      .then(res => {
        setCurrTest(res.data)
        setCurrSection(res.data?.sections[0])
        setFormData({
          name: res.data.name || '',
          duration: parseInt(res.data.duration) || 0,
          isAvailable: res.data.isAvailable || false
        })
      })
      .catch(e => console.log(e))
  }, [id])

  return (
    <div className='b'>
      {/* Quiz details edit */}
      <main className='flex gap-4'>
        <form
          onSubmit={handleSubmit}
          className='flex-1 border rounded-lg items-center py-3 grid grid-cols-1 space-y-3 shadow-lg font-sans  p-4'
        >
          <div className='flex items-center gap-3'>
            <h1 className='text-nowrap'>Test id : </h1>
            <input
              className='custominput'
              type='text'
              value={currTest?._id}
              readOnly
            />
          </div>
          <div className='flex items-center gap-3'>
            <h1 className='text-nowrap'>Test name : </h1>
            <input
              className='custominput'
              type='text'
              name='name'
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <h1 className='text-nowrap'>Test duration : </h1>
            <input
              className='custominput'
              type='text'
              name='duration'
              onChange={handleChange}
              value={formData.duration}
            />
          </div>
          <div className='flex items-center gap-3'>
            <h1 className='text-nowrap'>Test decription : </h1>
            <input
              className='custominput'
              type='text'
              value={currTest?.description}
              readOnly
            />
          </div>
          <div className='flex items-center gap-3'>
            <h1 className='text-nowrap'>Is Available </h1>
            <input
              className=''
              type='checkbox'
              name='isAvailable'
              onChange={handleChange}
              checked={formData.isAvailable}
            />
          </div>
          <Button
            type='submit'
            sx={{ fontSize: 11, width: '100px' }}
            variant='contained'
          >
            Update
          </Button>
        </form>

        <section className='flex-[0.7] justify-start border flex-col rounded-lg items-center py-3 flex gap-4 shadow-lg font-sans  p-4'>
          <div className='flex flex-col gap-2 w-full p-2 bg-white shadow-md rounded-md'>
            {currTest?.sections?.map((s, idx) => (
              <div key={s._id} className='w-full'>
                <Button
                  fullWidth
                  onClick={() => setCurrSection(s)}
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: 12,
                    textTransform: 'none',
                    backgroundColor:
                      s._id === currSection?._id ? '#333' : '#FFA500',
                    color: s._id === currSection?._id ? '#fff' : '#000',
                    '&:hover': {
                      backgroundColor:
                        s._id === currSection?._id ? '#111' : '#e69500'
                    },
                    borderRadius: '8px',
                    padding: '6px 12px'
                  }}
                  variant='contained'
                >
                  {s.name}
                </Button>
              </div>
            ))}
          </div>

          <Tooltip title='Add section'>
            <IconButton
              onClick={() => {
                setShowSection(true)
              }}
              color='primary'
              focusRipple
            >
              <Add />
            </IconButton>
          </Tooltip>
        </section>
      </main>
      <section className='mt-4'>
        {/* ADD QUESTION MODAL BOX */}
        {currSection && currSection?.sectionType == 'Quiz' && (
          <AddQuestionToSection
            setCurrSection={setCurrSection}
            setCurrTest={setCurrTest}
            setSnackbar={setSnackbar}
            sectionId={currSection?._id}
            testId={id}
          />
        )}
        {/* ADD PROBLEM MODAL */}
        {currSection && currSection?.sectionType == 'Coding' && (
          <>
            <ManageProblems testId={id} sectionId={currSection?._id} />
          </>
        )}
      </section>
      {/* ADD SECTION MODAL BOX */}
      {id && showSection && (
        <Suspense
          fallback={
            <div>
              <div className='loader'></div>
            </div>
          }
        >
          <AdminAddSection
            closeModal={() => {
              setShowSection(false)
            }}
            testId={id}
          />
        </Suspense>
      )}

      <section className='mt-4'>
        {currSection?.questionSet?.map((q, idx) => (
          <Accordion>
            <AccordionSummary>
              <div className='flex gap-3 items-center w-full'>
                <p className='text-sm'>{idx + 1 + '. '}</p>
                <div className='w-full'>
                  <label className='text-xs font-bold ml-1'>Question</label>
                  <input
                    type='text'
                    className='custominput'
                    value={q.question}
                    name=''
                    id=''
                  />
                </div>
                <div>
                  <label className='text-xs font-bold ml-1'>Marks</label>
                  <input
                    type='number'
                    className='custominput '
                    // style={{ width: 100 }}
                    value={q.negative}
                    name=''
                    id=''
                  />
                </div>
                <div>
                  <label className='text-xs font-bold ml-1'>Negative</label>
                  <input
                    type='number'
                    className='custominput '
                    value={q.marks}
                    name=''
                    id=''
                  />
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              {q.answerOptions.map((o, idx) => (
                <div className='flex mb-1 gap-3 items-center'>
                  <p className='text-xs text-nowrap'>Option {idx + 1}</p>
                  <input
                    style={{ width: '300px' }}
                    type='text'
                    className='custominput w-[100px]'
                    value={o.text}
                    name=''
                    id=''
                  />
                  <input
                    type='checkbox'
                    checked={o.isCorrect}
                    placeholder='isCorrect'
                    name=''
                    id=''
                  />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        {currSection?.problemset?.map((p, idx) => (
          <Accordion>
            <AccordionSummary>
              <div className='flex gap-3 items-center w-full'>
                <p className='text-sm'>{idx + 1 + '. '}</p>
                <p>{p.title}</p>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <>
                <p>{p.description}</p>
              </>
            </AccordionDetails>
          </Accordion>
        ))}
      </section>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
