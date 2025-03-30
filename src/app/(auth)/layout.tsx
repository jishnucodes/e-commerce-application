import StoreProvider from "@/lib/storeProvider/StoreProvider";
// import "./globals.css";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en">
<body>
<StoreProvider>
          {/* No header/footer here */}
{children}
</StoreProvider>
</body>
</html>
  );
}