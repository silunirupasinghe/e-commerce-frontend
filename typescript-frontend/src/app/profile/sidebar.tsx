"use client";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import colors from "@/theme/color";

// Load Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
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
      items: [], href: "/profile/orders"
    },
    {
      section: "My Wishlist",
      items: [], href: "/profile/my-wishlist"
    },
    {
      section: "My Reviews",
      items: [], href: "/profile/my-reviews"
    },
  ];

  return (
    <Box
      className={poppins.className}
      sx={{
        width: "100%",
        p: 2,
        pl: 5,
        mb: 2,
        overflowX: "hidden",
        boxSizing: "border-box",
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
            fontSize: "14px",
            color: "text.secondary",
          }}
        >
          /
        </Typography>
        <Typography
          sx={{
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
        <Box key={index}>
          {section.items.length === 0 ? (
            <ListItem
              component={Link}
              href={section.href || "#"} // Default to "#" if no href
              sx={{
                p: 0,
                "&:hover": { backgroundColor: "action.hover" },
                ...(pathname === section.href && {
                  "& .MuiTypography-root": { color: colors.primary },
                }),
              }}
            >
              <ListItemText
                primary={section.section}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "16px",
                    fontWeight: 500,
                    color: pathname === section.href ? colors.primary : "text.primary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </ListItem>
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
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
                  <ListItem
                    key={idx}
                    component={Link}
                    href={item.href}
                    sx={{
                      p: 0,
                      mb: 0.5,
                      pl: 2,
                      "&:hover": { backgroundColor: "action.hover" },
                      ...(pathname === item.href && {
                        "& .MuiTypography-root": { color: colors.primary },
                      }),
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "14px",
                          color: pathname === item.href ? colors.primary : "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;