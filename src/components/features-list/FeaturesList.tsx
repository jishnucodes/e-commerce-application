"use client";

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";

const FeaturesList = () => {
  
  const features = [
    {
      id: 1,
      primaryText: "24/7 Support",
      secondaryText: "Support every time",
      icon: <HeadphonesOutlinedIcon fontSize="large" color="primary" />,
    },
    {
      id: 2,
      primaryText: "Accept Payment",
      secondaryText: "Visa, PayPal, Master",
      icon: <PaymentOutlinedIcon fontSize="large" color="primary"/>,
    },
    {
      id: 3,
      primaryText: "Secured Payment",
      secondaryText: "100% Secured",
      icon: <HttpsOutlinedIcon fontSize="large" color="primary"/>,
    },
    {
      id: 4,
      primaryText: "Free Shipping",
      secondaryText: "Order over $300",
      icon: <LocalShippingOutlinedIcon fontSize="large" color="primary"/>,
    },
    {
      id: 5,
      primaryText: "30 Days Return",
      secondaryText: "30 Days Guarantee",
      icon: <RedeemOutlinedIcon fontSize="large" color="primary"/>,
    },
  ];

  return (
    <Card
    sx={{
      width: { xs: "100%", sm: "100%", md: "100%" },
      height: "auto",
      mt: "20px",
    }}
  >
    <CardActionArea
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" }, // Column for xs & sm, Row for md+
    justifyContent: "center", // Centers children horizontally
    alignItems: "center", // Ensures items are centered in the flex container
    height: "100%",
    textAlign: "center", // Ensures text is centered
  }}
>
  {features.map((feature) => (
    <CardContent
      key={feature.id}
      sx={{
        display: "flex",
        flexDirection: {xs:"column",sm:"column",md:"row"}, // Stack icon and text vertically
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        gap: 2,
        borderRight: { xs: "none", md: "1px solid" },
        borderColor: "divider",
        py: 2,
        width: { xs: "100%", md: "auto" }, // Full width for small screens, auto for larger
        flex: 1,
        textAlign: "center",
        "&:last-child": { borderRight: "none" },
        "&:hover": { backgroundColor: "action.hover" }
      }}
    >
      {feature.icon}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 ,fontFamily: "CaviarDreams_Bold"}}>
          {feature.primaryText}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" , fontFamily: "Garmit-Light" }}>
          {feature.secondaryText}
        </Typography>
      </Box>
    </CardContent>
  ))}
</CardActionArea>

  </Card>
  );
};

export default FeaturesList;
