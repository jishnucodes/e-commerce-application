"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Paper,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import Image from 'next/image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import WishlistPageSkeleton from '@/app/(main)/wishlist/loading';

// Mock wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: "Plant Stand",
    price: 3013,
    oldPrice: 4999,
    image: "/backpacks.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Metal Shelf",
    price: 2697,
    oldPrice: 3499,
    image: "/backpacks.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Potted Stand",
    price: 1159,
    oldPrice: 4999,
    image: "/backpacks.jpg",
    inStock: false,
  },
];

const WishlistPage = () => {
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <WishlistPageSkeleton />;
  }

  // Handle remove item
  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  // Handle add to cart
  const handleAddToCart = (id: number) => {
    // In a real app, this would add the item to the cart
    alert(`Item ${id} added to cart`);
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
          My Wishlist
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
        </Typography>
      </Box>

      {wishlistItems.length > 0 ? (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid size ={{xs:12,sm:6,md:4,lg:3}} key={item.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <IconButton 
                    onClick={() => handleRemoveItem(item.id)}
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}
                    >
                      {formatPrice(item.price)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textDecoration: 'line-through', 
                        color: 'text.secondary',
                        ml: 1,
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}
                    >
                      {formatPrice(item.oldPrice)}
                    </Typography>
                  </Box>
                  {!item.inStock && (
                    <Chip 
                      label="Out of Stock" 
                      color="error" 
                      size="small" 
                      sx={{ mb: 1 }}
                    />
                  )}
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    startIcon={<ShoppingCartOutlinedIcon />}
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item.id)}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 1
                    }}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <FavoriteIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Save items you love for later by clicking the heart icon on any product.
          </Typography>
          <Link href="/shop" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ textTransform: 'none' }}>
              Browse Products
            </Button>
          </Link>
        </Paper>
      )}
    </Box>
  );
};

export default WishlistPage; 