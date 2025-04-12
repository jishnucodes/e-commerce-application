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
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MobileDrawableFilterComponent from "../mobile-filtering/MobileDrawableFilterComponent";
import AnimatedCardComponent from "./AnimatedCardComponent";
import MobileProductDisplayComponent from "./MobileProductDisplayComponent";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ProductImageZoom from "@/components/product-image-zoom/ProductImageZoom";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const products = [
  {
    name: "Plant Stand",
    categorySlug: "plant-stand",
    slug: "plant-stand",
    price: "₹3,013",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Free delivery",
  },
  {
    name: "Metal Shelf",
    categorySlug: "metal-shelf",
    slug: "metal-shelf",
    price: "₹2,697",
    oldPrice: "₹3,499",
    image: "/backpacks.jpg",
    tag: "Buy 2, save more",
  },
  {
    name: "Potted Stand",
    categorySlug: "potted-stand",
    slug: "potted-stand",
    price: "₹1,159",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Hot Deal",
  },
  {
    name: "Potted Stand",
    categorySlug: "potted-stand",
    slug: "potted-stand",
    price: "₹1,159",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Hot Deal",
  },
  {
    name: "Plant Stand",
    categorySlug: "plant-stand",
    slug: "plant-stand",
    price: "₹3,013",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Free delivery",
  },
  {
    name: "Metal Shelf",
    categorySlug: "metal-shelf",
    slug: "metal-shelf",
    price: "₹2,697",
    oldPrice: "₹3,499",
    image: "/backpacks.jpg",
    tag: "Buy 2, save more",
  },
  {
    name: "Potted Stand",
    categorySlug: "potted-stand",
    slug: "potted-stand",
    price: "₹1,159",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Hot Deal",
  },
  {
    name: "Potted Stand",
    categorySlug: "potted-stand",
    slug: "potted-stand",
    price: "₹1,159",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Hot Deal",
  }
  
];

const ProductDisplaySection = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(menuItemValues[3]);
  const [isRatedProduct, setIsRatedProduct] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const router = useRouter();

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

  const handleProductClick = (item: any) => {
    console.log("clicked product", item);
    router.push(`/product/${item.categorySlug}/${item.slug}`);
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
          sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            "&:hover": {
              cursor: "pointer",
            },
            color: theme.palette.text.secondary,
          })}
          onClick={handleDrawerOpen}
        >
          <span>
            <FilterAltOutlinedIcon />
          </span>
          <Typography variant="body1">Filters</Typography>
        </Box>
        <Box
          component="div"
          sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            gap: 1,
            fontFamily:"CaviarDreams_Bold",
            color: theme.palette.text.secondary,

          })}
        >
          <Box component="div">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                textTransform: "capitalize",
              })}
            >
              {selectedValue}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[0])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
                Alphabetic
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[1])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}>
                Price: Low to high
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[2])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
                Price: High to low
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[3])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}>
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
              sx={(theme) => ({
                display: "flex", // Use flexbox for inline layout
                alignItems: "center", // Align items vertically centered
                gap: 1, // Add spacing between items
                color: theme.palette.text.secondary,
              })}
            >
              <Typography variant="body1">Show:</Typography>
              <TextField
                variant="outlined"
                size="small" // Smaller input field for better spacing
                sx={(theme) => ({
                  width: "100px",
                  color: theme.palette.text.secondary,
                })}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* product-card displaying */}
      
          <Box 
          component="div" 
          sx={(theme) => ({
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            mt: 2,
            color: theme.palette.text.secondary,
          })}
        >
          <Grid container spacing={3} sx={{ p: 2 }}>
        {products.map((item, index) => (
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={index}>
            <Card 
              onClick={() => handleProductClick(item)}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }
              }}
            >
              <Box 
                sx={{ 
                  position: 'relative', 
                  paddingTop: '100%', 
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    {item.price}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'text.secondary',
                      ml: 1,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    {item.oldPrice}
                  </Typography>
                </Box>
                <Chip 
                  label={item.tag} 
                  size="small" 
                  color="success" 
                  sx={{ 
                    borderRadius: 1,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                  }} 
                />
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
        </Box>
        
    </Box>
  );
};

export default ProductDisplaySection;
