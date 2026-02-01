import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const CompleteProfile = React.lazy(() => import("../pages/CompleteProfile"));

// Public route wrapper (e.g. /login, /signup)
// If user is logged in -> redirect them
export const UserRoute = () => {
  // const { user, loading } = useSelector((s) => s);
  const { user, isFetchingUser } = useUser();

  if (isFetchingUser) return <div>Loading...</div>;

  if (user) {
    // If a redirect path exists, prefer that
    const path = localStorage.getItem("redirect_req");
    if (path) {
      localStorage.removeItem("redirect_req"); // clear after use
      return <Navigate to={path} />;
    }
    return <Navigate to={`/${user.role}`} />;
  }

  return <Outlet />;
};

// Protected route wrapper
export const RoleBasedRoutes = ({ requiredRole, children }: {
  requiredRole: string;
  children?: React.ReactNode;
}) => {
  // const { user, loading } = useSelector((s) => s.auth);
  const { user, isFetchingUser } = useUser();
  const location = useLocation();

  if (isFetchingUser) return <div>Loading...</div>; // Or a spinner
  // if(us)
  if (!user || user.role !== requiredRole) {
    // Save attempted path for post-login redirect
    localStorage.setItem("redirect_req", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};
