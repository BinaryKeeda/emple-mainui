import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { useState } from 'react'
import { useSnackbar } from 'notistack'

const PaginatedTable = ({ data, type }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [items, setItems] = useState(data?.data || [])

  const onDelete = async (id) => {
    try {
      await axios.post(`${BASE_URL}/api/admin/delete/${type}/${id}`) // better use DELETE

      // remove deleted item from state
      setItems(prev => prev.filter(item => item._id !== id))

      enqueueSnackbar(`${type} deleted successfully`, { variant: 'success' })
    } catch (e) {
      console.error("Delete failed:", e)

      const errorMessage = e.response?.data?.message || "Failed to delete. Try again."
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  if (!items.length) {
    return <div className='text-center'>No {type}s found.</div>
  }

  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left font-semibold text-sm'>Title</th>
            {type === 'test' && (
              <th className='px-6 py-3 text-left font-semibold text-sm'>Category</th>
            )}
            {type === 'problems' && (
              <th className='px-6 py-3 text-left font-semibold text-sm'>Difficulty</th>
            )}
            {type === 'test' && (
              <th className='px-6 py-3 text-left font-semibold text-sm'>Duration</th>
            )}
            {type === 'quiz' || type === 'test' || type === 'problems' ? (
              <th className='px-6 py-3 text-left font-semibold text-sm'>Slug</th>
            ) : type === 'questionbanks' ? null : (
              <th className='px-6 py-3 text-left font-semibold text-sm'>Campus</th>
            )}
            <th className='px-6 py-3 text-left font-semibold text-sm'>Edit</th>
            <th className='px-6 py-3 text-left font-semibold text-sm'>Delete</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {items.map(item => (
            <tr key={item._id}>
              <td className='px-6 py-4'>{item.title || item.name}</td>
              {type === 'test' && (
                <td className='px-6 py-4'>{item.category}</td>
              )}
              {type === 'problems' && (
                <td className='px-6 py-4'>{item.difficulty}</td>
              )}
              {type === 'test' && (
                <td className='px-6 py-4'>{item.duration} mins</td>
              )}
              {type === 'quiz' || type === 'test' || type === 'problems' ? (
                <td className='px-6 py-4'>{item.slug}</td>
              ) : type === 'questionbanks' ? null : (
                <td className='px-6 py-4'>{item?.groupId?.groupName}</td>
              )}
              <td className='px-6 py-4'>
                <Link
                  className='underline'
                  to={`/admin/edit/${type}/${item._id}`}
                >
                  Edit
                </Link>
              </td>
              <td className='px-6 py-4'>
                <IconButton onClick={() => onDelete(item._id)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PaginatedTable
