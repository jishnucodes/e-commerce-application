"use client";
import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Link,
  useTheme,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Memoize styles based on theme mode
  const styles = useMemo(() => {
    const isDark = theme.palette.mode === "dark";
    return {
      leftGradient: isDark
        ? `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.primary.light}44)`
        : `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}30)`,
      iconColor: theme.palette.primary.main,
      borderColor: theme.palette.divider,
      hoverColor: theme.palette.primary.light || theme.palette.primary.main,
    };
  }, [theme]);

  // Common TextField styling
  const textFieldSx = {
    fontFamily: "CaviarDreams_Bold",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Garmit-Light",
      backgroundColor: theme.palette.background.paper,
      "& fieldset": {
        borderColor: styles.borderColor,
        borderWidth: "1.5px",
      },
      "&:hover fieldset": {
        borderColor: styles.hoverColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "CaviarDreams_Bold",
      color: theme.palette.text.secondary,
      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
    "& .MuiInputBase-input": {
      fontFamily: "Garmit-Light",
      color: theme.palette.text.primary,
    },
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        backgroundImage: theme.palette.mode === "light"
          ? "radial-gradient(circle at 20% 50%, rgba(1, 24, 216, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(1, 24, 216, 0.03) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 50%, rgba(37, 59, 254, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37, 59, 254, 0.05) 0%, transparent 50%)",
        position: "relative",
      }}
    >
      {/* Left Column - Welcome Text */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: styles.leftGradient,
          padding: 4,
          height: "100%",
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.light}15)`,
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            zIndex: 1,
            px: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { md: "2.5rem", lg: "3.5rem" },
              fontWeight: 700,
              mb: 3,
              fontFamily: "CaviarDreams_Bold",
              color: theme.palette.primary.main,
              textShadow: `0 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
            }}
          >
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.85,
              maxWidth: "85%",
              mx: "auto",
              fontSize: { md: "1.1rem", lg: "1.25rem" },
              fontFamily: "Garmit-Light",
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {isLogin
              ? "Sign in to continue your shopping experience"
              : "Create your account and start exploring amazing products"}
          </Typography>
        </Box>
      </Grid>

      {/* Right Column - Login Form */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, sm: 3, md: 4 },
          height: "100%",
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            py: { xs: 2, sm: 4 },
          }}
        >
          <Paper
            elevation={theme.palette.mode === "dark" ? 8 : 4}
            sx={{
              padding: { xs: 3, sm: 4, md: 5 },
              borderRadius: { xs: 3, sm: 4 },
              backgroundColor: theme.palette.background.paper,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                : "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                  letterSpacing: "0.5px",
                  mb: 2,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "3px",
                    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                    borderRadius: "2px",
                  },
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <Grid container spacing={2.5}>
                {!isLogin && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      label="Username"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: styles.iconColor }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldSx}
                    />
                  </Grid>
                )}

                {/* Email Field */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: styles.iconColor }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldSx}
                  />
                </Grid>

                {/* Password Field */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: styles.iconColor }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: styles.iconColor }}
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldSx}
                  />
                </Grid>

                {!isLogin && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: styles.iconColor }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldSx}
                    />
                  </Grid>
                )}

                {/* Submit Button */}
                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 1,
                      py: 1.75,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.mode === "dark" ? theme.palette.secondary.main : "#F3F3FF",
                      fontWeight: 600,
                      fontFamily: "CaviarDreams_Bold",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light || theme.palette.primary.main,
                        boxShadow: `0 6px 16px ${theme.palette.primary.main}60`,
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </Grid>

                {/* Toggle Between Login & Sign Up */}
                <Grid size={{ xs: 12 }} sx={{ textAlign: "center", mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Garmit-Light",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link
                      href="#"
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLogin(!isLogin);
                      }}
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontFamily: "CaviarDreams_Bold",
                        textDecoration: "none",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          color: styles.hoverColor,
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
