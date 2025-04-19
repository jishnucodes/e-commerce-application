"use client";
import React from "react";
import { Box, Skeleton, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";

const CategoryPageSkeleton = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        width: "100%",
      }}
    >
      {/* Sidebar Skeleton */}
      <Box
        component="aside"
        sx={{
          width: { xs: "100%", sm: "30%", md: "25%" },
          display: { xs: "none", sm: "none", md: "block" }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="text" width="60%" height={30} sx={{ mb: 1 }} />
          ))}
        </Box>
      </Box>

      {/* Main Content Skeleton */}
      <Box component="div" sx={{ width: { xs: "100%", sm: "100%", md: "75%" } }}>
        {/* Hero Image Skeleton */}
        <Card sx={{ width: "100%", height: "460px", mb: 2 }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Card>

        {/* Product Grid Skeleton */}
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{xs:12,sm:6,md:4}}>
              <Card sx={{ p: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={20} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryPageSkeleton; 