import React from 'react'
import TestAttemptPage from './TestAttemptPage'
import { useSelector } from 'react-redux'
import { TestProvider } from './context/TestProvider'
import { OutputWindowProvider } from './context/TestOutputContext';
export default function TestAttempt ({id}) {
  // const { testId } = useSelector(s => s.auth)
  const {user} = useSelector(s=> s.auth)
  return (
    <TestProvider userId={user._id} testId={id}>
      <OutputWindowProvider>
        <TestAttemptPage />
      </OutputWindowProvider>
    </TestProvider>
  )
}
