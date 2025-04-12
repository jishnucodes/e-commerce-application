"use client";
import React from 'react'
import { Box, Typography, TextField, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from "@mui/material/Grid2";


const categories = [
    { name: "Fashion", icon: "/backpacks.jpg" },
    { name: "Mobiles", icon: "/backpacks.jpg" },
    { name: "Food", icon: "/backpacks.jpg" },
    { name: "Home", icon: "/backpacks.jpg" },
    { name: "Beauty", icon: "/backpacks.jpg" },
  ];
  
  const products = [
    {
      name: "Plant Stand",
      price: "₹3,013",
      oldPrice: "₹4,999",
      image: "/backpacks.jpg",
      tag: "Free delivery",
    },
    {
      name: "Metal Shelf",
      price: "₹2,697",
      oldPrice: "₹3,499",
      image: "/backpacks.jpg",
      tag: "Buy 2, save more",
    },
    {
      name: "Potted Stand",
      price: "₹1,159",
      oldPrice: "₹4,999",
      image: "/backpacks.jpg",
      tag: "Hot Deal",
    },
    {
      name: "Potted Stand",
      price: "₹1,159",
      oldPrice: "₹4,999",
      image: "/backpacks.jpg",
      tag: "Hot Deal",
    }
    
  ];

const FeaturedProducts = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", pb: 8 }}>

      {/* 🛍 Suggested Products */}
      <Typography 
        variant="h6" 
        sx={{ 
            px: 2,
            fontFamily: "Copeland",
            fontWeight: "bold",
            color: "black",
            mt: 2,
            fontSize: {
                xs: '1.5rem',  // Mobile: ~28px
                sm: '1.5rem',     // Tablet: ~32px
                md: '1.5rem'    // Desktop: ~40px
            },
        }}
      >
        Suggested for You
    </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {products.map((item, index) => (
          <Grid size={{xs: 6, sm: 4, md: 3}} key={index}>
            <Box sx={{ bgcolor: "white", borderRadius: 2, p: 1, textAlign: "center" }}>
              <Image src={item.image} alt={item.name} width={100} height={100} />
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{item.price}</Typography>
              <Typography variant="caption" sx={{ textDecoration: "line-through", color: "gray" }}>{item.oldPrice}</Typography>
              <Typography variant="caption" sx={{ color: "green", display: "block" }}>{item.tag}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

    </Box>
  )
}

export default FeaturedProducts

