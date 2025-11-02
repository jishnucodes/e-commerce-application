"use client";

import React, { useState, useEffect } from "react";
import ProductDisplaySection from "@/components/shop-page/product-display-section/ProductDisplaySection";
import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import CategoriesSidebar from "@/components/shop-page/categories-sidebar/CategoriesSidebar";
import CategoryPageSkeleton from "@/app/(main)/(shop)/product/[category]/loading";
import Loading from "@/components/loading/Loading";
import { useApiCalls } from "@/hooks/useApiCalls";
import { useParams } from "next/navigation";

type RangeValue = {
  minValue: number | string; // Allow string to handle empty input
  maxValue: number | string; // Allow string to handle empty input
};
const ProductList = () => {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    get: getCategories,
  } = useApiCalls();
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    get: getProducts,
  } = useApiCalls();

  const params = useParams();
  console.log("params", params);
  const slug = params.category as string;
  // const [loading, setLoading] = useState(true);
  console.log("products", products)
  // Calculate minValue and maxValue from products if available

  // Helper to extract min/max price from product data
  const getMinMaxPriceFromProducts = (productsData: any) => {
    if (!productsData?.data || !Array.isArray(productsData.data) || productsData.data.length === 0) {
      // Fallback if no products
      return { min: 0, max: 7000 };
    }
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    productsData.data.forEach((p: any) => {
      // Try to get variant price, fall back to basePrice
      let price = p.variants?.[0]?.price ?? p.basePrice;
      price = typeof price === "string" ? Number(price) : price;
      if (typeof price === "number" && !isNaN(price) && price > 0) {
        if (price < min) min = price;
        if (price > max) max = price;
      }
    });
    // If all products are missing price, return defaults
    if (min === Number.POSITIVE_INFINITY || max === Number.NEGATIVE_INFINITY) {
      return { min: 0, max: 7000 };
    }
    // Round min down and max up for better UX
    return { 
      min: Math.floor(min), 
      max: Math.ceil(max) 
    };
  };

  // Calculate max price from products for the slider
  const maxPrice = products?.data?.length > 0 
    ? Math.ceil(getMinMaxPriceFromProducts(products).max) || 7000
    : 7000;


  const [rangeValue, setRangeValue] = useState<RangeValue>({
      minValue: 0,
      maxValue: 0,
    });

    console.log("range value", rangeValue)

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    getCategories("/category/list");
  }, []);

  // Initialize rangeValue when products are loaded (only if rangeValue is at default)
  useEffect(() => {
    if (products?.data && products.data.length > 0) {
      const { min, max } = getMinMaxPriceFromProducts(products);
      // Only set initial values if rangeValue is at default (0, 0) or (0, "") 
      // This prevents resetting user's filter selections
      setRangeValue((prev) => {
        const isDefault = 
          (prev.minValue === 0 || prev.minValue === "") &&
          (prev.maxValue === 0 || prev.maxValue === "");
        
        if (isDefault && max > 0) {
          return {
            minValue: min,
            maxValue: max,
          };
        }
        return prev;
      });
    }
  }, [products]);

  useEffect(() => {
    getCategories("/category/list");
  }, []);

  useEffect(() => {
    if (slug) {
      getProducts(`/product/list-by-slug/${slug}`);
      // Reset rangeValue when category changes
      setRangeValue({
        minValue: 0,
        maxValue: 0,
      });
    }
  }, [slug]);

  if (categoriesLoading || productsLoading) {
    return (
      <>
        <Loading />
        <CategoryPageSkeleton />
      </>
    );
  }

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        width: "100%",
      }}
    >
      <Box
        component="aside"
        sx={{
          width: { xs: "100%", sm: "30%", md: "25%" },
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <CategoriesSidebar 
          categories={categories} 
          rangeValue={rangeValue} 
          setRangeValue={setRangeValue}
          maxPrice={maxPrice}
        />
      </Box>
      <Box
        component="div"
        sx={{ width: { xs: "100%", sm: "100%", md: "75%" } }}
      >
        <Card sx={{ width: "100%", height: "460px", paddin: "opx" }}>
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image={"/shopImg-1.png"}
              alt="green iguana"
              sx={{
                width: { xs: "100%", sm: "100%", md: "100%" },
                aspectRatio: { sx: "4/3", sm: "3/4", md: "3/4" },
                objectFit: "cover",
                padding: "10px",
                borderRadius: "18px",
              }}
            />
          </CardActionArea>
        </Card>
        <ProductDisplaySection products={products} rangeValue={rangeValue} slug={slug}/>
      </Box>
    </Box>
  );
};

export default ProductList;
