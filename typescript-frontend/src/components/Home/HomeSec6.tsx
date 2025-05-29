"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import colors from "@/theme/color";

interface FeaturedItem {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
}

const itemData: FeaturedItem[] = [
  {
    img: "https://c.files.bbci.co.uk/f310/live/f36de0e0-6f86-11ef-b410-fbf02dca0fc5.png",
    title: "Playstation 5",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://m.media-amazon.com/images/I/71O1lW4PXQL._AC_UY327_FMwebp_QL65_.jpg",
    title: "Computer",
  },
  {
    img: "https://imgmediagumlet.lbb.in/media/2024/11/673c3d188e0f0546158202bd_1732001048696.jpg",
    title: "Perfumes",
  },
  {
    img: "https://dlcdnwebimgs.asus.com/gain/6c49e355-de25-403c-b8c2-eb0ad4cc8a78/",
    title: "Coffee",
    cols: 2,
  },

];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function NewArrivalQuilted() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: "10px",
            height: "35px",
            backgroundColor: colors.primary,
            borderRadius: "2px",
            mr: 1,
          }}
        />
        <Typography variant="subtitle2" sx={{ color: colors.primary, ml:2, fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 550 }}>
          Featured
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        New Arrival
      </Typography>

      <ImageList
        sx={{ width: "100%", maxWidth: 1200, margin: "auto" 
        }}
        variant="quilted"
        cols={isMobile ? 2 : 4}
        rowHeight={isMobile ? 150 : 270}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{ position: "relative", bgcolor:colors.black  }}
          >
            <img
              {...srcset(item.img, 150, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 4,
                color: colors.white,
            
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="caption" sx={{fontSize:"large", ml:2 }}>{item.title}</Typography>
              <Button
                size="small"
                variant="text"
                sx={{ color: colors.white , textTransform: "none", textDecoration: "underline", }}
              >
                Shop Now
              </Button>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
