"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";

const ProductImageZoom: React.FC = () => {
  const [backgroundPosition, setBackgroundPosition] = useState("cover");
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <Box
      ref={imageContainerRef}
      onMouseMove={handleMouseMove}
      sx={{
        width: "100%",
        height: "auto",
        backgroundImage: `url('/backpacks.jpg')`, // ✅ Fixed: Correct background format
        backgroundSize: "200%",
        backgroundPosition: backgroundPosition,
        transition: "background-position 0.1s ease-in-out",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "zoom-in",
      }}
    >
      <Image
        src="/backpacks.jpg"
        width={300}
        height={300}
        alt="Product Image"
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} // ✅ Debugging visibility
      />
    </Box>
  );
};

export default ProductImageZoom;
