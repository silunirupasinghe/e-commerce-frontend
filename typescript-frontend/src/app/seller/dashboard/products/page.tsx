"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface Product {
  id: number;
  name: string;
  status: string;
  inventory: string;
  price: string;
  category: string;
  sold: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Havic HV-G-92 Gamepad",
    status: "Active",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Digital",
    sold: "22 Units",
  },
  {
    id: 2,
    name: "GP11 Shooter USB Gamepad",
    status: "Inactive",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Digital",
    sold: "22 Units",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    status: "Inactive",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Digital",
    sold: "22 Units",
  },
  {
    id: 4,
    name: "RGB liquid CPU Cooler",
    status: "Active",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Accessory",
    sold: "22 Units",
  },
  {
    id: 5,
    name: "Havic HV-G-92 Gamepad",
    status: "Active",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Digital",
    sold: "22 Units",
  },
  {
    id: 6,
    name: "AK-900 Wired Keyboard",
    status: "Active",
    inventory: "20 in Stock",
    price: "$192.00",
    category: "Accessory",
    sold: "22 Units",
  },
];

const productImages = [
  { name: "Havic HV-G-92 Gamepad", image: "/images/gamepad2.webp" },
  { name: "RGB liquid CPU Cooler", image: "/images/cooler.webp" },
  { name: "IPS LCD Gaming Monitor", image: "/images/monitor.webp" },
  { name: "AK-900 Wired Keyboard", image: "/images/keyboard.jpg" },
  { name: "GP11 Shooter USB Gamepad", image: "/images/gamepad.jpg" },
];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setProducts(
      initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      )
    );
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (category: string) => {
    setAnchorEl(null);
    if (category) {
      setFilterCategory(category);
      setProducts(
        initialProducts.filter((product) => product.category === category)
      );
    } else {
      setFilterCategory("");
      setProducts(initialProducts);
    }
  };

  const handleAddProducts = () => {
    router.push("/seller/dashboard/products/add-products");
    // toast.success("Product added successfully!");
  };

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const getProductImage = (productName: string): string => {
    const imageObj = productImages.find((img) => img.name === productName);
    return imageObj ? imageObj.image : "";
  };

  return (
    <Box sx={{ alignItems: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link underline="hover" color="black" href="/">
                Home
              </Link>
              <Link underline="hover" color="black" href="/Products">
                Products
              </Link>
            </Breadcrumbs>
            <Typography
              variant="h6"
              color="black"
              fontSize={16}
              paddingLeft="800px"
            >
              Welcome! User
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Typography variant="h5" color="#ffca28" gutterBottom>
              All Products
            </Typography>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid size={{}}>
                  <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{}}>
                  <IconButton onClick={handleFilterClick}>
                    <FilterListOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleFilterClose("")}
                  >
                    <MenuItem onClick={() => handleFilterClose("Digital")}>
                      Digital
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterClose("Physical")}>
                      Physical
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterClose("Accessory")}>
                      Accessory
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterClose("")}>
                      All
                    </MenuItem>
                  </Menu>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleAddProducts}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "#ffca28",
                    fontSize: "15px",
                    width: "130px",
                  }}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ paddingLeft: "80px" }}>
            <Box
              sx={{
                padding: 3,
                border: "solid 1px",
                borderColor: "#7c827d",
                borderRadius: "15px",
                maxWidth: "990px",
              }}
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                sx={{ "& > *": { flexGrow: 1 } }}
              >
                <Grid
                  size={{ xs: 12, sm: 3 }}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                    gutterBottom
                  >
                    Product Overview
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: "#dce0dd",
                      maxWidth: "160px",
                      maxHeight: "70px",
                      border: "solid 1px",
                      borderColor: "#b1b5b2",
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Inventory2OutlinedIcon />
                      <Box sx={{ paddingTop: "8px" }}>
                        <Typography variant="body2" color="textSecondary">
                          Total Products
                        </Typography>
                        <Typography variant="h5" fontSize="20px">
                          15
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: "#dce0dd",
                      maxWidth: "195px",
                      maxHeight: "70px",
                      border: "solid 1px",
                      borderColor: "red",
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Inventory2OutlinedIcon />
                      <Box sx={{ paddingTop: "8px" }}>
                        <Typography variant="body2" color="textSecondary">
                          Low Stock Products
                        </Typography>
                        <Typography variant="h5" fontSize="20px">
                          3
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: "#dce0dd",
                      maxWidth: "200px",
                      maxHeight: "70px",
                      border: "solid 1px",
                      borderColor: "#b1b5b2",
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "30px",
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <AttachMoneyOutlinedIcon />
                      <Box sx={{ paddingTop: "8px" }}>
                        <Typography variant="body2" color="textSecondary">
                          Total Inventory Value
                        </Typography>
                        <Typography variant="h5" fontSize="20px">
                          $16,560.00
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "30px",
              width: "950px",
              marginLeft: "100px",
              marginBottom: "80px",
            }}
          >
            <Table sx={{ minWidth: "100%", textAlign: "center" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontSize: "17px", textAlign: "center" }}>
                    Product
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px" }}>Status</TableCell>
                  <TableCell sx={{ fontSize: "17px" }}>Inventory</TableCell>
                  <TableCell sx={{ fontSize: "17px" }}>Price</TableCell>
                  <TableCell sx={{ fontSize: "17px" }}>Category</TableCell>
                  <TableCell sx={{ fontSize: "17px" }}>Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <StyledTableRow
                    key={product.id}
                    onClick={() => handleRowClick(product)}
                    style={{ cursor: "pointer" }}
                    sx={{
                      backgroundColor: "#fff",
                      border: "2px solid",
                      borderColor: "#d4d9d5",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "17px",
                        gap: 1,
                      }}
                    >
                      {getProductImage(product.name) && (
                        <img
                          src={getProductImage(product.name)}
                          alt={product.name}
                          style={{ width: "70px", height: "60px" }}
                        />
                      )}
                      {product.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          backgroundColor:
                            product.status === "Active" ? "#ffeb3b" : "#bdbdbd",
                          color: "#000",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          width: "80px",
                        }}
                      >
                        {product.status}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ fontWeight: "bold" }}>
              Product Details
            </DialogTitle>
            <DialogContent>
              {selectedProduct && (
                <>
                  <p>
                    <strong>Name:</strong> {selectedProduct.name}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedProduct.status}
                  </p>
                  <p>
                    <strong>Inventory:</strong> {selectedProduct.inventory}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedProduct.price}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedProduct.category}
                  </p>
                  <p>
                    <strong>Sold:</strong> {selectedProduct.sold}
                  </p>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                sx={{ color: "#464a47", fontWeight: "bold" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <ToastContainer />
        </Container>
      </Box>
    </Box>
  );
}
