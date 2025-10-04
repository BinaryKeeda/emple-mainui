import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../../redux/reducers/testReducerUser'
import { getTestUser } from '../../../redux/api/getTestUser'
import { Link } from 'react-router-dom'
import { Lock, NavigateNext } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import Loader from '../../../layout/Loader'
import { CustomButton } from '../TestAttempt/TestInstructions'

const TestsTable = () => {
  const { hasMore, page, loading, data, currentPage, totalPages } = useSelector(
    s => s.testUser
  )
  const dispatch = useDispatch()

  const nextPage = () => {
    if (currentPage == page - 1 || currentPage == page) {
      getTestUser()
    } else {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }
  const prevPage = () => {
    if (currentPage == 1) {
      return
    } else {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }
  return (
    <>
      <div className='relative flex flex-col w-full  overflow-scroll dark:text-white bg-white shadow-md rounded-lg bg-clip-border'>
        {loading ? (
          <>
            {' '}
            <Loader />
          </>
        ) : (
          <>
            <table className='w-full text-left table-auto min-w-max'>
              <thead>
                <tr className='bg-support'>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal leading-none '>Title</p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal leading-none '>
                      Description
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal leading-none '>
                      Duration
                    </p>
                  </th>

                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal leading-none '>
                      Attempts
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 '>
                    <p className='text-sm font-normal leading-none '>Solve</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data[currentPage]?.map((i, key) => (
                  <tr key={key} className='bg-primary'>
                    <td className='p-4 text-start'>
                      <p className='block font-semibold text-sm '>{i.name}</p>
                    </td>
                    <td className='p-4 text-start'>
                      <p className='text-sm '>{i.description}</p>
                    </td>
                    <td className='p-4 text-start'>
                      <p className='text-sm '>{i.duration + ' ' + 'min.'}</p>
                    </td>

                    <td className='p-4 text-start'>
                      <p className='text-sm '>{i.attempts} / 1</p>
                    </td>
                    <td className=' text-black dark:text-white text-start'>
                      {i.attempts == 0 ? (
                        <Link
                          className='text-xs  bg-sky-600 hover:bg-sky-500 text-white py-2 px-5 text-start  rounded-full'
                          to={`/user/test/${i.slug}`}
                        >Attempt
                        </Link>
                      ) : (
                        <Lock color='inherit' />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='flex bg-support justify-between items-center px-4 py-3'>
              <div className='text-sm '>
                Showing <b>1-{data[currentPage]?.length}</b> of {totalPages}
              </div>
              <div className='flex  space-x-1'>
                <button
                  onClick={prevPage}
                  disabled={currentPage == 1}
                  className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal  bg-primary border border-slate-200 rounded hover: hover:border-slate-400 transition duration-200 ease'
                >
                  Prev
                </button>

                <button
                  disabled={!hasMore && currentPage == page - 1}
                  onClick={nextPage}
                  className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal  bg-primary border border-slate-200 rounded hover: hover:border-slate-400 transition duration-200 ease'
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default TestsTable
