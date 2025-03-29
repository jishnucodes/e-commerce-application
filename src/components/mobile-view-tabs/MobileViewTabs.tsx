"use client";

import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
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
                padding: "8px",
                height: "500px",
                overflow: "auto"

            }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const MobileViewTabs: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    _event.stopPropagation();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
        sx={{
          background: "#e3f2fd",
          width: "65%",
          padding: "8px",
          borderRadius: "10px",
          marginTop: "10px",
          zIndex: 10,
        }}
      >
        <Tab
          label="Categories"
          sx={{
            color: "black",
            background: "#b2dfdb", // Inactive color
            width: "50%",
            padding: "8px",
            "&.Mui-selected": {
              // Active state styling
              color: "black",
              background: "white", // Active color
              fontWeight: "bold",
            },
            "&.MuiTab-root": {
              padding: "8px",
            },
          }}
        />
        <Tab
          label="Pages"
          sx={{
            color: "black",
            background: "#b2dfdb", // Inactive color
            width: "50%",
            padding: "8px",
            "&.Mui-selected": {
              // Active state styling
              color: "black",
              background: "white", // Active color
              fontWeight: "bold",
            },
            "&.MuiTab-root": {
              padding: "8px",
            },
          }}
        />
      </Tabs>

      
        <TabPanel value={value} index={0}>
          <Sidebar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="body1">
            Content for Tab 2
          </Typography>
        </TabPanel>
      </Box>
  );
};

export default MobileViewTabs;
