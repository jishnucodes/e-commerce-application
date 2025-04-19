"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  TextField,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumbs,
  Link,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Button,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import ProductReviews from "@/components/reviews/ProductReviews";
import ClientOnly from "@/components/ClientOnly";
import ProductDetailsSkeleton from "./loading";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
const products = [
  {
    name: "Plant Stand",
    price: "₹3,013",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Free delivery",
  },
  {
    name: "Metal Shelf",
    price: "₹2,697",
    oldPrice: "₹3,499",
    image: "/backpacks.jpg",
    tag: "Buy 2, save more",
  },
  {
    name: "Potted Stand",
    price: "₹1,159",
    oldPrice: "₹4,999",
    image: "/backpacks.jpg",
    tag: "Hot Deal",
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  index: string;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3, color: "black" }}>{children}</Box>}
    </div>
  );
};

const SingleProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState("green");
  const [appleCare, setAppleCare] = useState("without");
  const [activeTab, setActiveTab] = useState("description");

  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
      <Loading />
      <ProductDetailsSkeleton />
      </>
    );
  }

  const handleQuantityChange = (type: "add" | "remove") => {
    setQuantity((prev) =>
      type === "add" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  return (
    <Box component="div">
      <Box component="div">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
      </Box>
      <Box component="div">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* 📌 Main Image Box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                bgcolor: "white",
              }}
            >
              <Image
                src="/backpacks.jpg"
                width={250}
                height={250}
                alt="Main Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>

            {/* 📌 Thumbnail Images */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              {[...Array(4)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    padding: "5px",
                    width: 80, // Adjust for responsive scaling
                    height: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { border: "2px solid #007bff" },
                  }}
                >
                  <Image
                    src="/headphones.jpg"
                    width={70}
                    height={70}
                    alt={`Thumbnail ${index + 1}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h5" fontWeight={600}>
              Apple Airpods Max Wireless Over-Ear Headphones, Active Noise
              Cancelling, Transparency Mode
            </Typography>

            {/* Star Ratings */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <ClientOnly>
                <Rating name="read-only" value={4} readOnly size="small" />
              </ClientOnly>
              <Typography 
                variant="body2" 
                sx={(theme) => ({
                  ml: 1,
                  color: theme.palette.text.secondary,
                })}
              >
                (1) reviews
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Apple Airpods Max wireless over-ear headphones, active noise
              canceling, transparency mode, personalized spatial audio, Dolby
              Atmos, Bluetooth for iPhone - pink
            </Typography>

            {/* Price */}
            <Typography
              variant="h4"
              fontWeight={600}
              color="primary"
              sx={{ mt: 2 }}
            >
              $388.99
            </Typography>

            {/* Quantity Selector */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange("remove")}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography 
                  variant="h6" 
                  sx={(theme) => ({
                    mx: 2,
                    color: theme.palette.text.secondary,
                  })}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange("add")}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>
            
            </Box>

            {/* Button display */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                // maxWidth: '500px',
                marginTop: '20px',
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem"
                  }}
                  onClick={() => {
                    console.log("Add to Cart clicked");
                    router.push("/cart");
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<FavoriteIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem"
                  }}
                  onClick={() => {
                    console.log("Add to Wishlist clicked");
                    router.push("/wishlist");
                  }}
                >
                  Add to Wishlist
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    bgcolor: "#10B981",//green
                    "&:hover": {
                      bgcolor: "#059669"
                    }
                  }}
                  onClick={() => {
                    console.log("Buy Now clicked");
                    router.push("/order");
                  }}
                >
                  Buy Now
                </Button>
              </Box>

            {/* Apple Care Options */}
            <Typography variant="body1" fontWeight={500} sx={{ mt: 2 }}>
              Options:
            </Typography>
            <ToggleButtonGroup
              value={appleCare}
              exclusive
              onChange={(_, value) => setAppleCare(value || appleCare)}
              sx={{ mt: 1 }}
            >
              <ToggleButton value="with" sx={{ textTransform: "none" }}>
                With Apple Care
              </ToggleButton>
              <ToggleButton value="without" sx={{ textTransform: "none" }}>
                Without Apple Care
              </ToggleButton>
            </ToggleButtonGroup>

            {/* categories, share, compare */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight={500} sx={(theme) => ({
                  mt: 2,
                  color: theme.palette.text.secondary,
                })}
                >
                  Sku:
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500} sx={(theme) => ({
                  mt: 2,
                  color: theme.palette.text.secondary,
                })}
                >
                  Categories:
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500} sx={(theme) => ({
                  mt: 2,
                  color: theme.palette.text.secondary,
                })}
                >
                  Share:
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box component="div">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="Description"
            value="description"
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Specifications"
            value="specifications"
            sx={{ textTransform: "none" }}
          />
        </Tabs>
        <TabPanel value={activeTab} index="description">
          <Typography variant="body1" sx={(theme) => ({
            mt: 2,
            color: theme.palette.text.secondary,
          })}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </TabPanel>
        <TabPanel value={activeTab} index="specifications">
          <Typography variant="body1" component="div" sx={(theme) => ({
            mt: 2,
            color: theme.palette.text.secondary,
          })}
          >
            <ul>
              <li>Display: 6.1-inch Super Retina XDR display</li>
              <li>Processor: A15 Bionic chip</li>
              <li>Camera: Dual 12MP camera system</li>
              <li>Battery: Up to 19 hours video playback</li>
              <li>Storage: 128GB, 256GB, 512GB</li>
            </ul>
          </Typography>
        </TabPanel>
      </Box>
      <Box component="div">
        <ProductReviews />
      </Box>
      <Box component="div">
        <FeaturedProducts />
      </Box>
    </Box>
  );
};

export default SingleProductDetails;
