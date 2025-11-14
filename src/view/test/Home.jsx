import { useParams } from 'react-router-dom';
import TestAttempt from './TestAttempt';

export default function Home() {
  const { id: examId } = useParams();
  return <>
    <TestAttempt id={examId} />
  </>
}
