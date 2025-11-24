import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../lib/config';
import axios from 'axios';
import { Lock } from '@mui/icons-material';

export default function QuizDisplay({ sectionId, isGroup = false }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = useMemo(() => ({
    sectionId,
    isGroup,
    page,
    limit
  }), [sectionId, isGroup, page, limit]);

  const fetchQuizzes = async ({ queryKey }) => {
    const [_key, params] = queryKey;
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/api/data/user/quiz?${query}`, { withCredentials: true });
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['quizzes', queryParams],
    queryFn: fetchQuizzes,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return <div>Loading quizzes...</div>;
  if (isError) return <div className="text-red-500">{error.message}</div>;

  const quizzes = data?.quizzes || [];
  const total = data?.total || 0;

  const totalPages = Math.ceil(total / limit);

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

return (
    <div className="p-5">

      <div className='relative px-5 md:px-4 flex flex-col w-full overflow-x-auto dark:text-white bg-white shadow-md rounded-lg'>
        <table className='w-full text-left table-auto min-w-max'>
          <thead>
            <tr className='bg-white'>
              <th className='p-4 border-b border-slate-200'>Title</th>
              <th className='p-4 border-b border-slate-200'>Difficulty</th>
              <th className='p-4 border-b border-slate-200'>Category</th>
              <th className='p-4 border-b border-slate-200'>Marks</th>
              <th className='p-4 border-b border-slate-200'>Attempt</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className='bg-primary'>
                <td className='p-4'>{quiz.title}</td>
                <td className='p-4'>{quiz.difficulty}</td>
                <td className='p-4'>{quiz.category}</td>
                <td className='p-4'>{quiz.marks}</td>
                <td className='p-4'>
                  {quiz.locked ? <Lock /> : (
                    <a
                      href={`/user/quiz/${quiz.slug}`}
                      className='text-xs bg-sky-600 hover:bg-sky-500 text-white py-1 px-3 rounded-full'
                    >
                      Attempt
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {total > limit && (
          <div className='flex bg-support justify-between items-center px-4 py-3'>
            <div className='text-sm'>
              Showing <b>{(page - 1) * limit + 1}-{Math.min(page * limit, total)}</b> of {total}
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
  );
}
