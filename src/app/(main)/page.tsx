import Home from "@/components/home/Home";



async function fetchProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/product/list`, {
      cache: "no-store",
      next: { revalidate: 3600 }, // Revalidate every hour
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

async function fetchBrands() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/brand/list`, {
      cache: "no-store",
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    const brands = await res.json();
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null;
  }
}

export default async function HomePage() {
  const [products, brands] = await Promise.all([fetchProducts(), fetchBrands()]);
  console.log("brands", brands)

  console.log("product list: ", products)
  return (
    <Home products={products} brands={brands} />
  )
}