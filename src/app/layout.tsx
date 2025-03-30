import './globals.css';
import { Inter } from 'next/font/google';
import StoreProvider from '@/lib/storeProvider/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StoreProvider>
          {/* This is intentionally empty - headers/footers go in (main) */}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}