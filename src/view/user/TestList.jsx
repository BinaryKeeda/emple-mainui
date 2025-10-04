import { useParams } from 'react-router-dom'

import Table from './components/Table'
import { useDispatch } from 'react-redux'
import { resetState, setCategory } from '../../redux/reducers/testReducerUser';
import { useEffect } from 'react'
import { getTestUser } from '../../redux/api/getTestUser';
import TestsTable from './components/TestTable';

function QuizList () {
  const dispatch = useDispatch()
  const { name } = useParams()

  useEffect(() => {
    dispatch(resetState())
    dispatch(setCategory(name))
    getTestUser();
  }, [name])

  return (
    <>
      <TestsTable category={name} />
    </>
  )
}

export default QuizList
