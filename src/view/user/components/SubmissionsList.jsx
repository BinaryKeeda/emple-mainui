import { Link } from 'react-router-dom'
import { LockRounded, School, Visibility } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetState,
  setCategory,
  setCurrentPage
} from '../../../redux/reducers/quizReducer'
import { useEffect } from 'react'
import { getSolutions } from '../../../redux/api/getSolutions'
import Loader from '../../../layout/Loader'
import { SectionHeader } from '../utils/Helpers'

const SubmissionList = () => {
  const { hasMore, category, page, loading, data, currentPage, totalPages } =
    useSelector(s => s.solution)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(data).length == 0) {
      getSolutions()
    }
  }, [data])

  const changehandeler = e => {
    dispatch(resetState())
    dispatch(setCategory(e.target.value))
  }
  const nextPage = () => {
    if (hasMore) {
      getSolutions()
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
          <p className='w-full  px-3 text-left bg-[#111827] bg-clip-text text-transparent font-bold text-xl'></p>
          <SectionHeader title={'Quiz Submissions'} />

          <div className='relative mt-2 flex flex-col w-full  overflow-scroll custom-scrollbar   bg-primary shadow-md rounded-lg bg-clip-border'>
            <table className='w-full overflow-x-scroll text-left table-auto min-w-max'>
              <thead>
                <tr className='bg-gradient-to-r from-orange-400 to-orange-300'>
                  <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-gray-700'>
                      Title
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-gray-700'>
                      Difficulty
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-gray-700'>
                      Score
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-gray-700'>
                      Rank
                    </p>
                  </th>
                  <th className='p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50'>
                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                      Preview
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data[currentPage]?.map((i, key) => {
                  if(key >= 5 ) return;
                  return (
                    <tr
                      key={key}
                      className='hover bg-primary dark:text-gray-50 hover:bg-support border-b border-slate-200'
                    >
                      <td className='p-4 py-5'>
                        <p className='block font-semibold text-sm dark:text-gray-50 text-slate-800'>
                          {i?.quizId?.title}
                        </p>
                      </td>
                      <td className='p-4 py-5'>
                        <p className='text-sm dark:text-gray-50 text-slate-500'>
                          {i?.quizId?.difficulty}
                        </p>
                      </td>
                      <td className='p-4 py-5'>
                        <p className='text-sm dark:text-gray-50 text-slate-500'>
                          {i?.score}
                        </p>
                      </td>
                      <td className='p-4 py-5'>
                        <p className='text-sm dark:text-gray-50 text-slate-500'>
                          {i?.rank} / {i?.totalSubmissions}
                        </p>
                      </td>

                      <td className='p-4 py-5'>
                        <p className='text-sm dark:text-gray-50 text-slate-500'>
                          <Link to={'/user/preview/' + i._id}>
                            <Visibility />
                          </Link>
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='flex bg-support justify-between items-center px-4 py-3'>
              <Link
                to={'solutions/list/quiz'}
                className='text-sm dark:text-gray-50 text-slate-500'
              >
                View All Record
              </Link>
            </div>
          </div>
        </>
      ) : (
        // <Link to={'/user/practice'} className='flex py-10 gap-3 h-full justify-center items-center'>
        //   <School color='primary'/>  <a className='text-gray-600 text-sm' href="">Practice Now</a>
        // </Link>
        <></>
      )}
    </>
  )
}

export default SubmissionList
