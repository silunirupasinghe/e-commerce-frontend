"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Divider,
  Checkbox,
  CardMedia,
} from "@mui/material";
import colors from "@/theme/color";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const StandaloneCheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [saveInfo, setSaveInfo] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount =
    discountApplied && couponCode === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = 0; // Free shipping as per design
  const total = subtotal - discount + shipping;

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscountApplied(true);
      alert("✅ Coupon applied successfully!");
    } else {
      setDiscountApplied(false);
      alert("Invalid coupon code");
    }
  };

  // Handle order placement
  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Simulate order placement
    alert("Order placed successfully!");
    // Clear cart after order placement
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 1, sm: 2, md: 4 },
        py: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Billing Details
      </Typography>

      <Grid container spacing={3}>
        {/* Billing Details Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="First Name" fullWidth variant="outlined" />
            <TextField label="Company Name" fullWidth variant="outlined" />
            <TextField label="Street Address" fullWidth variant="outlined" />
            <TextField
              label="Apartment, floor, etc. (optional)"
              fullWidth
              variant="outlined"
            />
            <TextField label="Town/City" fullWidth variant="outlined" />
            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              type="tel"
            />
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              type="email"
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Checkbox
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
              <Typography variant="body2">
                Save this information for faster checkout next time
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 3,
position: "sticky",
              top: { md: 100 },
              backgroundColor: colors.lightGray,
              zIndex: 1,
            }}
          >
            {/* Cart Items */}
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "contain",
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Typography variant="body2">
                  $ {(item.price * item.quantity).toLocaleString()}
                </Typography>
              </Box>
            ))}

            {/* Totals */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>$ {subtotal.toLocaleString()}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography fontWeight="bold">Total:</Typography>
              <Typography fontWeight="bold">$ {total.toLocaleString()}</Typography>
            </Box>

            {/* Payment Method */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 , mb:1}}>
                      <Typography>Cash on delivery</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography>Credit/Debit Card</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <CardMedia
                          component="img"
                          image="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                          sx={{ width: 30, height: 20 }}
                        />
                        <CardMedia
                          component="img"
                          image="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                          sx={{ width: 30, height: 20 }}
                        />
                        <CardMedia
                          component="img"
                          image="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
                          sx={{ width: 30, height: 20 }}
                        />
                      </Box>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {/* Coupon Code */}
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <TextField
                placeholder="Coupon Code"
                size="small"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                onClick={applyCoupon}
                variant="contained"
                sx={{
                  backgroundColor: "#FFD814",
                  color: "#000",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#FFC107" },
                }}
              >
                Apply Coupon
              </Button>
            </Box>

            {/* Place Order Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={placeOrder}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StandaloneCheckoutPage;