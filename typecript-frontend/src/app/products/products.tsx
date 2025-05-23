"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import colors from "@/theme/color";

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
    image: "https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg",
    category: "Pet Food",
  },
  {
    id: 2,
    name: "Canon EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviews: 95,
    image: "https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Curology Product Set",
    price: 500,
    rating: 4,
    reviews: 145,
    image: "https://cdn11.bigcommerce.com/s-w95j9i8f88/images/stencil/320w/image-manager/routine-nav.png?t&",
    category: "Beauty",
  },
  {
    id: 4,
    name: "Kids Electric Car",
    price: 960,
    rating: 4,
    reviews: 65,
    image: "https://s.alicdn.com/@sc04/kf/H1a4ed898cb7f456ab5ab9e9a5789c6bbY.jpg_720x720q50.jpg",
    new: true,
    category: "Toys",
  },
  {
    id: 5,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 3,
    reviews: 35,
    image: "https://www.sportkuster.com/image/cache/catalog/schuhe_sockenschuhe/Jr.-Zoom-Mercurial-Vapor-15-Academy-MG.FG-FQ8392-400-800x800w.jpg",
    category: "Sports",
  },
  {
    id: 6,
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4,
    reviews: 55,
    image: "https://www.gamingstorekh.com/Content/Upload/ItemImage/f0b93b5f-8d47-4e25-88db-569f3b8cfd00.png",
    new: true,
    category: "Electronics",
  },
];

const Products: React.FC = () => {
  const [category, setCategory] = useState<string>("");

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Explore Our Products
      </Typography>

      <Box sx={{ mb: 4, maxWidth: 250 }}>
        <FormControl fullWidth size="small">
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
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ position: "relative" }}>
              {product.new && (
                <Chip
                  label="NEW"
                  color="success"
                  size="small"
                  sx={{ position: "absolute", top: 8, left: 8 }}
                />
              )}
              <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                <FavoriteBorderIcon />
                <VisibilityOutlinedIcon />
              </Box>
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", backgroundColor: "#f9f9f9" }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color={colors.primary}>
                  LKR {product.price.toLocaleString()} | {"★".repeat(product.rating)} {"☆".repeat(5 - product.rating)} ({product.reviews})
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
