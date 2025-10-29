import React, { useState, useContext, useEffect } from 'react'
import {
  ShortText,
  Notifications,
  PowerSettingsNew,
} from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import Cookies from 'js-cookie'
import { DARK_STRONG } from '../utils/colors'
import { Link } from 'react-router-dom'
import { LOGO } from '../../../lib/config'
import { ThemeContext } from '../../../context/ThemeProvider'
import NotificationsDrawer from './NotificationDrawer'
import { Cart16Filled, Cart20Regular, Cart24Regular } from '@fluentui/react-icons'
import { useSnackbar } from 'notistack'
import useInvitation from '../hooks/useInvitation'

const Header = React.memo(({ user, menuOpen, setMenuOpen }) => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  const dispatch = useDispatch()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [badgeCount, setBadgeCount] = useState(0)
  const { data } = useInvitation({ userId:user._id });


  const handleLogout = () => {
    try {
      dispatch(logOutUser(Cookies.get('token')))
    } catch (error) {
      console.log(error, 'logout')
    }
  }

  const handleOpenNotifications = () => {
    setNotificationOpen(true)
    // optional: clear badge count once opened
    setBadgeCount(0)
  }

  const { enqueueSnackbar } = useSnackbar()
    ;
  return (
    <>
      <header className='relative h-[59px]'>
        <nav
          className={`fixed shadow-sm bg-white dark:bg-support dark:text-gray-50 bg-blend-difference text-gray-600 h-[59px] items-center pr-5 pl-2 flex justify-between z-40 w-full top-0 dark:bg-[${DARK_STRONG}]`}
        >
          <div className='lg:hidden'>
            <ShortText onClick={() => setMenuOpen(!menuOpen)} />
          </div>

          <div className='flex md:ml-[100px] gap-1 items-center'>
            <Link to='/'>
              <img src={LOGO} className='h-10' alt='Logo' />
            </Link>
          </div>

          <div className='flex items-center gap-3'>
            {user ? (
              <>
                {/* <Box
                  onClick={() => {
                     enqueueSnackbar('Coming soon', { variant: 'warning' })
                  }}
                  sx={{

                    display: {xs:"none" , lg:"flex"},
                    cursor: "pointer",
                    alignItems: "center",
                    gap: 1.5, // space between items
                    padding: "6px 12px",
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    width: "fit-content", // shrink to content
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#555" }}>Credits</Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#111" }}
                  >
                    85.00
                  </Typography>
                  <Cart20Regular />
                </Box> */}

                {/* Notifications */}
                <IconButton
                  aria-label='notifications'
                  onClick={handleOpenNotifications}
                >
                  <Badge
                    badgeContent={badgeCount}
                    color='error'
                    sx={{position:"relative"}}
                    
                    overlap='circular'
                  >
                    <Notifications />
                    <span className='text-xs bg-red-500 text-white -right-2  h-4 rounded-full absolute w-4'>{JSON.stringify(data?.data.length) || 0}</span>
                  </Badge>
                </IconButton>

                {/* Logout */}
                <IconButton onClick={handleLogout}>
                  <PowerSettingsNew />
                </IconButton>
              </>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='text-sm font-medium hover:underline'
                >
                  Login
                </Link>
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{ bgcolor: 'grey.500' }}
                />
                <Link
                  to={'/register'}
                  className='text-sm font-medium hover:underline'
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Notification Drawer */}
      <NotificationsDrawer
        // userId={user}
        data={data}
        userId={user?._id}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
      />
    </>
  )
})

export default Header
