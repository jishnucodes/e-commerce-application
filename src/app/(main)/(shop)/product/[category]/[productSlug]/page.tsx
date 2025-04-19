"use client";
import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState("green");
  const [appleCare, setAppleCare] = useState("without");
  const [activeTab, setActiveTab] = useState("description");

  const theme = useTheme();

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
                    src="/backpacks.jpg"
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
                <Typography variant="h6" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange("add")}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box>
                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Add to cart
                </Button>
              </Box>
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
                <Typography variant="body1" fontWeight={500} sx={{ mt: 2 }}>
                  Sku:
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 2 }}>
                  Categories:
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 2 }}>
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
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </TabPanel>
        <TabPanel value={activeTab} index="specifications">
          <Typography variant="body1" component="div" sx={{ mt: 2 }}>
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
