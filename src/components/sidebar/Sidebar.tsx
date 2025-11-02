"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Popper,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { RootState } from "../../../store";

type SidebarProps = {
  categories: any;
};

const Sidebar = React.memo(({ categories }: SidebarProps) => {
  // Redux state
  const { isSidebarOpen } = useSelector((state: RootState) => state.header);

  // UI theme
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Local state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize hover handlers for performance
  const handleMouseEnter = useCallback((
    event: React.MouseEvent<HTMLElement>,
    category: any
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
    }, 300); // delay for smoother transition
  }, []);

  const handlePopperMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);


  return (
    <>
      {/* Sidebar Container */}
      <Box
        sx={{
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.paper,
          width: "100%",
          height: "100%",
          overflow: "auto",
          borderRadius: "8px",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List>
          {categories?.data?.map((category: any) => (
            <ListItem
              key={category.id}
              component={Link}
              href={`/product/${category.slug}`}
              onMouseEnter={(e) => handleMouseEnter(e, category.subCategories)}
              onMouseLeave={handleMouseLeave}
              sx={{
                fontFamily: "CaviarDreams_Bold",
                color: theme.palette.text.secondary,
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText
                primary={category.categoryName}
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  color: theme.palette.text.secondary,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Subcategory Popper */}
      <Popper
        open={Boolean(anchorEl && hoveredCategory)}
        anchorEl={anchorEl}
        placement={isSmallScreen ? "left-start" : "right-start"}
        sx={{ 
          zIndex: 1300,
          // Ensure popper doesn't overflow on mobile
          maxWidth: isSmallScreen ? "calc(100vw - 20px)" : "auto",
        }}
      >
        <Paper
          onMouseEnter={handlePopperMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            p: 2,
            boxShadow: theme.shadows[4],
            backgroundColor: theme.palette.background.paper,
            ml: isSmallScreen ? -1 : 1,
            mr: isSmallScreen ? 1 : 0,
            maxWidth: isSmallScreen ? "200px" : "250px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <List>
            {hoveredCategory?.map((subCategory: any) => (
              <ListItem
                key={subCategory.id}
                component={Link}
                href={`/product/${subCategory.slug}`}
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={subCategory.subCategoryName}
                  sx={{
                    fontFamily: "CaviarDreams_Bold",
                    color: theme.palette.text.secondary,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
