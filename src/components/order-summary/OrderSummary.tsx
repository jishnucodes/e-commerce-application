"use client"
import React from 'react';
import {Box, Container, Typography, Card, CardContent, Avatar, Chip, Divider, Button, TextField} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Grid2';

const OrderSummary = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, sm: 8, md: 8 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Order Details */}
          <Card sx={{ mb: 3, flex: 1 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Order ID: #660c4f7f3673c65909478654</Typography>
                <Chip label="Not Processed" color="warning" variant="outlined" />
              </Box>
              
              {/* Product Items */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  mb: 3, 
                  alignItems: 'flex-start',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Box sx={{ 
                    width: { xs: '100%', sm: 100 }, 
                    height: { xs: 200, sm: 100 },
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <img
                      src="/backpacks.jpg"
                      alt="Product"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Apple AirPods Max Wireless Over-Ear Headphones, Active Noise
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      color: 'text.secondary', 
                      mb: 1,
                      flexWrap: 'wrap'
                    }}>
                      <Typography>Size: with apple care</Typography>
                      <Typography>Color: Green</Typography>
                      <Typography>Qty: 3</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Box>
                        <Typography color="primary">$568.95</Typography>
                        <Typography variant="body2" color="text.secondary">Status: Pending</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">Expected Delivery: 2 days</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  alignItems: 'flex-start',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Box sx={{ 
                    width: { xs: '100%', sm: 100 }, 
                    height: { xs: 200, sm: 100 },
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <img
                      src="/backpacks.jpg"
                      alt="Product"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Apple AirPods Max Wireless Over-Ear Headphones, Active Noise
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      color: 'text.secondary', 
                      mb: 1,
                      flexWrap: 'wrap'
                    }}>
                      <Typography>Size: without apple care</Typography>
                      <Typography>Color: Pink</Typography>
                      <Typography>Qty: 3</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Box>
                        <Typography color="primary">$399.95</Typography>
                        <Typography variant="body2" color="text.secondary">Status: Pending</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">Expected Delivery: 2 days</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>Payment</Typography>
              
              {/* Credit Card Style Container */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  flex: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    borderRadius: '50%',
                    transform: 'translate(50%, -50%)',
                  }
                }}
              >
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">VISA</Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Card Number"
                    variant="standard"
                    sx={{
                      '& .MuiInput-root': {
                        color: 'white',
                        '&:before, &:after': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      },
                      '& .MuiInput-input': {
                        letterSpacing: 4,
                        fontSize: '1.2rem',
                      }
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    placeholder="MM/YY"
                    variant="standard"
                    sx={{
                      flex: 1,
                      '& .MuiInput-root': {
                        color: 'white',
                        '&:before, &:after': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      }
                    }}
                  />
                  <TextField
                    placeholder="CVC"
                    variant="standard"
                    sx={{
                      flex: 1,
                      '& .MuiInput-root': {
                        color: 'white',
                        '&:before, &:after': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      }
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  placeholder="Card Holder Name"
                  variant="standard"
                  sx={{
                    '& .MuiInput-root': {
                      color: 'white',
                      '&:before, &:after': {
                        borderColor: 'rgba(255,255,255,0.5)',
                      },
                    }
                  }}
                />
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                Pay Order
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Profile Details */}
          <Card sx={{ mb: 3, flex: 1 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 50, height: 50 }}>M</Avatar>
                <Box>
                  <Typography variant="h6">marcmarc</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">marc212@gmail.com</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 2, flex: 1 }}>
                <Typography variant="subtitle2" gutterBottom>Shipping Address</Typography>
                <Typography color="text.secondary">los angeles</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Billing Address</Typography>
                <Typography color="text.secondary">los angeles</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" fullWidth color="success">
                  MARKED AS DELIVERED
                </Button>
                <Button variant="contained" fullWidth>
                  MARKED AS COMPLETED
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Summary List */}
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>Summary</Typography>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>$1766.94</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Discount (0%)</Typography>
                  <Typography>-$5</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography>$0</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">$1766.94</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderSummary;