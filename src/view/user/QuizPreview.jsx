import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Loader from '../../layout/Loader'

const GET_SOLUTIONS = gql`
  query GetSolutions(
    $userId: String!
    $page: Int
    $limit: Int
    $search: String
  ) {
    getSolutions(userId: $userId, page: $page, limit: $limit, search: $search) {
      data {
        _id
        attemptNo
        createdAt
        isSubmitted
        quizId {
          slug
          title
          duration
          difficulty
          questions {
            answer
            _id
            question
            image
            marks
            category
            negative
            options {
              text
              isCorrect
              image
            }
          }
        }
        score
        response
      }
    }
  }
`

const useFetchQuery = ({ userId = '', page = 1, limit = 10, search = '' }) => {
  return useQuery(GET_SOLUTIONS, {
    variables: { userId, page, limit, search },
    fetchPolicy: 'cache-and-network'
  })
}

export default function QuizPreview() {
  const { id } = useParams()
  const { data, error, loading } = useFetchQuery({ search: id })

  if (loading)
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  if (error)
    return (
      <p className='text-center mt-10 text-red-500'>
        An error occurred while fetching the quiz data.
      </p>
    )

  const solution = data?.getSolutions?.data?.[0]
  const quiz = solution?.quizId
  const userResponses = solution?.response || {}

  return (
    <div className='flex gap-8 px-1 py-2 mx-auto'>
      {/* Main Content */}
      <div className='w-full space-y-8'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>{quiz?.title}</h1>
          <p className='text-gray-600 mt-2'>
            <span className='mr-4'>
              <strong>Difficulty:</strong> {quiz?.difficulty}
            </span>
            <span className='mr-4'>
              <strong>Duration:</strong> {quiz?.duration} minutes
            </span>
            <span>
              <strong>Score:</strong> {solution?.score}
            </span>
          </p>
        </header>

        {quiz.questions.map((question, index) => {
          const userAnswer = userResponses[question._id]
          const isMultiple = Array.isArray(userAnswer)

          const correctAnswer = question.options.length
            ? question.options.filter(opt => opt.isCorrect).map(opt => opt.text)
            : [question.answer]

          return (
            <section
              key={question._id}
              id={`q${index + 1}`}
              className='bg-white border shadow-sm p-5 rounded-md'
            >
              <div className='flex items-center justify-between py-3'>
                <h2 className='font-semibold text-lg mb-3'>
                  Question {index + 1}: {question.question}
                </h2>
                <div className='flex items-center gap-2'>
                  <span className='bg-green-100 border-green-400 border p-1 w-[40px] text-xs'>
                    +{question.marks}
                  </span>
                  <span className='bg-red-100 border-red-400 border p-1 w-[40px] text-center text-xs'>
                    {question.negative}
                  </span>
                </div>
              </div>

              {question.image && (
                <img
                  src={question.image}
                  alt='Question Illustration'
                  className='mb-4 max-w-xs border rounded'
                />
              )}

              <ul className='space-y-2'>
                {/* {JSON.stringify(question.category)} */}
                {question?.category != 'Text' ? (
                  question?.options.map((option, idx) => {
                    const selected =
                      (isMultiple && userAnswer?.includes(option.text)) ||
                      (!isMultiple && userAnswer === option.text)
                    const correct = option.isCorrect

                    let bgClass = 'bg-gray-50 border-gray-300'
                    if (correct) bgClass = 'bg-green-100 border-green-500'
                    else if (selected && !correct) bgClass = 'bg-red-100 border-red-500'

                    return (
                      <li key={idx} className={`p-2 rounded border ${bgClass}`}>
                        {option.text}
                        {selected && (
                          <span className='ml-2 text-sm text-blue-600'>
                            (Your Selection)
                          </span>
                        )}
                        {correct && (
                          <span className='ml-2 text-sm text-green-700'>
                            (Correct Answer)
                          </span>
                        )}
                      </li>
                    )
                  })
                ) : (
                  <>
                    <p className='text-blue-600 italic mt-2'>
                      Your Answer: <strong>{userAnswer || 'Not Attempted'}</strong>
                    </p>
                    <p>
                      Correct Answer: <strong>{question.answer}</strong>
                    </p>
                  </>
                )}
              </ul>
            </section>
          )
        })}
      </div>

      {/* Sidebar Navigator */}
      <aside className='w-1/4 sticky top-[100px] h-fit bg-gray-50 border p-5 rounded shadow-sm'>
        <h2 className='text-lg font-semibold mb-4 text-gray-800'>
          Question Navigator
        </h2>
        <div className='grid grid-cols-4 gap-3'>
          {quiz.questions.map((q, idx) => {
            const userAnswer = userResponses[q._id]
            const correctAnswer = q.options.length
              ? q.options.filter(opt => opt.isCorrect).map(opt => opt.text)
              : [q.answer]

            let statusClass = ''
            if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
              statusClass = 'bg-blue-400 hover:bg-blue-500' // Not attempted
            } else if (
              Array.isArray(userAnswer)
                ? JSON.stringify([...userAnswer].sort()) === JSON.stringify([...correctAnswer].sort())
                : userAnswer === correctAnswer[0]
            ) {
              statusClass = 'bg-green-500 hover:bg-green-600' // Correct
            } else {
              statusClass = 'bg-red-500 hover:bg-red-600' // Wrong
            }

            return (
              <a
                key={q._id}
                href={`#q${idx + 1}`}
                title={`Question ${idx + 1}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium text-white transition-colors duration-200 ${statusClass}`}
              >
                {idx + 1}
              </a>
            )
          })}
        </div>
      </aside>
    </div>
  )
}
