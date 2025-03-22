"use client";

import React from "react";
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

const MainInterfaceSlider: React.FC = () => {
  const slides = [
    { id: 1, title: "Women's Fashion", img: "/adv-7.jpg" },
    { id: 2, title: "Hot Sale", img: "/adv-9.jpg" },
    { id: 3, title: "Headphones", img: "/adv-3.jpg" },
    { id: 4, title: "Tablets", img: "/adv-4.jpg" },
    { id: 5, title: "Backpacks", img: "/adv-5.jpg" },
  ];

  return (
    <Box
      sx={{
        width: { sm: "70%", md: "75%" },
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
              <CardActionArea sx={{ display: "flex", height: "100%" }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={slide.img}
                  alt="green iguana"
                  sx={{
                    width: "50%", // Adjust the width as needed
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    order: slide.id % 2 === 0 ? 1 : 0,
                    padding: "10px",
                    borderRadius: "18px"
                  }}
                />
                <CardContent
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    order: slide.id % 2 === 0 ? 0 : 1
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <CardActions>
                    <Typography sx={{background: 'blue', color: "white"}}>
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
