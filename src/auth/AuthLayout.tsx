"use client";

import { Box } from "@mui/material";
import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSession } from "@descope/react-sdk";

import { AuthLink, AuthText } from "../shared/auth/auth/StyledComponents";

export default function AuthLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isAuthenticated } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pathname = location.pathname;
  const redirectTo = searchParams.get("redirect")
    ? decodeURIComponent(searchParams.get("redirect")!)
    : "/";

  useEffect(() => {
    if (isAuthenticated && pathname !== "/auth/reset") {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, pathname, redirectTo, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          opacity: 0.96,
          boxShadow: { xs: "none", md: "0px 0px 10px rgba(0,0,0,.2)" },
          width: { xs: "100%", md: 448 },
          borderRadius: { xs: 0, md: "25px" },
          border: { xs: "none", md: "1px solid #f1f1f1" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 4,
        }}
      >
        {/* 👇 THIS IS WHERE NESTED ROUTES RENDER */}
        {children ? children : <Outlet />}

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          <AuthText sx={{ textAlign: "center" }}>
            By signing in, you agree to our
            <AuthLink
              sx={{ mx: 0.5 }}
              href="https://binarykeeda.com/terms-of-service"
            >
              Terms of Service
            </AuthLink>
            and
            <AuthLink
              sx={{ mx: 0.5 }}
              href="https://binarykeeda.com/privacy-policy"
            >
              Privacy Policy
            </AuthLink>
            and to escape the bottleneck responsibly.
          </AuthText>
        </Box>
      </Box>
    </Box>
  );
}
