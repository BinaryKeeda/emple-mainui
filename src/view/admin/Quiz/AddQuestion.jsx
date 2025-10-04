import { useState } from 'react'
import { Button, TextField, MenuItem, CircularProgress, IconButton } from '@mui/material'
import axios from 'axios'
import { UploadFile, Close } from '@mui/icons-material'
import { BASE_URL } from '../../../lib/config'
import { useSnackbar } from 'notistack'

export default function AddQuestion({ quizId, maxMarks, currentMarks, setCurrentMarks, onRefresh }) {
  const { enqueueSnackbar } = useSnackbar();

  const initialFormState = {
    quizId,
    question: '',
    image: '',
    marks: '',
    category: '',
    answer: '',
    negative: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  }

  const [formData, setFormData] = useState(initialFormState)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const changeHandler = e => {
    const { name, value, type, files } = e.target
    if (type === 'file' && files.length > 0) {
      const file = files[0]
      setFormData(prev => ({ ...prev, [name]: file }))
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]:
          name === 'marks' || name === 'negative'
            ? value // keep as string while typing
            : value
      }))
    }
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options]
    updatedOptions[index].text = value
    setFormData({ ...formData, options: updatedOptions })
  }

  const handleCorrectChange = (index, type) => {
    const updatedOptions = [...formData.options]
    if (type === 'MCQ') {
      updatedOptions.forEach((opt, i) => (updatedOptions[i].isCorrect = i === index))
    } else {
      updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect
    }
    setFormData({ ...formData, options: updatedOptions })
  }

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    setPreview('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.question || !formData.category || parseFloat(formData.marks) > maxMarks) {
      enqueueSnackbar('Please fill all required fields correctly!', { variant: 'warning' })
      return
    }

    setLoading(true)
    const form = new FormData()
    if (formData.image) form.append('image', formData.image)
    form.append(
      'data',
      JSON.stringify({
        quizId: formData.quizId,
        question: formData.question,
        marks: parseFloat(formData.marks) || 0,
        category: formData.category,
        answer: formData.answer,
        options: formData.options,
        negative: parseFloat(formData.negative) || 0
      })
    )

    try {
      await axios.post(`${BASE_URL}/api/admin/quiz/add/question`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      enqueueSnackbar('Question added successfully!', { variant: 'success' })
      onRefresh()
      setFormData(initialFormState) // reset state
      setPreview('')
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Failed to add question. Try again!', { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 bg-white p-5'>
      <TextField minRows={2}

        size='small'
        fullWidth
        name='question'
        label='Question'
        multiline
        value={formData.question}
        onChange={changeHandler}
        required
      />

      <TextField
        size='small'
        fullWidth
        name='marks'
        type='number'
        label='Marks'
        value={formData.marks}
        onChange={changeHandler}
        inputProps={{ min: 0, step: 'any' }}
        required
      />

      <TextField
        size='small'
        fullWidth
        name='negative'
        type='number'
        label='Negative Marks'
        value={formData.negative}
        onChange={changeHandler}
        inputProps={{ min: 0, step: 'any' }}
      />

      <TextField
        size='small'
        select
        fullWidth
        name='category'
        label='Category'
        value={formData.category}
        onChange={changeHandler}
        required
      >
        <MenuItem value='MCQ'>MCQ</MenuItem>
        <MenuItem value='MSQ'>MSQ</MenuItem>
        <MenuItem value='Text'>Text</MenuItem>
      </TextField>

      {formData.category === 'Text' && (
        <TextField
          size='small'
          fullWidth
          name='answer'
          label='Answer'
          value={formData.answer}
          onChange={changeHandler}
          required
        />
      )}

      {(formData.category === 'MCQ' || formData.category === 'MSQ') && (
        <div className='grid grid-cols-1 gap-2'>
          {formData.options.map((opt, index) => (
            <div key={index} className='flex items-center gap-2'>
              <TextField
                size='small'
                className='flex-1'
                label={`Option ${index + 1}`}
                value={opt.text}
                onChange={e => handleOptionChange(index, e.target.value)}
                required
              />
              {formData.category === 'MCQ' ? (
                <input
                  type='radio'
                  name='correctOption'
                  checked={opt.isCorrect}
                  onChange={() => handleCorrectChange(index, 'MCQ')}
                />
              ) : (
                <input
                  type='checkbox'
                  checked={opt.isCorrect}
                  onChange={() => handleCorrectChange(index, 'MSQ')}
                />
              )}
              Correct
            </div>
          ))}
        </div>
      )}

      <div className='flex items-center gap-2'>
        <Button component='label' variant='outlined' startIcon={<UploadFile />}>
          Upload Image
          <input type='file' name='image' hidden onChange={changeHandler} />
        </Button>
        {preview && (
          <div className='flex items-center gap-1'>
            <img
              src={preview}
              alt='Preview'
              className='h-20 object-contain cursor-pointer'
              onClick={() => document.getElementById('image-full')?.requestFullscreen()}
            />
            <IconButton size='small' onClick={handleImageRemove}>
              <Close />
            </IconButton>
          </div>
        )}
        <img src={preview} id='image-full' className='hidden' alt='fullscreen' />
      </div>

      <Button type='submit' variant='contained' disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Add Question'}
      </Button>
    </form>
  )
}
