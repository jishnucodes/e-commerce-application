"use client"
import React from 'react';
import {Box,Container,Typography,TextField,Button, Card,CardContent,Select,MenuItem,FormControl,InputLabel,
        Radio,RadioGroup,FormControlLabel,Divider,} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';

import Grid from '@mui/material/Grid2';

const Checkout = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* First row - Delivery Details and Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Delivery Details */}
        <Grid size={{ xs: 12, sm:8, md:8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your first name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your last name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Country</InputLabel>
                    <Select label="Country">
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="ca">Canada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your phone"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your city"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your state"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your address"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm:6, md:6 }}>
                  <TextField
                    fullWidth
                    label="Your zip code"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button variant="contained" fullWidth>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Details */}
        <Grid size={{ xs: 12, sm:4, md:4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter a coupon code"
                  InputProps={{
                    endAdornment: (
                      <Button variant="contained" size="small">
                        Apply
                      </Button>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>$1766.94</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography color="success.main">$0</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Coupon</Typography>
                  <Typography color="success.main">-0%</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">$1766.94</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  Proceed to Payment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second row - Address List */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Address List
              </Typography>
              <Typography color="text.secondary">
                No saved addresses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Third row - Payment Methods */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment
              </Typography>
              <RadioGroup defaultValue="credit">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Card sx={{ flexGrow: 1, minWidth: '200px' }}>
                    <CardContent>
                      <FormControlLabel
                        value="credit"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CreditCardIcon />
                            <Box>
                              <Typography variant="subtitle2">Credit Card</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Pay with your credit card
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>

                  <Card sx={{ flexGrow: 1, minWidth: '200px' }}>
                    <CardContent>
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalShippingIcon />
                            <Box>
                              <Typography variant="subtitle2">Cash On Delivery</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Pay when you receive
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>

                  <Card sx={{ flexGrow: 1, minWidth: '200px' }}>
                    <CardContent>
                      <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PaymentIcon />
                            <Box>
                              <Typography variant="subtitle2">PayPal Account</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Pay with your PayPal account
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>
                </Box>
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} >
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Method
              </Typography>
              <RadioGroup defaultValue="credit">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>

                  <Card sx={{ flexGrow: 1, minWidth: '200px' }}>
                    <CardContent>
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalShippingIcon />
                            <Box>
                              <Typography variant="subtitle2">Free Shiping</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Get in 2 Days
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>

                </Box>
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;