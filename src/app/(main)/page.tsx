"use client";
import React, { useEffect, useState } from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery, useTheme,} from "@mui/material";
import Image from "next/image";
import Skeleton from '@mui/material/Skeleton';
import SliderComponent from "@/components/slider/SliderComponent";
import MainInterfaceSlider from "@/components/slider/MainInterfaceSlider";
import Sidebar from "@/components/sidebar/Sidebar";
import FeaturesList from "@/components/features-list/FeaturesList";
import { useSelector } from "react-redux";
import BottomNavigationComponent from "@/components/bottom-navigation/BottomNavigation";
import { RootState } from "../../../store";

export default function Home() {

  const { isSidebarOpen } = useSelector((state: RootState) => state.header);

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 1s delay
    return () => clearTimeout(timer);
  }, []);

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
        {
          isSidebarOpen ? (
            <Box
              component="aside"
              sx={{
                width: { xs: "100%", sm: "30%", md: "25%" }, // Full-width on small screens, 25% on md+
                flexShrink: 0, // Prevent sidebar from shrinking
                display: { xs: "none", sm: "none", md: "block" }, // Hide sidebar on extra-small screens
              }}
              height="495px"
            >
              {loading ? (
                <Skeleton variant="rectangular" height="100%" animation="wave" sx={{   bgcolor: 'blue.300', borderRadius: 2, boxShadow: 2, border: '1px solid #ccc' }} />
              ) : (

                <Sidebar />
              )}

            </Box>
          ) : null
        }
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={500}
            animation="wave"
            sx={{  bgcolor: 'grey.300', borderRadius: 2, boxShadow: 2, border: '1px solid #ccc'}}
          />
        ) : (

          <MainInterfaceSlider />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={30} animation="wave" sx={{ my: 2, bgcolor: 'grey.300', borderRadius: 2, boxShadow: 2, border: '1px solid #ccc'}} />
            <Skeleton variant="rectangular" height={120} animation="wave" sx={{ my: 2, bgcolor: 'grey.300', borderRadius: 2, boxShadow: 2, border: '1px solid #ccc'}} />
          </>
        ) : (
          <FeaturesList />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Skeleton variant="rectangular" height={200} animation="wave" sx={{ my: 2, bgcolor: 'grey.300', borderRadius: 2, boxShadow: 2, border: '1px solid #ccc'}} />
        ) : (
          <SliderComponent />
        )}
      </Box>
    </Box>
  );
}
