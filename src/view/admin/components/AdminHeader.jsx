import React from 'react'
import { LOGO } from '../../../lib/config'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import Cookies from 'js-cookie'
import { Logout } from '@mui/icons-material'
export default function AdminHeader () {
  const dispatch = useDispatch()
  const handleLogout = () => {
    try {
      console.log('Btn clicked')
      dispatch(logOutUser(Cookies.get('token')))
    } catch (error) {
      console.log(error, 'logout')
    }
  }
  return (
    <header className='p-3  h-[50px] relative'>
      <nav className='fixed flex justify-between shadow-md z-40 items-center bg-white px-3 left-0 top-0 w-full h-[50px]'>
        <img className='h-8' src={LOGO} alt='' />
        {/* <Button
          onClick={handleLogout}
          variant='contained'
          sx={{
            fontSize: 10
          }}
        >
          Logout
        </Button> */}
        <Tooltip title={"Logout"} >
        <IconButton onClick={handleLogout}>
          <Logout/>
        </IconButton>
        </Tooltip>
      </nav>
    </header>
  )
}
