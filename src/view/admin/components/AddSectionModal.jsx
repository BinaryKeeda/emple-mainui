import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
const AddSectionModal = ({ testId, closeModal }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    sectionType: 'Quiz'
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/api/v2/test/${testId}/sections`, form, {
        withCredentials: true
      })
      window.location.reload();
    } catch (error) {
      console.error('Error adding section:', error)
    }
  }

  return (
    <>
      <div className='bg-black opacity-55 fixed h-screen w-screen  top-0 left-0 z-50 flex justify-center items-cente'></div>
      <div className='fixed h-screen w-screen  top-0 left-0 z-50 flex justify-center items-center'>
        <div className=' bg-white max-w-md min-w-96 p-6 shadow-md'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold '>Add Section</h2>
            <IconButton onClick={closeModal}>
              <Close />
            </IconButton>
          </div>
          <div className='mb-3'>
            <label className='block'>Name</label>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              className='border custominput w-full p-2'
            />
          </div>
          <div className='mb-3'>
            <label className='block'>Description</label>
            <textarea
              name='description'
              value={form.description}
              onChange={handleChange}
              className='border custominput w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block'>Section Type</label>
            <select
              name='sectionType'
              value={form.sectionType}
              onChange={handleChange}
              className='border w-full custominput p-2'
            >
              <option value='Quiz'>Quiz</option>
              <option value='Coding'>Coding</option>
            </select>
          </div>
          <div className='flex justify-end gap-3'>
            <button
              onClick={handleSubmit}
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddSectionModal
