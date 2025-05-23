"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import colors from "@/theme/color"; // adjust as per your path

interface Feature {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const features: Feature[] = [
  {
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    icon: <SupportAgentOutlinedIcon fontSize="large" />,
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: <ReplayOutlinedIcon fontSize="large" />,
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days.",
  },
];

const ServiceHighlights: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                border: `1px dashed ${colors.primary}`,
                borderRadius: 2,
                textAlign: "center",
                py: 4,
                px: 2,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.black,
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography fontWeight={700} fontSize="0.95rem">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.subtitle}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceHighlights;
