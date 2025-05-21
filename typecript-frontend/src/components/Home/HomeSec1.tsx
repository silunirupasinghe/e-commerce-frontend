"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styled Components for Carousel
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "auto",
  height: "500px", // Increased default height for better visibility
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    height: "300px",

  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "200px",
  },
}));

const CarouselSlide = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
  "&.active": {
    opacity: 1,
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundSize: "cover", // Ensure image covers the area
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const CarouselDots = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: theme.spacing(1),
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    bottom: "10px",
    gap: theme.spacing(0.5),
  },
}));

const CarouselDot = styled(Box)(({ theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  opacity: 0.5,
  cursor: "pointer",
  "&.active": {
    opacity: 1,
    backgroundColor: "#FFD700", // Gold for active dot
  },
  transition: "all 0.3s ease",
  "&:hover": {
    opacity: 0.8,
  },
  [theme.breakpoints.down("sm")]: {
    width: "8px",
    height: "8px",
  },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#ffffff",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    transform: "translateY(-50%) scale(1.1)",
  },
  transition: "all 0.3s ease",
  zIndex: 1,
  padding: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(0.5),
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
}));

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/home/home.jpg", // Use relative path for Next.js static imports
    },
    {
      image: "https://cdn.smartslider3.com/wp-content/uploads/2018/07/createwordpressheroimage.png",
    },
    {
      image: "https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png",
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <CarouselContainer sx={{ my: { xs: 4, sm: 6, md: 6 }, mx: {md:5} }}>
      {slides.map((slide, index) => (
        <CarouselSlide
          key={index}
          className={index === currentSlide ? "active" : ""}
        >
          <SlideContent
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
            role="img"
            aria-label={`Slide ${index + 1}`}
          />
        </CarouselSlide>
      ))}

      {/* Navigation Arrows */}
      <ArrowButton
        onClick={handlePrev}
        sx={{ left: { xs: "5px", sm: "10px" } }}
        aria-label="Previous Slide"
      >
        <ArrowBackIosIcon />
      </ArrowButton>
      <ArrowButton
        onClick={handleNext}
        sx={{ right: { xs: "5px", sm: "10px" } }}
        aria-label="Next Slide"
      >
        <ArrowForwardIosIcon />
      </ArrowButton>

      {/* Navigation Dots */}
      <CarouselDots>
        {slides.map((_, index) => (
          <CarouselDot
            key={index}
            className={index === currentSlide ? "active" : ""}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </CarouselDots>
    </CarouselContainer>
  );
};

export default Carousel;