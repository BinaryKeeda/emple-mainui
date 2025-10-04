import { Close } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { parseAikenFormat } from '../utils/aikenParser'

export default function AddQuestionAiken({ onSuccess, onError, setModalClose, id }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previewData, setPreviewData] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (acceptedFiles) => {
      const selected = acceptedFiles[0]
      setFile(selected)
      try {
        const text = await selected.text()
        const parsed = parseAikenFormat(text, id)
        setPreviewData(parsed)
      } catch (err) {
        console.error(err)
        alert('Invalid Aiken format')
      }
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((file) => {
        console.log(`${file.name} has an invalid MIME type.`)
      })
    },
    accept: {
      'text/plain': ['.txt']
    }
  })

  const uploadTxt = async () => {
    if (!previewData.length) return
    setLoading(true)
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/quiz/add/questions`,
        { quizId: id, data: previewData },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      )
      // console.log(res.data)
      onSuccess()
      setModalClose(true)
    } catch (error) {
      onError()
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-opacity-25 px-36 py-24 bg-black fixed top-0 left-0 z-[2099]">
      <div className="rounded-md relative h-full w-full transition-all ease-linear duration-300 bg-white overflow-y-auto">
        <div className="flex justify-end">
          <IconButton onClick={() => setModalClose(true)}>
            <Close />
          </IconButton>
        </div>

        <div className="mt-6 bg-green-50 border border-green-300 rounded-md p-4">
          <h2 className="text-base font-semibold mb-2">Expected Aiken Format Example:</h2>
          <pre className="bg-white text-xs rounded-md p-3 overflow-x-auto whitespace-pre-wrap">
{`What is the capital of France?
A. London
B. Berlin
C. Madrid
D. Paris
ANSWER: D
MARKS: 2
NEGATIVE: 0.5

Which of the following are fruits?
A. Apple
B. Carrot
C. Banana
D. Mango
ANSWER: A,C,D
MARKS: 3
NEGATIVE: 1

Define gravity.
ANSWER: Gravity is the force that attracts a body toward the center of the earth.
MARKS: 5
NEGATIVE: 0`}
          </pre>
        </div>

        <section className="p-5 gap-5">
          <div
            className="p-10 cursor-pointer flex-1 flex justify-center border-dashed border-2 border-black"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {file ? (
              <small>{file.name}</small>
            ) : (
              <small>Upload here (Only .txt in Aiken format)</small>
            )}
          </div>

          {previewData.length > 0 && (
            <div className="mt-4 bg-gray-100 rounded-md p-4 max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2">Preview Questions:</h2>
              <ul className="space-y-4 text-sm">
                {previewData.map((item, index) => (
                  <li key={index} className="bg-white rounded-md p-3 shadow-sm">
                    <p>
                      <strong>Q{index + 1}:</strong> {item.question}
                    </p>
                    <p className="text-xs text-gray-600">
                      Category: <i>{item.category}</i> | Marks: {item.marks} | Negative: {item.negative}
                    </p>

                    {/* MCQ/MSQ options */}
                    {['MCQ', 'MSQ'].includes(item.category) && (
                      <ul className="mt-2 list-disc pl-5">
                        {item.options.map((opt, i) => (
                          <li
                            key={i}
                            className={opt.isCorrect ? 'text-green-600 font-semibold' : ''}
                          >
                            {opt.text} {opt.isCorrect && <span className="ml-1">✔️</span>}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Text answer */}
                    {item.category === 'Text' && (
                      <p className="mt-2 text-blue-700">
                        <strong>Answer:</strong> {item.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {file && previewData.length > 0 && (
            <Button
              onClick={uploadTxt}
              className="mt-3"
              sx={{ marginTop: '10px' }}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Validate & Upload'}
            </Button>
          )}
        </section>
      </div>
    </div>
  )
}
