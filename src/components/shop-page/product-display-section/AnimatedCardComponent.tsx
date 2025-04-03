"use client";

import React from "react";

import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Image from "next/image";

const AnimatedCard = styled(motion.div)({
  width: "100%",
  height: 350,
  perspective: "1000px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const GlassCard = styled(Card)({
  width: "100%",
  height: "100%",
  borderRadius: 50,
//   background:
//     "linear-gradient(135deg, rgb(0, 255, 214) 0%, rgb(8, 226, 96) 100%)",
    background: "linear-gradient(135deg, rgb(232 249 240) 0%, rgb(42 8 226) 100%)",
  boxShadow: "rgba(5, 71, 17, 0.2) 0px 25px 25px -5px",
  overflow: "hidden",
  position: "relative",
  transition: "transform 0.5s ease-in-out",
});

const GlassOverlay = styled(Box)({
  position: "absolute",
  inset: 8,
  borderRadius: "55px",
  borderTopRightRadius: "100%",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(8px)",
  zIndex: 2,
});

const AnimatedButton = styled(motion.button)({
  background: "white",
  borderRadius: "50%",
  padding: "10px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.3s ease",
  "&:hover": {
    background: "black",
    "& svg": {
      color: "white",
    },
  },
});

export default function AnimatedCardComponent() {
    const [value, setValue] = React.useState<number | null>(2);
  return (
    <AnimatedCard whileHover={{ rotateY: 15, rotateX: 15 }}>
      <GlassCard>
        <GlassOverlay />
        <CardContent
          sx={{
            position: "relative",
            zIndex: 3,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "180px", // Adjust height based on your design
              overflow: "hidden",
              borderRadius: "20px", // Optional: rounded corners for styling
            }}
          >
            <Image
              src="/adv-5.jpg" // Ensure this image is inside the "public" folder
              width={500}
              height={300}
              alt="backpack"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // Fit image inside container
            />
          </Box>
        </CardContent>

        {/* Social Buttons */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: "absolute",
            bottom: 10,
            left: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <Box display="flex" gap={0} flexDirection="column">
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // Limit to 2 lines
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%", // Adjust width as needed
                }}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica.
                They are highly adaptable and found in various environments.
              </Typography>
            </motion.div>
            {/* <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
              <AnimatedButton>
                <InstagramIcon sx={{ color: "#00894d" }} />
              </AnimatedButton>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
              <AnimatedButton>
                <FacebookIcon sx={{ color: "#00894d" }} />
              </AnimatedButton>
            </motion.div> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                    <span>
                      <LocalShippingOutlinedIcon />
                    </span>
                  <Typography variant="body2" sx={{color: '#1976d2'}}>
                    Fast Delivery
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                    <span>
                    <AttachMoneyOutlinedIcon />
                    </span>
                  <Typography variant="body2" sx={{color: '#1976d2'}}>
                    Fast Delivery
                  </Typography>
                </Box>
            </Box>
          </Box>
        </Box>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="text" sx={{ color: "#00c37b", fontWeight: "bold" }}>
            View More
          </Button>
        </motion.div>
      </GlassCard>
    </AnimatedCard>
  );
}
