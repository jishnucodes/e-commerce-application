
import ClientTokenRouting from "@/components/client-routing/clientRouting";
import WishlistPage from "@/components/wishlist/wishlistPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WishList() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("refreshToken")?.value;

  // Redirect to login immediately on server-side if no token exists
  // This prevents the page from loading at all if user is not authenticated
  if (!token) {
    redirect("/login");
  }

  return (
    <ClientTokenRouting token={token}>
      <WishlistPage />
    </ClientTokenRouting>
  );
}
