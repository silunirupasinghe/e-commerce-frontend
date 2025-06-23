'use client';
import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import colors from "@/theme/color";
import { Poppins, Inter } from "next/font/google";

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

const LoginPage = () => {
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // Simulate login success (replace with actual authentication logic)
    if (emailPhone && password) {
      // Store login details in localStorage
      localStorage.setItem("userDetails", JSON.stringify({ emailPhone, password }));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      console.log("Logged in successfully");
      // Redirect or update UI as needed (e.g., using router.push if integrated)
    } else {
      console.log("Please fill in all fields");
    }
  };

  return (
    <Grid container height="100vh" bgcolor={colors.background} sx={{ my: 10 }}>
      {/* Left Pane */}
      <Grid
        size={{ xs: 12, md: 6 }}
        bgcolor="#CBE4E8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="/login/image.png"
          alt="Shopping"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>

      <Grid size={{ sm: 0, md: 1 }}></Grid>

      {/* Right Pane */}
      <Grid
        size={{ xs: 12, md: 5 }}
        p={{ md: 6, xs: 4 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor={colors.background}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          color={colors.textPrimary}
          className={inter.className}
          gutterBottom
        >
          Log in to Exclusive
        </Typography>

        <Typography
          variant="body1"
          color={colors.textPrimary}
          className={inter.className}
          mb={2}
        >
          Enter your details below
        </Typography>

        <TextField
          placeholder="Email or Phone Number"
          fullWidth
          variant="standard"
          value={emailPhone}
          onChange={(e) => setEmailPhone(e.target.value)}
          sx={{
            mt: 2,
            input: { padding: "14px" },
          }}
        />

        <TextField
          placeholder="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mt: 2,
            input: { padding: "14px" },
          }}
        />

        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: colors.primary,
              padding: "12px 30px",
              borderRadius: "3px",
              fontWeight: "bold",
              textTransform: "none",
              color: colors.textPrimary,
            }}
          >
            Log In
          </Button>
          <Link
            href="#"
            underline="hover"
            className={inter.className}
            sx={{
              color: colors.primary,
              fontSize: "18px",
              fontWeight: "semibold",
            }}
          >
            Forget Password?
          </Link>
        </Grid>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 4,
            borderColor: colors.googleBorder,
            padding: "12px",
            borderRadius: "6px",
            textTransform: "none",
            color: colors.textPrimary,
          }}
        >
          <Google sx={{ mr: 2 }} />
          Sign up with Google
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center" }}
          className={poppins.className}
        >
          Don’t have account?{" "}
          <Link
            href="/signup"
            underline="hover"
            sx={{ color: colors.primary, fontWeight: 800 }}
          >
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;