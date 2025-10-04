import React, { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Modal,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { Upload, ExpandMore } from '@mui/icons-material'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 900,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto'
}

function ManualQuestionForm({ onSubmit }) {
  const [questionData, setQuestionData] = useState({
    question: '',
    marks: 1,
    negative: 0,
    topic: '',
    category: 'MCQ',
    answer: '',
    options: Array(4).fill({ text: '', isCorrect: false })
  })
  const [submitting, setSubmitting] = useState(false)

  const handleOptionTextChange = (index, value) => {
    const updated = [...questionData.options]
    updated[index] = { ...updated[index], text: value }
    setQuestionData({ ...questionData, options: updated })
  }

  const handleMCQCorrectChange = index => {
    const updated = questionData.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    }))
    setQuestionData({ ...questionData, options: updated })
  }

  const handleMSQCorrectToggle = index => {
    const updated = [...questionData.options]
    updated[index].isCorrect = !updated[index].isCorrect
    setQuestionData({ ...questionData, options: updated })
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      await onSubmit([questionData])
      setQuestionData({
        question: '',
        marks: 1,
        negative: 0,
        topic: '',
        category: 'MCQ',
        answer: '',
        options: Array(4).fill({ text: '', isCorrect: false })
      })
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box className='space-y-4'>
      <TextField size='small' label='Question Text' fullWidth multiline value={questionData.question} onChange={e => setQuestionData({ ...questionData, question: e.target.value })} />
      <TextField size='small' label='Topic' fullWidth value={questionData.topic} onChange={e => setQuestionData({ ...questionData, topic: e.target.value })} />
      <TextField size='small' label='Marks' type='number' value={questionData.marks} onChange={e => setQuestionData({ ...questionData, marks: parseFloat(e.target.value) })} />
      <TextField size='small' label='Negative Marks' type='number' value={questionData.negative} onChange={e => setQuestionData({ ...questionData, negative: parseFloat(e.target.value) })} />
      <TextField size='small' select label='Category' fullWidth value={questionData.category} onChange={e => {
        const cat = e.target.value
        const baseOptions = Array(4).fill({ text: '', isCorrect: false })
        setQuestionData({ ...questionData, category: cat, options: baseOptions, answer: '' })
      }}>
        <MenuItem value='MCQ'>MCQ</MenuItem>
        <MenuItem value='MSQ'>MSQ</MenuItem>
        <MenuItem value='Text'>Text</MenuItem>
      </TextField>

      {questionData.category === 'Text' && (
        <TextField size='small' label='Answer' fullWidth value={questionData.answer} onChange={e => setQuestionData({ ...questionData, answer: e.target.value })} />
      )}

      {(questionData.category === 'MCQ' || questionData.category === 'MSQ') && (
        <Box>
          <Typography sx={{ my: 1 }} className='mb-5 font-medium'>Options (4 required):</Typography>
          {questionData.options.map((opt, idx) => (
            <Box key={idx} className='flex items-center gap-2 mb-2'>
              {questionData.category === 'MCQ' ? (
                <Radio size='small' checked={opt.isCorrect} onChange={() => handleMCQCorrectChange(idx)} />
              ) : (
                <Checkbox size='small' checked={opt.isCorrect} onChange={() => handleMSQCorrectToggle(idx)} />
              )}
              <TextField size='small' fullWidth label={`Option ${idx + 1}`} value={opt.text} onChange={e => handleOptionTextChange(idx, e.target.value)} />
            </Box>
          ))}
        </Box>
      )}

      <Button variant='contained' onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Add Question'}
      </Button>
    </Box>
  )
}

