

// import React, { useState, useContext, useEffect } from 'react'
// import {
//   ShortText,
//   Notifications,
//   PowerSettingsNew,
// } from '@mui/icons-material'
// import {
//   Badge,
//   Divider,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
// } from '@mui/material'
// import { DARK_STRONG } from '../utils/colors'
// import { Link } from 'react-router-dom'
// import { LOGO } from '../../../lib/config'
// import NotificationsDrawer from './NotificationDrawer'
// import {  Cart20Regular } from '@fluentui/react-icons'
// import { useSnackbar } from 'notistack'
// import useInvitation from '../hooks/useInvitation'
// import Coin from '../../../utilities/Coin'
// import { useDescope } from '@descope/react-sdk'
// import { useLogout } from '../hooks/useLogout'
// import { Avatar } from '@mui/material'




// export default function Header({
//   user, menuOpen, setMenuOpen
// }: {
//   user: any,
//   menuOpen: boolean,
//   setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
// }) {

//   const [notificationOpen, setNotificationOpen] = useState(false)
//   const [badgeCount, setBadgeCount] = useState(0)
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
//   const { data } = useInvitation({ userId: user?._id });
//   const sdk = useDescope();

//   const handleLogout = useLogout();
//   const handleOpenNotifications = () => {
//     setNotificationOpen(true)
//     setBadgeCount(0)
//   }

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <>
//       <header className='relative h-[59px]'>
//         <nav
//           className={`fixed left-0  shadow-sm bg-white dark:bg-support dark:text-gray-50 bg-blend-difference text-gray-600 h-[59px] items-center pr-5 pl-2 flex justify-between z-40 w-full top-0 dark:bg-[${DARK_STRONG}]`}
//          >

          
//           <div className='lg:hidden'>
//             <ShortText onClick={() => setMenuOpen(!menuOpen)} />
//           </div>

//           <div className='flex md:ml-[30px] gap-1 items-center'>
//             <Link to='/'>
//               <div style={{
//                 fontSize: '28px',
//                 fontWeight: 300,
//                 letterSpacing: '-1px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 height: '40px'
//               }}>
//                 <span style={{ color: '#e74c3c' }}>empl</span>
//                 <span style={{ color: '#ff8c42' }}>e</span>
//               </div>
//             </Link>
//           </div>


//           <div className='flex items-center gap-3'>
//             {user?.coins &&
//               <div className="flex gap-1 rounded-lg items-center">

//                 <Coin />
//                 <div className='text-sm'>
//                   <span>
//                     {user?.coins}
//                   </span>
//                 </div>
//               </div>
//             }
//             <Tooltip title="But More Coins" sx={{ cursor: "pointer" }}>
//               <Link to={"/user/coins-add"}>
//                 <Cart20Regular style={{ cursor: "pointer" }} />
//               </Link>
//             </Tooltip>

//             {user ? (
//               <>
//                 <IconButton
//                   aria-label='notifications'
//                   onClick={handleOpenNotifications}
//                 >
//                   <Badge
//                     badgeContent={badgeCount}
//                     color='error'
//                     sx={{ position: "relative" }}
//                     overlap='circular'
//                   >
//                     <Notifications />
//                   </Badge>
//                 </IconButton>

//                 {/* User Avatar - Notification ke baad */}
//                 <Avatar
//                   src={user?.avatar}
//                   alt={user?.name}
//                   onClick={handleMenuOpen}
//                   sx={{
//                     width: 34,
//                     height: 34,
//                     cursor: "pointer"
//                   }}
//                 />

//                 {/* Dropdown Menu */}
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                   }}
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                 >
//                   <MenuItem component={Link} to="/user/profile" onClick={handleMenuClose}>
//                     👤 User Profile
//                   </MenuItem>
//                   <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
//                    <PowerSettingsNew sx={{ mr: 1, fontSize: 20 }} />
//                      Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <div className='flex items-center space-x-4'>
//                 <Link
//                   to='/login'
//                   className='text-sm font-medium hover:underline'
//                 >
//                   Login
//                 </Link>
//                 <Divider
//                   orientation='vertical'
//                   flexItem
//                   sx={{ bgcolor: 'grey.500' }}
//                 />
//                 <Link
//                   to={'/signup'}
//                   className='text-sm font-medium hover:underline'
//                 >
//                   Signup
//                 </Link>
//               </div>
//             )}
//           </div>

