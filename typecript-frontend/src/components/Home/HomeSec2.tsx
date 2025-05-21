"use client";
import React, { useState, useEffect } from "react";
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
import { ArrowBack, ArrowForward, DoNotTouch } from "@mui/icons-material";
import colors from "@/theme/color";

// Styled Components
const FlashSalesContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "auto", // Changed from "auto" to ensure full width
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
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
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: "270px",
  minHeight: "350px",
  width: "270px",
  position: "relative",
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    minWidth: "170px",
    maxWidth: "170px",
  },
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
  color: "#000",
  backgroundColor: colors.lightGray,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
}));

const TimerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  backgroundColor: "#000",
  color: "#fff",
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  margin: theme.spacing(1, 0),
  fontSize: "14px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: theme.spacing(0.3),
  },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: colors.lightGray,
  "&:hover": {
    backgroundColor: colors.white,
  },
  display: "flex",
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
    "& .MuiSvgIcon-root": {
      fontSize: "0.8rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0.5),
    "& .MuiSvgIcon-root": {
      fontSize: "0.9rem",
    },
  },
}));

const FlashSales: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    [key: number]: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
  }>({});

  const products = [
    {
      image: "https://cdn.shopify.com/s/files/1/0619/2617/9011/files/homepagebanner_product.png?v=1660648449",
      name: "HAVIT HV-G92 Gamepad",
      discount: "-40%",
      originalPrice: 160,
      discountedPrice: 120,
      rating: 5,
      reviews: 88,
      endDate: new Date("2025-05-20T14:40:00+05:30"), // Example end date: May 20, 2025, 02:40 PM IST
    },
    {
      image: "https://www.barclays.lk/mmBC/Images/HPHA4841.jpg",
      name: "AK-900 Wired Keyboard",
      discount: "-35%",
      originalPrice: 1160,
      discountedPrice: 960,
      rating: 4,
      reviews: 75,
      endDate: new Date("2025-05-21T04:40:00+05:30"), // Example end date: May 21, 2025, 02:40 PM IST
    },
    {
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
      name: "IPS LCD Gaming Monitor",
      discount: "-30%",
      originalPrice: 400,
      discountedPrice: 370,
      rating: 5,
      reviews: 99,
      endDate: new Date("2025-05-22T14:40:00+05:30"), // Example end date: May 22, 2025, 02:40 PM IST
    },
    {
      image: "https://cdn.uc.assets.prezly.com/cc1e3f98-2fc8-4410-8dde-76f813c9691c/-/format/auto/Swift-Go-16-02.jpg",
      name: "S-Series Comfort Chair",
      discount: "-25%",
      originalPrice: 400,
      discountedPrice: 375,
      rating: 4.5,
      reviews: 89,
      endDate: new Date("2025-05-23T14:40:00+05:30"), // Example end date: May 23, 2025, 02:40 PM IST
    },
    {
      image: "https://images.unsplash.com/photo-1595246200-8a03b3b9d2c8",
      name: "S-Series Comfort Chair",
      discount: "-25%",
      originalPrice: 400,
      discountedPrice: 375,
      rating: 4.5,
      reviews: 89,
      endDate: new Date("2025-05-24T14:40:00+05:30"), // Example end date: May 24, 2025, 02:40 PM IST
    },
    {
      image: "https://images.unsplash.com/photo-1595246200-8a03b3b9d2c8",
      name: "S-Series Comfort Chair",
      discount: "-25%",
      originalPrice: 400,
      discountedPrice: 375,
      rating: 4.2,
      reviews: 89,
      endDate: new Date("2025-05-25T14:40:00+05:30"), // Example end date: May 25, 2025, 02:40 PM IST
    },
    {
      image: "https://images.unsplash.com/photo-1595246200-8a03b3b9d2c8",
      name: "S-Series Comfort Chair",
      discount: "-25%",
      originalPrice: 400,
      discountedPrice: 375,
      rating: 4.5,
      reviews: 89,
      endDate: new Date("2025-05-26T14:40:00+05:30"), // Example end date: May 26, 2025, 02:40 PM IST
    },
  ];

  // Calculate remaining time for each product
  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: {
        [key: number]: {
          days: number;
          hours: number;
          minutes: number;
          seconds: number;
        };
      } = {};
      products.forEach((product, index) => {
        const now = new Date().getTime();
        const end = product.endDate.getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          newTimeLeft[index] = { days, hours, minutes, seconds };
        } else {
          newTimeLeft[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers(); // Initial call
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, [products]);

  // Scroll Handling for Carousel
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 290; // Adjusted for new card width (270px + gap)
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 290;
    }
  };

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 } }}>
      <FlashSalesContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Flash Sales
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <ArrowButton onClick={handlePrev} aria-label="Previous Product">
              <ArrowBack />
            </ArrowButton>
            <ArrowButton onClick={handleNext} aria-label="Next Product">
              <ArrowForward />
            </ArrowButton>
          </Box>
        </Box>
        <CarouselWrapper ref={scrollRef}>
          {products.map((product, index) => (
            <ProductCard key={index}>
              <DiscountBadge>{product.discount}</DiscountBadge>
              <FavoriteIcon>
                <FavoriteBorderIcon fontSize="small" />
              </FavoriteIcon>
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", padding: 1 }}
              />
              <CardContent sx={{ padding: 1 , gap: 1 }}>
                <TimerBox >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box> Days</Box>
                    {timeLeft[index]?.days.toString().padStart(2, "0") || "00"}
                  </Box>
                  

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box> Hours</Box>
                    {timeLeft[index]?.hours.toString().padStart(2, "0") || "00"}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box> Minutes</Box>
                    {timeLeft[index]?.minutes.toString().padStart(2, "0") ||
                      "00"}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box> Seconds</Box>
                    {timeLeft[index]?.seconds.toString().padStart(2, "0") ||
                      "00"}
                  </Box>
                </TimerBox>

                <Typography variant="body2" fontWeight="bold">
                  {product.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    ${product.discountedPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${product.originalPrice}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Rating
                    value={product.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
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
