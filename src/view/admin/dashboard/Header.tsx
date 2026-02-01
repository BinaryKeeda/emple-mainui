import {
  DarkMode,
  Home,
  LightMode,
  NoteAdd,
  PowerSettingsNew,
  ShortText
} from '@mui/icons-material'
import { Avatar, Divider, Icon, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import AccountMenu from '../utils/HeaderMenu'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LOGO } from '../../../lib/config'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeProvider'
import NotificationsDrawer from './NotificationDrawer'
// import { handleLogout } from "../../../utils/libs/logout";

const Header = React.memo(
  ({ user, menuOpen, setMenuOpen , handleLogout}:{
    user: any,
    menuOpen: boolean,
    handleLogout: any,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    const [notificationOpen, setNotificationOpen] = useState(false)
    const { toggleTheme, theme } = useContext(ThemeContext);
 
    return (
      <>
        <header className='relative h-[59px]'>
          <nav
            className={`fixed shadow-sm bg-primary  dark:bg-support dark:text-gray-50 bg-blend-difference text-gray-600  h-[59px] items-center pr-5 pl-2  flex justify-between z-40 w-full top-0 `}
          >
            <div className='lg:hidden'>
              <ShortText onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <div className='flex gap-1 items-center'>
              <Link to='/'>
                <img src={LOGO} className='h-10' alt='Logo' />
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              {/* <Link className='text-[#757575] dark:text-white' to={'/'}>
                <IconButton color='inherit'>
                  <Home />
                </IconButton>
              </Link> */}
              {/* <IconButton
                color={theme ? '#fff' : '#000'}
                onClick={toggleTheme}
              >
                {theme != "light" ? (
                  <LightMode sx={{ color: '#f1f1f1' }} />
                ) : (
                  <DarkMode color='inherit' />
                )}
              </IconButton> */}
              {user ? (
                <>
                  <AccountMenu handleLogout={handleLogout} />
                </>
              ) : (
                <div className='flex items-center space-x-4'>
                  <Link to='/login' className='text-sm font-medium hover:underline'>
                    Login
                  </Link>

                  <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ bgcolor: 'grey.500' }}
                  />

                  <Link to={'/register'} className='text-sm font-medium hover:underline'>
                    Signup
                  </Link>
                  {/* <NotificationsDrawer/> */}
                </div>
              )}
            </div>
          </nav>
        </header>
      </>
    )
  }
)
export default Header
