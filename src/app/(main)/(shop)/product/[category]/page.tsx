import CategoryPageContent from "@/components/product/CategoryPageContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

async function fetchCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/category/list`, {
      cache: "no-store",
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

async function fetchProductsBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/product/list-by-slug/${slug}`, {
      cache: "no-store",
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      return null;
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;

  // Fetch data in parallel on the server
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProductsBySlug(slug),
  ]);

  if (!categories || !categories.data) {
    return notFound();
  }

  // If no products, still show the page but with empty products
  const productsData = products || { status: true, message: "No products found", data: [] };

  return <CategoryPageContent categories={categories} products={productsData} slug={slug} />;
}
