import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Help } from '@mui/icons-material'
import { Bug20Regular } from '@fluentui/react-icons'
import { LOGO } from '../../../lib/config'

const Header = () => {
  const [showBugForm, setShowBugForm] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  const handleBugSubmit = (e) => {
    e.preventDefault()
    console.log('Bug submitted:', { subject, description })
    setSubject('')
    setDescription('')
    setShowBugForm(false)
  }

  return (
    <>
      <header className='h-[55px] top-0 shadow-md relative z-50 w-full bg-white flex justify-between border border-gray-200'>
        <nav className='h-[55px] top-0 p-2 shadow-md absolute z-50 w-full bg-white flex justify-between border border-gray-200'>
          <img src={LOGO} className='h-8' alt='Logo' />

          <div className='flex gap-1'>
            <IconButton onClick={() => setShowHelp(prev => !prev)}>
              <Help sx={{ fontSize: 20 }} />
            </IconButton>
{/* 
            <IconButton onClick={() => setShowBugForm(prev => !prev)}>
              <Bug20Regular />
            </IconButton> */}
          </div>
        </nav>
      </header>

      {/* ❓ Help Section */}
      {showHelp && (
        <div className='right-0 fixed z-50 top-0 w-[330px] py-20 px-5 h-[calc(100vh - 55px)] mt-[57px] bg-white border-l border-gray-300 shadow-lg'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-gray-700'>Help & Instructions</h2>
            <button
              onClick={() => setShowHelp(false)}
              className='text-gray-500 hover:text-red-500 text-xl'
            >
              ✕
            </button>
          </div>

          <div className='text-sm text-gray-700 space-y-3'>
            <p>📝 Carefully read the question before selecting an option.</p>
            <p>⏱ Time is auto-tracked. The quiz will auto-submit once time is up.</p>
            <p>✅ Use "Mark for Review" to revisit a question later.</p>
            <p>❌ Click "Clear choice" to unselect an answer.</p>
            <p>🚨 Once submitted, you cannot go back or change your answers.</p>
          </div>
        </div>
      )}

      {/* 🐞 Bug Report Section */}
      {showBugForm && (
        <form
          onSubmit={handleBugSubmit}
          className='right-0 fixed z-50 top-0 w-[330px] py-20 px-5 h-[calc(100vh - 55px)] mt-[57px] bg-white border-l border-gray-300 shadow-lg'
        >
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-gray-700'>Report a Bug</h2>
            <button
              type='button'
              onClick={() => setShowBugForm(false)}
              className='text-gray-500 hover:text-red-500 text-xl'
            >
              ✕
            </button>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-500'>Subject</label>
              <input
                type='text'
                className='border border-gray-300 p-2 rounded-md'
                placeholder='Enter subject'
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-500'>Description</label>
              <textarea
                className='border border-gray-300 p-2 rounded-md h-24'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default Header
