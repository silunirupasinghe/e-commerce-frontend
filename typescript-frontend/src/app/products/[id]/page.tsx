'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Grid,
  Typography,
  Rating,
  Button,
  IconButton,
  CardMedia,
  Breadcrumbs,
  Link,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import colors from '@/theme/color';
import { toast, ToastContainer } from 'react-toastify';


interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  new?: boolean;
  category: string;
  description: string;
  features: string[];
  images: string[];
  stock: number;
  sold: number;
  seller: {
    name: string;
    rating: number;
    followers: number;
    soldItems: number;
  };
}

export interface Review {
  id: number;
  buyerName: string;
  date: string;
  rating: number;
  note: string;
  avatar?: string;
}



export const products: Product[] = [
  {
    id: 1,
    name: 'Breed Dry Dog Food',
    price: 100,
    rating: 3,
    reviews: 35,
    image: 'https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg',
    category: 'Pet Food',
    description: 'Premium dry dog food for all breeds, packed with nutrients.',
    features: ['High protein', 'Grain-free', 'Vet approved'],
    images: ['https://m.media-amazon.com/images/I/716qmN6swtL._AC_UF894,1000_QL80_.jpg'],
    stock: 50,
    sold: 200,
    seller: { name: 'PetLover', rating: 4.5, followers: 1200, soldItems: 5000 },
  },
  {
    id: 2,
    name: 'Canon EOS DSLR Camera',
    price: 1360,
    rating: 4,
    reviews: 95,
    image: 'https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png',
    category: 'Electronics',
    description: 'Professional DSLR camera with 45MP sensor and 8K video.',
    features: ['45MP sensor', '8K video', 'Fast autofocus'],
    images: [
      'https://asia.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png',
    ],
    stock: 20,
    sold: 150,
    seller: { name: 'TechGuru', rating: 4.8, followers: 2000, soldItems: 8000 },
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
    description: "Complete skincare set for radiant, healthy skin.",
    features: ["Hydrating", "Non-greasy", "Dermatologist tested"],
    images: [
      "https://cdn11.bigcommerce.com/s-w95j9i8f88/images/stencil/320w/image-manager/routine-nav.png?t&",
      "https://cdn11.bigcommerce.com/s-w95j9i8f88/images/stencil/320w/image-manager/routine-nav.png?t&",
    ],
    stock: 30,
    sold: 300,
    seller: {
      name: "BeautyExpert",
      rating: 4.7,
      followers: 1500,
      soldItems: 6000,
    },
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
    description: "Fun electric car for kids with remote control.",
    features: ["Remote control", "LED lights", "Music player"],
    images: [
      "https://s.alicdn.com/@sc04/kf/H1a4ed898cb7f456ab5ab9e9a5789c6bbY.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/H1a4ed898cb7f456ab5ab9e9a5789c6bbY.jpg_720x720q50.jpg",
    ],
    stock: 15,
    sold: 100,
    seller: { name: "ToyMaster", rating: 4.6, followers: 900, soldItems: 4000 },
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
    description: "Lightweight soccer cleats for kids with great grip.",
    features: ["Lightweight", "Great grip", "Breathable"],
    images: [
      "https://www.sportkuster.com/image/cache/catalog/schuhe_sockenschuhe/Jr.-Zoom-Mercurial-Vapor-15-Academy-MG.FG-FQ8392-400-800x800w.jpg",
      "https://www.sportkuster.com/image/cache/catalog/schuhe_sockenschuhe/Jr.-Zoom-Mercurial-Vapor-15-Academy-MG.FG-FQ8392-400-800x800w.jpg",
    ],
    stock: 40,
    sold: 180,
    seller: {
      name: "SportsPro",
      rating: 4.5,
      followers: 1100,
      soldItems: 4500,
    },
  },
  {
    id: 6,
    name: "Havic HV G-92 Gamepad",
    price: 1920,
    rating: 4,
    reviews: 150,
    image:
      "https://www.gamingstorekh.com/Content/Upload/ItemImage/f0b93b5f-8d47-4e25-88db-569f3b8cfd00.png",
    new: true,
    category: "Electronics",
    description:
      "Game Controller 5kin High quality clear vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    images: [
      "https://www.gamingstorekh.com/Content/Upload/ItemImage/f0b93b5f-8d47-4e25-88db-569f3b8cfd00.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Kwv-Ik63qIajc5OHdlYJMLX75RKAFF952eIb6d6eziKVpM315YmZIUS-aLmGrqunmFo&usqp=CAU",
      "https://digitalbridgebd.com/wp-content/uploads/2023/05/gp12-revolver-001-500x500-1.jpg",
    ],
    stock: 100,
    sold: 300,
    seller: { name: "GamerZone", rating: 4.9, followers: 45, soldItems: 51 
    },
  }
];

