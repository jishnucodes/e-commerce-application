"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  IconButton,
  Button,
  Tab,
  Tabs,
  useTheme,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import ProductReviews from "@/components/reviews/ProductReviews";
import ClientOnly from "@/components/ClientOnly";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import { useApiCalls } from "@/hooks/useApiCalls";
import { checkAuthStatus } from "@/common/utils";

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

interface ProductDetailsProps {
  product: {
    status: boolean;
    message: string;
    data: {
      id: number;
      name: string;
      description: string;
      slug: string;
      status: string;
      basePrice: string;
      variants: any[];
      images: any[];
      [key: string]: any;
    };
  };
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const { post: checkAuth } = useApiCalls();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const theme = useTheme();

  console.log("all data", product);

  useEffect(() => {
    if (product?.data?.images?.length > 0) {
      const mainImage = product?.data?.images?.find((image: any) => {
        return image.isMain === true || image.isMainImage === true;
      });
      if (mainImage) {
        setMainImage(mainImage.imageUrl);
      } else {
        setMainImage(product?.data?.images[0]?.imageUrl);
      }
    }
  }, [product?.data?.images]);

  // Initialize variant selection when product loads
  useEffect(() => {
    if (product?.data?.variants && product.data.variants.length > 0) {
      const firstVariant = product.data.variants[0];
      const initialAttributes: Record<string, string> = {};

      // Set initial attributes from first variant (ALL attributes, not just varying ones)
      // Use normalized attribute names
      if (firstVariant.attributes && firstVariant.attributes.length > 0) {
        firstVariant.attributes.forEach((attr: any) => {
          initialAttributes[normalizeAttributeName(attr.name)] = attr.value;
        });
      }

      console.log("Initializing with attributes:", initialAttributes);
      setSelectedAttributes(initialAttributes);
      setSelectedVariant(firstVariant);
    }
  }, [product?.data?.variants]);

  // Update selected variant when attributes change
  useEffect(() => {
    if (
      product?.data?.variants &&
      product.data.variants.length > 0 &&
      Object.keys(selectedAttributes).length > 0
    ) {
      console.log("Searching for variant with attributes:", selectedAttributes);

      const matchingVariant = product.data.variants.find((variant: any) => {
        return doesVariantMatchAttributes(variant, selectedAttributes);
      });

      if (matchingVariant) {
        console.log("Found matching variant:", matchingVariant);
        console.log("Variant price:", matchingVariant.price);
        setSelectedVariant(matchingVariant);
        // Reset quantity to 1 when variant changes (in case new variant has less stock)
        setQuantity(1);
      } else {
        console.log(
          "No matching variant found for attributes:",
          selectedAttributes
        );
        console.log(
          "Available variants:",
          product.data.variants.map((v: any) => ({
            id: v.id,
            attributes: v.attributes,
            price: v.price,
          }))
        );
      }
    }
  }, [selectedAttributes, product?.data?.variants]);

  console.log("product data", product);