export default function AddTestSectionQuestionsModal({ open, onClose, onSuccess, bankId, sectionId }) {
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [previewQuestions, setPreviewQuestions] = useState([])

  const handleJSONUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    try {
      setLoading(true)
      const text = await file.text()
      const questions = JSON.parse(text)
      setPreviewQuestions(questions)
    } catch (err) {
      console.error(err)
      setUploadError('Invalid JSON format')
    } finally {
      setLoading(false)
    }
  }

  const handleExcelUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    try {
      setLoading(true)
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(sheet)

      const transformed = rows.map(row => {
        const { question, category, marks, negative, topic, answer, option1, correct1, option2, correct2, option3, correct3, option4, correct4 } = row

        const base = {
          question: question || '',
          category: category || 'MCQ',
          marks: parseFloat(marks) || 1,
          negative: parseFloat(negative) || 0,
          topic: topic || ''
        }

        if (base.category === 'Text') {
          return { ...base, answer: answer || '' }
        }

        const options = [
          { text: option1 || '', isCorrect: correct1 === true || correct1 === 'true' },
          { text: option2 || '', isCorrect: correct2 === true || correct2 === 'true' },
          { text: option3 || '', isCorrect: correct3 === true || correct3 === 'true' },
          { text: option4 || '', isCorrect: correct4 === true || correct4 === 'true' }
        ]

        return { ...base, options }
      })

      setPreviewQuestions(transformed)
    } catch (err) {
      console.error(err)
      setUploadError('Invalid Excel format')
    } finally {
      setLoading(false)
    }
  }

  const submitQuestions = async questions => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/add/questionbanks/questions/${bankId}/`,
        questions,
        { withCredentials: true }
      )
      alert('Questions added successfully!')
      onClose()
      onSuccess()
    } catch (err) {
      console.error(err)
      alert('Failed to submit questions')
    }
  }

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography variant='h6' className='mb-4'>Add Questions to Section</Typography>

        <div className='flex gap-4 mb-4'>
          <Button variant='outlined' component='label' startIcon={<Upload fontSize='small' />}>
            Upload JSON
            <input type='file' accept='.json' hidden onChange={handleJSONUpload} />
          </Button>
          <Button variant='outlined' component='label' startIcon={<Upload fontSize='small' />}>
            Upload Excel
            <input type='file' accept='.xlsx,.xls' hidden onChange={handleExcelUpload} />
          </Button>
        </div>

        {uploadError && (
          <Typography color='error' variant='body2' className='mb-2'>{uploadError}</Typography>
        )}

        <div className='flex gap-4 mb-6'>
          <Button variant='outlined' href='/data/sample-json.json' download startIcon={<Upload fontSize='small' />}>
            Download JSON Template
          </Button>
          <Button variant='outlined' href='/data/sample-excel.xlsx' download startIcon={<Upload fontSize='small' />}>
            Download Excel Template
          </Button>
        </div>

        <Typography variant='subtitle1' className='mb-2 font-semibold'>Manual Entry</Typography>
        <ManualQuestionForm onSubmit={submitQuestions} />

        {previewQuestions.length > 0 && (
          <Box className='mt-6'>
            <Typography variant='subtitle1' className='mb-2 font-semibold'>
              Preview Uploaded Questions ({previewQuestions.length})
            </Typography>
            {previewQuestions.map((q, i) => (
              <Accordion key={i} defaultExpanded={i === 0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Q{i + 1}: {q.question.slice(0, 80)}...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Topic:</strong> {q.topic}</Typography>
                  <Typography><strong>Marks:</strong> {q.marks}</Typography>
                  <Typography><strong>Negative:</strong> {q.negative}</Typography>
                  <Typography><strong>Category:</strong> {q.category}</Typography>

                  {q.category === 'Text' && (
                    <Typography><strong>Answer:</strong> {q.answer}</Typography>
                  )}

                  {(q.category === 'MCQ' || q.category === 'MSQ') && (
                    <Box className='mt-2 space-y-1'>
                      {q.options?.map((opt, idx) => (
                        <Typography key={idx}>
                          {opt.isCorrect ? '✅' : '⬜️'} Option {idx + 1}: {opt.text}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}

            <Button className='mt-4' variant='contained' onClick={() => submitQuestions(previewQuestions)}>
              Submit All Previewed Questions
            </Button>
          </Box>
        )}

        {loading && <CircularProgress className='mt-4' />}
      </Box>
    </Modal>
  )
}