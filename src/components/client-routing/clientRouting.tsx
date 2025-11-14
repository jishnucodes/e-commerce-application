"use client";

import { useApiCalls } from "@/hooks/useApiCalls";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ClientTokenRoutingProps {
  token?: string;
  children: React.ReactNode;
}

const ClientTokenRouting: React.FC<ClientTokenRoutingProps> = ({ token, children }) => {
  const { post } = useApiCalls();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // If no token, redirect immediately without showing content
    if (!token) {
      router.replace("/login");
      return;
    }

    const authCheck = async () => {
      try {
        const refreshTokenResponse = await post("/user/refreshToken", {});

        if (refreshTokenResponse?.status) {
          setIsAuthenticated(true);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Refresh token error:", error);
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };

    authCheck();
  }, [token, post, router]);

  // Show loading state while checking authentication
  // Don't render children until auth is confirmed
  if (checking || !isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  // Only render children after authentication is confirmed
  return <>{children}</>;
};

export default ClientTokenRouting;
