"use client";
import React from "react";
import { Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProductDetailsSkeleton = () => {
  return (
    <Box component="div">
      {/* Breadcrumbs Skeleton */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={24} />
      </Box>

      <Grid container spacing={2}>
        {/* Left Column - Images */}
        <Grid size={{xs:12, sm:6}} >
          {/* Main Image Skeleton */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              bgcolor: "white",
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>

          {/* Thumbnails Skeleton */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
            }}
          >
            {[...Array(4)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: "5px",
                  width: 80,
                  height: 80,
                }}
              >
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right Column - Product Details */}
        <Grid size={{xs:12, sm:6}}>
          {/* Product Title Skeleton */}
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="80%" height={40} />

          {/* Rating Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Skeleton variant="text" width={100} height={24} />
          </Box>

          {/* Description Skeleton */}
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>

          {/* Price Skeleton */}
          <Skeleton variant="text" width={120} height={40} sx={{ mt: 2 }} />

          {/* Quantity and Add to Cart Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={40} height={32} sx={{ mx: 2 }} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>

          {/* Options Skeleton */}
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width={100} height={24} />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Skeleton variant="rectangular" width={120} height={36} />
              <Skeleton variant="rectangular" width={120} height={36} />
            </Box>
          </Box>

          {/* Additional Info Skeleton */}
          <Box sx={{ mt: 3 }}>
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Skeleton variant="text" width={100} height={24} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Tabs Skeleton */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Skeleton variant="rectangular" width={120} height={48} />
          <Skeleton variant="rectangular" width={120} height={48} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>

      {/* Reviews Skeleton */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="circular" width={60} height={60} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="100%" height={60} sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Box>

      {/* Featured Products Skeleton */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Grid size={{xs:12, sm:6}} key={index}>
              <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={24} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailsSkeleton; 