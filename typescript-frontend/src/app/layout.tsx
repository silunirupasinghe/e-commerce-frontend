// app/layout.tsx
import React from "react";
import Footer from "@/components/Footer"; // Adjust path if needed
import Navbar from "@/components/NavBar"; // Adjust path if needed
import Chatbot from "@/components/Chatbot"; // Adjust path if needed
import { ToastContainer } from "react-toastify"; // Ensure this is installed
import "react-toastify/dist/ReactToastify.css"; // Ensure this CSS is imported
import Banner from "@/components/Banner"; // Import the new Banner component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, padding:0}}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <ToastContainer />
      </body>
    </html>
  );
}