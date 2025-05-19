"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import colors from "@/theme/color";
import { LinkedIn } from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: colors.black,
  color: "#ffffff",
  padding: theme.spacing(4),
  borderTop: "1px solid #333",
  position: "relative",
  bottom: 0,
  width: "95%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const FooterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 0.9fr))",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
  "&:hover": {
    color: "#FFD700", // Hover color (yellow, matching the theme)
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#999999",
  fontSize: "0.75rem",
  paddingTop: theme.spacing(2),
}));

const SecurityPaymentSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <FooterContainer>
      <FooterGrid>
        {/* Company Info */}

        <FooterSection>
          <Typography variant="h6" fontWeight="bold">
            ECART
          </Typography>
          <Typography variant="body2">
            Ecart - Your one-stop shop for anything and everything. Explore our
            wide range of products and enjoy a seamless shopping experience.
          </Typography>
        </FooterSection>

        {/* Navigation Links */}
        <FooterSection>
          <Typography variant="h6" fontWeight="bold">
            Quick Links
          </Typography>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              color="inherit"
              underline="hover"
              variant="body2"
            >
              {link.label}
            </Link>
          ))}
        </FooterSection>

        {/* Contact Info */}
        <FooterSection>
          <Typography variant="h6" fontWeight="bold">
            Contact Us
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <EmailIcon fontSize="small" />
            <Typography variant="body2">support@Ecart.com</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">+1-800-555-1234</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">123 Beauty Ave, NYC, USA</Typography>
          </Stack>
        </FooterSection>

        {/* App Download & Social Media */}
        <FooterSection>
          <Typography variant="h6" fontWeight="bold">
            Download Our App
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box
              component="img"
              src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png" // Replace with your QR code image path
              alt="Download App QR Code"
              sx={{ width: 80, height: 80 }}
            />
            <Stack direction="column" spacing={0.5}>
              <Box
                component="img"
                src="/footer/googlePlay.png" // Placeholder for Google Play
                alt="Google Play"
                sx={{ width: 75, height: 35 }}
              />
              <Box
                component="img"
                src="/footer/playstore.png" // Placeholder for App Store
                alt="App Store"
                sx={{ width: 75, height: 35 }}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} mt={2}>
            <SocialIconButton href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </SocialIconButton>
            <SocialIconButton href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </SocialIconButton>
            <SocialIconButton href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </SocialIconButton>
            <SocialIconButton href="https://instagram.com" target="_blank">
              <LinkedIn />
            </SocialIconButton>
          </Stack>
        </FooterSection>
      </FooterGrid>

      <FooterGrid>
        <FooterSection>
          {/* Additional Security Certification Section */}
          <SecurityPaymentSection>
            <Stack direction="column" alignItems="left" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                Security Certification
              </Typography>
              <Stack direction="row" alignItems="left" gap={2}>
                <Box
                  component="img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_tqGPYLooB_5ENmaNr5BGQvrX-lhjEUft-A&s" // Placeholder for PCI DSS
                  alt="PCI DSS"
                  sx={{ width: 65, height: 32 }}
                />
                <Box
                  component="img"
                  src="https://www.visa.co.uk/dam/VCOM/regional/ve/unitedkingdom/in-page-images/SCA/uk-visa-secure-640x640.jpg" // Placeholder for Visa
                  alt="Visa"
                  sx={{ width: 40, height: 32 }}
                />
                <Box
                  component="img"
                  src="/footer/amaricanSafekey.png" // Placeholder for Mastercard
                  alt="Mastercard"
                  sx={{ width: 75, height: 35 }}
                />
              </Stack>
              {/* Add more security logos as needed */}
            </Stack>
          </SecurityPaymentSection>
        </FooterSection>

        {/* Additional Payment Methods Section */}
        <FooterSection>
          <SecurityPaymentSection>
            <Stack direction="column" alignItems="left" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                We Accept
              </Typography>
              <Stack direction="row" alignItems="left" gap={2}>
                <Box
                  component="img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-JdvERxNmetMNVTdalsk51FtT7FT3HOf6A&s" // Placeholder for Visa
                  alt="Visa"
                  sx={{ width: 40, height: 30 }}
                />
                <Box
                  component="img"
                  src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png" // Placeholder for Mastercard
                  alt="Mastercard"
                  sx={{ width: 40, height: 30 }}
                />
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" // Placeholder for Amex
                  alt="American Express"
                  sx={{ width: 40, height: 30 }}
                />
                {/* Add more payment logos as needed */}
              </Stack>
            </Stack>
          </SecurityPaymentSection>
        </FooterSection>

        {/* Newsletter Subscription */}
        <FooterSection>
          <Stack direction="column" alignItems="left" gap={2}>
            <Typography variant="h6" fontWeight="bold">
              Newsletter
            </Typography>
            <Typography variant="body2">
              Subscribe to our newsletter for the latest updates.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: colors.white,
                  color: "#000000",
                  width: "300px", // Slightly wider for better usability
                  height: "36px", // Comfortable height
                  fontSize: "0.875rem", // Readable font size
                  borderRadius: "8px", // Rounded corners
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                },
              }}
            />
          </Stack>
        </FooterSection>
      </FooterGrid>

      <Divider sx={{ borderColor: "#333", marginBottom: 2 }} />

      {/* Enhanced Copyright Section */}
      <CopyrightText>
        © 2022 - 2025 Ecart Inc.{" "}
        <Link href="/terms" color="inherit" underline="hover" variant="body2">
          Terms of Use
        </Link>{" "}
        |{" "}
        <Link href="/privacy" color="inherit" underline="hover" variant="body2">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          href="/privacy-choices"
          color="inherit"
          underline="hover"
          variant="body2"
        >
          Your Privacy Choices
        </Link>{" "}
        |{" "}
        <Link
          href="/ad-choices"
          color="inherit"
          underline="hover"
          variant="body2"
        >
          Ad Choices
        </Link>
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
