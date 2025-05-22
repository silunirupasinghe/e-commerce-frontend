"use client";

import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
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
  width: 260,
  height: 350,
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

const formatPrice = (price) => `LKR ${price.toLocaleString()}`;

const products = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviews: 35,
    image:
      "https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg",
    new: true,
  },
  {
    id: 2,
    name: "Canon EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviews: 95,
    image:
      "https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png",
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
  {
    id: 5,
    name: "Kids Electric Car",
    price: 960,
    rating: 4,
    reviews: 65,
    image: "https://s.alicdn.com/@sc04/kf/H1a4ed898cb7f456ab5ab9e9a5789c6bbY.jpg_720x720q50.jpg",
    new: true,
  },
  {
    id: 6,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 3,
    reviews: 35,
    image: "https://www.sportkuster.com/image/cache/catalog/schuhe_sockenschuhe/Jr.-Zoom-Mercurial-Vapor-15-Academy-MG.FG-FQ8392-400-800x800w.jpg",
  },
  {
    id: 7,
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4,
    reviews: 55,
    image: "https://www.gamingstorekh.com/Content/Upload/ItemImage/f0b93b5f-8d47-4e25-88db-569f3b8cfd00.png",
    new: true,
  },
  {
    id: 8,
    name: "Quilted Satin Jacket",
    price: 660,
    rating: 4.2,
    reviews: 55,
    image: "https://img.shopstyle-cdn.com/sim/38/98/38986097ebe61a0eac0beb73d1414d46_best/reversible-quilted-satin-jacket.jpg",
  },
];

export default function HomeSec4() {
  return (
    <div style={{ padding: "30px" }} className={poppins.className}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeaderSection>
          <YellowBar />
          <Typography
            variant="h6"
            sx={{ color: colors.primary, fontWeight: 550 }}
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
        sx={{ fontWeight: 550, color: colors.black }}
        className={inter.className}
      >
        Explore Our Products
      </Typography>

      {/* Product Grid */}
      <Grid container justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} item md={3} sm={6} xs={12}>
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
                  height: "260px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9", // optional light background to better center images
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
                <Typography variant="body1" fontWeight={500}>
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
          sx={{ backgroundColor: colors.primary, color: "#000", px: 4 }}
        >
          View All Products
        </Button>
      </Box>
    </div>
  );
}
