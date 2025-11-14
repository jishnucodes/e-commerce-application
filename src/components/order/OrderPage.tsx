"use client"
import React, { useState, SyntheticEvent, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Cart from "@/components/cart/Cart";
import Checkout from "@/components/checkout/Checkout";
import OrderSummary from "@/components/order-summary/OrderSummary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import OrderPageSkeleton from "@/app/(main)/order/loading";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    value === index && (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      </motion.div>
    )
  );
};

const OrderPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <OrderPageSkeleton />;
  }

  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setTab(newValue);
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 1 }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth" // This ensures equal spacing
        indicatorColor="primary"
        textColor="inherit"
        sx={{
          minHeight: 64, // Give more vertical space for icons
          "& .MuiTab-root": {
            flexDirection: "row",
            minHeight: 64,
            padding: "6px 12px",
          },
        }}
      >
        <Tab 
          icon={<ShoppingCartIcon fontSize="small" />}
          label="Cart"
          iconPosition="top"
          sx={{ flexDirection: "column", gap: 0.5,textTransform:"capitalize" }}
        />
        <Tab
          icon={<PaymentIcon fontSize="small"  />}
          label="Checkout"
          iconPosition="top"
          sx={{ flexDirection: "column", gap: 0.5,textTransform:"capitalize"  }}
        />
        <Tab
          icon={<AssignmentIcon fontSize="small" />}
          label="Order Summary"
          iconPosition="top"
          sx={{ flexDirection: "column", gap: 0.5,textTransform:"capitalize"}}
        />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Cart />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Checkout />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <OrderSummary />
      </TabPanel>
    </Paper>
  );
};

export default OrderPage;