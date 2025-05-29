'use client';
import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import colors from "@/theme/color";
import { Poppins, Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// import model
import BuyerInterestModal from '@/components/Buyer/BuyerModel'

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

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   model
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Account created successfully!");
    setShowModal(true); // Show modal on success

    // try {
    //   const response = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name, email, password }),
    //   });

    //   if (response.ok) {
    //     toast.success("Account created successfully!");
    //   } else {
    //     const errorData = await response.json();
    //     toast.error(errorData.message || "Signup failed");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong. Please try again.");
    // }
  };

  return (
    <>
      <ToastContainer />
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

        <Grid size={{ xs: 12, md: 5 }} p={{ md: 6, xs: 4 }} display="flex" flexDirection="column" justifyContent="center">
          <Typography
            variant="h4"
            fontWeight={500}
            color={colors.textPrimary}
            className={inter.className}
            gutterBottom
          >
            Create an account
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
            placeholder="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2, input: { padding: "14px" } }}
          />

          <TextField
            placeholder="Email or Phone Number"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2, input: { padding: "14px" } }}
          />

          <TextField
            placeholder="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2, input: { padding: "14px" } }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            sx={{
              mt: 4,
              backgroundColor: colors.primary,
              padding: "12px 30px",
              borderRadius: "3px",
              fontWeight: "bold",
              textTransform: "none",
              color: colors.textPrimary,
            }}
          >
            Create Account
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
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
            Already have account?{' '}
            <Link href="/login" underline="hover" sx={{ color: colors.primary, fontWeight: 800 }}>
              Log in
            </Link>
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
            className={poppins.className}
          >
            <Link href="/become-seller" underline="hover" sx={{ color: colors.textPrimary }}>
              Become a seller
            </Link>
          </Typography>
        </Grid>
      </Grid>
      
      {showModal && (
        <BuyerInterestModal onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SignupPage;
