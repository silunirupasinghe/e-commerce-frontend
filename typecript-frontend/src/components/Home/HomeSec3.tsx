"use client";

import React from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Poppins, Inter } from "next/font/google";
import colors from "@/theme/color";

// Fonts
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Styled Components
const ProductCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "100%",
    height: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    width: 280,
    height: 380,
  },
  margin: theme.spacing(2),
  position: "relative",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  border: "none",
  "&:hover .add-to-cart": {
    opacity: 1,
    transform: "translate(-50%, 0)",
  },
}));

const HeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const YellowBar = styled("div")(({ theme }) => ({
  width: "15px",
  height: "40px",
  backgroundColor: colors.primary,
  marginRight: theme.spacing(2),
  borderRadius: "5px",
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.black,
  color: colors.white,
  textTransform: "uppercase",
}));

const formatPrice = (price: number): string => `LKR ${price.toLocaleString()}`;

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  new?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviews: 35,
    image: "https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg",
    new: true,
  },
  {
    id: 2,
    name: "Canon EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviews: 95,
    image: "https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png",
  },
  {
    id: 3,
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 5,
    reviews: 325,
    image: "https://dlcdnwebimgs.asus.com/gain/6c49e355-de25-403c-b8c2-eb0ad4cc8a78/",
  },
  {
    id: 4,
    name: "Curology Product Set",
    price: 500,
    rating: 4,
    reviews: 145,
    image: "https://cdn11.bigcommerce.com/s-w95j9i8f88/images/stencil/320w/image-manager/routine-nav.png?t&",
  },
];

const HomeSec4: React.FC = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 5, md: 6 },
      }}
      className={poppins.className}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <HeaderSection>
          still working on this
          
          <YellowBar />
          <Typography
            variant="h6"
            sx={{
              color: colors.primary,
              fontWeight: 550,
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Our Products
          </Typography>
        </HeaderSection>
        <Box>
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 550,
          color: colors.black,
          fontSize: { xs: "1.5rem", sm: "2rem" },
        }}
        className={inter.className}
        mb={2}
      >
        Explore Our Products
      </Typography>

      {/* Product Grid */}
      <Grid container justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} size={{xs:12, sm:6, md:3}} >
            <ProductCard>
              {/* Icons */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "flex",
                  gap: 1,
                  zIndex: 2,
                }}
              >
                {product.new && (
                  <Typography
                    sx={{
                      backgroundColor: "success.main",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      mb: 1,
                    }}
                  >
                    NEW
                  </Typography>
                )}
                <IconButton size="small">
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Image with Add to Cart on Hover */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 200, sm: 260 },
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: "80%",
                    width: "80%",
                    objectFit: "contain",
                  }}
                />

                <Box
                  className="add-to-cart"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-50%, 20px)",
                    opacity: 0,
                    transition: "all 0.3s ease",
                    width: "100%",
                  }}
                >
                  <AddToCartButton fullWidth>Add to Cart</AddToCartButton>
                </Box>
              </Box>

              {/* Content */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  noWrap
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  {product.name}
                </Typography>
                <Typography sx={{ color: colors.primary }}>
                  {formatPrice(product.price)}{" "}
                  {"★".repeat(Math.floor(product.rating)) +
                    "☆".repeat(5 - Math.floor(product.rating))}{" "}
                  ({product.reviews})
                </Typography>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>

      {/* View All Products Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            color: colors.black,
            px: 4,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default HomeSec4;
