"use client";
import React from "react";
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
import { RootState } from "../../store";
import BottomNavigationComponent from "@/components/bottom-navigation/BottomNavigation";

export default function Home() {

  const { isSidebarOpen } = useSelector((state: RootState) => state.header);

  const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  return (
    // <Box>
    //    <Card sx={{ maxWidth: "600px",width: "100%"}}>
    //   {/* <CardMedia
    //     sx={{ height: 340 }}
    //     image="/laptopImage.jpg"
    //     title="green iguana"
    //   /> */}
    //   <Image
    //     src="/laptopImage.jpg"
    //     alt="slide-image"
    //     width={500}
    //     height={140}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       Lizard
    //     </Typography>
    //     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //       Lizards are a widespread group of squamate reptiles, with over 6,000
    //       species, ranging across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
    // </Box>
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
          isSidebarOpen  ? (
            <Box
            component="aside"
            sx={{
              width: { xs: "100%", sm: "30%", md: "25%" }, // Full-width on small screens, 25% on md+
              flexShrink: 0, // Prevent sidebar from shrinking
              display: { xs: "none",sm: "none", md: "block" }, // Hide sidebar on extra-small screens
            }}
            height="495px"
          >
            <Sidebar />
          </Box>
          ) : null
        }
       
        
        <MainInterfaceSlider />
      </Box>
      <FeaturesList />
      <SliderComponent />
      
    </Box>
  );
}
