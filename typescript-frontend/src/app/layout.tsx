// app/layout.tsx
import React from "react";
import Footer from "@/components/Footer"; // Adjust path if needed
import Navbar from "@/components/NavBar"; // Adjust path if needed
import Chatbot from "@/components/Chatbot"; // Adjust path if needed
import { ToastContainer } from "react-toastify"; // Ensure this is installed
import "react-toastify/dist/ReactToastify.css"; // Ensure this CSS is imported

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <ToastContainer />
      </body>
    </html>
  );
}