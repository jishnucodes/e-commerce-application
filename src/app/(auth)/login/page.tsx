"use client";
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Link, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid
      container
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,rgb(245, 236, 236),rgb(255, 255, 255))",
        padding: { xs: 1, sm: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      {/* Left Column - Branding */}
      <Grid
        size={{ xs: 12, sm: 6, md: 6 }}
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
          padding: { sm: 4, md: 8 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(45deg,rgb(19, 78, 207), #FE6B8B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Welcome Back!
        </Typography>
      </Grid>

      {/* Right Column - Login / Sign In Form */}
      <Grid
        size={{ xs: 12, sm: 6, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight:"100vh",
          width: "100%",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            borderRadius: "30px",
            background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
            boxShadow: "22px 22px 43px #8c8989, -22px -22px 43px #ffffff",
            width: "100%",
            maxWidth: { xs: "90%", sm: "80%", md: "70%",lg:"100%" }, // ✅ Fixed Width for Responsiveness
            padding: { xs: 2, sm: 3, md: 4 },
            margin: { xs: 0, sm: 2 },
            textAlign: "center",
            height:"auto"
          }}
        >
          {/* Profile Icon */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Person sx={{ fontSize: { xs: 50, md: 60 }, color: " #d81b60" }} />
          </Box>

          {/* Title Changes Dynamically */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #1a237e, #d81b60)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textAlign: "center",
            }}
          >
            {isLogin ? "Login" : "Sign In"}
          </Typography>

          {/* Form */}
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              {/* Show "Full Name" only in Sign In mode */}
              {!isLogin && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    autoFocus
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: "#1a237e" }} />
                          </InputAdornment>
                        )
                      },
                    }}
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#1a237e" }} />
                        </InputAdornment>
                      )
                    },
                  }}
                />
              </Grid>

              {/* Password Field */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#1a237e" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

              </Grid>

              {/* Confirm Password Field (Only in Sign In mode) */}
              {!isLogin && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    slotProps={{
                      input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#1a237e" }} />
                        </InputAdornment>
                      )},
                    }}
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
                    py: { xs: 1, sm: 1.5 }, 
                    background: "linear-gradient(45deg,  #1a237e, #d81b60)",
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      transition: "transform 0.3s ease",
                      background: "linear-gradient(45deg,  #d81b60, #1a237e)",
                    },
                  }}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </Grid>

              {/* Toggle Between Login & Sign In */}
              <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Link
                    href="#"
                    underline="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLogin(!isLogin);
                    }}
                  >
                    {isLogin ? "Sign Up here" : "Login here"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
