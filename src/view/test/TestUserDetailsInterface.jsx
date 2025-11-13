import React from 'react'
import Header from './components/Header'
import BackGround from './BackGround'
import { Button, TextField, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import { useTest } from './context/TestProvider'
import { BASE_URL } from '../../lib/config'

function TestUserDetailsInterface () {
  const { setData, columns, submissionId } = useTest()
  const [formData, setFormData] = React.useState(
    columns.reduce((acc, column) => ({ ...acc, [column]: '' }), {})
  )

  const chngeHandler = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async e => {
    e.preventDefault()
    try {
      axios.post(
        `${BASE_URL}/api/exam/submit-details`,
        {
          submissionId,
          userDetails: formData
        },
        { withCredentials: true }
      )
      // Example: Dispatch user details submission
      // dispatch(submitUserDetails(formData))
      console.log('Form Data:', formData)
      setData(prev => ({ ...prev, userDetails: formData }))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Header />
      <BackGround />
      <main className='flex justify-center items-center h-[calc(100vh-80px)] px-4'>
        <Card
          sx={{ width: '100%', maxWidth: 500, borderRadius: 3, boxShadow: 4 }}
        >
          <CardContent>
            <Typography variant='h5' align='center' gutterBottom>
              User Details
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              align='center'
              mb={2}
            >
              Please fill out your information to continue
            </Typography>

            <form onSubmit={submitHandler}>
              {columns.map((column, index) => (
                <TextField
                  type={column === 'email' ? 'email' : 'text'}
                  required
                  size='small'
                  key={index}
                  label={column.toUpperCase()}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name={column}
                  value={formData[column]}
                  onChange={chngeHandler}
                  autoComplete='off'
                  autoFocus={index === 0}
                />
              ))}
              <Button
                sx={{ mt: 2, borderRadius: 2, py: 1.2, fontWeight: 'bold' }}
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default TestUserDetailsInterface
