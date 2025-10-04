import React, { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Box,
  Paper
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddQuestionToBank from './AddQuestionToBank'

export default function AdminEditQuestionBank () {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [addQuestions, setAddQuestions] = useState(false)
  const observer = useRef()
  const { id: bankId } = useParams()
  const [details, setDetails] = useState(null)
  const lastQuestionRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/get/questionbank/questions/${bankId}?page=${page}&limit=10`,
          { withCredentials: true }
        )
        setQuestions(prev => [...prev, ...res.data.questions])
        setHasMore(res.data.hasMore)
        setDetails(res.data.bankDetails)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [page, bankId])

  return (
    <div maxWidth='md' mx='auto' px={2} py={4}>
      <div className='bg-white p-6 rounded-xl shadow-md mb-10 mx-auto'>
        {/* Conditional Add Question Modal */}
        {addQuestions && (
          <AddQuestionToBank
            onClose={() => setAddQuestions(false)}
            bankId={bankId}
          />
        )}

        {/* Title */}
        <h2 className='text-2xl font-bold mb-4'>Edit Question Bank</h2>

        {/* Bank Details */}
        <div className='space-y-2 mb-6'>
          <p className='text-gray-700'>
            <span className='font-semibold'>Bank Name:</span>{' '}
            {details?.name || 'N/A'}
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'>Bank Category:</span>{' '}
            {details?.category || 'N/A'}
          </p>
        </div>

        {/* Add Question Button */}
        <button
          onClick={() => setAddQuestions(true)}
          className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4v16m8-8H4'
            />
          </svg>
          Add Question
        </button>
      </div>

      <div className='grid grid-cols-3 gap-3'>
        {questions.map((question, index) => (
          <Accordion
            key={question._id || index}
            ref={index === questions.length - 1 ? lastQuestionRef : null}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={9}>
                  <Typography fontWeight={600}>
                    {question.question || question.title || 'Untitled Question'}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    label={question.category}
                    color='primary'
                    variant='outlined'
                    size='small'
                    sx={{ textTransform: 'uppercase' }}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>

            <AccordionDetails>
              {question.category === 'MCQ' && (
                <Grid container spacing={1}>
                  {question.options?.map((opt, i) => (
                    <Grid item xs={12} sm={6} key={opt._id || i}>
                      <Paper
                        elevation={1}
                        sx={{
                          padding: 1,
                          backgroundColor: opt.isCorrect
                            ? '#d1fae5'
                            : '#f3f4f6',
                          border: opt.isCorrect
                            ? '1px solid #10b981'
                            : '1px solid #d1d5db',
                          color: opt.isCorrect ? '#065f46' : '#374151'
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {opt.text}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {question.category === 'Text' && (
                <Box mt={2}>
                  <Typography
                    variant='subtitle2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Answer:
                  </Typography>
                  <Paper
                    variant='outlined'
                    sx={{ padding: 1, backgroundColor: '#f9fafb' }}
                  >
                    <Typography>{question.answer || 'Not Provided'}</Typography>
                  </Paper>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {loading && (
        <Box display='flex' justifyContent='center' mt={3}>
          <CircularProgress size={24} />
        </Box>
      )}
      {!hasMore && !loading && (
        <Typography textAlign='center' mt={3} color='text.secondary'>
          No more questions.
        </Typography>
      )}
    </div>
  )
}
