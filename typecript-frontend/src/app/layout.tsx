"use client";

import React from "react";
import Footer from "@/components/Footer"; // adjust path if needed
import Navbar from "@/components/NavBar"; // optional

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
