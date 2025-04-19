import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";

const MainPageSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar and Slider Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* Sidebar Skeleton */}
        <Box
          sx={{
            width: { xs: "100%", sm: "30%", md: "25%" },
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Skeleton
            variant="rectangular"
            height={495}
            sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200" }}
          />
        </Box>

        {/* Main Slider Skeleton */}
        <Box sx={{ flex: 1 }}>
          <Skeleton
            variant="rectangular"
            height={495}
            sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200" }}
          />
        </Box>
      </Box>

      {/* Features List Skeleton */}
      <Box sx={{ mt: 3 }}>
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200" }}
        />
      </Box>

      {/* Slider Component Skeleton */}
      <Box sx={{ mt: 3 }}>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200" }}
        />
      </Box>
    </Box>
  );
};

export default MainPageSkeleton; 