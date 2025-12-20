import { Link } from 'react-router-dom'
import { LockRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getQuiz } from '../../../redux/api/getQuiz'
import {
  resetState,
  setCurrentPage,
  setFilter
} from '../../../redux/reducers/quizReducer'
import Loader from '../../../layout/Loader'
import { TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import { useState } from 'react'
import Coin from '../../../utilities/Coin'

const Table = ({ currCategory }) => {
  const {
    hasMore,
    filters,
    page,
    loading,
    data,
    currentPage
  } = useSelector(s => s.quiz)
  const dispatch = useDispatch()

  // ---------------------- MODAL STATE ------------------------
  const [openModal, setOpenModal] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  const handleOpenModal = (quiz) => {
    setSelectedQuiz(quiz)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedQuiz(null)
  }

  const handleProceed = () => {
    window.location.href = `/user/quiz/${selectedQuiz.slug}`
  }

  // 🔹 Difficulty Sort
  const handleDifficultySort = () => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc'

    dispatch(resetState())
    dispatch(
      setFilter({
        ...filters,
        sortBy: 'difficulty',
        sortOrder: newOrder
      })
    )
    getQuiz()
  }

  // 🔹 Difficulty Filter
  const handleDifficultyFilter = (e) => {
    dispatch(resetState())
    dispatch(
      setFilter({
        ...filters,
        difficulty: e.target.value || null,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    )
    getQuiz()
  }

  // 🔹 Search Filter
  const handleSearchFilter = (e) => {
    const value = e.target.value
    dispatch(resetState())
    dispatch(
      setFilter({
        ...filters,
        search: value || '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        difficulty: filters.difficulty || null
      })
    )
    getQuiz()
  }

  // Pagination
  const nextPage = () => {
    if (hasMore) {
      getQuiz()
    } else {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const prevPage = () => {
    if (currentPage === 1) return
    dispatch(setCurrentPage(currentPage - 1))
  }

  return (
    <div className='relative flex flex-col w-full h-full overflow-scroll custom-scrollbar bg-primary shadow-md rounded-lg bg-clip-border'>

      {/* 🔹 Filters Row */}
      <div className='flex justify-l items-center p-3 gap-4'>
        <TextField
          size="small"
          label="Search Quiz"
          value={filters?.search || ''}
          onChange={handleSearchFilter}
          sx={{ minWidth: 250 }}
        />

        <TextField
          select
          size="small"
          label="Filter by Difficulty"
          value={filters?.difficulty || ''}
          onChange={handleDifficultyFilter}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Table */}
          <table className='w-full overflow-x-scroll text-left table-auto min-w-max'>
            <thead>
              <tr className='bg-gradient-to-r from-orange-50 via-orange-300 to-orange-500'>
                <th className='p-4 border-b border-slate-200 bg-orange-50'>
                  <p className='text-sm font-normal leading-none text-gray-700'>
                    Title
                  </p>
                </th>
                <th
                  onClick={handleDifficultySort}
                  className='cursor-pointer p-4 border-b border-slate-200 bg-orange-50'
                >
                  <p className='text-sm font-normal leading-none text-gray-700 flex items-center gap-1'>
                    Difficulty
                    {filters.sortBy === 'difficulty' &&
                      (filters.sortOrder === 'asc' ? '↑' : '↓')}
                  </p>
                </th>
                <th className='p-4 border-b border-slate-200 bg-orange-50'>
                  <p className='text-sm font-normal leading-none text-gray-700'>
                    Duration
                  </p>
                </th>
                <th className='p-4 border-b border-slate-200 bg-orange-50'>
                  <p className='text-sm pl-2 font-normal leading-none text-slate-500'>
                    Attempt
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              {data[currentPage]?.map((i, key) => {
                const price = i?.type === "test" ? 10 : 5

                return (
                  <tr
                    key={key}
                    className='hover bg-primary hover:bg-support border-b border-slate-200'
                  >
                    <td className='p-4 py-5'>
                      <p className='block font-semibold text-sm text-slate-800'>
                        {i.title}
                      </p>
                    </td>
                    <td className='p-4 py-5'>
                      <p className='text-sm text-slate-500'>{i.difficulty}</p>
                    </td>
                    <td className='p-4 py-5'>
                      <p className='text-sm text-slate-500'>
                        {i.duration + ' min'}
                      </p>
                    </td>
                    <td className='p-4 py-5'>
                      {i?.isSubmitted ? (
                        <Link className='text-xs px-4 py-2 rounded-full font-medium text-green-600 bg-green-100 hover:bg-green-200 transition'>
                          Submitted
                        </Link>
                      ) : i?.hasAttempted === 0 ? (
                        <button
                          onClick={() => handleOpenModal(i)}
                          className='text-xs px-5 py-2 rounded-full font-medium text-white bg-sky-600 hover:bg-sky-500 transition'
                        >
                          Attempt
                        </button>
                      ) : (
                        <div className='flex items-center gap-2 text-slate-500'>
                          <LockRounded fontSize='small' />
                          <p className='text-sm'>Locked</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className='flex bg-support justify-between items-center px-4 py-3'>
            <div className='text-sm text-slate-500'>
              Showing <b>1-{data[currentPage]?.length}</b>
            </div>
            <div className='flex space-x-1'>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className='px-3 py-1 min-w-9 min-h-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-primary hover:border-slate-400 transition'
              >
                Prev
              </button>
              <button
                disabled={!hasMore && currentPage === page - 1}
                onClick={nextPage}
                className='px-3 py-1 min-w-9 min-h-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-primary hover:border-slate-400 transition'
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* ------------------------- PAYMENT CONFIRMATION MODAL ------------------------- */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Attempt</DialogTitle>

        <DialogContent>
          <Typography>
            {selectedQuiz?.type === "test"
              ? "Attempting this test will cost you $10."
              : <p className='flex gap-1 items-center'>

                {"Attempting this quiz will cost you  5"} <Coin />
                  Do you want to continue?
              </p>
            }
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleProceed}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Table