  const handleQuantityChange = (type: "add" | "remove") => {
    setQuantity((prev) => {
      if (type === "add") {
        const maxQuantity = selectedVariant?.inventory?.quantity || 999;
        return prev < maxQuantity ? prev + 1 : prev;
      } else {
        return prev > 1 ? prev - 1 : 1;
      }
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const handleSubImageClick = (image: string) => {
    setMainImage(image);
  };

  // Normalize attribute name (trim whitespace, case-insensitive comparison)
  const normalizeAttributeName = (name: string): string => {
    return name.trim();
  };

  // Get unique attribute values from all variants (including out of stock for visibility)
  const getUniqueAttributeValues = (attributeName: string) => {
    if (!product?.data?.variants.length) return [];
    const values = new Set<string>();
    const normalizedAttrName = normalizeAttributeName(attributeName);

    product.data.variants.forEach((variant: any) => {
      const attr = variant.attributes?.find(
        (a: any) => normalizeAttributeName(a.name) === normalizedAttrName
      );
      if (attr) {
        values.add(attr.value);
      }
    });
    return Array.from(values);
  };

  // Get attribute names that have different values across variants (only show varying attributes)
  // Uses normalized attribute names
  const getAttributeNames = () => {
    if (!product?.data?.variants || product.data.variants.length === 0)
      return [];
    const attributeValueMap = new Map<string, Set<string>>();

    // Collect all unique values for each attribute (using normalized names)
    product.data.variants.forEach((variant: any) => {
      variant.attributes?.forEach((attr: any) => {
        const normalizedName = normalizeAttributeName(attr.name);
        if (!attributeValueMap.has(normalizedName)) {
          attributeValueMap.set(normalizedName, new Set<string>());
        }
        attributeValueMap.get(normalizedName)?.add(attr.value);
      });
    });

    // Only return attributes that have more than one unique value (varying attributes)
    const varyingAttributes: string[] = [];
    attributeValueMap.forEach((values, attributeName) => {
      if (values.size > 1) {
        varyingAttributes.push(attributeName);
      }
    });

    return varyingAttributes;
  };

  // Helper function to check if a variant matches given attributes
  // Uses normalized attribute names for comparison
  const doesVariantMatchAttributes = (
    variant: any,
    attributes: Record<string, string>
  ) => {
    if (!variant.attributes || variant.attributes.length === 0) return false;
    if (Object.keys(attributes).length === 0) return false;

    // Normalize all attribute names for comparison
    const normalizedAttributes: Record<string, string> = {};
    Object.keys(attributes).forEach((key) => {
      normalizedAttributes[normalizeAttributeName(key)] = attributes[key];
    });

    // Check that every attribute in the variant has a matching value in provided attributes
    const allVariantAttrsMatch = variant.attributes.every((attr: any) => {
      const normalizedAttrName = normalizeAttributeName(attr.name);
      return normalizedAttributes[normalizedAttrName] === attr.value;
    });

    // Check that all provided attributes are present in the variant with matching values
    const allProvidedAttrsMatch = Object.keys(normalizedAttributes).every(
      (key) => {
        const variantAttr = variant.attributes.find(
          (attr: any) => normalizeAttributeName(attr.name) === key
        );
        return (
          variantAttr !== undefined &&
          variantAttr.value === normalizedAttributes[key]
        );
      }
    );

    // Also check that we have the same number of attributes (exact match)
    const sameAttributeCount =
      variant.attributes.length === Object.keys(normalizedAttributes).length;

    return allVariantAttrsMatch && allProvidedAttrsMatch && sameAttributeCount;
  };

  // Check if a variant exists and is in stock for given attributes
  const isVariantAvailable = (
    attributeName: string,
    attributeValue: string
  ) => {
    if (!product?.data?.variants || product.data.variants.length === 0)
      return false;

    const normalizedAttrName = normalizeAttributeName(attributeName);
    const testAttributes = {
      ...selectedAttributes,
      [normalizedAttrName]: attributeValue,
    };

    const matchingVariant = product.data.variants.find((variant: any) => {
      return doesVariantMatchAttributes(variant, testAttributes);
    });

    return matchingVariant && matchingVariant.inventory?.quantity > 0;
  };

  // Check if there's ANY variant with this attribute value (for smart selection)
  const hasVariantWithAttributeValue = (
    attributeName: string,
    attributeValue: string
  ) => {
    if (!product?.data?.variants || product.data.variants.length === 0)
      return false;

    const normalizedAttrName = normalizeAttributeName(attributeName);

    return product.data.variants.some((variant: any) => {
      if (!variant.attributes || variant.attributes.length === 0) return false;
      const attr = variant.attributes.find(
        (a: any) => normalizeAttributeName(a.name) === normalizedAttrName
      );
      return attr && attr.value === attributeValue;
    });
  };

  // Check if variant combination exists (regardless of stock)
  const isVariantExists = (attributeName: string, attributeValue: string) => {
    if (!product?.data?.variants || product.data.variants.length === 0)
      return false;

    const normalizedAttrName = normalizeAttributeName(attributeName);
    // Create test attributes with the new value (using normalized name)
    const testAttributes = {
      ...selectedAttributes,
      [normalizedAttrName]: attributeValue,
    };

    // Check if there's a variant that matches all test attributes
    return product.data.variants.some((variant: any) => {
      return doesVariantMatchAttributes(variant, testAttributes);
    });
  };

  // Handle attribute selection with smart auto-selection of other attributes
  const handleAttributeSelect = (
    attributeName: string,
    attributeValue: string
  ) => {
    console.log(`Selecting ${attributeName}: ${attributeValue}`);
    console.log("Current selectedAttributes before:", selectedAttributes);

    if (!product?.data?.variants || product.data.variants.length === 0) return;

    const normalizedAttrName = normalizeAttributeName(attributeName);

    // First, try to find a variant that matches current selection with new attribute
    // Use normalized name for the test attributes
    const testAttributes = {
      ...selectedAttributes,
      [normalizedAttrName]: attributeValue,
    };
    let matchingVariant = product.data.variants.find((variant: any) => {
      return doesVariantMatchAttributes(variant, testAttributes);
    });

    // If no exact match, find ANY variant with this attribute value and use its other attributes
    if (!matchingVariant) {
      console.log(
        "No exact match found, looking for any variant with this attribute value..."
      );
      matchingVariant = product.data.variants.find((variant: any) => {
        if (!variant.attributes || variant.attributes.length === 0)
          return false;
        const attr = variant.attributes.find(
          (a: any) => normalizeAttributeName(a.name) === normalizedAttrName
        );
        return attr && attr.value === attributeValue;
      });

      if (matchingVariant) {
        console.log(
          "Found compatible variant, auto-selecting all attributes:",
          matchingVariant
        );
        // Build attributes from the found variant
        const autoSelectedAttributes: Record<string, string> = {};
        matchingVariant.attributes.forEach((attr: any) => {
          autoSelectedAttributes[normalizeAttributeName(attr.name)] =
            attr.value;
        });
        console.log("Auto-selected attributes:", autoSelectedAttributes);
        setSelectedAttributes(autoSelectedAttributes);
        // Immediately set the variant so price updates right away
        setSelectedVariant(matchingVariant);
        setQuantity(1);
        return;
      }
    }

    // If we found a matching variant with exact match, update attributes
    if (matchingVariant) {
      console.log("Exact match found:", matchingVariant);
      setSelectedAttributes((prev) => {
        const updated = {
          ...prev,
          [normalizedAttrName]: attributeValue,
        };
        console.log("Updated selectedAttributes:", updated);
        return updated;
      });
      // Immediately set the variant so price updates right away
      setSelectedVariant(matchingVariant);
      setQuantity(1);
    } else {
      console.log("No variant found for this selection");
    }
  };

  // Format price for display
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const handleAddToWishlist = async () => {
    // Since cookies are HttpOnly, we can't read them client-side
    // Check auth status by making an API call (cookies sent automatically)
    const isAuthenticated = await checkAuthStatus(() =>
      checkAuth("/user/refreshToken", {})
    );

    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      router.push("/login");
    } else {
      router.push("/wishlist");
    }
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
            {product?.data?.images?.length > 0 && mainImage ? (
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
                  src={mainImage}
                  width={250}
                  height={250}
                  alt="Main Image"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            ) : (
              <Box>
                <Typography>No image found</Typography>
              </Box>
            )}

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
              {product?.data?.images?.map((image: any, index: number) => (
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
                  onClick={() => handleSubImageClick(image.imageUrl)}
                >
                  <Image
                    src={image.imageUrl}
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
              {product?.data?.name}
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
              {product?.data?.description}
            </Typography>

            {/* Variant Selection */}
            {getAttributeNames().map((attrName) => {
              const normalizedAttrName = normalizeAttributeName(attrName);
              return (
                <Box key={attrName} sx={{ mt: 3 }}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ mb: 1, textTransform: "capitalize" }}
                  >
                    {attrName}:
                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    >
                      {selectedAttributes[normalizedAttrName]}
                    </Typography>
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {getUniqueAttributeValues(attrName).map((value) => {
                      const normalizedAttrName =
                        normalizeAttributeName(attrName);
                      const isSelected =
                        selectedAttributes[normalizedAttrName] === value;
                      const hasVariant = hasVariantWithAttributeValue(
                        attrName,
                        value
                      );

                      // Find the variant with this attribute value to check stock
                      let variantWithThisValue: any = null;
                      if (hasVariant) {
                        variantWithThisValue = product.data.variants.find(
                          (variant: any) => {
                            if (
                              !variant.attributes ||
                              variant.attributes.length === 0
                            )
                              return false;
                            const attr = variant.attributes.find(
                              (a: any) =>
                                normalizeAttributeName(a.name) ===
                                normalizedAttrName
                            );
                            return attr && attr.value === value;
                          }
                        );
                      }

                      const isInStock =
                        variantWithThisValue &&
                        variantWithThisValue.inventory?.quantity > 0;
                      // Allow clicking if there's any variant with this value (even if out of stock, smart selection will handle it)
                      const isDisabled = !hasVariant;

                      return (
                        <Chip
                          key={value}
                          label={value}
                          onClick={() => {
                            if (!isDisabled) {
                              console.log(
                                `Chip clicked: ${attrName} = ${value}`
                              );
                              handleAttributeSelect(attrName, value);
                            } else {
                              console.log(
                                `Chip disabled: ${attrName} = ${value}, hasVariant: ${hasVariant}`
                              );
                            }
                          }}
                          variant={isSelected ? "filled" : "outlined"}
                          color={isSelected ? "primary" : "default"}
                          sx={{
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            opacity: isDisabled ? 0.3 : isInStock ? 1 : 0.6,
                            "&:hover": {
                              opacity: isDisabled ? 0.3 : 0.8,
                            },
                            textTransform: "capitalize",
                          }}
                          disabled={isDisabled}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              );
            })}

            {/* Stock Availability */}
            {selectedVariant && (
              <Box sx={{ mt: 2 }}>
                {selectedVariant.inventory?.quantity > 0 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      fontWeight: 500,
                    }}
                  >
                    In Stock ({selectedVariant.inventory.quantity} available)
                  </Typography>
                ) : (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Out of Stock
                  </Alert>
                )}
              </Box>
            )}

            {/* Price */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {selectedVariant ? (
                <>
                  <Typography variant="h4" fontWeight={600} color="primary">
                    {formatPrice(selectedVariant.price)}
                  </Typography>
                  {selectedVariant.comparePrice &&
                    parseFloat(selectedVariant.comparePrice) >
                      parseFloat(selectedVariant.price) && (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          {formatPrice(selectedVariant.comparePrice)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "success.main",
                            fontWeight: 600,
                          }}
                        >
                          {Math.round(
                            ((parseFloat(selectedVariant.comparePrice) -
                              parseFloat(selectedVariant.price)) /
                              parseFloat(selectedVariant.comparePrice)) *
                              100
                          )}
                          % OFF
                        </Typography>
                      </>
                    )}
                </>
              ) : (
                <Typography variant="h4" fontWeight={600} color="primary">
                  {formatPrice(product?.data?.basePrice || 0)}
                </Typography>
              )}
            </Box>

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
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    mx: 2,
                    color: theme.palette.text.secondary,
                    minWidth: "30px",
                    textAlign: "center",
                  })}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange("add")}
                  size="small"
                  disabled={
                    !selectedVariant ||
                    quantity >= (selectedVariant.inventory?.quantity || 0)
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {selectedVariant && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  Max: {selectedVariant.inventory?.quantity || 0}
                </Typography>
              )}
            </Box>

            {/* Button display */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                // maxWidth: '500px',
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                disabled={
                  !selectedVariant || selectedVariant.inventory?.quantity === 0
                }
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
                onClick={async () => {
                  console.log("Add to Cart clicked", selectedVariant);
                  // Since cookies are HttpOnly, we can't read them client-side
                  // Check auth status by making an API call (cookies sent automatically)
                  const isAuthenticated = await checkAuthStatus(() =>
                    checkAuth("/user/refreshToken", {})
                  );

                  if (!isAuthenticated) {
                    // Not authenticated, redirect to login
                    router.push("/login");
                  } else {
                    // Authenticated - navigate to cart
                    // TODO: Add to cart logic with selectedVariant
                    router.push("/cart");
                  }
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
                  fontSize: "1rem",
                }}
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </Button>

              <Button
                variant="contained"
                fullWidth
                disabled={
                  !selectedVariant || selectedVariant.inventory?.quantity === 0
                }
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  bgcolor: "#10B981", //green
                  "&:hover": {
                    bgcolor: "#059669",
                  },
                }}
                onClick={async () => {
                  console.log("Buy Now clicked", selectedVariant);
                  // Since cookies are HttpOnly, we can't read them client-side
                  // Check auth status by making an API call (cookies sent automatically)
                  const isAuthenticated = await checkAuthStatus(() =>
                    checkAuth("/user/refreshToken", {})
                  );

                  if (!isAuthenticated) {
                    // Not authenticated, redirect to login
                    router.push("/login");
                  } else {
                    // Authenticated - navigate to order
                    // TODO: Buy now logic with selectedVariant
                    router.push("/order");
                  }
                }}
              >
                Buy Now
              </Button>
            </Box>

