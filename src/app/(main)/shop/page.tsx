"use client";

import React from "react";
import ProductDisplaySection from "@/components/shop-page/product-display-section/ProductDisplaySection";
import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import CategoriesSidebar from "@/components/shop-page/categories-sidebar/CategoriesSidebar";

const page = () => {
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
      <Box
        component="aside"
        sx={{
          width: { xs: "100%", sm: "30%", md: "25%" },
          display: { xs: "none",sm: "none", md: "block" }
        }}
      >
        <CategoriesSidebar />
      </Box>
      <Box component="div" sx={{ width: { xs: "100%", sm: "100%", md: "75%" } }}>
        <Card sx={{ width: "100%", height: "460px", paddin: "opx" }}>
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image={"./shopImg-1.png"}
              alt="green iguana"
              sx={{
                width: { xs: "100%", sm: "100%", md: "100%" }, // Adjust the width as needed
                aspectRatio: { sx: "4/3", sm: "3/4", md: "3/4" },
                objectFit: "cover",
                padding: "10px",
                borderRadius: "18px",
              }}
            />
          </CardActionArea>
        </Card>
        <ProductDisplaySection />
      </Box>
    </Box>
  );
};

export default page;
