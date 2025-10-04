import { Link } from 'react-router-dom'
import { Book, LockRounded, School, Visibility } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetState,
  setCategory,
  setCurrentPage
} from '../../../redux/reducers/testSolutionReducer'
import { useEffect } from 'react'
import Loader from '../../../layout/Loader'
import { getTestSolutions } from '../../../redux/api/getTestSolution'
import { IconButton } from '@mui/material'
import { SectionHeader } from '../utils/Helpers'

const SubmissionList = ({ currCategory }) => {
  const { hasMore, category, page, loading, data, currentPage, totalPages } =
    useSelector(s => s.testSolution)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(data).length == 0) {
      getTestSolutions()
    }
  }, [data])

  const changehandeler = e => {
    dispatch(resetState())
    dispatch(setCategory(e.target.value))
  }
  const nextPage = () => {
    if (hasMore) {
      getTestSolutions()
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
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : data[currentPage]?.length != 0 ? (
        <>
          <SectionHeader title={'Test Submissions'} />
          <div className='flex flex-col shadow-xl w-full  overflow-scroll custom-scrollbar'>
            {/* <p className='w-full  px-4 text-left  bg-[#111827] from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent font-bold text-xl'></p> */}
            <div className='relative  flex flex-col w-full  overflow-scroll custom-scrollbar    bg-primary shadow-md rounded-lg bg-clip-border '>
              <table className='w-full overflow-x-scroll text-left  shadow-lg table-auto min-w-max'>
                <thead>
                  <tr className='bg-gradient-to-r from-orange-400 to-orange-300'>
                    <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                      <p className='text-sm font-normal leading-none dark:text-gray-50 text-gray-700'>
                        Title
                      </p>
                    </th>

                    <th className='p-4 border-b text-end border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                      <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                        Preview
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data[currentPage]?.map((i, key) => (
                    <tr
                      key={key}
                      className='hover bg-primary dark:text-gray-50 hover:bg-support border-b border-slate-200'
                    >
                      <td className='p-4 py-5'>
                        <p className='block font-semibold text-sm dark:text-gray-50 text-slate-800'>
                          {i?.testName}
                        </p>
                      </td>

                      <td className='p-4 py-5 text-end'>
                        <p className='text-sm pr-5 dark:text-gray-50 text-slate-500'>
                          <Link to={'/user/test/preview/' + i.testResponseId}>
                            <Visibility />
                          </Link>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex bg-support justify-between items-center px-4 py-3'>
                <Link
                  to={'solutions/list/test'}
                  className='text-sm dark:text-gray-50 text-slate-500'
                >
                  View All Record
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <Link
        //   to={'/user/test-series'}
        //   className='flex py-10 gap-3 h-full justify-center items-center'
        // >
        //   <School color='primary' />{' '}
        //   <a className='text-gray-600 text-sm' href=''>
        //     Practice Now
        //   </a>
        // </Link>
        <></>
      )}
    </>
  )
}

export default SubmissionList
