'use client';

import React from 'react';
import Footer from '@/components/Footer'; // adjust path if needed
import Navbar from '@/components/Navbar'; // optional

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        
      </body>
    </html>
  );
}
