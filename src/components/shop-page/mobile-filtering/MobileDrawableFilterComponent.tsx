"use client";
import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type MobileDrawableFilterComponentProps = {
  open: boolean;
  handleCloseDrawer: () => void;
};

type RangeValue = {
  minValue: number | string; // Allow string to handle empty input
  maxValue: number | string; // Allow string to handle empty input
};

const MobileDrawableFilterComponent = ({
  open,
  handleCloseDrawer,
}: MobileDrawableFilterComponentProps) => {
  const [rangeValue, setRangeValue] = useState<RangeValue>({
    minValue: 0,
    maxValue: 7000,
  });

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    name: "minValue" | "maxValue"
  ) => {
    setRangeValue((prevState) => ({
      ...prevState,
      [name]: newValue as number,
    }));
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: "minValue" | "maxValue"
  ) => {
    const value = event.target.value;

    if (value === "" || !isNaN(Number(value))) {
      setRangeValue((prevState) => ({
        ...prevState,
        [name]: value === "" ? "" : Number(value),
      }));
    }
  };
  return (
    <Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
      <Box
        component="div"
        sx={{
          padding: "8px 16px",
        }}
      >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
        <Box component="div" mt={2}>
          <Typography variant="h5">Filters</Typography>
        </Box>
        <Box
            component='div'
            onClick={handleCloseDrawer}
            mt={2}
            sx={{
                "&:hover": {
                    cursor: "pointer",
                  },
                  color: 'red'
            }}
        >
            <Close  fontSize="small"/>
        </Box>
        </Box>
        <Divider
          sx={{
            color: "black",
          }}
        />
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            marginTop: 2,
            padding: 1,
            overflow: "hidden",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="body2">Min Price</Typography>
              <Slider
                value={
                  typeof rangeValue.minValue === "number"
                    ? rangeValue.minValue
                    : 0
                }
                onChange={(e, newValue) =>
                  handleSliderChange(e, newValue, "minValue")
                }
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={7000}
              />
            </Box>
            <Box
              component="div"
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="body2">Max Price</Typography>
              <Slider
                value={
                  typeof rangeValue.maxValue === "number"
                    ? rangeValue.maxValue
                    : 0
                }
                onChange={(e, newValue) =>
                  handleSliderChange(e, newValue, "maxValue")
                }
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={7000}
              />
            </Box>
          </Box>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={rangeValue.minValue}
                onChange={(e) => handleTextFieldChange(e, "minValue")}
              />
            </Box>
            <Typography variant="body2">to</Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={rangeValue.maxValue}
                onChange={(e) => handleTextFieldChange(e, "maxValue")}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawableFilterComponent;
