"use client";
import React, { useState, useEffect } from "react";
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
  ReceiptOutlined,
  CancelOutlined,
  StarOutline,
  LogoutOutlined,
} from "@mui/icons-material";
import Banner from "./Banner";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load login status and user details from localStorage on mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  // Update login status in localStorage when it changes
  const updateLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", JSON.stringify(status));
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

  const handleLogout = () => {
    updateLoginStatus(false);
    handleMenuClose();
    localStorage.removeItem("userDetails"); // Clear user details on logout
    console.log("Logged out");
  };

  const navLinks: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Categories", href: "/categories" },
  ];

  const accountMenuItems = [
    { label: "Manage My Account", href: "/profile", icon: <PersonOutline />, visible: isLoggedIn },
    { label: "My Order", href: "/orders", icon: <ReceiptOutlined />, visible: isLoggedIn },
    { label: "My Cancellations", href: "/cancellations", icon: <CancelOutlined />, visible: isLoggedIn },
    { label: "My Reviews", href: "/reviews", icon: <StarOutline />, visible: isLoggedIn },
    { label: "Logout", onClick: handleLogout, icon: <LogoutOutlined />, visible: isLoggedIn },
  ];

  return (
    <>
    <Banner/>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: colors.white,
          // px: { xs: 2, sm: 3, md: 4 },
          // py: 1,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "70px",
        }}
        elevation={0}
      >
        <Banner/>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap", px: { xs: 2, sm: 3, md: 4 },
            rowGap: 2,
            // px: { xs: 0, md: 1 },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={colors.black}
            component="a"
            href="/"
            sx={{ textDecoration: "none", zIndex: 1 }}
          >
            ECART
          </Typography>

          {!isTabletOrMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                zIndex: 1,
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
                  sx={{ mx: 2, minWidth: 200, color: colors.black }}
                />
                <IconButton onClick={handleSearch}>
                  <SearchIcon sx={{ color: colors.black }} />
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
                      <Avatar alt="User Avatar" src="/avatar.png" sx={{ bgcolor: colors.yellow }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{ "& .MuiPaper-root": {  color: colors.primary, backdropFilter: "blur(3px)", // Added blur effect
    backgroundColor: "#676767", } }}
                    >
                      {accountMenuItems.map((item) =>
                        item.visible && (
                          <MenuItem
                            key={item.label}
                            component={item.href ? Link : "div"}
                            href={item.href}
                            onClick={item.onClick}
                            sx={{ "&:hover": { bgcolor: "#444" }, gap:2 }}
                          >
                            {item.icon}
                            {item.label}
                          </MenuItem>
                        )
                      )}
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    href="/login"
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
              <MenuIcon sx={{ color: colors.black }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: "70px" }}>
        <Divider sx={{ borderColor: colors.gray }} />
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { bgcolor: colors.white, color: colors.black } }}
      >
        <Box width={250} p={2}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} component="a" href={link.href}>
                <ListItemText primary={link.label} sx={{ color: colors.black }} />
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
                  color: colors.black,
                }}
                endAdornment={
                  <IconButton onClick={handleSearch}>
                    <SearchIcon sx={{ color: colors.black }} />
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