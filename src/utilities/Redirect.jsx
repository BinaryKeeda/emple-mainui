import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const Redirect = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // 1. Show loader while auth state is being resolved
  if (loading) return <Loader />;

  // 2. Check if we saved a redirect path earlier
  // const path = localStorage.getItem("redirect_req");

  // // 3. Redirect back to original path if it exists
  // if (path) {
  //   localStorage.removeItem("redirect_req"); // clear it after use
  //   return <Navigate to={path} />;
  // }

  // 4. If no path stored, send to dashboard based on role
  if (user) return <Navigate to={`/${user.role}`} />;

  // 5. Fallback UI
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="mb-4">Redirecting...</p>
      {user ? (
        <Link className="text-blue-500 underline" to={`/${user.role}`}>
          Click here if not redirected
        </Link>
      ) : (
        <Link className="text-blue-500 underline" to="/">
          Go to Home
        </Link>
      )}
    </div>
  );
};

export default Redirect;
