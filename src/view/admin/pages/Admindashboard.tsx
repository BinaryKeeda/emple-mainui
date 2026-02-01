import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../dashboard/Header";
import Drawer from "../dashboard/Sidebar";
import { Suspense } from "react";
import Loader from "../../../layout/Loader";
import { useDescope } from "@descope/react-sdk";
import { useUser } from "../../../context/UserContext";
const AdminDashboardLayout = ({ children }: {
  children?: React.ReactNode;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  // const { user } = useSelector((s) => s.auth);
  const { user } = useUser();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const sdk = useDescope();
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // const handleLogout = async () => await customSignOut();
  const handleLogout = async () => {
    // Implement logout logic here
    await sdk.logout();
    window.location.reload();
  }
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
          showMenu={menuOpen}
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
