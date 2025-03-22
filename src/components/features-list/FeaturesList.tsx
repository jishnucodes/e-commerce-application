"use client";

import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
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
      primaryText: "24/7 support",
      secondaryText: "support every time",
      icon: <HeadphonesOutlinedIcon />,
    },
    {
      id: 2,
      primaryText: "accept payment",
      secondaryText: "visa, paypal, master",
      icon: <PaymentOutlinedIcon />,
    },
    {
      id: 3,
      primaryText: "secured payment",
      secondaryText: "100% secured",
      icon: <HttpsOutlinedIcon />,
    },
    {
      id: 4,
      primaryText: "free shipping",
      secondaryText: "order over $300",
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      id: 5,
      primaryText: "30 days return",
      secondaryText: "30 days guarantee",
      icon: <RedeemOutlinedIcon />,
    },
  ];

  return (
    <Card sx={{ width: "100%", height: "460px" }}>
      <CardActionArea sx={{ display: "flex", height: "100%" }}>
        <CardContent
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FeaturesList;
