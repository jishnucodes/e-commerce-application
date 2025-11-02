"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Tabs, Tab, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { useApiCalls } from "@/hooks/useApiCalls";
import Loading from "../loading/Loading";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = React.memo(({ children, value, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Memoize scrollbar colors based on theme mode
  const scrollbarStyles = useMemo(() => ({
    track: theme.palette.mode === "dark" 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
    thumb: theme.palette.mode === "dark" 
      ? theme.palette.grey[600] 
      : theme.palette.grey[400],
    thumbHover: theme.palette.mode === "dark" 
      ? theme.palette.grey[500] 
      : theme.palette.grey[500],
  }), [theme.palette.mode]);
  
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box 
          sx={{ 
            width: "100%",
            display: "flex",
            justifyContent: "start",
            padding: { xs: "12px", sm: "16px" },
            minHeight: { xs: "400px", sm: "500px" },
            maxHeight: { xs: "calc(100vh - 200px)", sm: "600px" },
            overflowY: "auto",
            overflowX: "hidden",
            fontFamily: "CaviarDreams_Bold",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            mt: 1,
            // Custom scrollbar styling with theme support
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: scrollbarStyles.track,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: scrollbarStyles.thumb,
              borderRadius: "10px",
              "&:hover": {
                background: scrollbarStyles.thumbHover,
              },
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
});

TabPanel.displayName = "TabPanel";

const MobileViewTabs: React.FC = React.memo(() => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: categories, loading: categoriesLoading, get: getCategories } = useApiCalls();

  useEffect(() => {
    getCategories("/category/list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    _event.stopPropagation();
    setValue(newValue);
  }, []);

  // Memoize tab styles based on theme
  const tabStyles = useMemo(() => ({
    container: {
      backgroundColor: theme.palette.mode === "dark" 
        ? theme.palette.grey[900] 
        : theme.palette.grey[50],
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    inactive: {
      color: theme.palette.text.secondary,
      backgroundColor: "transparent",
    },
    active: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    },
    hover: {
      backgroundColor: theme.palette.action.hover,
    },
  }), [theme]);

  if (categoriesLoading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 4 }}>
        <Loading />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 1.5 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: { xs: "12px", sm: "16px" },
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark"
            ? "0 2px 8px rgba(0, 0, 0, 0.5)"
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="mobile navigation tabs"
          variant="fullWidth"
          sx={{
            backgroundColor: tabStyles.container.backgroundColor,
            borderBottom: tabStyles.container.borderBottom,
            minHeight: { xs: "48px", sm: "56px" },
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "3px 3px 0 0",
              backgroundColor: theme.palette.primary.main,
            },
            "& .MuiTabs-flexContainer": {
              gap: { xs: 0, sm: 1 },
            },
          }}
        >
          <Tab
            label={
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  textTransform: "none",
                  fontWeight: value === 0 ? 700 : 500,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Categories
              </Typography>
            }
            sx={{
              minHeight: { xs: "48px", sm: "56px" },
              padding: { xs: "8px 12px", sm: "12px 24px" },
              color: tabStyles.inactive.color,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: tabStyles.hover.backgroundColor,
              },
              "&.Mui-selected": {
                color: tabStyles.active.color,
                backgroundColor: tabStyles.active.backgroundColor,
              },
              "&.MuiTab-root": {
                borderRadius: { xs: "12px 12px 0 0", sm: "16px 16px 0 0" },
              },
            }}
          />
          <Tab
            label={
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  textTransform: "none",
                  fontWeight: value === 1 ? 700 : 500,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Pages
              </Typography>
            }
            sx={{
              minHeight: { xs: "48px", sm: "56px" },
              padding: { xs: "8px 12px", sm: "12px 24px" },
              color: tabStyles.inactive.color,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: tabStyles.hover.backgroundColor,
              },
              "&.Mui-selected": {
                color: tabStyles.active.color,
                backgroundColor: tabStyles.active.backgroundColor,
              },
              "&.MuiTab-root": {
                borderRadius: { xs: "12px 12px 0 0", sm: "16px 16px 0 0" },
              },
            }}
          />
        </Tabs>

        <Box
          sx={{
            minHeight: { xs: "400px", sm: "500px" },
            maxHeight: { xs: "calc(100vh - 250px)", sm: "600px" },
            overflow: "hidden",
          }}
        >
          <TabPanel value={value} index={0}>
            <Sidebar categories={categories} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "400px",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "CaviarDreams_Bold",
                  color: theme.palette.text.secondary,
                  mb: 2,
                }}
              >
                Pages Content
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Garmit-Light",
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
                }}
              >
                Additional pages content will appear here
              </Typography>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
});

MobileViewTabs.displayName = "MobileViewTabs";

export default MobileViewTabs;
