import ProductDetails from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
    productSlug: string;
  }>;
}

async function fetchProduct(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/product/get-by-slug/${slug}`, {
      cache: "no-store", // Always fetch fresh data
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    });

    if (!res.ok) {
      return null;
    }

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function SingleProductPage({ params }: PageProps) {
  const { productSlug } = await params;
  
  // Fetch product data on the server
  const product = await fetchProduct(productSlug);

  if (!product || !product.data) {
    notFound();
  }

  // Pass product data as prop to ProductDetails component
  return <ProductDetails product={product} />;
}
