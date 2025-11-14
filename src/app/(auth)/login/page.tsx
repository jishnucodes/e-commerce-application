"use client";
import React, { useState, useMemo, useEffect } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApiCalls } from "@/hooks/useApiCalls";
import { useRouter } from "next/navigation";

type FormData = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Validation schema for Sign Up
const signUpValidationSchema = Yup.object({
  userName: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .max(20, "User Name must be at most 20 characters")
    .required("User Name is required")
    .matches(/^[a-zA-Z0-9_]+$/, "User Name can only contain letters, numbers, and underscores"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// Validation schema for Login
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const LoginPage = () => {

  const {
    data: signupData,
    loading: signupLoading,
    error: signupError,
    post: signup,
  } = useApiCalls();
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
    post: login,
  } = useApiCalls();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const router = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const initialValues: FormData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik<FormData>({
    initialValues,
    validationSchema: isLogin ? loginValidationSchema : signUpValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        if (isLogin) {
          // Login logic - use the response directly (not state, as state updates are async)
          console.log("Logging in with:", { email: values.email, password: values.password });
          const response = await login("/user/signin", {
            email: values.email,
            password: values.password,
          });
          
          // Response is returned directly from the API call
          if (response && (response as any).status === true) {
            console.log("Login successful");
            // Cookies are set automatically by server (HttpOnly)
            // Redirect to home page
            router.push("/");
          } else {
            // Login failed - show error
            const errorMessage = (response as any)?.message || "Invalid email or password";
            console.log("Login failed:", errorMessage);
            setFieldError("email", errorMessage);
            setFieldError("password", errorMessage);
          }
        } else {
          // Signup logic - use the response directly
          console.log("Signing up with:", values);
          const response = await signup("/user/signup", {
            userName: values.userName,
            email: values.email,
            password: values.password,
          });
          
          // Response is returned directly from the API call
          if (response && (response as any).status === true) {
            console.log("Signup successful");
            // Switch to login mode after successful signup
            setIsLogin(true);
            formik.resetForm();
          } else {
            // Signup failed - show errors
            const responseData = response as any;
            console.log("Signup failed:", responseData?.message || "Signup failed");
            
            if (responseData?.errors) {
              // Handle field-specific errors
              Object.keys(responseData.errors).forEach((key) => {
                setFieldError(key as keyof FormData, responseData.errors[key]);
              });
            } else {
              const errorMessage = responseData?.message || "Signup failed. Please try again.";
              setFieldError("email", errorMessage);
            }
          }
        }
      } catch (error: any) {
        console.error("Authentication error:", error);
        // Handle API errors (network errors, 4xx, 5xx, etc.)
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach((key) => {
            setFieldError(key as keyof FormData, errors[key]);
          });
        } else {
          setFieldError("email", error.message || "An error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
    formik.resetForm();
  };

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
              onSubmit={formik.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
              noValidate
            >
              <Grid container spacing={2.5}>
                {!isLogin && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="userName"
                      name="userName"
                      label="User Name"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.userName && Boolean(formik.errors.userName)}
                      helperText={formik.touched.userName && formik.errors.userName}
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
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                              sx={{ color: styles.iconColor }}
                              aria-label="toggle confirm password visibility"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={formik.isSubmitting || loginLoading || signupLoading}
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
                      "&:disabled": {
                        opacity: 0.6,
                        cursor: "not-allowed",
                      },
                    }}
                  >
                    {formik.isSubmitting
                      ? "Please wait..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
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
                        handleToggleMode();
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
