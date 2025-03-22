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
    <Card sx={{ width: "100%", height: "auto", mt:"20px"}}>
      <CardActionArea sx={{ display: "flex", flexDirection: "row", justifyContent:"space-between", height: "100%" }}>
        {features.map((feature) => (
       <CardContent
       key={feature.id}
       sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "space-between", // Changed from space-evenly
         gap: 2,
         borderRight: "1px solid",
         borderColor: "divider",
         py: 1,
         "&:last-child": {
           borderRight: "none",
         },
       }}
     >
            {feature.icon}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {feature.primaryText}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
