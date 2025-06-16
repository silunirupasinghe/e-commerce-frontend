"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import colors from "@/theme/color";
import { color } from "chart.js/helpers";
const CouponsPage = () => {
  const router = useRouter();

  const [coupons] = useState([
    {
      id: 1,
      title: "For First Time Login",
      code: "First20",
      discount: "Discount 20%",
      details: "All products at online store",
      validUntil: "23 April 2025",
      active: true,
    },
    {
      id: 2,
      title: "For First Time Login",
      code: "First20",
      discount: "Discount 20%",
      details: "All products at online store",
      validUntil: "23 April 2025",
      active: true,
    },
    {
      id: 3,
      title: "For First Time Login",
      code: "First20",
      discount: "Discount 20%",
      details: "All products at online store",
      validUntil: "23 April 2025",
      active: true,
    },
    {
      id: 4,
      title: "For First Time Login",
      code: "First20",
      discount: "Discount 20%",
      details: "All products at online store",
      validUntil: "23 April 2025",
      active: false,
    },
  ]);

  const [filter, setFilter] = useState("All Promo");
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesFilter =
      filter === "All Promo" ||
      (filter === "Active" && coupon.active) ||
      (filter === "Expired" && !coupon.active);
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filterOption: string) => {
    setFilter(filterOption);
    setAnchorEl(null);
  };

  const handleAddCoupon = () => {
    router.push("/seller/dashboard/coupons/create-coupons");
  };

  return (
   <Box sx={{ alignItems: 'center', minHeight: "100vh", overflowX: 'hidden', maxWidth: '1600px'}}>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, maxWidth: '1600px', mx: 'auto' }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 2, md: 4 }, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link underline="hover" color="black" href="/">
                Home
              </Link>
              <Link underline="hover" color="black" href="/">
                Coupons & Offers
              </Link>
              <Link underline="hover" color="black" href="/Offers">
                Coupons
              </Link>
            </Breadcrumbs>
            <Typography
              variant="h6"
              color="black"
              fontSize={16}
            >
              Welcome! User
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Typography variant="h5" color="#ffca28" gutterBottom>
              Coupons
            </Typography>

            <Grid size={{ xs: 12, md: 6 }} >
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid size={{}}>
                  <TextField
                    placeholder="Search"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid>
                  <IconButton onClick={handleFilterClick} color="default">
                    <FilterListOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleFilterClose("All Promo")}>
                      All Promo
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterClose("Active")}>
                      Active
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterClose("Expired")}>
                      Expired
                    </MenuItem>
                  </Menu>
                </Grid>
                <Grid >
                  <Button
                    variant="contained"
                    onClick={handleAddCoupon}
                    sx={{
                      textTransform: "none",
                      color: "black",
                      backgroundColor: "#ffca28",
                      fontSize: "15px",
                      width: "140px",
                    }}
                  >
                    Add Coupons
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Stack direction="row" spacing={3} mb={2}>
            <Button
              variant={filter === "All Promo" ? "contained" : "outlined"}
              onClick={() => setFilter("All Promo")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                minWidth: 100,
                color: "black",
                border: "solid 1px",
                borderColor: "black",
                backgroundColor: "transparent",
              }}
              startIcon={<ConfirmationNumberOutlinedIcon />}
            >
              All Promo
            </Button>
            <Button
              variant={filter === "Active" ? "contained" : "outlined"}
              onClick={() => setFilter("Active")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                minWidth: 100,
                color: "black",
                border: "solid 1px",
                borderColor: "black",
                backgroundColor: "transparent",
              }}
              startIcon={<TaskAltOutlinedIcon />}
            >
              Active
            </Button>
            <Button
              variant={filter === "Expired" ? "contained" : "outlined"}
              onClick={() => setFilter("Expired")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                minWidth: 100,
                color: "black",
                border: "solid 1px",
                borderColor: "black",
                backgroundColor: "transparent",
              }}
              startIcon={<CancelOutlinedIcon />}
            >
              Expired
            </Button>
          </Stack>

          <Grid size={{md:3, sm:6}} sx={{display:'flex', flexWrap:'wrap'}} gap={3}>
            {filteredCoupons.map((coupon) => (
              <Card
                key={coupon.id}
                sx={{
                  p: 1,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  backgroundColor: colors.gray,
                  width: "320px",
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        padding: 1,
                        borderRadius: 5,
                        backgroundColor: "#63605f",
                        color: "white",
                        fontSize: "13.5px",
                        fontWeight: "bold",
                      }}
                    >
                      {coupon.title}
                    </Typography>
                    <Chip
                      label={coupon.code}
                      icon={<LocalOfferOutlinedIcon />}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#63605f",
                        fontWeight: "bold",
                      }}
                    />
                  </Stack>
                  <Typography
                    sx={{
                      paddingTop: "10px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {coupon.discount}
                  </Typography>
                  <Typography
                    sx={{ paddingTop: "8px", color: "black", fontSize: "14px" }}
                  >
                    {coupon.details}
                  </Typography>
                  <Divider
                    sx={{ my: 1, borderColor: "#63605f", paddingTop: "10px" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "14px", color: "black" }}
                  >
                    Valid Until {coupon.validUntil}
                  </Typography>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip
                      label={coupon.active ? "Active" : "Expired"}
                      color={coupon.active ? "success" : "error"}
                      icon={
                        coupon.active ? (
                          <TaskAltOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      sx={{
                        backgroundColor: coupon.active ? "#ffca28" : "red",
                        color: coupon.active ? "black" : "white",
                        fontSize: "16px",
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CouponsPage;
