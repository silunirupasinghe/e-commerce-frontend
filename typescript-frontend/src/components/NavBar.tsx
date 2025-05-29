"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "@/theme/color";
import Link from "next/link";

import {
  FavoriteBorderOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isLoggedIn: boolean = true;
  const user: { name: string; avatar: string } = {
    name: "John Doe",
    avatar: "/avatar.png",
  };

  const handleSearch = (): void => {
    console.log("Searching for:", searchQuery);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const navLinks: { label: string; href: string }[] = [
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: colors.white, px: { xs: 2, sm: 3, md: 4 }, py: 1 }}
        elevation={0}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 2,
            px: { xs: 0, md: 1 },
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black" component="a" href="/" sx={{ textDecoration: "none" }}>
            ECART
          </Typography>

          {!isTabletOrMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box display="flex" gap={2}>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    sx={{ color: colors.black }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: colors.lightGray,
                  px: 1.5,
                  borderRadius: 1,
                }}
              >
                <InputBase
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mx: 2, minWidth: 200 }}
                />
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Box>

              <Box>
                <IconButton href="/wishlist">
                  <FavoriteBorderOutlined sx={{ color: colors.red }} />
                </IconButton>
                <IconButton href="/cart">
                  <ShoppingCartOutlined sx={{ color: colors.primary }} />
                </IconButton>
              </Box>

              <Box>
                {isLoggedIn ? (
                  <>
                    <IconButton onClick={handleMenuOpen}>
                      <Avatar alt={user.name} src={user.avatar} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem href="/profile" component={Link} >
                        <PersonOutline /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    href="/signup"
                    sx={{ bgcolor: colors.primary, color: colors.buttonText }}
                  >
                    Sign Up
                  </Button>
                )}
              </Box>
            </Box>
          )}

          {isTabletOrMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: "64px" }}>
        <Divider sx={{ borderColor: colors.gray }} />
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box width={250} p={2}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} component="a" href={link.href}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <ListItem>
              <InputBase
                fullWidth
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: "#f1f1f1",
                  px: 1,
                  borderRadius: 2,
                  mt: 2,
                }}
                endAdornment={
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
