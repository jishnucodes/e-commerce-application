"use client";

import { Categories } from "@/common/utils";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";
import { useApiCalls } from "@/hooks/useApiCalls";

type RangeValue = {
  minValue: number | string; // Allow string to handle empty input
  maxValue: number | string; // Allow string to handle empty input
};

type CategoriesSidebarProps = {
  categories: any;
  rangeValue: RangeValue;
  setRangeValue: (value: RangeValue) => void;
  maxPrice?: number;
};

const CategoriesSidebar = ({ categories, rangeValue, setRangeValue, maxPrice = 7000 }: CategoriesSidebarProps) => {
  // const { data: categories, loading, error, get } = useApiCalls();

  const { isSidebarOpen } = useSelector((state: RootState) => state.header);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // const [rangeValue, setRangeValue] = useState<RangeValue>({
  //   minValue: 0,
  //   maxValue: 7000,
  // });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch categories
  // useEffect(() => {
  //   get("/category/list");
  // }, []);

  // Hover Handlers
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    category: any
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
    }, 300); // delay for smoother transition
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setRangeValue({
        minValue: newValue[0],
        maxValue: newValue[1],
      });
    }
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: "minValue" | "maxValue"
  ) => {
    const value = event.target.value;

    if (value === "" || !isNaN(Number(value))) {
      const numValue = value === "" ? "" : Number(value);
      
      if (name === "minValue") {
        // Ensure min doesn't exceed max
        const maxVal = typeof rangeValue.maxValue === "number" ? rangeValue.maxValue : maxPrice;
        const finalValue = numValue === "" || (typeof numValue === "number" && numValue <= maxVal) 
          ? numValue 
          : maxVal;
        setRangeValue({
          ...rangeValue,
          minValue: finalValue,
        });
      } else {
        // Ensure max doesn't go below min
        const minVal = typeof rangeValue.minValue === "number" && rangeValue.minValue >= 0 
          ? rangeValue.minValue 
          : 0;
        const finalValue = numValue === "" || (typeof numValue === "number" && numValue >= minVal)
          ? numValue
          : minVal;
        setRangeValue({
          ...rangeValue,
          maxValue: finalValue === "" ? maxPrice : finalValue,
        });
      }
    }
  };

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

        {/* Subcategory Popper */}
      <Popper
        open={Boolean(anchorEl && hoveredCategory)}
        anchorEl={anchorEl}
        placement="right-start"
        sx={{ zIndex: 1300 }}
      >
        <Paper
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
          sx={{
            p: 2,
            boxShadow: theme.shadows[4],
            ml: 1,
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

        {/* Filters section */}
        <Box
          component="div"
          sx={{
            padding: "8px 16px",
          }}
        >
          <Box component="div" mt={2}>
            <Typography
              variant="h5"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
              })}
            >
              Filters
            </Typography>
          </Box>
          <Divider
            sx={{
              color: "black",
            }}
          />
          <Typography
            variant="body1"
            sx={(theme) => ({
              fontSize: "13px",
              mt: 2,
              color: theme.palette.text.secondary,
            })}
          >
            Price
          </Typography>
          <Box
            component="div"
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 2,
              padding: 1,
              overflow: "hidden",
            })}
          >
            {/* Range Slider */}
            <Box
              component="div"
              sx={{
                width: "100%",
                px: 1,
              }}
            >
              <Slider
                value={[
                  typeof rangeValue.minValue === "number" && rangeValue.minValue >= 0
                    ? rangeValue.minValue
                    : 0,
                  typeof rangeValue.maxValue === "number" && rangeValue.maxValue > 0
                    ? rangeValue.maxValue
                    : maxPrice,
                ]}
                onChange={(e, newValue) => handleSliderChange(e, newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₹${value}`}
                min={0}
                max={maxPrice}
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                  "& .MuiSlider-thumb": {
                    width: 20,
                    height: 20,
                    "&:hover": {
                      boxShadow: `0 0 0 8px ${theme.palette.primary.main}22`,
                    },
                  },
                  "& .MuiSlider-track": {
                    height: 4,
                  },
                  "& .MuiSlider-rail": {
                    height: 4,
                    opacity: 0.3,
                  },
                })}
              />
            </Box>
            <Box
              component="div"
              sx={(theme) => ({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 1.5,
                mt: 1,
              })}
            >
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    fontSize: "0.75rem",
                    opacity: 0.8,
                  })}
                >
                  Min
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={rangeValue.minValue}
                  onChange={(e) => handleTextFieldChange(e, "minValue")}
                  placeholder="0"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={(theme) => ({
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: theme.palette.text.secondary,
                      fontSize: "0.875rem",
                      py: 1,
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                    },
                  })}
                />
              </Box>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  mt: 3.5,
                  opacity: 0.7,
                })}
              >
                to
              </Typography>
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    fontSize: "0.75rem",
                    opacity: 0.8,
                  })}
                >
                  Max
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={rangeValue.maxValue}
                  onChange={(e) => handleTextFieldChange(e, "maxValue")}
                  placeholder={maxPrice.toString()}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={(theme) => ({
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: theme.palette.text.secondary,
                      fontSize: "0.875rem",
                      py: 1,
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                    },
                  })}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="div"
          sx={(theme) => ({
            padding: "8px 16px",
          })}
        >
          <Box component="div" mt={2}>
            <Typography
              variant="h5"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
              })}
            >
              Latest Products
            </Typography>
          </Box>
          <Divider
            sx={{
              color: "black",
            }}
          />
        </Box>
        <Box
          component="div"
          sx={(theme) => ({
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          })}
        >
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: "50%" }}
                image="/backpacks.jpg"
                alt="Live from space album cover"
              />
              <CardContent sx={{ flex: "1 0 auto", width: "50%" }}>
                <Typography component="div" variant="h6">
                  Live From Space
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Mac Miller
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: "50%" }}
                image="/backpacks.jpg"
                alt="Live from space album cover"
              />
              <CardContent sx={{ flex: "1 0 auto", width: "50%" }}>
                <Typography component="div" variant="h6">
                  Live From Space
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Mac Miller
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              More
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CategoriesSidebar;
