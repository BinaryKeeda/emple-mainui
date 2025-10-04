import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Tooltip, Typography, Radio, Box, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import { BASE_URL } from '../../../lib/config'

export default function AddQuestionToSection ({
  setCurrTest,
  setCurrSection,
  setSnackbar,
  sectionId,
  testId
}) {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    marks: 0,
    negative: 0,
    answerOptions: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  })

  const handleAddQuestion = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/test/${testId}/section/${sectionId}/add-question`,
        newQuestion,
        { withCredentials: true }
      )

      setCurrSection(prev => ({
        ...prev,
        questionSet: [...(prev?.questionSet || []), newQuestion]
      }))
      
      setSnackbar({
        open: true,
        message: 'Question added!',
        severity: 'success'
      })
      setNewQuestion({
        question: '',
        marks: 0,
        negative: 0,
        answerOptions: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      })
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: 'Failed to add question',
        severity: 'error'
      })
    }
  }

  return (
    <Paper elevation={1} className='p-4 space-y-4'>
      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>Add Question</Typography>
      <form onSubmit={handleAddQuestion} className='space-y-3'>

        <TextField
        
          fullWidth
          label='Question'
          size='small'
          variant='outlined'
          value={newQuestion.question}
          onChange={e =>
            setNewQuestion(prev => ({ ...prev, question: e.target.value }))
          }
          required
        />

        <div className='grid grid-cols-2 gap-3'>
          {newQuestion.answerOptions.map((opt, idx) => (
            <div key={idx} className='flex items-center gap-2'>
              <Radio
                size='small'
                checked={opt.isCorrect}
                onChange={() => {
                  const updatedOptions = newQuestion.answerOptions.map((o, i) => ({
                    ...o,
                    isCorrect: i === idx
                  }))
                  setNewQuestion(prev => ({
                    ...prev,
                    answerOptions: updatedOptions
                  }))
                }}
              />
              <TextField
                label={`Option ${String.fromCharCode(65 + idx)}`}
                size='small'
                fullWidth
                variant='standard'
                value={opt.text}
                onChange={e => {
                  const updatedOptions = [...newQuestion.answerOptions]
                  updatedOptions[idx].text = e.target.value
                  setNewQuestion(prev => ({
                    ...prev,
                    answerOptions: updatedOptions
                  }))
                }}
                required
              />
            </div>
          ))}
        </div>

        <div className='flex gap-2'>
          <TextField
            label='Marks'
            type='number'
            size='small'
            value={newQuestion.marks}
            onChange={e =>
              setNewQuestion(prev => ({ ...prev, marks: parseFloat(e.target.value) }))
            }
            required
          />
          <TextField
            label='Negative'
            type='number'
            size='small'
            value={newQuestion.negative}
            onChange={e =>
              setNewQuestion(prev => ({ ...prev, negative: parseFloat(e.target.value) }))
            }
            required
          />
        </div>

        <div className='flex justify-end'>
          <Tooltip title='Add question'>
            <Button
              type='submit'
              variant='contained'
              size='small'
              endIcon={<Add sx={{ fontSize: 16 }} />}
              sx={{ fontSize: 12, textTransform: 'none' }}
            >
              Add
            </Button>
          </Tooltip>
        </div>
      </form>
    </Paper>
  )
}
