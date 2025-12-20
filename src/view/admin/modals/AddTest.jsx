import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
const defaultForm = {
  name: '',
  description: '',
  duration: '',
  visibility: 'private',
  category: 'Placements'
}

export default function CreateTestModal ({
  setModalClose,
  onTestCreated = () => {}
}) {

  const {enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  const {user} = useSelector(s => s.auth);
  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    if (!form.name || !form.duration || !form.visibility || !form.category) {
      enqueueSnackbar('Please fill all required fields ⚠️', {
        variant: 'warning'
      })
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${BASE_URL}/api/admin/tests/add`,
        { ...form, duration: Number(form.duration), creator : user._id },
        { withCredentials: true }
      )

      await queryClient.invalidateQueries({queryKey:['admin-test']});
      onTestCreated(res.data.data)
      setModalClose(false)
      navigate('/admin/edit/test/' + res.data.data)
      enqueueSnackbar('Test created successfully 🎉', { variant: 'success' })
    } catch (err) {
      console.error('Error creating test:', err)
      enqueueSnackbar(err.response?.data?.error || 'Something went wrong ❌', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onClose={() => setModalClose(false)} maxWidth='sm' fullWidth>
      <DialogTitle>Create New Test</DialogTitle>
      <DialogContent dividers className='flex flex-col gap-4 pt-4'>
        <TextField
          label='Test Name'
          name='name'
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label='Description'
          name='description'
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label='Duration (in minutes)'
          name='duration'
          type='number'
          value={form.duration}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label='Visibility'
          name='visibility'
          value={form.visibility}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value='private'>Private</MenuItem>
          <MenuItem value='public'>Public</MenuItem>
          <MenuItem value='group'>Group</MenuItem>
        </TextField>
        <TextField
          label='Category'
          name='category'
          value={form.category}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value='Placements'>Placements</MenuItem>
          <MenuItem value='Gate'>Gate</MenuItem>
        </TextField>
        {error && <p className='text-red-600 text-sm'>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalClose(false)} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
