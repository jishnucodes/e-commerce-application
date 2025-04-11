"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  TextField,
  Paper,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Plant Stand",
    price: 3013,
    oldPrice: 4999,
    image: "/backpacks.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Metal Shelf",
    price: 2697,
    oldPrice: 3499,
    image: "/backpacks.jpg",
    quantity: 2,
  },
  {
    id: 3,
    name: "Potted Stand",
    price: 1159,
    oldPrice: 4999,
    image: "/backpacks.jpg",
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate savings
  const savings = cartItems.reduce((total, item) => total + ((item.oldPrice - item.price) * item.quantity), 0);
  
  // Shipping cost (mock)
  const shippingCost = subtotal > 5000 ? 0 : 299;
  
  // Total cost
  const total = subtotal + shippingCost;

  // Handle quantity change
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  // Handle remove item
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Continue Shopping
          </Button>
        </Link>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 ? (
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ display: 'flex', borderRadius: 2 }}>
                  <Box sx={{ position: 'relative', width: { xs: 100, sm: 150 }, minWidth: { xs: 100, sm: 150 } }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {formatPrice(item.price)}
                          <Typography 
                            component="span" 
                            sx={{ 
                              textDecoration: 'line-through', 
                              color: 'text.secondary',
                              ml: 1,
                              fontSize: '0.8rem'
                            }}
                          >
                            {formatPrice(item.oldPrice)}
                          </Typography>
                        </Typography>
                      </Box>
                      <IconButton 
                        onClick={() => handleRemoveItem(item.id)}
                        size="small"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        Quantity:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          sx={{ borderRadius: 0 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          sx={{ borderRadius: 0 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Looks like you haven't added any items to your cart yet.
              </Typography>
              <Link href="/shop" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ textTransform: 'none' }}>
                  Start Shopping
                </Button>
              </Link>
            </Paper>
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">{formatPrice(subtotal)}</Typography>
              </Box>
              
              {savings > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" color="success.main">
                    Savings
                  </Typography>
                  <Typography variant="body1" color="success.main">
                    -{formatPrice(savings)}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{formatPrice(total)}</Typography>
              </Box>
              
              {shippingCost > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add {formatPrice(5000 - subtotal)} more to get free shipping
                </Typography>
              )}
              
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  py: 1.5, 
                  textTransform: 'none',
                  borderRadius: 1
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Have a coupon code?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField 
                  size="small" 
                  placeholder="Enter code" 
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    }
                  }}
                />
                <Button 
                  variant="outlined" 
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage; 