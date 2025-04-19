"use client";
import React from "react";
import {
  Box,
  Skeleton,
  Card,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const CartPageSkeleton = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={150} height={30} />
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items Skeleton */}
        <Grid size ={{xs:12,md:8}}>
          <Stack spacing={2}>
            {[...Array(3)].map((_, index) => (
              <Card key={index} sx={{ display: 'flex', borderRadius: 2 }}>
                <Box sx={{ width: { xs: 100, sm: 150 }, minWidth: { xs: 100, sm: 150 } }}>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>
                <Box sx={{ flex: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Skeleton variant="text" width={200} height={30} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width={150} height={20} />
                    </Box>
                    <Skeleton variant="circular" width={30} height={30} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Skeleton variant="text" width={80} height={20} sx={{ mr: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Skeleton variant="circular" width={30} height={30} sx={{ mr: 1 }} />
                      <Skeleton variant="text" width={30} height={20} sx={{ mx: 1 }} />
                      <Skeleton variant="circular" width={30} height={30} />
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Order Summary Skeleton */}
        <Grid size ={{xs:12,md:4}}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="text" width={60} height={30} />
                <Skeleton variant="text" width={120} height={30} />
              </Box>
              
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 1 }} />
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Skeleton variant="text" width={150} height={20} sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width="70%" height={40} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width="30%" height={40} sx={{ borderRadius: 1 }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPageSkeleton; 