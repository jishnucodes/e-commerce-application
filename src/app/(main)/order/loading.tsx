"use client";
import React from "react";
import { Box, Skeleton, Paper, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";

const OrderPageSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 1 }}>
      {/* Tabs Skeleton */}
      <Tabs
        value={0}
        variant="fullWidth"
        sx={{
          minHeight: 64,
          "& .MuiTab-root": {
            flexDirection: "row",
            minHeight: 64,
            padding: "6px 12px",
          },
        }}
      >
        {[...Array(3)].map((_, index) => (
          <Tab
            key={index}
            icon={<Skeleton variant="circular" width={24} height={24} />}
            label={<Skeleton variant="text" width={80} height={24} />}
            iconPosition="top"
            sx={{ flexDirection: "column", gap: 0.5 }}
          />
        ))}
      </Tabs>

      {/* Tab Content Skeleton */}
      <Box sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cart/Checkout/Order Summary Content Skeleton */}
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="70%" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={30} />
          </Box>

          {/* Form Fields Skeleton */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={56} />
            ))}
          </Box>

          {/* Action Buttons Skeleton */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </motion.div>
      </Box>
    </Paper>
  );
};

export default OrderPageSkeleton; 