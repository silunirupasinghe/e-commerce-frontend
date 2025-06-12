import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  InputBase,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
//  import ReviewBreakdownSection from "./reviews/page"; // Import the component we created earlier

const Dashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          <Box component="span" sx={{ color: "#ffc107" }}>
            Welcome Back,
          </Box>{" "}
          William!!
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search..."
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            sx={{
              backgroundColor: "#fff",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              boxShadow: 1,
              mr: 2,
            }}
          />
          <Typography variant="body2" color="gray">
            Welcome! <Box component="span" sx={{ color: "#ffc107" }}>User</Box>
          </Typography>
        </Box>
      </Box>

      {/* Overview Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        {[
          { icon: <ShoppingCartOutlinedIcon />, title: "All Orders", value: 56 },
          { icon: <Inventory2OutlinedIcon />, title: "Total Products", value: 15 },
          { icon: <MonetizationOnOutlinedIcon />, title: "Total Inventory Value", value: "$ 16,560.00" },
          { icon: <PendingActionsOutlinedIcon />, title: "Pending Orders", value: 22 },
        ].map((item, i) => (
          <Card
            key={i}
            sx={{
              p: 2,
              minWidth: 200,
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: 1,
            }}
          >
            {item.icon}
            <Box>
              <Typography fontWeight="bold" variant="body2" color="text.secondary">
                {item.title}
              </Typography>
              <Typography fontWeight="bold">{item.value}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Chart and Sales Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight="bold">Category wise Sales</Typography>
              <Button size="small" endIcon={<ArrowDropDownIcon />}>
                Month
              </Button>
            </Box>
            {/* Chart Placeholder */}
            <Box sx={{ height: 200, backgroundColor: "#eee", borderRadius: 2 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight="bold">Monthly Sales</Typography>
              <Button size="small" endIcon={<ArrowDropDownIcon />}>
                Month
              </Button>
            </Box>
            <Box sx={{ height: 200, backgroundColor: "#eee", borderRadius: 2 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight="bold">Competitor Analysis</Typography>
              <Button size="small" endIcon={<ArrowDropDownIcon />}>
                Month
              </Button>
            </Box>
            <Box sx={{ height: 200, backgroundColor: "#f0f0f0", borderRadius: 2 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <ReviewBreakdownSection /> */}
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Latest Reviews
            </Typography>
            {[...Array(2)].map((_, i) => (
              <Card key={i} variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Typography fontWeight="bold">John Doe</Typography>
                <Typography variant="body2" color="text.secondary">
                  Comfort is top-notch with plush earpads, though they can feel slightly warm during extended use. Battery life is impressive at 30+.
                </Typography>
              </Card>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
