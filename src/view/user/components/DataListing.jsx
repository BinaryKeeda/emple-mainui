import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchContent } from '../api/fetchContent'
import TableFilters from './DataFilters'
import PaginatedTable from './DataTable'
import Loader from '../../../layout/Loader'
import { useSelector } from 'react-redux'

const DataListing = ({ type }) => {
  const { _id } = useSelector(s => s.auth.user)
  const [filters, setFilters] = useState({
    userId:_id,
    search: '',
    category: '',
    difficulty: '',
    isAvailable: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  const queryKey = [type, { endpoint: `${type}`, params: filters }]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: fetchContent,
    staleTime: 300000,
    cacheTime: 3600000
  })

  return (
    <div className='min-h-screen bg-white'>
      <div className='p-4 mx-auto'>
        <TableFilters filters={filters} setFilters={setFilters} type={type} />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className='px-4 pb-4 mx-auto'>
          {/* Table */}
          <PaginatedTable data={data} type={type} />

          <div className='mt-6 flex justify-between items-center'>
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              className='px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium'
            >
              ← Prev
            </button>

            <span className='text-sm text-gray-600'>
              Page {data?.page} of {data?.totalPages}
            </span>

            <button
              disabled={filters.page >= data?.totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className='px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium'
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataListing
