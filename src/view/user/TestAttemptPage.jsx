import { useSelector } from 'react-redux'
import TestAttempt from './TestAttempt'
import { useParams } from 'react-router-dom'
import { TestProvider } from '../../context/TestProvider'
import { OutputWindowProvider } from '../../context/TestOutputContext'

export default function TestAttemptPage () {
  const { user } = useSelector(s => s.auth)
  const { slug } = useParams()

  return (
    <TestProvider userId={user._id} testSlug={slug}>
      <OutputWindowProvider>
        <TestAttempt />
      </OutputWindowProvider>
    </TestProvider>
  )
}
