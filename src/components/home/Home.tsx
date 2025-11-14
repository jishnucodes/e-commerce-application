"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import SliderComponent from "@/components/slider/SliderComponent";
import MainInterfaceSlider from "@/components/slider/MainInterfaceSlider";
import Sidebar from "@/components/sidebar/Sidebar";
import FeaturesList from "@/components/features-list/FeaturesList";
import { useSelector } from "react-redux";
import BottomNavigationComponent from "@/components/bottom-navigation/BottomNavigation";
import { RootState } from "../../../store";
import MainPageSkeleton from "@/components/skeleton/MainPageSkeleton";
import Loading from "@/components/loading/Loading";
import { useApiCalls } from "@/hooks/useApiCalls";
import HeaderSlider from "../HeaderSlider/HeaderSlider";

type HomeProps = {
  products: any[];
  brands: any[];
};
export default function Home({ products, brands }: HomeProps) {
  const { data: categories, loading, error, get } = useApiCalls();
  const { isSidebarOpen } = useSelector((state: RootState) => state.header);
  // const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    get("/category/list");
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <MainPageSkeleton />
      </>
    );
  }

  return (
    <Box
      sx={{
        // width: "100%"
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {isSidebarOpen ? (
          <Box
            component="aside"
            sx={{
              width: { xs: "100%", sm: "30%", md: "25%" }, // Full-width on small screens, 25% on md+
              flexShrink: 0, // Prevent sidebar from shrinking
              display: { xs: "none", sm: "none", md: "block" }, // Hide sidebar on extra-small screens
            }}
            height="495px"
          >
            <Sidebar categories={categories} />
          </Box>
        ) : null}

        <MainInterfaceSlider products={products} />
      </Box>
      <HeaderSlider brands={brands} />
      <Box sx={{ mt: 2, mb:3 }}>
        <FeaturesList />
      </Box>

      {/* <Box sx={{ mt: 3 }}>
        
          <SliderComponent />
        
      </Box> */}
    </Box>
  );
}
