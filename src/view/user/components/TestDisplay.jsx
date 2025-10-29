import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../lib/config'
import axios from 'axios'
import { Lock } from '@mui/icons-material'

export default function TestDisplay ({ sectionId, isGroup = false}) {
  const [page, setPage] = useState(1)
  const limit = 10

  const queryParams = useMemo(
    () => ({
      sectionId,
      page,
      limit,
      isGroup
    }),
    [sectionId, page, limit]
  )

  const fetchTests = async ({ queryKey }) => {
    const [_key, params] = queryKey
    const query = new URLSearchParams(params).toString()
    const res = await axios.get(`${BASE_URL}/api/data/user/test?${query}`, {
      withCredentials: true
    })
    return res.data // { tests: [...], total: 100 }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tests', queryParams],
    queryFn: fetchTests,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) return <div>Loading tests...</div>
  if (isError) return <div className='text-red-500'>{error.message}</div>

  const tests = data?.tests || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }
  const nextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className=''>

      <div className='relative flex flex-col w-full overflow-x-auto dark:text-white bg-white shadow-md rounded-lg'>
        <table className='w-full text-left table-auto min-w-max'>
          <thead>
            <tr className='bg-support'>
              <th className='p-4 border-b border-slate-200'>Title</th>
              {/* <th className='p-4 border-b border-slate-200'>Description</th> */}
              <th className='p-4 border-b border-slate-200'>Duration</th>
              {/* <th className='p-4 border-b border-slate-200'>Attempts</th> */}
              <th className='p-4 border-b border-slate-200'>Attempt</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(test => (
              <tr key={test._id} className='bg-primary'>
                <td className='p-4'>{test.name}</td>
                {/* <td className='p-4'>{test.description}</td> */}
                <td className='p-4'>{test.duration} min.</td>
                {/* <td className='p-4'> */}
                  {/* {test.attempts} / {test.maxAttempts || 1} */}
                {/* </td> */}
                <td className='p-4'>
                  {test.locked  === false? (
                    <a
                      href={`/user/test/${test.slug}`}
                      className='text-xs bg-sky-600 hover:bg-sky-500 text-white py-1 px-3 rounded-full'
                    >
                      Attempt
                    </a>
                  ) : (
                    <Lock />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {total > limit && (
          <div className='flex bg-support justify-between items-center px-4 py-3'>
            <div className='text-sm'>
              Showing{' '}
              <b>
                {(page - 1) * limit + 1}-{Math.min(page * limit, total)}
              </b>{' '}
              of {total}
            </div>
            <div className='flex space-x-1'>
              <button
                onClick={prevPage}
                disabled={page === 1}
                className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal bg-primary border border-slate-200 rounded hover:border-slate-400 disabled:opacity-50'
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal bg-primary border border-slate-200 rounded hover:border-slate-400 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
