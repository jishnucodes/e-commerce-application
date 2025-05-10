"use client";
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, InputAdornment, IconButton, Link } from "@mui/material";
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
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
      }}
    >
      {/* Left Column - Welcome Text */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(45deg, #1a237e, #d81b60)",
          color: "white",
          padding: 4,
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { md: "2.5rem", lg: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.8,
              maxWidth: "80%",
              mx: "auto",
              fontSize: "1.1rem"
            }}
          >
            {isLogin ? "Sign in to continue your journey" : "Create your account to get started"}
          </Typography>
        </Box>
      </Grid>

      {/* Right Column - Login Form */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, md: 3 },
          height: "100%",
          minHeight: "100vh",
          overflow: "hidden"
        }}
      >
        <Container maxWidth="sm" sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              padding: { xs: 2, md: 3 },
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              background: "white",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                textAlign: "center",
                fontWeight: 700,
                color: "#1a237e",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50px",
                  height: "2px",
                  background: "linear-gradient(45deg, #1a237e, #d81b60)",
                  borderRadius: "2px"
                }
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Typography>

            <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2}>
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
                            <Person sx={{ color: '#1a237e' }} />
                          </InputAdornment>
                        )
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: { 
                          color: '#1a237e',
                          fontWeight: 500,
                          fontSize: '1rem'
                        }
                      }}
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#1a237e',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d81b60',
                          },
                        }
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
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#1a237e' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: { 
                        color: '#1a237e',
                        fontWeight: 500,
                        fontSize: '1rem'
                      }
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#1a237e',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d81b60',
                        },
                      }
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
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#1a237e' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: '#1a237e' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: { 
                        color: '#1a237e',
                        fontWeight: 500,
                        fontSize: '1rem'
                      }
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#1a237e',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d81b60',
                        },
                      }
                    }}
                  />
                </Grid>

                {!isLogin && (
                  <Grid  size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#1a237e' }} />
                          </InputAdornment>
                        )
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: { 
                          color: '#1a237e',
                          fontWeight: 500,
                          fontSize: '1rem'
                        }
                      }}
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#1a237e',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d81b60',
                          },
                        }
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
                      mt: 2,
                      py: 1.5,
                      background: "linear-gradient(45deg, #1a237e, #d81b60)",
                      color: "white",
                      fontWeight: 600,
                      "&:hover": {
                        background: "linear-gradient(45deg, #d81b60, #1a237e)",
                      },
                    }}
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </Grid>

                {/* Toggle Between Login & Sign Up */}
                <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mt: 2, fontFamily: "Garmit-Light" }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link
                      href="#"
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLogin(!isLogin);
                      }}
                      sx={{ 
                        color: '#1a237e',
                        fontWeight: 600,
                        '&:hover': {
                          color: '#d81b60',
                        }
                      }}
                    >
                      {isLogin ? "Sign Up here" : "Login here"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
