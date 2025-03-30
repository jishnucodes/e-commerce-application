"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Typography } from "@mui/material";

const SliderComponent: React.FC = () => {
  const slides = [
    { id: 1, title: "Women's Fashion", img: "/womenfashion.jpg" },
    { id: 2, title: "Hot Sale", img: "/sale.jpg" },
    { id: 3, title: "Headphones", img: "/headphones.jpg" },
    { id: 4, title: "Tablets", img: "/tablets.webp" },
    { id: 5, title: "Backpacks", img: "/backpacks.jpg" }
  ];

  return (
    <Box sx={{ width: "100%", padding: 2, mt: 4, mb: 6 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: { xs: "center", sm: "start" },
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          letterSpacing: { xs: '0.5px', md: '1px' },
          fontSize: {
            xs: '1.75rem',  // Mobile: ~28px
            sm: '2rem',     // Tablet: ~32px
            md: '2.5rem'    // Desktop: ~40px
          },
          lineHeight: 1.5,
          background: 'linear-gradient(45deg, #2b5876 0%,rgb(52, 0, 241) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          position: 'relative',
          textShadow: {
            xs: '0 2px 4px rgba(0, 0, 0, 0.1)',
            md: '0 4px 8px rgba(0,0,0,0.1)'
          }
        }}
      >
        Featured Categories
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
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
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  overflow:"hidden",
                 background: "linear-gradient(90deg,rgb(2, 49, 255),rgb(5, 255, 89))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  fontSize: {
                    xs: "1.9rem", // Small screens
                    sm: "2.2rem",   // Tablets
                    md: "2.5rem", // Medium screens
                    lg: "3rem",   // Large screens
                  },
                }}
              >
                {slide.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SliderComponent;
