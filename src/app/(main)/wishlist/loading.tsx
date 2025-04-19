"use client";
import React from "react";
import {
  Box,
  Skeleton,
  Card,
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const WishlistPageSkeleton = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={150} height={30} />
      </Box>

      {/* Wishlist Items Skeleton */}
      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid size={{xs:12,sm:6,md:4,lg:3}} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              {/* Image Skeleton */}
              <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
                <Skeleton 
                  variant="circular" 
                  width={40} 
                  height={40} 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    bgcolor: 'rgba(255,255,255,0.8)',
                  }} 
                />
              </Box>

              {/* Content Skeleton */}
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Skeleton variant="text" width={100} height={30} />
                  <Skeleton variant="text" width={80} height={20} sx={{ ml: 1 }} />
                </Box>
                <Skeleton variant="rectangular" width={120} height={30} sx={{ mb: 1 }} />
              </Box>

              {/* Button Skeleton */}
              <Box sx={{ p: 2, pt: 0 }}>
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistPageSkeleton; 