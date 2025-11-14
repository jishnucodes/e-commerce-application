import ClientTokenRouting from "@/components/client-routing/clientRouting";
import OrderPage from "@/components/order/OrderPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Order() {
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
      <OrderPage />
    </ClientTokenRouting>
  );
}
