// ProfileLayout.tsx
"use client";
import { ReactNode, useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./sidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = 280;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px - 80px)" }}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ top: 16, left: 16, zIndex: theme.zIndex.drawer + 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: isMobile ? "none" : "block", // Hide on mobile unless toggled
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              // top: { xs: 64, md: 64 }, // Adjust for header height
             
              position: isMobile ? "fixed" : "relative", // Make it scrollable on desktop
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingBottom: "80px", // Adjust this value based on your footer's height
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
