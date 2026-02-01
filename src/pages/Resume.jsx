import React, { useEffect, useState } from 'react'
import {
  TextField,
  Typography,
  Button,
  Tooltip,
  IconButton
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useSelector } from 'react-redux'
import { useLoginModal } from '../context/LoginModalContext'

/** Resume Dropzone Component */
function ResumeDropzone ({ onFileUpload, disabled }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled,
    onDrop: acceptedFiles => {
      if (acceptedFiles && acceptedFiles.length > 0)
        onFileUpload(acceptedFiles[0])
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl w-full h-40 cursor-pointer flex items-center justify-center transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-sky-600'
      }`}
    >
      <input {...getInputProps()} />
      <div className='text-center text-gray-600'>
        {isDragActive
          ? 'Drop the file here …'
          : 'Drop your resume here (.pdf) or click to browse'}
      </div>
    </div>
  )
}

/** ScoreBar Component */
function ScoreBar ({ label, value, color }) {
  return (
    <div className='mb-3'>
      <div className='flex justify-between text-sm text-gray-600'>
        <span>{label}</span>
        <span>{value?.toFixed?.(2) ?? value}%</span>
      </div>
      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{
            width: `${Math.max(0, Math.min(100, Number(value) || 0))}%`
          }}
        ></div>
      </div>
    </div>
  )
}

/** SkillBucket Component */
function SkillBucket ({ title, items = [], color, tooltipText }) {
  return (
    <div className='bg-white rounded-xl shadow p-4 border border-gray-200 relative'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='font-medium text-sm'>
          {title} ({items.length})
        </h3>
        <Tooltip title={tooltipText}>
          <IconButton size='small' className='p-0'>
            <InfoOutlinedIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </div>
      <div className='flex flex-wrap gap-2'>
        {items.length === 0 && (
          <p className='text-xs text-gray-400'>No items</p>
        )}
        {items.map((s, idx) => (
          <span key={idx} className={`px-2 py-1 text-xs rounded-full ${color}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Main Resume ATS Page */
function ResumeATSPage () {
  const BASE_URL = 'https://ats.binarykeeda.com'
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
const { user } = useSelector(s => s.auth)

  // useEffect(() => {
  //   if (!user) {
  //     openLogin()
  //   } else {
  //     closeLogin()
  //   }
  // }, [user, openLogin, closeLogin])

  const handleSubmit = async () => {
    // Check if user is logged in
    if (!user) {
      openLogin()
      return
    }

    setError('')
    setResult(null)

    if (!jobDescription?.trim()) {
      setError('Please paste the Job Description.')
      return
    }
    if (!resumeFile) {
      setError('Please upload your resume (PDF).')
      return
    }

    setLoading(true)
    setMessage('Parsing resume…')

    try {
      const formData = new FormData()
      formData.append('file', resumeFile)

      const parseRes = await axios.post(BASE_URL + '/extract-text', formData, {
        withCredentials: true
      })
      const parsed = parseRes?.data?.text || ''
      setMessage('Calculating match score…')

      const atsRes = await axios.post(BASE_URL + '/ats', {
        resume_text: parsed,
        job_description: jobDescription
      })

      setResult(atsRes.data)
    } catch (e) {
      console.error(e)
      setError('Error processing resume. Check console for details.')
    } finally {
      setLoading(false)
      setMessage('')
    }
  }

  const sample = {
    overall_match_score: 0,
    skill_match_score: 0,
    experience_match_score: 0,
    matched_skills: [],
    missing_skills: [],
    extra_skills: []
  }

  const data = result || sample

  return (
    <>
      <Helmet>
        <title>BinaryKeeda - Free ATS Resume</title>
      </Helmet>
      <main className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* JD Section */}
          <div className='md:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-200'>
            <Typography variant='overline'>Job Description</Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              placeholder='Paste the JD here'
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
            <div className='flex gap-3 mt-3 items-center'>
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={loading}
              >
                Analyze
              </Button>
              {resumeFile && (
                <span className='text-xs text-gray-500'>
                  📄 {resumeFile.name}
                </span>
              )}
            </div>
          </div>

          {/* Upload & Tips Section */}
          <div className='space-y-4'>
            <div className='bg-white rounded-xl shadow p-6 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <h2 className='font-semibold text-sm'>Upload Resume (PDF)</h2>
                <Tooltip title='Upload a PDF resume to analyze'>
                  <IconButton size='small' className='p-0'>
                    <InfoOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </div>
              <ResumeDropzone onFileUpload={setResumeFile} disabled={loading} />
            </div>

            <div className='bg-white rounded-xl shadow p-6 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <h2 className='font-semibold text-sm'>Boost Your Score</h2>
                <Tooltip title='Tips to improve your ATS score based on JD keywords and resume formatting'>
                  <IconButton size='small' className='p-0'>
                    <InfoOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </div>
              <ul className='list-disc list-inside text-sm text-gray-600 space-y-1'>
                <li>Mirror JD keywords (TypeScript, Kubernetes, etc.).</li>
                <li>
                  Explicitly mention cloud-native tools (EKS = Kubernetes).
                </li>
                <li>Add testing frameworks (Jest, Cypress) if known.</li>
                <li>Highlight quantified impact in bullets.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {data && (
          <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-1 bg-white rounded-xl shadow p-6 border border-gray-200 relative'>
              <div className='flex items-center justify-between mb-3'>
                <h2 className='font-semibold text-sm'>Match Summary</h2>
                <Tooltip title='Shows overall, skill, and experience match scores based on JD vs Resume'>
                  <IconButton size='small' className='p-0'>
                    <InfoOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </div>
              <p className='text-2xl font-bold text-sky-600 mb-4'>
                Overall: {data.overall_match_score}%
              </p>
              <ScoreBar
                label='Skill Match'
                value={data.skill_match_score}
                color='bg-green-500'
              />
              <ScoreBar
                label='Experience Match'
                value={data.experience_match_score}
                color='bg-blue-500'
              />
            </div>

            <SkillBucket
              title='Matched Skills'
              items={data.matched_skills}
              color='bg-green-100 text-green-800'
              tooltipText='Skills from your resume that match the Job Description'
            />
            <SkillBucket
              title='Missing Skills'
              items={data.missing_skills}
              color='bg-red-100 text-red-800'
              tooltipText='Skills mentioned in JD but missing from your resume'
            />
            <SkillBucket
              title='Extra Skills'
              items={data.extra_skills}
              color='bg-yellow-100 text-yellow-800'
              tooltipText='Skills in your resume not mentioned in the JD'
            />
          </div>
        )}

        {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
            <div className='bg-white rounded-xl p-6 flex items-center gap-3'>
              <div className='animate-spin rounded-full h-6 w-6 border-2 border-sky-600 border-t-transparent'></div>
              <span className='text-sm text-gray-600'>
                {message || 'Working…'}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className='fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow'>
            {error}
          </div>
        )}
      </main>
    </>
  )
}

export default ResumeATSPage
