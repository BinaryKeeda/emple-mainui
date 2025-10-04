import React from 'react'
import UserDashboard from './Userdashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Table from './components/Table'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { resetState, setCategory } from '../../redux/reducers/quizReducer'
import { getQuiz } from '../../redux/api/getQuiz'
import { useEffect } from 'react'
import { useLoginModal } from '../../context/LoginModalContext'

function QuizList () {
  const dispatch = useDispatch()
  const { name } = useParams()
  const user = useSelector(s => s.auth.user, shallowEqual)
  const { openLogin, closeLogin } = useLoginModal()

  useEffect(() => {
    if (!user) {
      openLogin()
    } else {
      closeLogin()
    }
  }, [user, openLogin, closeLogin])

  // If not logged in, we can return null or a placeholder
  if (!user) {
    return null // The login modal will show, so we hide the dashboard
  }
  useEffect(() => {
    dispatch(resetState())
    dispatch(setCategory(name))
    getQuiz()
  }, [name])

  return (
    <>
      <Table category={name} />
    </>
  )
}

export default QuizList
