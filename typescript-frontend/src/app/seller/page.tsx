'use client';
import React from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";

import colors from "@/theme/color";
import { Poppins, Inter } from "next/font/google";
import { useRouter } from "next/navigation";
// Load Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

// ✅ Add component type
const Page = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/seller/register"); // Redirect after success
  };
  
  return (
    <Grid container height="120vh" bgcolor={colors.background} sx={{ my: 2 }}>
      {/* Left Pane */}
      <Grid
        size={{ xs: 12, md: 6 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="/seller/login/login.jpg"
          alt="Shopping"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>

      <Grid size={{ sm: 0, md: 1 }}></Grid>

      {/* Right Pane */}
      <Grid
        size={{ xs: 12, md: 5 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor={colors.background}
        paddingRight={{ md: 12, xs: 2 }}
        paddingBottom={{ md: 10, xs: 2 }}
      >
        <Typography
          variant="h4"
          fontWeight={530}
          fontSize={{ xs: "1.5rem", md: "2.5rem" }}
          color={colors.textPrimary}
          className={inter.className}
          gutterBottom
        >
          Start Selling to Millions of Buyers on Ecart
        </Typography>

        <Typography
          variant="body1"
          color={colors.textPrimary}
          className={inter.className}
          mb={2}
        >
          Join ECART to reach new customers today.
        </Typography>

        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: colors.primary,
              padding: "12px 30px",
              borderRadius: "3px",
              fontWeight: "bold",
              textTransform: "none",
              color: colors.black,
              boxShadow: "none",
            }}
          >
            Create Account
          </Button>
        </Grid>
        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "left" }}
          className={poppins.className}
        >
          Already have an account?{" "}
          <Link
            href="/seller/login"
            underline="hover"
            sx={{ color: colors.primary, fontWeight: 800 }}
          >
            Login
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Page;
