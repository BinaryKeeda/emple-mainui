import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './dashboard/Header'
import Drawer from './dashboard/Sidebar'
import { Suspense } from 'react'
import Loader from '../../layout/Loader'
import CompleteProfile from '../../pages/CompleteProfile'

const UserDashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useSelector(s => s.auth)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleLogout = async () => await customSignOut()
  if (user && !user?.profileCompleted) return <CompleteProfile />
  return (
    <>

      <Header
        user={user}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {
        // (user && !user?.profileCompleted)  &&  <CompleteProfile />
      }

      <>
        <Drawer
          setShowMenu={setMenuOpen}
          user={user}
          showMenu={menuOpen}
          toggleMenu={toggleMenu}
        />
        <Suspense
          fallback={
            <div className='flex fixed top-0 justify-center items-center h-screen w-screen'>
              <Loader />
            </div>
          }
        >

          <main
            className={`
           xs:p-1 bg-gray-100
            md:pl-[110px]
           md:pr-5 py-5  min-h-[calc(100vh-59px)] text-gray-800 transition-all`}
          >
            {/* {(user && !user?.profileCompleted) ? <CompleteProfile /> */}
            {/* : */}
            {children || <Outlet />}
            {/* } */}
          </main>
        </Suspense>
      </>
    </>
  )
}

export default UserDashboardLayout
