import { Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const getLinkFromType = (type, item) => {
  switch (type) {
    case 'quiz':
      return `/user/preview/${item.slug || item._id}`
    case 'problem':
    case 'problems':
      return `/user/problem/${item.slug || item._id}`
    case 'test':
      return `/user/test/preview/${item.slug || item._id}`
    case 'solutions/quiz':
      return `/user/preview/${item?._id}`
    case 'solutions/test':
      return `/user/test/preview/${item?._id}`
    default:
      return '#'
  }
}

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

const PaginatedTable = ({ data, type = 'item' }) => {
  if (!data?.data?.length) {
    return <div className='text-center'>No {type}s found.</div>
  }

  const baseColumns = [{ label: 'Title', key: 'title' }]

  if (type === 'test') {
    baseColumns.push({ label: 'Category', key: 'category' })
  } else if (type === 'problem' || type === 'problems') {
    baseColumns.push({ label: 'Difficulty', key: 'difficulty' })
  } else if (type === 'solutions/quiz') {
    baseColumns[0].key = 'quiz.title'
    baseColumns.push({ label: 'Score', key: 'score' })
    baseColumns.push({label : 'Difficulty' , key: "quiz.difficulty"})
    baseColumns.push({label : 'Yuor Rank' , key : "rank"})
    baseColumns.push({label : 'Total Attempts' , key : "totalParticipants"})
    // baseColumns.push({label : '' , key : "quiz.totalSubmissions"})
  } else if (type == 'solutions/test') {
    baseColumns[0].key = 'testId.name'
    // baseColumns.
  }

  baseColumns.push({
    label: 'Attempt',
    key: 'attempt',
    render: item => (
      <Link
        className='underline text-blue-600 hover:text-blue-800'
        to={getLinkFromType(type, item)}
        state={{
          name: item.title || item.quizId?.title,
          description: item.description
        }}
      >
        <Tooltip title={"Visibility"}>
          <Visibility />
        </Tooltip>
      </Link>
    )
  })

  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {baseColumns.map(col => (
              <th
                key={col.label}
                className='px-6 py-3 text-left font-semibold text-sm text-gray-700'
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {data.data.map(item => (
            <tr key={item._id} className='hover:bg-gray-50'>
              {baseColumns.map(col => (

                <td key={col.label} className='px-6 py-4 text-sm text-gray-800'>
                  {col.render 
                    ? col.render(item)
                    : getNestedValue(item, col.key)}
                    {/* {JSON.stringify(item)} */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PaginatedTable
