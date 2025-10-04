import React, { useEffect, useState, lazy, Suspense } from 'react'
import {
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import AddIcon from '@mui/icons-material/Add'

const AddProblemModal = lazy(() => import('../modals/AddCampusTestProblems'))
const AddQuestionModal = lazy(() =>
  import('../modals/AddCampusTestQuestionBank')
)

export default function EditTestPage () {
  const { id: testId } = useParams()
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [newSection, setNewSection] = useState({
    title: '',
    type: 'quiz',
    maxQuestion: '',
    maxTime: '',
    maxScore: '',
    description: ''
  })

  const [addingSection, setAddingSection] = useState(false)
  const [savingChanges, setSavingChanges] = useState(false)
  const [openProblemModal, setOpenProblemModal] = useState(null)
  const [openQuestionModal, setOpenQuestionModal] = useState(null)

  const fetchTest = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/campus/tests/${testId}`,
        {
          withCredentials: true
        }
      )
      setTest(res.data.data)
    } catch (err) {
      setError('Failed to fetch test')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTest()
  }, [testId])

  const handleAddSection = async () => {
    try {
      setAddingSection(true)
      const res = await axios.put(
        `${BASE_URL}/api/admin/campus/tests/${testId}/sections`,
        newSection,
        { withCredentials: true }
      )
      await fetchTest()
      setNewSection({
        title: '',
        type: 'quiz',
        maxQuestion: '',
        maxTime: '',
        maxScore: '',
        description: ''
      })
    } catch (err) {
      console.error('Failed to add section', err)
      alert('Failed to add section')
    } finally {
      setAddingSection(false)
    }
  }

  const handleSaveChanges = async () => {
    try {
      setSavingChanges(true)
      const res = await axios.put(
        `${BASE_URL}/api/admin/campus/tests/update/${testId}`,
        test,
        { withCredentials: true }
      )
      setTest(res.data.data)
    } catch (err) {
      console.error('Failed to update test', err)
      alert('Failed to save changes')
    } finally {
      setSavingChanges(false)
    }
  }
  const handleDeleteSection = async sectionId => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this section?'
    )
    if (!confirmDelete) return

    try {
      await axios.delete(
        `${BASE_URL}/api/admin/campus/tests/${testId}/sections/${sectionId}`,
        { withCredentials: true }
      )
      await fetchTest() // Refresh updated test
    } catch (err) {
      console.error('Failed to delete section', err)
      alert('Failed to delete section')
    }
  }

  if (loading)
    return (
      <div className='flex justify-center py-12'>
        <CircularProgress />
      </div>
    )

  if (error) return <Typography color='error'>{error}</Typography>

  return (
    <div>
      <div className='p-6 md:p-10 bg-gray-50 min-h-screen'>
        <div className='flex justify-between'>
          <h4 className='font-bold mb-2 text-gray-800 text-xl'>
          Edit Test - {test?.name}
        </h4>
        <Button onClick={() => navigate('/admin/mail/'+testId)} variant='contained'>
          Mail Users
        </Button>
        </div>
        <h3 className='mb-4 font-medium'>
          Available for : {test.groupId?.groupName}
        </h3>
        {/* Editable Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <TextField
            size='small'
            label='Test Name'
            value={test?.name || ''}
            onChange={e => setTest({ ...test, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            size='small'
            label='Visibility'
            value={test?.visibility || 'private'}
            onChange={e => setTest({ ...test, visibility: e.target.value })}
            fullWidth
          >
            <MenuItem value='private'>Private</MenuItem>
            <MenuItem value='public'>Public</MenuItem>
            <MenuItem value='group'>Group</MenuItem>
          </TextField>
          <TextField
            select
            size='small'
            label='Availability'
            value={test?.isAvailable ? 'true' : 'false'}
            onChange={e =>
              setTest({ ...test, isAvailable: e.target.value === 'true' })
            }
            fullWidth
          >
            <MenuItem value='true'>Available</MenuItem>
            <MenuItem value='false'>Not Available</MenuItem>
          </TextField>
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={handleSaveChanges}
          disabled={savingChanges}
          className='mb-8'
        >
          {savingChanges ? 'Saving...' : 'Save Changes'}
        </Button>

        {/* Add Section */}
        <div className='mt-8'>
          <h1 className='font-medium mb-2 pl-1 text-gray-700'>
            Add New Section
          </h1>
          <div className='flex flex-wrap items-center gap-4'>
            <TextField
              size='small'
              label='Section Title'
              value={newSection.title}
              onChange={e =>
                setNewSection({ ...newSection, title: e.target.value })
              }
            />
            <TextField
              size='small'
              select
              label='Type'
              value={newSection.type}
              onChange={e =>
                setNewSection({ ...newSection, type: e.target.value })
              }
            >
              <MenuItem value='quiz'>Quiz</MenuItem>
              <MenuItem value='coding'>Coding</MenuItem>
              <MenuItem value='mixed'>Mixed</MenuItem>
            </TextField>
            <TextField
              size='small'
              type='number'
              label='Max Questions'
              value={newSection.maxQuestion}
              onChange={e =>
                setNewSection({
                  ...newSection,
                  maxQuestion: Number(e.target.value)
                })
              }
            />
            <TextField
              size='small'
              type='number'
              label='Max Time (min)'
              value={newSection.maxTime}
              onChange={e =>
                setNewSection({
                  ...newSection,
                  maxTime: Number(e.target.value)
                })
              }
            />
            <TextField
              size='small'
              type='number'
              label='Max Score (optional)'
              value={newSection.maxScore}
              onChange={e =>
                setNewSection({
                  ...newSection,
                  maxScore: Number(e.target.value)
                })
              }
            />
            <TextField
              size='small'
              label='Description (optional)'
              value={newSection.description}
              onChange={e =>
                setNewSection({
                  ...newSection,
                  description: e.target.value
                })
              }
            />
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddSection}
              disabled={
                addingSection ||
                !newSection.title ||
                !newSection.maxQuestion ||
                !newSection.maxTime
              }
            >
              {addingSection ? 'Adding...' : 'Add Section'}
            </Button>
          </div>
        </div>

        {/* Section List */}
        <h2 className='font-semibold pl-1 mt-6 mb-4 text-gray-700 text-lg'>
          Sections
        </h2>

        {test?.sections.length === 0 && (
          <p className='text-gray-500 italic mb-4'>No sections added yet.</p>
        )}

        {test.sections.map((section, index) => (
          <Paper
            key={section._id || index}
            className='p-4 mb-4 shadow-sm border rounded-lg bg-white'
          >
            <Typography className='font-semibold text-lg'>
              {section.title}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Type:{' '}
              {section.type === 'quiz'
                ? `Quiz Questions ${section.questionSet?.length || 0}`
                : `Coding Problems ${section.problemset?.length || 0}`}
            </Typography>

            <Typography variant='body2'>
              Max Questions: {section.maxQuestion} | Max Time: {section.maxTime}{' '}
              mins{' '}
              {section.maxScore !== undefined &&
                `| Max Score: ${section.maxScore}`}
            </Typography>

            {section.description && (
              <Typography variant='body2' className='text-gray-600'>
                {section.description}
              </Typography>
            )}

            <div className='flex flex-col gap-4 mt-4'>
              {section.type === 'quiz' && (
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => setOpenQuestionModal(section._id)}
                >
                  {section.questionPool
                    ? 'Update Questionpool'
                    : 'Add Questionpool'}
                </Button>
              )}
              {section.type === 'coding' && (
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => setOpenProblemModal(section._id)}
                >
                  Add Problems
                </Button>
              )}
              <Accordion>
                <AccordionSummary>
                  {section.type === 'quiz' ? 'View Questions' : 'View Problems'}
                </AccordionSummary>
                <AccordionDetails>
                  {section.type === 'quiz' ? (
                    <>{section?.questionPool?.name}</>
                  ) : section.problemPool?.length ? (
                    <ul className='list-disc ml-6 space-y-2 text-sm text-gray-800'>
                      {section.problemPool.map((p, i) => (
                        <li key={p._id || i}>
                          <strong>{p.title || `Problem ${i + 1}`}</strong>
                          <br />
                          {p.difficulty && (
                            <>
                              <span className='text-gray-600'>Difficulty:</span>{' '}
                              {p.difficulty}
                              <br />
                            </>
                          )}
                          {Array.isArray(p.tags) && p.tags.length > 0 && (
                            <>
                              <span className='text-gray-600'>Tags:</span>{' '}
                              {p.tags.join(', ')}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-500 italic'>
                      No problems added yet.
                    </p>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
            <Button
              sx={{ mt: 3 }}
              size='small'
              color='error'
              variant='outlined'
              onClick={() => handleDeleteSection(section._id)}
            >
              Delete Section
            </Button>

            <Suspense fallback={<div>Loading modal...</div>}>
              {openQuestionModal === section._id && section.type === 'quiz' && (
                <AddQuestionModal
                  open={true}
                  onClose={() => setOpenQuestionModal(null)}
                  testId={testId}
                  sectionId={section._id}
                  onSuccess={() => {
                    fetchTest()
                    setOpenQuestionModal(null)
                  }}
                />
              )}
              {openProblemModal === section._id && section.type === 'coding' && (
                <AddProblemModal
                  open={true}
                  onClose={() => setOpenProblemModal(null)}
                  testId={testId}
                  sectionId={section._id}
                  onSuccess={() => {
                    fetchTest()
                    setOpenProblemModal(null)
                  }}
                />
              )}
            </Suspense>
          </Paper>
        ))}
      </div>
    </div>
  )
}
