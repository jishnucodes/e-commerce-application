"use client";

import React, { useEffect, useState } from "react";
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



type RangeValue = {
  minValue: number | string; // Allow string to handle empty input
  maxValue: number | string; // Allow string to handle empty input
};

type ProductDisplaySectionProps = {
  products: any;
  rangeValue: RangeValue;
  slug: string;
};

const ProductDisplaySection = ({
  products,
  rangeValue,
  slug,
}: ProductDisplaySectionProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(menuItemValues[3]);
  const [isRatedProduct, setIsRatedProduct] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [productList, setProductList] = useState<any>([]);
  const router = useRouter();

  const rating = 3.5;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (products && products.data.length > 0) {
      let transformedProducts = products?.data?.map((p: any) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.imageUrl || "/placeholder.png", // main image
        price: p.variants?.[0]?.price || p.basePrice || "N/A",
        oldPrice: p.variants?.[0]?.comparePrice || "",
        tag: p.status === "ACTIVE" ? "In Stock" : "Out of Stock", // optional tag
        slug: p.slug
      }));

      // Filter products based on rangeValue if user changes it from initial setup
      // Only filter if both minValue and maxValue are valid numbers
      if (
        rangeValue &&
        rangeValue.minValue !== "" &&
        rangeValue.maxValue !== "" &&
        !isNaN(Number(rangeValue.minValue)) &&
        !isNaN(Number(rangeValue.maxValue))
      ) {
        const min = Number(rangeValue.minValue);
        const max = Number(rangeValue.maxValue);
        // Ignore filtering if these are initial (e.g., min=0, max=Infinity, or other app initial states)
        if (min !== 0 || max !== 0) {
          transformedProducts = transformedProducts.filter((product: any) => {
            const price =
              typeof product.price === "string"
                ? Number(product.price)
                : product.price;
            return price >= min && price <= max;
          });
        }
      }

      console.log("transformedProducts", transformedProducts);

      setProductList(transformedProducts);
    } else {
      setProductList([]);
    }
  }, [products, rangeValue]);

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
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
    router.push(`/product/${slug}/${item.slug}`);
  };

  return (
    <Box component="div">
      <MobileDrawableFilterComponent
        open={drawerOpen}
        handleCloseDrawer={handleDrawerClose}
      />
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
            fontFamily: "CaviarDreams_Bold",
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
              <MenuItem
                onClick={() => handleMenuItemClick(menuItemValues[0])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
                Alphabetic
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(menuItemValues[1])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
                Price: Low to high
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(menuItemValues[2])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
                Price: High to low
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(menuItemValues[3])}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                })}
              >
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
          overflow: "hidden",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          mt: 2,
          color: theme.palette.text.secondary,
        })}
      >
        <Grid 
          container 
          spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} 
          sx={{ 
            p: { xs: 1, sm: 1.5, md: 2 },
            width: "100%",
          }}
        >
          {productList &&
            productList.map((item: any, index: number) => (
              <Grid 
                size={{ 
                  xs: 6,      // 2 columns on mobile
                  sm: 6,      // 2 columns on small tablets
                  md: 4,      // 3 columns on tablets
                  lg: 3,      // 4 columns on desktop
                  xl: 2.4     // 5 columns on extra large screens
                }} 
                key={index}
              >
                <Card
                  onClick={() => handleProductClick(item)}
                  sx={(theme) => ({
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: { xs: 1.5, sm: 2 },
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.08)'}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)"
                      : "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
                    transition:
                      "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.palette.mode === 'dark'
                        ? "0 12px 24px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3)"
                        : "0 12px 24px rgba(0, 0, 0, 0.12), 0 6px 12px rgba(0, 0, 0, 0.08)",
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.15)',
                    },
                  })}
                >
                  {/* Product Image */}
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      paddingTop: { xs: "100%", sm: "100%", md: "100%" },
                      width: "100%",
                      overflow: "hidden",
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                    })}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 600px) 50vw, (max-width: 960px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.08)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Box>

                  {/* Product Info */}
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      p: { xs: 1.5, sm: 2 },
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 0.75, sm: 1 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={(theme) => ({
                        fontWeight: 600,
                        fontSize: { 
                          xs: "0.875rem",    // 14px on mobile
                          sm: "0.9375rem",   // 15px on small tablets
                          md: "1rem",        // 16px on tablets
                          lg: "1.0625rem"    // 17px on desktop
                        },
                        lineHeight: 1.4,
                        color: theme.palette.text.primary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: { xs: "2.8em", sm: "3em" },
                      })}
                    >
                      {item.name}
                    </Typography>

                    {/* Price Section */}
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={(theme) => ({
                          fontWeight: 700,
                          fontSize: { 
                            xs: "1rem",      // 16px on mobile
                            sm: "1.125rem",  // 18px on small tablets
                            md: "1.25rem"    // 20px on tablets+
                          },
                          color: theme.palette.primary.main,
                        })}
                      >
                        ₹{item.price}
                      </Typography>
                      {item.oldPrice && (
                        <Typography
                          variant="body2"
                          sx={(theme) => ({
                            textDecoration: "line-through",
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.5)'
                              : 'rgba(0, 0, 0, 0.5)',
                            fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                          })}
                        >
                          ₹{item.oldPrice}
                        </Typography>
                      )}
                    </Box>

                    {/* Status Tag */}
                    <Chip
                      label={item.tag}
                      size="small"
                      color={item.tag === "In Stock" ? "success" : "default"}
                      sx={(theme) => ({
                        borderRadius: 1,
                        fontWeight: 500,
                        fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                        height: { xs: 20, sm: 24 },
                        backgroundColor: item.tag === "In Stock"
                          ? theme.palette.mode === 'dark'
                            ? 'rgba(76, 175, 80, 0.2)'
                            : 'rgba(76, 175, 80, 0.1)'
                          : theme.palette.mode === 'dark'
                            ? 'rgba(158, 158, 158, 0.2)'
                            : 'rgba(158, 158, 158, 0.1)',
                        color: item.tag === "In Stock"
                          ? theme.palette.success.main
                          : theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : 'rgba(0, 0, 0, 0.6)',
                        alignSelf: "flex-start",
                      })}
                    />
                  </CardContent>

                  {/* Add to Cart Button */}
                  <CardActions 
                    sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      pt: 0,
                      pb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={(theme) => ({
                        textTransform: "none",
                        borderRadius: 1.5,
                        fontWeight: 600,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.9375rem" },
                        py: { xs: 0.75, sm: 1 },
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.mode === 'dark' ? '#fff' : '#F3F3FF',
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                          transform: "translateY(-1px)",
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      })}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
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
