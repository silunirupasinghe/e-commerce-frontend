"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  DesktopWindowsOutlined,
  HeadsetOutlined,
  PhotoCameraOutlined,
  SmartphoneOutlined,
  SportsEsportsOutlined,
  WatchOutlined,
} from "@mui/icons-material";
import { Inter, Poppins } from "next/font/google";
import colors from "@/theme/color";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

interface CategoryType {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const categories: CategoryType[] = [
  { id: 1, name: "Phones", icon: <SmartphoneOutlined fontSize="large" /> },
  { id: 2, name: "Computers", icon: <DesktopWindowsOutlined fontSize="large" /> },
  { id: 3, name: "SmartWatch", icon: <WatchOutlined fontSize="large" /> },
  { id: 4, name: "Camera", icon: <PhotoCameraOutlined fontSize="large" /> },
  { id: 5, name: "HeadPhones", icon: <HeadsetOutlined fontSize="large" /> },
  { id: 6, name: "Gaming", icon: <SportsEsportsOutlined fontSize="large" /> },
  { id: 7, name: "Phones", icon: <SmartphoneOutlined fontSize="large" /> },
  { id: 8, name: "Phones", icon: <SmartphoneOutlined fontSize="large" /> },
];

const CategoryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: number }>(({ theme, active }) => ({
  padding: theme.spacing(2),
  minWidth: 100,
  maxWidth: 150,
  height: 120,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
  border: active ? "none" : `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: active ? colors.primary : "#fff",
  color: active ? "#fff" : theme.palette.text.primary,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: active ? colors.primary : "#f5f5f5",
  },
}));

const BrowseByCategory: React.FC = () => {
  const [selected, setSelected] = useState<number>(4);
  const sliderRef = React.useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 7 }, py: { xs: 4, sm: 5 } }} className={poppins.className}>
      <HeaderSection>
        <YellowBar />
        <Typography
          variant="h6"
          sx={{ color: colors.primary, fontWeight: 550 }}
        >
          Our Categories
        </Typography>
      </HeaderSection>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 550, color: colors.black, fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2rem" } }}
          className={inter.className}
        >
          Browse By Category
        </Typography>
        <Box>
          <IconButton onClick={() => sliderRef.current?.slickPrev()}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={() => sliderRef.current?.slickNext()}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      <Slider ref={sliderRef} {...settings}>
        {categories.map((category) => (
          <Box key={category.id} px={1}>
            <CategoryCard
              active={selected === category.id ? 1 : 0}
              onClick={() => setSelected(category.id)}
              elevation={selected === category.id ? 2 : 0}
            >
              <Box mb={1}>{category.icon}</Box>
              <Typography
                variant="body2"
                noWrap
                sx={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {category.name}
              </Typography>
            </CategoryCard>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default BrowseByCategory;
