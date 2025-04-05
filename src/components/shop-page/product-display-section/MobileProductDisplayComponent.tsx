"use client";

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AnimatedCardComponent from "./AnimatedCardComponent";

const products = [
  { id: 1, name: "Product 1", image: "/backpacks.jpg", price: "$10" },
  { id: 2, name: "Product 2", image: "/headphones.jpg", price: "$15" },
  { id: 3, name: "Product 3", image: "/tablets.webp", price: "$20" },
  { id: 4, name: "Product 4", image: "/backpacks.jpg", price: "$25" },
  { id: 5, name: "Product 1", image: "/backpacks.jpg", price: "$10" },
  { id: 6, name: "Product 2", image: "/headphones.jpg", price: "$15" },
  { id: 7, name: "Product 3", image: "/tablets.webp", price: "$20" },
  { id: 8, name: "Product 4", image: "/backpacks.jpg", price: "$25" },
  { id: 9, name: "Product 1", image: "/backpacks.jpg", price: "$10" },
  { id: 10, name: "Product 2", image: "/headphones.jpg", price: "$15" },
  { id: 11, name: "Product 3", image: "/tablets.webp", price: "$20" },
  { id: 12, name: "Product 4", image: "/backpacks.jpg", price: "$25" },
  { id: 13, name: "Product 1", image: "/backpacks.jpg", price: "$10" },
  { id: 14, name: "Product 2", image: "/headphones.jpg", price: "$15" },
  { id: 15, name: "Product 3", image: "/tablets.webp", price: "$20" },
  { id: 16, name: "Product 4", image: "/backpacks.jpg", price: "$25" },
];

const MobileProductDisplayComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) return null; // Only render on mobile screens

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Product List
      </Typography>
      <Grid container spacing={1}>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
          <Grid size={{xs: 4}}>
            <AnimatedCardComponent />
          </Grid>
      </Grid>
    </Box>
  );
};

export default MobileProductDisplayComponent;
