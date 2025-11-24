import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../../redux/reducers/testReducerUser'
import { getTestUser } from '../../../redux/api/getTestUser'
import { Link } from 'react-router-dom'
import { Lock } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import Loader from '../../../layout/Loader'
import { useState } from 'react'
import Coin from '../../../utilities/Coin'

const TestsTable = () => {
  const { hasMore, page, loading, data, currentPage, totalPages } = useSelector(
    s => s.testUser
  )
  const dispatch = useDispatch()

  // Popup state
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState(null)

  const nextPage = () => {
    if (currentPage == page - 1 || currentPage == page) {
      getTestUser()
    } else {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const prevPage = () => {
    if (currentPage == 1) return
    dispatch(setCurrentPage(currentPage - 1))
  }

  return (
    <>
      <div className='relative flex flex-col w-full overflow-scroll dark:text-white bg-white shadow-md rounded-lg bg-clip-border'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <table className='w-full text-left table-auto min-w-max'>
              <thead>
                <tr className='bg-support'>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal'>Title</p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal'>Description</p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal'>Duration</p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal'>Attempts</p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal'>Solve</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data[currentPage]?.map((i, key) => (
                  <tr key={key} className='bg-primary'>
                    <td className='p-4'>
                      <p className='font-semibold text-sm'>{i.name}</p>
                    </td>

                    <td className='p-4'>
                      <p className='text-sm'>{i.description}</p>
                    </td>

                    <td className='p-4'>
                      <p className='text-sm'>{i.duration} min.</p>
                    </td>

                    <td className='p-4'>
                      <p className='text-sm'>{i.attempts} / 1</p>
                    </td>

                    <td className='text-black dark:text-white p-4'>
                      {i.attempts === 0 ? (
                        <button
                          className='text-xs bg-sky-600 hover:bg-sky-500 text-white py-2 px-5 rounded-full'
                          onClick={() => {
                            setSelectedSlug(i.slug)
                            setOpenPopup(true)
                          }}
                        >
                          Attempt
                        </button>
                      ) : (
                        <Lock color='inherit' />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='flex bg-support justify-between items-center px-4 py-3'>
              <div className='text-sm'>
                Showing <b>1-{data[currentPage]?.length}</b> of {totalPages}
              </div>
              <div className='flex space-x-1'>
                <button
                  onClick={prevPage}
                  disabled={currentPage == 1}
                  className='px-3 py-1 min-w-9 text-sm bg-primary border border-slate-200 rounded hover:border-slate-400 transition'
                >
                  Prev
                </button>

                <button
                  disabled={!hasMore && currentPage == page - 1}
                  onClick={nextPage}
                  className='px-3 py-1 min-w-9 text-sm bg-primary border border-slate-200 rounded hover:border-slate-400 transition'
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>

        <DialogContent>
          <div className="flex gap-2 items-center">
            Attempting this test will cost 10<Coin />
            Do you want to continue?
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>

          <Link to={`/user/test/${selectedSlug}`}>
            <Button variant='contained' color='primary'>Proceed</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TestsTable