//         </nav>
//       </header>

//       {/* Notification Drawer */}
//       <NotificationsDrawer
//         // userId={user}
//         refreshInvites={() => { }}
//         data={data}
//         userId={user?._id}
//         notificationOpen={notificationOpen}
//         setNotificationOpen={setNotificationOpen}
//       />
//     </>
//   )

// }

import React, { useState, useContext, useEffect } from 'react'
import {
  ShortText,
  Notifications,
  PowerSettingsNew,
} from '@mui/icons-material'
import {
  Badge,
  Divider,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material'
import { DARK_STRONG } from '../utils/colors'
import { Link } from 'react-router-dom'
import { LOGO } from '../../../lib/config'
import NotificationsDrawer from './NotificationDrawer'
import { Cart20Regular } from '@fluentui/react-icons'
import { useSnackbar } from 'notistack'
import useInvitation from '../hooks/useInvitation'
import Coin from '../../../utilities/Coin'
import { useDescope } from '@descope/react-sdk'
import { useLogout } from '../hooks/useLogout'
import { Avatar } from '@mui/material'

export default function Header({
  user, menuOpen, setMenuOpen
}: {
  user: any,
  menuOpen: boolean,
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {

  const [notificationOpen, setNotificationOpen] = useState(false)
  const [badgeCount, setBadgeCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { data } = useInvitation({ userId: user?._id });
  const sdk = useDescope();

  const handleLogout = useLogout();
  const handleOpenNotifications = () => {
    setNotificationOpen(true)
    setBadgeCount(0)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

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

        .coin-badge {
          background: #f3f4f6;
          border: 1.5px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .coin-badge:hover {
          background: #ffffff;
          border-color: #d1d5db;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          transform: translateY(-1px);
        }

        .nav-icon-button {
          transition: all 0.3s ease;
        }

        .nav-icon-button:hover {
          transform: translateY(-2px);
          background-color: rgba(249, 115, 22, 0.1) !important;
        }

        .nav-icon-button:hover svg {
          color: #f97316 !important;
        }

        .notification-dot {
          animation: pulse-dot 2s infinite;
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

        .cart-icon-wrapper {
          transition: all 0.3s ease;
        }

        .cart-icon-wrapper:hover {
          transform: translateY(-2px);
        }

        .cart-icon-wrapper:hover svg {
          color: #f97316 !important;
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
            {/* Coins Display */}
            {user?.coins && (
              <div className="coin-badge flex gap-2 rounded-full items-center px-3 py-1.5 cursor-pointer">
                <Coin />
                <div className='text-xs font-semibold text-gray-700'>
                  <span>{user?.coins}</span>
                </div>
              </div>
            )}

            {/* Cart Icon */}
            <Tooltip title="Buy More Coins" placement="bottom">
              <Link to={"/user/coins-add"}>
                <div className="cart-icon-wrapper">
                  <IconButton 
                    className="nav-icon-button"
                    sx={{
                      width: 44,
                      height: 44,
                      '&:hover': {
                        backgroundColor: 'rgba(249, 115, 22, 0.1)'
                      }
                    }}
                  >
                    <Cart20Regular style={{ fontSize: 20 }} />
                  </IconButton>
                </div>
              </Link>
            </Tooltip>

            {user ? (
              <>
                {/* Notifications */}
                <Tooltip title="Notifications" placement="bottom">
                  <IconButton
                    aria-label='notifications'
                    onClick={handleOpenNotifications}
                    className="nav-icon-button"
                    sx={{
                      width: 44,
                      height: 44,
                      '&:hover': {
                        backgroundColor: 'rgba(249, 115, 22, 0.1)'
                      }
                    }}
                  >
                    <Badge
                      badgeContent={badgeCount}
                      color='error'
                      sx={{ 
                        position: "relative",
                        '& .MuiBadge-badge': {
                          animation: badgeCount > 0 ? 'pulse-dot 2s infinite' : 'none'
                        }
                      }}
                      overlap='circular'
                    >
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>

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
                    to="/user/profile" 
                    onClick={handleMenuClose}
                    className="menu-item-enhanced"
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      fontSize: '0.95rem'
                    }}
                  >
                    👤 User Profile
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

      {/* Notification Drawer */}
      <NotificationsDrawer
        refreshInvites={() => { }}
        data={data}
        userId={user?._id}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
      />
    </>
  )
}