const allReviews: Review[] = [
  {
    id: 1,
    buyerName: 'Janani',
    date: 'April 1, 2025',
    rating: 4,
    note: 'Great product, totally worth it!, Great product, totally worth it!,Great product, totally worth it!',
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219970.png',
  },
  {
    id: 2,
    buyerName: 'Kasun',
    date: 'April 2, 2025',
    rating: 5,
    note: 'Loved the quality and service.',
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219970.png',
  },
  {
    id: 3,
    buyerName: 'Nimali',
    date: 'April 3, 2025',
    rating: 4,
    note: 'Fast delivery and great customer support.',
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219970.png',
  },
  {
    id: 4,
    buyerName: 'Ruwan',
    date: 'April 4, 2025',
    rating: 3,
    note: 'Good value but packaging could improve.',
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219970.png',
  },
];



const ProductPage = () => {
  const params = useParams();
  const id = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
    setVisibleReviews(allReviews.slice(0, 2));
  }, [product]);

  if (!product) return <Typography sx={{ p: 4 }}>Product not found</Typography>;

  const handleAddToCart = () => {
    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in cart
    const existingItem = cart.find((item: any) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // alert(`${product.name} added to cart!`);
    toast.success(`${product.name} added to cart!`);

  };

  const loadAllReviews = () => {
    setVisibleReviews(allReviews);
    setShowAllReviews(true);
  };

  return (
    <Box sx={{ p: { md: 4, xs: 1 } }}>
      <ToastContainer />
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link href="/">Home</Link>
        <Link href="/products">{product.category}</Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Product Section */}
      <Grid container spacing={4}>
        <Grid size={{xs:12, md:6}} >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {product.images.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  alt={`${product.name} ${index + 1}`}
                  sx={{
                    width: { md: 80, xs: 40 },
                    height: { md: 80, xs: 40 },
                    objectFit: 'contain',
                    cursor: 'pointer',
                    border: selectedImage === img ? `2px solid ${colors.primary}` : 'none',
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </Box>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.name}
              sx={{ width: { md: '100%', xs: 250 }, height: 300, objectFit: 'contain' }}
            />
          </Box>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Typography variant="h5" fontWeight="bold">
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
            <Rating value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2">({product.reviews} Reviews)</Typography>
            <Typography variant="body2" color={product.stock > 0 ? 'green' : 'red'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Box>
          <Typography variant="h6" color={colors.primary}>
            LKR {product.price.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ my: 2 }}>
            {product.description}
          </Typography>
          {product.features.map((feature, i) => (
            <Typography key={i} variant="body2">
              • {feature}
            </Typography>
          ))}

          {/* Quantity */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
            <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <RemoveIcon sx={{ border: 1, p: 1 }} />
            </IconButton>
            <Typography sx={{ border: 1, px: 5, py: 1 }}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
              <AddIcon sx={{ backgroundColor: colors.primary, p: 1 }} />
            </IconButton>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.primary, color: 'black' }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            <IconButton>
              <FavoriteBorderIcon sx={{ color: colors.red }} />
            </IconButton>
          </Box>

          {/* Delivery */}
          <Box sx={{  display:{md:'flex'}, flexDirection:"row", gap: 2, }}>
            <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1, display: 'flex',  mb:2}}>
              <LocalShippingOutlinedIcon />
              <Typography variant="body2" sx={{ml:2}}>
                Free Delivery <br />
                <Link href="#" color={colors.primary}>
                  Check availability
                </Link>
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1,display: 'flex', mb:2}}>
              <AssignmentReturnOutlinedIcon />
              <Typography variant="body2" sx={{ml:2}}>
                Free 30-days Return Policy <br />
                <Link href="#" color={colors.primary}>
                  Learn more
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Seller and Reviews */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Seller"
            sx={{ width: 50, height: 50, borderRadius: '50%' }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {product.seller.name}
            </Typography>
            <Typography variant="body2">
              {product.seller.followers} Followers | {product.seller.soldItems}K+ Sold
            </Typography>
            <Rating value={product.seller.rating} readOnly precision={0.5} />
            <Button variant="outlined" size="small" sx={{ mt: 1, borderRadius: 8 }}>
              Follow
            </Button>
          </Box>
        </Box>

        {/* Review Summary */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          {product.reviews} reviews | {product.rating.toFixed(1)}{' '}
          <Rating value={product.rating} readOnly precision={0.5} size="small" />
        </Typography>

        {/* Review Cards */}
        {/* <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, mb: 4}}> */}
          {visibleReviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              backgroundColor: colors.lightGray,
              borderRadius: 2,
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={review.avatar}
              alt="Buyer"
              sx={{ width: 40, height: 40, borderRadius: '50%' }}
            />
            <Box>
              <Typography fontWeight="bold" variant="body2">
                {review.buyerName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                on {review.date}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {review.note}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Load More Button */}
        {!showAllReviews && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={loadAllReviews}
              sx={{ mt: 2, px: 4, borderRadius: 10, textTransform: 'none' }}
            >
              See All Reviews
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;
