// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useLocation, Outlet } from 'react-router-dom'
// import Header from './dashboard/Header'
// import Drawer from './dashboard/Sidebar'
// import { Suspense } from 'react'
// import Loader from '../../layout/Loader'
// import CompleteProfile from '../../pages/CompleteProfile'
// import { useDescope } from '@descope/react-sdk'
// import { useUser } from '../../context/UserContext'

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import { useUser } from "../../context/UserContext";
import Header from "./dashboard/Header";
import { useDescope } from "@descope/react-sdk";
import Sidebar from "./dashboard/Sidebar";

// const UserDashboardLayout = ({ children }: {
//   children?: React.ReactNode
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()
//   const { user , isFetchingUser } = useUser();

//   if(isFetchingUser) return <div>Loading...</div>
//   // const toggleMenu = () => setMenuOpen(!menuOpen)

//   // useEffect(() => {
//   //   setMenuOpen(false)
//   // }, [location])

//   if (user && !user?.profileCompleted) return <CompleteProfile />
//   const sdk = useDescope();
//   const handleLogout = async () => {
//     try {
//       await sdk.logout();
//       window.location.reload();
//     } catch (e) {
//       console.error('Logout failed', e);
//     }
//   }
//   return (
//     <>

//       <Header
//         user={user ?? undefined}
//         handleLogout={handleLogout}
//         menuOpen={menuOpen}
//         setMenuOpen={setMenuOpen}
//       />
//       {
//         // (user && !user?.profileCompleted)  &&  <CompleteProfile />
//       }

//       <>
//         <Drawer
//           setShowMenu={setMenuOpen}
//           showMenu={menuOpen}
//         />
//         <Suspense
//           fallback={
//             <div className='flex fixed top-0 justify-center items-center h-screen w-screen'>
//               <Loader />
//             </div>
//           }
//         >

//           <main
//             className={`
//            xs:p-1 bg-gray-100
//             md:pl-[110px]
//            md:pr-5 py-5  min-h-[calc(100vh-59px)] text-gray-800 transition-all`}
//           >
//             {/* {(user && !user?.profileCompleted) ? <CompleteProfile /> */}
//             {/* : */}
//             {children || <Outlet />}
//             {/* } */}
//           </main>
//         </Suspense>
//       </>
//     </>
//   )
// }

// export default UserDashboardLayout;



export default function UserLayout({ children }: {
  children?: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isFetchingUser } = useUser();
  const sdk = useDescope();

  if (isFetchingUser) return <div>Loading...</div>
  // const toggleMenu = () => setMenuOpen(!menuOpen)
  const handleLogout = async () => {
    try {
      await sdk.logout();
      window.location.reload();
    } catch (e) {
      console.error('Logout failed', e);
    }
  }
  return <>

    <Header
      user={user ?? undefined}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
    />
    <Sidebar
      setShowMenu={setMenuOpen}
      showMenu={menuOpen}
    />
    <main
      className={`
          xs:p-1 bg-gray-100
           md:pl-[210px]
          md:pr-5 py-5  min-h-[calc(100vh-70px)] text-gray-800 transition-all`}
    >
      {/* {(user && !user?.profileCompleted) ? <CompleteProfile /> */}
      {/* : */}
      {children || <Outlet />}
      {/* } */}
    </main>

  </>
}