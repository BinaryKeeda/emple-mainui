import React from 'react'
import Header from './components/Header'
import BackGround from './BackGround'
import { Button, TextField, Card, CardContent, Typography, MenuItem } from '@mui/material'
import axios from 'axios'
import { useTest } from './context/TestProvider'
import { BASE_URL } from '../../lib/config'

function TestUserDetailsInterface () {
  const { setData, columns, submissionId } = useTest()

  const [formData, setFormData] = React.useState(
    columns.reduce((acc, column) => ({ ...acc, [column.key]: '' }), {})
  )

  const chngeHandler = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async e => {
    e.preventDefault()
    try {
      await axios.post(
        `${BASE_URL}/api/exam/submit-details`,
        {
          submissionId,
          userDetails: formData
        },
        { withCredentials: true }
      )

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
        <Card sx={{ width: '100%', maxWidth: 500, borderRadius: 3, boxShadow: 4 }}>
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
              {columns?.length > 0 ? "Please fill out your information to continue" : 
              "Please Proceed"}
            </Typography>

            <form onSubmit={submitHandler}>
              {columns.map((col, index) => {
                // Select field
                if (col.type === 'select') {
                  return (
                    <TextField
                      select
                      required
                      size='small'
                      key={col.key}
                      label={col.label}
                      name={col.key}
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      value={formData[col.key]}
                      onChange={chngeHandler}
                      autoFocus={index === 0}
                    >
                      {col.options.map((opt, i) => (
                        <MenuItem key={i} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  )
                }

                // Text / Email / Number fields
                return (
                  <TextField
                    type={col.type}
                    required
                    size='small'
                    key={col.key}
                    label={col.label}
                    name={col.key}
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    value={formData[col.key]}
                    onChange={chngeHandler}
                    autoComplete='off'
                    autoFocus={index === 0}
                  />
                )
              })}

              <Button
                sx={{ mt: 2, borderRadius: 2, py: 1.2, fontWeight: 'bold' }}
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
              >
                Proceed
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default TestUserDetailsInterface
