import './globals.css';
import { Inter } from 'next/font/google';
import StoreProvider from '@/lib/storeProvider/StoreProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce App',
  description: 'Your e-commerce description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
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
          {/* This is intentionally empty - headers/footers go in (main) */}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}