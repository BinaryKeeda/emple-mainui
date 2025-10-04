import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../dashboard/Header";
import Drawer from "../dashboard/Sidebar";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { getSolutions } from "../../../redux/api/getSolutions";
import Loader from "../../../layout/Loader";
const AdminDashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = async () => await customSignOut();
  const isRoadmapDetail = location.pathname.includes("/blog");

  return (
    <>
      {/* <Helmet>
        <title>{user?.name || 'User'} - Dashboard</title>
      </Helmet> */}
      <Header
        user={user}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />


        <>
          <Drawer
            setShowMenu={setMenuOpen}
            user={user}
            showMenu={menuOpen}
            toggleMenu={toggleMenu}
          />

          <Suspense
            fallback={
              <div className="flex fixed top-0 justify-center items-center h-screen w-screen">
                <Loader />
              </div>
            }
          >
            {/* <main
          className={`
           pl-5 lg:pl-[110px]
           pr-5 py-5  bg-secondary min-h-[calc(100vh-59px)] text-gray-800 transition-all`}
        > */}
            <main
              className={`
           pl-5 lg:pl-[110px]
           pr-5 py-5  bg-[#f0f0f0] min-h-[calc(100vh-59px)] text-gray-800 transition-all`}
            >
              {children || <Outlet />}
            </main>
          </Suspense>
        </>
    </>
  );
};

export default AdminDashboardLayout;
