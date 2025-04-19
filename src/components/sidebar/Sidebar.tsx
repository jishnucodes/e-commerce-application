"use client";

import { Categories } from "@/common/utils";
import { Box, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.header);
  const theme = useTheme()
      const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      
        <Box
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            // maxWidth: "220px",
            width: "100%",
            height: "100%",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },  
          }}
        >
          <List>
            {Categories.map((category) => (
              <ListItem
                key={category.id}
                component={Link}
                href={`/product/${category.slug}`}
                sx={(theme) => ({
                  fontFamily: "CaviarDreams_Bold",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    cursor: "pointer",
                  },
                })}
              >
                <ListItemText
                  primary={category.name}
                  sx={(theme) => ({
                    fontFamily: "CaviarDreams_Bold",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    color: theme.palette.text.secondary,
                  })}
                />
              </ListItem>
            ))}
          </List>
        </Box>
    </>
  );
};

export default Sidebar;
