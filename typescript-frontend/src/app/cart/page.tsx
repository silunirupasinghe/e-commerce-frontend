"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Button,
  Divider,
  CardMedia,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import colors from "@/theme/color";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount =
    discountApplied && couponCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscountApplied(true);
      toast.success("Coupon applied successfully!");
    } else {
      setDiscountApplied(false);
      toast.error("Invalid coupon code");
    }
  };

  // Navigate to checkout page
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Proceeding to checkout...");
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
      <ToastContainer/>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "center" },
                justifyContent: "space-between",
                border: "1px solid #eee",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 0 } }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{
                    width: { xs: 70, sm: 90 },
                    height: { xs: 70, sm: 90 },
                    objectFit: "contain",
                    borderRadius: 1,
                    mr: 2,
                  }}
                />
                <Box>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography color={colors.primary}>
                    LKR {item.price.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: { xs: 2, sm: 0 },
                  gap: 1,
                }}
              >
                <Select
                  size="small"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  sx={{ width: 70 }}
                >
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, "0")}
                    </MenuItem>
                  ))}
                </Select>
                <Typography sx={{ fontWeight: 500 }}>
                  LKR {(item.price * item.quantity).toLocaleString()}
                </Typography>
                <IconButton onClick={() => removeItem(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Button variant="outlined" href="/products">
            Return To Shop
          </Button>
        </Grid>

        {/* Summary Box */}
        <Grid size={{ xs: 12, md: 4 }}>
         <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 3,
              position: { md: "sticky" },
              top: { md: 100 },
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Cart Total
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>LKR {subtotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Discounts:</Typography>
              <Typography color="error">
                - LKR {discount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">LKR {total.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Coupon Code"
                size="small"
                fullWidth
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                onClick={applyCoupon}
                variant="outlined"
                sx={{
                  mt: 1,
                  textTransform: "none",
                  color: colors.primary,
                  borderColor: colors.primary,
                }}
              >
                Apply Coupon
              </Button>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleProceedToCheckout} // Use the navigation handler
              sx={{
                backgroundColor: colors.primary,
                color: "#000",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Proceed to checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;