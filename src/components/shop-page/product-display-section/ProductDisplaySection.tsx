"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MobileDrawableFilterComponent from "../mobile-filtering/MobileDrawableFilterComponent";
import AnimatedCardComponent from "./AnimatedCardComponent";
import MobileProductDisplayComponent from "./MobileProductDisplayComponent";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ProductImageZoom from "@/components/product-image-zoom/ProductImageZoom";

const menuItemValues = [
  "alphabetic",
  "price: low to high",
  "price: high to low",
  "latest",
];

const stars = [
  {
    id: 1,
    filledStar: "&#9733;",
  },
  {
    id: 2,
    emptyStar: " &#9734;",
  },
];

const ProductDisplaySection = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(menuItemValues[3]);
  const [isRatedProduct, setIsRatedProduct] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const rating = 3.5;

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event value", event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    console.log("clicked value", value);
    setSelectedValue(value);
    handleClose();
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  // ⭐ Function to render full and empty stars using UTF codes safely
  const renderStars = (rating: number, maxStars = 5) => {
    const fullStars = Math.min(Math.floor(rating), maxStars); // Only full stars
    const emptyStars = maxStars - fullStars;

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          dangerouslySetInnerHTML={{ __html: "&#9733;" }}
        />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          dangerouslySetInnerHTML={{ __html: "&#9734;" }}
        />
      );
    }

    return (
      <Box sx={{ display: "flex", color: "gold", fontSize: "22px" }}>
        {stars}
      </Box>
    );
  };

  return (
    <Box component="div">
      <MobileDrawableFilterComponent open={drawerOpen} handleCloseDrawer={handleDrawerClose} />
      {/* header-part */}
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleDrawerOpen}
        >
          <span>
            <FilterAltOutlinedIcon />
          </span>
          <Typography variant="body1">Filters</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            gap: 1,
          }}
        >
          <Box component="div">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
            >
              {selectedValue}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[0])}>
                Alphabetic
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[1])}>
                Price: Low to high
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[2])}>
                Price: High to low
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[3])}>
                Latest
              </MenuItem>
            </Menu>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex", // Use flexbox for inline layout
                alignItems: "center", // Align items vertically centered
                gap: 1, // Add spacing between items
              }}
            >
              <Typography variant="body1">Show:</Typography>
              <TextField
                variant="outlined"
                size="small" // Smaller input field for better spacing
                sx={{
                  width: "100px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* product-card displaying */}
      
          <Box 
          component="div" 
          sx={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%'
  
          }}
        >
          <Grid container spacing={2} >
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
            <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
            <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
            <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
            <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
            <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ width: "100%" }}>
                
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                
                <CardContent>
                  {renderStars(rating)}
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
                    6,000 species, ranging across all continents except
                    Antarctica. They are highly adaptable and found in various
                    environments.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                </CardActions>
              </Card>
              {/* <AnimatedCardComponent /> */}
            </Grid>
          </Grid>
        </Box>
        
    </Box>
  );
};

export default ProductDisplaySection;
