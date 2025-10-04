import { useDispatch, useSelector } from "react-redux"
import { getTestAdmin } from "../../../redux/api/getTest"
import { setCurrentPage } from "../../../redux/reducers/testReducer"
import { EditNote, Source } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const TestsTable = () => {
    const { hasMore, page, loading, data, currentPage, totalPages } = useSelector(
      s => s.test
    )
    const dispatch = useDispatch()
  
    const nextPage = () => {
      if (currentPage == page - 1 || currentPage == page) {
        getTestAdmin()
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
    useEffect(() => {
      console.log(data);
    })
    return (
      <>
      {
        loading && <div className="loader"></div>
      }
        <div className='relative flex flex-col w-full  overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
          <table className='w-full text-left table-auto min-w-max'>
            <thead>
              <tr>
                <th className='p-4 border-b border-slate-200 bg-slate-50'>
                  <p className='text-sm font-normal leading-none text-slate-500'>
                    Title
                  </p>
                </th>
                <th className='p-4 border-b border-slate-200 bg-slate-50'>
                  <p className='text-sm font-normal leading-none text-slate-500'>
                    Description
                  </p>
                </th>
                <th className='p-4 border-b border-slate-200 bg-slate-50'>
                  <p className='text-sm font-normal leading-none text-slate-500'>
                    Duration
                  </p>
                </th>
           
                <th className='p-4 border-b border-slate-200 bg-slate-50'>
                  <p className='text-sm font-normal leading-none text-slate-500'>
                    Edit
                  </p>
                </th>
                <th className='p-4 border-b border-slate-200 bg-slate-50'>
                  <p className='text-sm font-normal leading-none text-slate-500'>
                    View
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data[currentPage]?.map((i, key) => (
                <>
                  <tr
                    key={key}
                    className='hover:bg-slate-50 border-b border-slate-200'
                  >
                    <td className='p-4 py-5'>
                      <p className='block font-semibold text-sm text-slate-800'>
                        {i.name}
                      </p>
                    </td>
                    <td className='p-4 py-5'>
                      <p className='text-sm text-slate-500'>{i.description}</p>
                    </td>
                    <td className='p-4 py-5'>
                      <p className='text-sm text-slate-500'>
                        {i.duration + ' ' + 'min.'}
                      </p>
                    </td>
               
                    <td className='p-4 py-5'>
                      <Link to={`edit/test/${i._id}`}>
                        <EditNote />
                      </Link>
                    </td>
                    <td className='p-4 py-5'>
                      <Link to={`/admin/view/${i._id}`}>
                        <Source />
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
  
          <div className='flex justify-between items-center px-4 py-3'>
            <div className='text-sm text-slate-500'>
              Showing <b>1-{data[currentPage]?.length}</b> of {totalPages}
            </div>
            <div className='flex space-x-1'>
              <button
                onClick={prevPage}
                disabled={currentPage == 1}
                className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
              >
                Prev
              </button>
              
              <button
                disabled={!hasMore && currentPage == page - 1}
                onClick={nextPage}
                className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  

export default TestsTable;