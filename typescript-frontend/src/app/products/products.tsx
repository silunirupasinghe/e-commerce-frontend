'use client'

import React, { useState } from "react";
import Link from "next/link"; // Import Link for navigation
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import colors from "@/theme/color";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  new?: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviews: 35,
    image:
      "https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg",
    category: "Pet Food",
  },
  {
    id: 2,
    name: "Canon EOS DSLR Camera",
    price: 1360,
    rating: 4,
    reviews: 95,
    image:
      "https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Curology Product Set",
    price: 1500,
    rating: 4,
    reviews: 145,
    image:
      "https://cdn11.bigcommerce.com/s-w95j9i8f88/images/stencil/320w/image-manager/routine-nav.png?t&",
    category: "Beauty",
  },
  {
    id: 4,
    name: "Kids Electric Car",
    price: 1960,
    rating: 4,
    reviews: 65,
    image:
      "https://s.alicdn.com/@sc04/kf/H1a4ed898cb7f456ab5ab9e9a5789c6bbY.jpg_720x720q50.jpg",
    new: true,
    category: "Toys",
  },
  {
    id: 5,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 3,
    reviews: 35,
    image:
      "https://www.sportkuster.com/image/cache/catalog/schuhe_sockenschuhe/Jr.-Zoom-Mercurial-Vapor-15-Academy-MG.FG-FQ8392-400-800x800w.jpg",
    category: "Sports",
  },
  {
    id: 6,
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4,
    reviews: 55,
    image:
      "https://www.gamingstorekh.com/Content/Upload/ItemImage/f0b93b5f-8d47-4e25-88db-569f3b8cfd00.png",
    new: true,
    category: "Electronics",
  },
];

const MIN = 100;
const MAX = 2000;

const Products: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([MIN, MAX]);
  const [rating, setRating] = useState<number | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredProducts = products
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) => !rating || product.rating === rating)
    .filter((product) => !category || product.category === category);

  return (
    <Box sx={{ px: { md: 6 }, py: 4, mx: { md: 2 } }}>
      <ToastContainer/>
      <Typography variant="h4" gutterBottom>
        Explore Our Products
      </Typography>

      <Grid sx={{ display: "flex", flexDirection: "row" }} container spacing={8}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              maxWidth: 300,
              p: 3,
              border: `2px solid ${colors.primary}`,
              backgroundColor: colors.lightGray,
              borderRadius: 2,
            }}
          >
            <Typography sx={{ mb: 2 }}>Filter By :</Typography>
            <hr />
            <Typography sx={{ my: 2 }}>Filter by category :</Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel id="category-filter">Filter by category</InputLabel>
              <Select
                labelId="category-filter"
                value={category}
                label="Filter by category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {[...new Set(products.map((p) => p.category))].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <hr />
            <Typography gutterBottom sx={{ my: 2 }}>
              Filter by range:
            </Typography>
            <Slider
              size="small"
              aria-label="Custom marks"
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
              sx={{ color: colors.primary }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography
                variant="body2"
                onClick={() => setPriceRange([MIN, priceRange[1]])}
                sx={{ cursor: "pointer" }}
              >
                {MIN} min
              </Typography>
              <Typography
                variant="body2"
                onClick={() => setPriceRange([priceRange[0], MAX])}
                sx={{ cursor: "pointer" }}
              >
                {MAX} max
              </Typography>
            </Box>
            <hr />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Filter By Rating
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={1}
            />
          </Box>
        </Grid>
        <Grid size={{ md: 9, xs: 12 }}>
          <Grid container spacing={{ md: 2, xs: 1 }}>
            {filteredProducts.map((product) => (
              <Grid size={{ xs: 6, sm: 6, md: 4 }} key={product.id}>
                <Link href={`/products/${product.id}`} passHref style={{textDecoration:'none'}}>
                  <Card
                 
                    sx={{
                      position: "relative",
                      height: { md: 300, xs: 300 },
                      width: "100%",
                      border: 0,
                      boxShadow: "none",
                      borderRadius: 2,
                      cursor: "pointer", // Add cursor pointer for better UX
                    }}
                  >
                    {product.new && (
                      <Chip
                        label="NEW"
                        color="success"
                        size="small"
                        sx={{ position: "absolute", top: 8, left: 8 }}
                      />
                    )}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <FavoriteBorderIcon sx={{ color: colors.red }} />
                      <VisibilityOutlinedIcon />
                    </Box>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: "contain", backgroundColor: colors.lightGray }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color={colors.primary}>
                        LKR {product.price.toLocaleString()} | {"★".repeat(product.rating)}
                        {"☆".repeat(5 - product.rating)} ({product.reviews})
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;