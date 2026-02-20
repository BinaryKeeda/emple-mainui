// import {
//   DarkMode,
//   Home,
//   LightMode,
//   NoteAdd,
//   PowerSettingsNew,
//   ShortText
// } from '@mui/icons-material'
// import { Avatar, Divider, Icon, IconButton } from '@mui/material'
// import { useDispatch } from 'react-redux'
// import { logOutUser } from '../../../redux/reducers/UserThunks'
// import AccountMenu from '../utils/HeaderMenu'
// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { LOGO } from '../../../lib/config'
// import { useContext } from 'react'
// import { ThemeContext } from '../../../context/ThemeProvider'
// import NotificationsDrawer from './NotificationDrawer'
// // import { handleLogout } from "../../../utils/libs/logout";

// const Header = React.memo(
//   ({ user, menuOpen, setMenuOpen , handleLogout}:{
//     user: any,
//     menuOpen: boolean,
//     handleLogout: any,
//     setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
//   }) => {
//     const [notificationOpen, setNotificationOpen] = useState(false)
 
//     return (
//       <>
//         <header className='relative h-[59px]'>
//           <nav
//             className={`fixed shadow-sm bg-primary  dark:bg-support dark:text-gray-50 bg-blend-difference text-gray-600  h-[59px] items-center pr-5 pl-2  flex justify-between z-40 w-full top-0 `}
//           >
//             <div className='lg:hidden'>
//               <ShortText onClick={() => setMenuOpen(!menuOpen)} />
//             </div>
//             <div className='flex gap-1 items-center'>
//               <Link to='/'>
//                 <img src={LOGO} className='h-10' alt='Logo' />
//               </Link>
//             </div>
//             <div className='flex items-center gap-3'>
//               {/* <Link className='text-[#757575] dark:text-white' to={'/'}>
//                 <IconButton color='inherit'>
//                   <Home />
//                 </IconButton>
//               </Link> */}
//               {/* <IconButton
//                 color={theme ? '#fff' : '#000'}
//                 onClick={toggleTheme}
//               >
//                 {theme != "light" ? (
//                   <LightMode sx={{ color: '#f1f1f1' }} />
//                 ) : (
//                   <DarkMode color='inherit' />
//                 )}
//               </IconButton> */}
//               {user ? (
//                 <>
//                   <AccountMenu handleLogout={handleLogout} />
//                 </>
//               ) : (
//                 <div className='flex items-center space-x-4'>
//                   <Link to='/login' className='text-sm font-medium hover:underline'>
//                     Login
//                   </Link>

//                   <Divider
//                     orientation='vertical'
//                     flexItem
//                     sx={{ bgcolor: 'grey.500' }}
//                   />

//                   <Link to={'/register'} className='text-sm font-medium hover:underline'>
//                     Signup
//                   </Link>
//                   {/* <NotificationsDrawer/> */}
//                 </div>
//               )}
//             </div>
//           </nav>
//         </header>
//       </>
//     )
//   }
// )
// export default Header


import React, { useState } from 'react'
import {
  ShortText,
  PowerSettingsNew,
} from '@mui/icons-material'
import {
  Divider,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Header = React.memo(
  ({ user, menuOpen, setMenuOpen, handleLogout }: {
    user: any,
    menuOpen: boolean,
    handleLogout: any,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <style>{`
          .logo-text {
            background: linear-gradient(135deg, #e74c3c 0%, #ff8c42 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transition: all 0.3s ease;
          }

          .logo-text:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }

          .enhanced-navbar {
            background: linear-gradient(90deg, #ffffff 0%, #fffbf7 100%);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(249, 115, 22, 0.1);
          }

          .user-avatar {
            border: 2px solid #f97316;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
            transition: all 0.3s ease;
          }

          .user-avatar:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
          }

          .menu-item-enhanced {
            transition: all 0.2s ease;
          }

          .menu-item-enhanced:hover {
            background-color: rgba(249, 115, 22, 0.05) !important;
            padding-left: 20px !important;
          }

          .mobile-menu-button {
            transition: all 0.3s ease;
          }

          .mobile-menu-button:hover {
            transform: rotate(90deg);
            color: #f97316;
          }
        `}</style>

        <header className='relative h-[70px]'>
          <nav
            className='enhanced-navbar fixed left-0 shadow-lg text-gray-600 h-[70px] items-center pr-8 pl-6 flex justify-between z-40 w-full top-0'
          >
            {/* Mobile Menu Button */}
            <div className='lg:hidden mobile-menu-button'>
              <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                <ShortText />
              </IconButton>
            </div>

            {/* Logo */}
            <div className='flex md:ml-[30px] gap-1 items-center'>
              <Link to='/'>
                <div className='logo-text' style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  letterSpacing: '-1.5px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  cursor: 'pointer'
                }}>
                  emple
                </div>
              </Link>
            </div>

            {/* Right Side Items */}
            <div className='flex items-center gap-4'>
              {user ? (
                <>
                  {/* User Avatar */}
                  <Tooltip title="Profile Menu" placement="bottom">
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      onClick={handleMenuOpen}
                      className="user-avatar"
                      sx={{
                        width: 40,
                        height: 40,
                        cursor: "pointer"
                      }}
                    />
                  </Tooltip>

                  {/* Enhanced Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(249, 115, 22, 0.1)'
                      }
                    }}
                  >
                    <MenuItem 
                      component={Link} 
                      to="/admin/profile" 
                      onClick={handleMenuClose}
                      className="menu-item-enhanced"
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        fontSize: '0.95rem'
                      }}
                    >
                      👤 Admin Profile
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem 
                      onClick={() => { handleMenuClose(); handleLogout(); }}
                      className="menu-item-enhanced"
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        fontSize: '0.95rem',
                        color: '#ef4444'
                      }}
                    >
                      <PowerSettingsNew sx={{ mr: 1.5, fontSize: 20 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div className='flex items-center space-x-4'>
                  <Link
                    to='/login'
                    className='text-sm font-semibold hover:text-orange-500 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50'
                  >
                    Login
                  </Link>
                  <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ 
                      bgcolor: 'rgba(249, 115, 22, 0.2)',
                      height: 24,
                      alignSelf: 'center'
                    }}
                  />
                  <Link
                    to={'/signup'}
                    className='text-sm font-semibold px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all'
                  >
                    Signup
                  </Link>
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