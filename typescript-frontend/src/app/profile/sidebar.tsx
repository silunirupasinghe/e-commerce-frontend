"use client";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import colors from "@/theme/color";

// Load Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      section: "Manage My Account",
      items: [
        { label: "My Profile", href: "/profile" },
        { label: "Address Book", href: "/profile/address-book" },
        { label: "My Payment Options", href: "/profile/payment-options" },
      ],
    },
    {
      section: "My Orders",
      items: [
        { label: "My Returns", href: "/profile/returns" },
        { label: "My Cancellations", href: "/profile/cancellations" },
      ],
    },
    {
      section: "My Wishlist",
      items: [{ label: "Wishlist", href: "/profile/wishlist" }],
    },
  ];

  return (
    <Box className={poppins.className}
      sx={{
        width: "100%",
        p: 2,
        pl: 5,
        overflowX: "hidden", // Prevent horizontal scroll
        boxSizing: "border-box", // Ensure padding doesn't cause overflow
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
        <Link href="/" passHref>
          <Typography
            sx={{
              
              fontSize: "14px",
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Home
          </Typography>
        </Link>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "text.secondary",
          }}
        >
          /
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "text.primary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          My Account
        </Typography>
      </Box>

      {/* Navigation Items */}
      {navItems.map((section, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "medium",
              color: "text.primary",
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {section.section}
          </Typography>
          <List sx={{ p: 0 }}>
            {section.items.map((item, idx) => (
              item.label && (
                <ListItem
                  key={idx}
                  component={Link}
                  href={item.href}
                  sx={{
                    p: 0,
                    mb: 1,
                    pl:3,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        color:
                          pathname === item.href ? colors.primary : "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                </ListItem>
              )
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;