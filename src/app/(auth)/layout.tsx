import StoreProvider from "@/lib/storeProvider/StoreProvider";
import { Box } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('Rendering AUTH layout');
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <StoreProvider>
          {/* No header/footer here */}
          <Box sx={{ 
            width:"100%",
            overflow:"hidden"
          }}>
            {children}
          </Box>
        </StoreProvider>
      </body>
    </html>
  );
}