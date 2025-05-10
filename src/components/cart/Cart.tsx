"use client"
import React from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, Divider, } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

const Cart = () => {
  return (

        <Grid container spacing={3}>
            {/* Cart Items Section */}
            <Grid size={{ xs: 12, sm: 8, md: 8 }}>
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: { xs: "column", sm: "row" }, mb: 2 }}>
                            <Box sx={{ width: { xs: '100%', sm: 150 }, height:{ xs: '100%', sm: 150 },mr:2 }}>
                                <Image
                                    src="/backpacks.jpg"
                                    width={300}
                                    height={300}
                                    alt="Product"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Box>

                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Apple AirPods Max Wireless Over-Ear Headphones, Active Noise Cancelling, Transparency Mode
                                </Typography>
                                <Button
                                    startIcon={<CloseIcon />}
                                    color="error"
                                    sx={{ mt: 1 }}
                                    size="small">
                                    Remove
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <IconButton size="small">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ mx: 2 }}>1</Typography>
                                    <IconButton size="small">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="h6">
                                    $549.95
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Order Summary Section */}
            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box sx={{ my: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Original price</Typography>
                                <Typography>$549.95</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Shipping Fee</Typography>
                                <Typography color="success.main">+$0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Tax</Typography>
                                <Typography color="success.main">+$0</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6">$549.95</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                href="/shopping"
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
};

export default Cart;