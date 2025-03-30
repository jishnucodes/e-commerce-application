"use client";

import React from "react";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const MainInterfaceSlider: React.FC = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.header);

  const slides = [
    { id: 1, title: "Women's Fashion", img: "/adv-7.jpg" },
    { id: 2, title: "Hot Sale", img: "/adv-9.jpg" },
    { id: 3, title: "Headphones", img: "/adv-3.jpg" },
    { id: 4, title: "Tablets", img: "/adv-4.jpg" },
    { id: 5, title: "Backpacks", img: "/adv-5.jpg" },
  ];

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: isSidebarOpen ? "70%" : "100%", lg: isSidebarOpen ? "75%" : "100%" },
        padding: 2,
        height: "495px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* <Typography variant="h4" sx={{ mb: 2, textAlign: "start" }}>
        Featured Categories
      </Typography> */}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          //   768: { slidesPerView: 2 },
          //   1024: { slidesPerView: 3 },
          //   1280: { slidesPerView: 1},
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "460px",
                background: `url(${slide.img}) center/cover no-repeat`,
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {slide.title}
              </Typography>
            </Box> */}
            <Card sx={{ width: "100%", height: "460px" }}>
              <CardActionArea sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, height: "100%" }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={slide.img}
                  alt="green iguana"
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "50%" }, // Adjust the width as needed
                    aspectRatio: { sx: "4/3", sm: "3/4", md: "3/4" },
                    objectFit: "cover",
                    order: { xs: 0, sm: 0, md: slide.id % 2 === 0 ? 1 : 0 },
                    padding: "10px",
                    borderRadius: "18px"
                  }}
                />
                <CardContent
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "50%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    order: { xs: 0,  sm: slide.id % 2 === 0 ? 0 : 1,  md: slide.id % 2 === 0 ? 0 : 1 },
                    // Added alignment controls
                    textAlign: { xs: "center", sm: "center", md: "left" }, // Changed for xs/sm
                    alignItems: { xs: "center", sm: "center", md: "flex-start" },// New
                    padding: { sm: "20px !important" },
                    gap: { xs: 1, sm: 2 }
                  }}
                >
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Typography
                      component={motion.div}
                      variants={titleVariants}
                      gutterBottom
                      variant="h5"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #2b5876 0%, #4e4376 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: {
                          xs: '1.4rem',   // Mobile
                          sm: '1.5rem',  // Tablet
                          md: '3rem'      // Desktop
                        },
                        lineHeight:"19px",
                        textShadow: '0 2px 4px rgba(26, 14, 14, 0.1)',
                        position: 'relative',
                        display: 'inline-block',
                        // Added responsive alignment
                        mx: { xs: "auto", sm: 0, md: 0 }, // Center on mobile
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: { xs: "50%", sm: 0 , md: 0 }, // Center underline on mobile
                          transform: {
                            xs: "translateX(-50%) scaleX(0)",
                             sm: "scaleX(0)",
                            md: "scaleX(0)"
                          },
                          width: { xs: "80%", md: "100%" }, // Adjust underline width for mobile
                          height: '2px',
                          background: 'linear-gradient(45deg, #2b5876 0%, #4e4376 100%)',
                          transformOrigin: 'right',
                          transition: 'transform 0.3s ease'
                        },
                        '&:hover:after': {
                          transform: {
                            xs: "translateX(-50%) scaleX(1)",
                             sm: "scaleX(1)",
                            md: "scaleX(1)"
                          },
                          transformOrigin: 'left'
                        }
                      }}
                    >
                      Lizard
                    </Typography>

                    <Typography
                      component={motion.div}
                      variants={textVariants}
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: {
                          xs: '0.800rem',  // Mobile
                          sm: '1rem',       // Tablet
                          md: '1.4rem'      // Desktop
                        },
                        lineHeight: {
                          xs: 1.2,
                          sm: 1.4,
                          md: 1.2
                        },
                        maxWidth: { xs: "100%", sm: "90%", md: "600px" }, // Adjusted for mobile
                        padding: {
                          xs: '0 0.5rem',
                          sm: 0, // Reduced mobile padding
                          md: 0
                        },
                        textAlign: { xs: "left", sm: "left", md: "left" }, // Added
                        marginX: { xs: "auto", sm: 0 }, // Center on mobile
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          transition: 'transform 0.3s ease'
                        }
                      }}
                    >
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                      ranging across all continents except Antarctica
                    </Typography>
                  </motion.div>

                  <CardActions sx={{
                    justifyContent: { xs: "center", sm: "center", md: "flex-start" }, // Changed
                    paddingLeft: { sm: "0 !important" }                  
                  }}>
                    <Typography
                      sx={{
                        background: 'blue',
                        color: 'white',
                        px: 3,
                        py: 1,
                        mb:2,
                        borderRadius: 1,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        display: 'inline-block',
                        width: { xs: "90%", sm: "auto" }, // Full width on mobile
                        minWidth: { sm: "140px" },
                        textAlign: "center", // Center text
                        '&:hover': {
                          background: '#1565c0',
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        },
                        '&:active': { transform: 'scale(0.98)' },
                        fontSize: {
                          xs: '0.875rem',
                          sm: '1rem',
                          md: '1.1rem'
                        },
                        letterSpacing: {
                          xs: '0.5px',
                          sm: '0.75px',
                          md: '1px'
                        }
                      }}
                    >
                      Shop
                    </Typography>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MainInterfaceSlider;
