// app/layout.tsx or _app.tsx

import StoreProvider from "@/lib/storeProvider/StoreProvider";
import "./globals.css";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { Box, Container } from "@mui/material";
<<<<<<< HEAD
import BottomNavigationComponent from "@/components/bottom-navigation/BottomNavigation";
=======
import Footer from "@/components/footer/Footer";
>>>>>>>>> Temporary merge branch 2

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
 
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
          <Header />

          {/* Main Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: { xs: "70px", sm: "70px", md: "200px" },
              paddingLeft: "24px",
              paddingRight: "24px",
              gap: { xs: 2, lg: 1 }, // Space between sidebar and content
            }}
          >
            

            {/* Main Content: 75% Width */}
            <Box
              sx={{
                flexGrow: 1,
                width: { xs: "100%"},
                borderRadius: "12px",
                padding: 0, // No padding
              }}
            >
              {children}
            </Box>
            <Footer/>
          </Box>
          <BottomNavigationComponent />
        </StoreProvider>
      </body>
    </html>
  );
}
