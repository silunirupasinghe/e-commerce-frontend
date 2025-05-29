"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import colors from "@/theme/color";

// metadata
export const metadata = {
  title: "Flash Sales - Your E-Commerce",
  description: "Don't miss out on our limited-time flash sales. Huge discounts on top-rated electronics and accessories.",
};

interface Product {
  image: string;
  name: string;
  discount: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviews: number;
  endDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const products: Product[] = [
  {
    image: "https://cdn.shopify.com/s/files/1/0619/2617/9011/files/homepagebanner_product.png?v=1660648449",
    name: "HAVIT HV-G92 Gamepad",
    discount: "-40%",
    originalPrice: 160,
    discountedPrice: 120,
    rating: 5,
    reviews: 88,
    endDate: new Date("2025-05-28T14:40:00+05:30"),
  },
  {
    image: "https://www.barclays.lk/mmBC/Images/HPHA4841.jpg",
    name: "AK-900 Wired Keyboard",
    discount: "-35%",
    originalPrice: 1160,
    discountedPrice: 960,
    rating: 4,
    reviews: 75,
    endDate: new Date("2025-05-25T04:40:00+05:30"),
  },
  {
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    name: "IPS LCD Gaming Monitor",
    discount: "-30%",
    originalPrice: 400,
    discountedPrice: 370,
    rating: 5,
    reviews: 99,
    endDate: new Date("2025-05-29T14:40:00+05:30"),
  },

  {
    image: "https://www.barclays.lk/mmBC/Images/HPHA4841.jpg",
    name: "AK-900 Wired Keyboard",
    discount: "-35%",
    originalPrice: 1160,
    discountedPrice: 960,
    rating: 4,
    reviews: 75,
    endDate: new Date("2025-05-21T04:40:00+05:30"),
  },
  {
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    name: "IPS LCD Gaming Monitor",
    discount: "-30%",
    originalPrice: 400,
    discountedPrice: 370,
    rating: 5,
    reviews: 99,
    endDate: new Date("2025-05-22T14:40:00+05:30"),
  },
  {
    image: "https://www.barclays.lk/mmBC/Images/HPHA4841.jpg",
    name: "AK-900 Wired Keyboard",
    discount: "-35%",
    originalPrice: 1160,
    discountedPrice: 960,
    rating: 4,
    reviews: 75,
    endDate: new Date("2025-05-21T04:40:00+05:30"),
  },
  {
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    name: "IPS LCD Gaming Monitor",
    discount: "-30%",
    originalPrice: 400,
    discountedPrice: 370,
    rating: 5,
    reviews: 99,
    endDate: new Date("2025-05-22T14:40:00+05:30"),
  },
];

const FlashSalesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CarouselWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollBehavior: "smooth",
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: "270px",
  width: "270px",
  position: "relative",
  borderRadius: theme.spacing(1),
}));

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#FFD700",
  color: "#000",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  fontSize: "12px",
  fontWeight: "bold",
}));

const FavoriteIcon = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: colors.lightGray,
}));

const TimerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  backgroundColor: "#000",
  color: "#fff",
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  fontSize: "14px",
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: colors.lightGray,
}));

const FlashSales: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<Record<number, TimeLeft>>({});

  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: Record<number, TimeLeft> = {};
      products.forEach((product, index) => {
        const now = new Date().getTime();
        const end = product.endDate.getTime();
        const distance = end - now;

        if (distance > 0) {
          newTimeLeft[index] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          };
        } else {
          newTimeLeft[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    scrollRef.current && (scrollRef.current.scrollLeft += 290);
  };

  const handlePrev = () => {
    scrollRef.current && (scrollRef.current.scrollLeft -= 290);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FlashSalesContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Flash Sales</Typography>
          <Box>
            <ArrowButton onClick={handlePrev}><ArrowBack /></ArrowButton>
            <ArrowButton onClick={handleNext}><ArrowForward /></ArrowButton>
          </Box>
        </Box>
        <CarouselWrapper ref={scrollRef}>
          {products.map((product, index) => (
            <ProductCard key={index}>
              <DiscountBadge>{product.discount}</DiscountBadge>
              <FavoriteIcon><FavoriteBorderIcon fontSize="small" /></FavoriteIcon>
              <CardMedia component="img" height="150" image={product.image} alt={product.name} sx={{ objectFit: "contain", padding: 1 }} />
              <CardContent sx={{ padding: 1 }}>
                <TimerBox>
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <Box key={unit} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Box>
                      {timeLeft[index]?.[unit as keyof TimeLeft]?.toString().padStart(2, "0") || "00"}
                    </Box>
                  ))}
                </TimerBox>
                <Typography variant="body2" fontWeight="bold">{product.name}</Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Typography color="error" fontWeight="bold">${product.discountedPrice}</Typography>
                  <Typography color="textSecondary" sx={{ textDecoration: "line-through" }}>${product.originalPrice}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Rating value={product.rating} readOnly precision={0.5} size="small" />
                  <Typography variant="caption">({product.reviews})</Typography>
                </Box>
              </CardContent>
            </ProductCard>
          ))}
        </CarouselWrapper>
      </FlashSalesContainer>
    </Box>
  );
};

export default FlashSales;
