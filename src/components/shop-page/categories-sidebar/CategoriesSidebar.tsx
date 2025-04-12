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
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";

type RangeValue = {
  minValue: number | string; // Allow string to handle empty input
  maxValue: number | string; // Allow string to handle empty input
};

const CategoriesSidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.header);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          {Categories.map((category) => (
            <React.Fragment key={category.id}>
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
            <Divider />
            </React.Fragment>
          ))}
        </List>

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
            <Box
              component="div"
              sx={(theme) => ({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              })}
            >
              <Box
                component="div"
                sx={(theme) => ({
                  width: "100%",
                })}
              >
                <Typography 
                  variant="body2"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                  })}
                >
                  Min Price
                </Typography>
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
                sx={(theme) => ({
                  width: "100%",
                })}
              >
                <Typography 
                  variant="body2"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                  })}
                >
                  Max Price 
                </Typography>
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
              sx={(theme) => ({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              })}
            >
              <Box
                component="div"
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                })}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  value={rangeValue.minValue}
                  onChange={(e) => handleTextFieldChange(e, "minValue")}
                  sx={(theme) => ({
                    width: "100%",
                    color: theme.palette.text.secondary,
                    "& .MuiInputBase-input": {
                      color: theme.palette.text.secondary
                    }
                  })}
                />
              </Box>
              <Typography 
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                })}
              >
                to
              </Typography>
              <Box
                component="div"
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                })}
              >
                <TextField
                  variant="outlined" 
                  size="small"
                  value={rangeValue.maxValue}
                  onChange={(e) => handleTextFieldChange(e, "maxValue")}
                  sx={(theme) => ({
                    width: "100%",
                    color: theme.palette.text.secondary,
                    "& .MuiInputBase-input": {
                      color: theme.palette.text.secondary
                    }
                  })}
                />
                {/* <TextField
                  variant="outlined"
                  size="small"
                  value={rangeValue.maxValue}
                  onChange={(e) => handleTextFieldChange(e, "maxValue")}
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,

                  })}
                /> */}
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
          <Box 
            component="div"
            mt={2}
          >
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
            display: 'flex',
            flexDirection: 'column',
            gap: 1
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
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Typography 
              variant="body2"
              sx={{
                fontStyle: 'italic',
                '&:hover': {
                  cursor: 'pointer'
                }
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
