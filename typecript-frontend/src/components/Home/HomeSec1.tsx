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
  width: "100%",
  height: "400px", 
  overflow: "hidden",
//   margineTop: theme.spacing(8),
//   marginBlockEnd: theme.spacing(8),
  backgroundColor: "#1a1a1a",
  [theme.breakpoints.down("sm")]: {
    height: "300px",
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
  width: "80%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
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
  gap: theme.spacing(1.5),
  zIndex: 1,
}));

const CarouselDot = styled(Box)(({ theme }) => ({
  width: "12px",
  height: "12px",
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", 
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
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
    <CarouselContainer sx={{ my: 8 }}>
      {slides.map((slide, index) => (
        <CarouselSlide
          key={index}
          className={index === currentSlide ? "active" : ""}
        >
          <SlideContent style={{ backgroundImage: `url(${slide.image})` }}>
          </SlideContent>
        </CarouselSlide>
      ))}

      {/* Navigation Arrows */}
      <ArrowButton
        onClick={handlePrev}
        sx={{ left: "10px" }}
        aria-label="Previous Slide"
      >
        <ArrowBackIosIcon />
      </ArrowButton>
      <ArrowButton
        onClick={handleNext}
        sx={{ right: "10px" }}
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
          />
        ))}
      </CarouselDots>
    </CarouselContainer>
  );
};

export default Carousel;