            {/* Product Details */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-between",
                mt: 2,
                gap: 1,
              }}
            >
              {selectedVariant && (
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                    })}
                  >
                    SKU:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                      {selectedVariant.sku}
                    </Typography>
                  </Typography>
                </Box>
              )}
              {selectedVariant && selectedVariant.dimensions && (
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                    })}
                  >
                    Dimensions:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 400 }}
                    >
                      {selectedVariant.dimensions}
                    </Typography>
                  </Typography>
                </Box>
              )}
              {selectedVariant && selectedVariant.weight && (
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                    })}
                  >
                    Weight:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 400 }}
                    >
                      {selectedVariant.weight} g
                    </Typography>
                  </Typography>
                </Box>
              )}
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
          <Typography
            variant="body1"
            sx={(theme) => ({
              mt: 2,
              color: theme.palette.text.secondary,
            })}
          >
            {product?.data?.description}
          </Typography>
        </TabPanel>
        <TabPanel value={activeTab} index="specifications">
          <Typography
            variant="body1"
            component="div"
            sx={(theme) => ({
              mt: 2,
              color: theme.palette.text.secondary,
            })}
          >
            <ul>
              {selectedVariant?.attributes?.length > 0 ? (
                selectedVariant.attributes.map(
                  (attribute: any, idx: number) => (
                    <li key={`${attribute.name}-${idx}`}>{attribute.value}</li>
                  )
                )
              ) : (
                <li>No specifications found.</li>
              )}
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

export default ProductDetails;
