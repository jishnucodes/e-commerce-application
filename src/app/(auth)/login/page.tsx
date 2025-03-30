"use client";
import React from 'react';
import { Container, Typography, TextField, Button, Box, Link, InputAdornment, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container component="main"
      sx={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,rgb(255, 250, 250),rgb(235, 232, 248))',
        padding: { xs: 2, md: 4 },
      }}
    >
      {/* Left Column - Branding */}
      <Grid size={{ xs: 12, sm: 4, md: 6 }} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg,rgb(19, 78, 207), #FE6B8B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Welcome Back!
        </Typography>
      </Grid>

      {/* Right Column - Login Form */}
      <Grid size={{ xs: 12, sm: 4, md: 6 }}>
        <Container
          maxWidth="xs"
          sx={{
            borderRadius: '30px',
            background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
            boxShadow: '22px 22px 43px #8c8989, -22px -22px 43px #ffffff',
            padding: { xs: 3, sm: 4, md: 5 },
            textAlign: 'center',
          }}
        >
          {/* Profile Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Person sx={{ fontSize: 60, color: '#FF8E53' }} />
          </Box>

          {/* Sign In Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FF8E53, #FE6B8B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Sign In
          </Typography>


          {/* Form */}
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              
              <Grid size={{ xs: 12}}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#FF8E53' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12}}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#FF8E53' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12}}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#FF8E53' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12}}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#FF8E53' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12}}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 1,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #FF8E53, #FE6B8B)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.3s ease',
                      background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
                    },
                  }}
                >
                  Sign Up 
                </Button>
              </Grid>

              <Grid size={{ xs: 12}} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link href="#" underline="hover">
                    Login here 
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
