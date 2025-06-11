"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Rating,
  CardMedia,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colors from "@/theme/color";

interface WishlistItem {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
}

const recommendedItems = [
  {
    id: 1,
    name: "ASUS FHD Gaming Laptop",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 35,
    product: "Old",
    rating: 5,
    reviews: 65,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHHkc2a2MuLxP62OPs9oSCL0uiyWsDaGfnNw&s",
  },
  {
    id: 2,
    name: "IPS LCD Gaming Monitor",
    originalPrice: 1160,
    discountedPrice: 1160,
    discount: 0,
    product: "Old",
    rating: 5,
    reviews: 65,
    image:
      "https://i0.wp.com/www.redlinetech.lk/wp-content/uploads/2025/03/Gigabyte-GS25F2-25-200Hz-1ms-Gaming-Monitor.webp?fit=430%2C430&ssl=1",
  },
  {
    id: 3,
    name: "HAVIT HV-G92 Gamepad",
    originalPrice: 560,
    discountedPrice: 560,
    discount: 0,
    product: "NEW",
    rating: 5,
    reviews: 65,
    image:
      "https://www.ryans.com/storage/products/main/havit-hv-g92-vibration-game-11610439740.webp",
  },
  {
    id: 4,
    name: "AK-900 Wired Keyboard",
    originalPrice: 200,
    discountedPrice: 200,
    discount: 0,
    product: "Old",
    rating: 5,
    reviews: 65,
    image: "https://www.basictech.com.bd/storage/product-gallery/9628e1f2.jpg",
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const handleAddToCart = (item: WishlistItem) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.discountedPrice, image: item.image, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  toast.success(`${item.name} added to cart!`);
};


  const handleRemoveFromWishlist = (id: number, name: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.info(`${name} removed from wishlist`);
  };

  const handleMoveAllToBag = () => {
    setWishlistItems([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
    toast.success("All items moved to bag");
  };

  // Fallback image URL for when an image fails to load
  const fallbackImage = "https://via.placeholder.com/200?text=Image+Not+Found";

  return (
    <Box
      sx={{ paddingTop: "70px", backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <ToastContainer />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
            Wishlist ({wishlistItems.length})
          </Typography>
          <Button
            variant="outlined"
            onClick={handleMoveAllToBag}
            sx={{
              textTransform: "none",
              color: "black",
              borderColor: "black",
              padding: "14px",
              width: "200px",
              fontSize: "16px",
              marginBottom: "50px",
              marginTop: "10px",
            }}
          >
            Move All To Bag
          </Button>
        </Box>

        <Grid container spacing={4}>
          {wishlistItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
              <Box
                sx={{
                  textAlign: "center",
                  overflow: "hidden",
                  position: "relative",
                  width: "280px",
                }}
              >
                <Box sx={{  position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    height="200"
                    sx={{ objectFit: "contain", backgroundColor: colors.lightGray }}
                    onError={(e: any) => (e.target.src = fallbackImage)}
                  />
                </Box>

                {item.discount > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      backgroundColor: "#ffca28",
                      color: "#000",
                      padding: "6px 10px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    -{item.discount}%
                  </Box>
                )}

                <IconButton
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "black",
                    backgroundColor: colors.white,
                  }}
                  aria-label="delete"
                >
                  <DeleteOutlinedIcon />
                </IconButton>

                <Button
                  variant="contained"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={() => handleAddToCart(item)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#000",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": { backgroundColor: colors.primary, boxShadow: "none" },
                    padding: "10px",
                    boxShadow: "none",
                  }}
                >
                  Add To Cart
                </Button>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "black",
                    textAlign: "left",
                    paddingLeft: "12px",
                    paddingTop: "10px",
                  }}
                >
                  {item.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, paddingLeft: "12px" }}>
                  <Typography variant="h6" sx={{ color: "#ffca28" }}>
                    ${item.discountedPrice}
                  </Typography>
                  {item.discount > 0 && (
                    <Typography
                      variant="h6"
                      sx={{ color: "#666", textDecoration: "line-through" }}
                    >
                      ${item.originalPrice}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: "20px",
                  height: "40px",
                  backgroundColor: "#ffca28",
                  borderRadius: "4px",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Just For You
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "black",
                borderColor: "black",
                padding: "14px",
                width: "150px",
                fontSize: "16px",
                marginBottom: "50px",
                marginTop: "10px",
              }}
            >
              See All
            </Button>
          </Box>

          <Grid container spacing={4}>
            {recommendedItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                <Box
                  sx={{
                    textAlign: "center",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    width: "280px",
                  }}
                >
                  <Box sx={{ padding: "20px", position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: "100%", height: "auto" }}
                      onError={(e: any) => (e.target.src = fallbackImage)}
                    />
                  </Box>

                  {item.discount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: "#ffca28",
                        color: "#000",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      -{item.discount}%
                    </Box>
                  )}

                  {item.product === "NEW" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: "#05e614",
                        color: "#000",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.product}
                    </Box>
                  )}

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: "black",
                    }}
                    aria-label="see-all"
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </IconButton>

                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      width: "100%",
                      backgroundColor: "#000",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#333" },
                      padding: "10px",
                    }}
                  >
                    Add To Cart
                  </Button>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "black",
                      textAlign: "left",
                      paddingLeft: "12px",
                      paddingTop: "10px",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, paddingLeft: "12px" }}>
                    <Typography variant="h6" sx={{ color: "#ffca28" }}>
                      ${item.discountedPrice}
                    </Typography>
                    {item.discount > 0 && (
                      <Typography
                        variant="h6"
                        sx={{ color: "#666", textDecoration: "line-through" }}
                      >
                        ${item.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1,
                      paddingTop: "8px",
                      paddingLeft: "12px",
                      marginBottom: "50px",
                    }}
                  >
                    <Rating value={item.rating} />
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        color: "#666",
                        paddingTop: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      ({item.reviews})
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}