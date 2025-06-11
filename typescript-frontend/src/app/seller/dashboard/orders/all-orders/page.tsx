// app/seller/dashboard/orders/all-orders/page.tsx
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import colors from "@/theme/color";

// Define the Order type
interface Order {
  id: string;
  date: string;
  customer: string;
  details: string;
  total: string;
  status: "Processing" | "Shipped" | "Delivered" | "Return";
  payment: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  flatBuilding?: string;
  cityState?: string;
  postalCode?: string;
  paymentMethod?: string;
  discount?: string;
  deliveryFee?: string;
  platformFee?: string;
  creditCardCharge?: string;
  createdAt?: string;
  history?: { status: string; date: string; completed: boolean }[];
  items?: { name: string; quantity: number; price: string; total: string }[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  my: 200,
  width: "98%",
}));

const Header = styled("h2")(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
  fontFamily: "Poppins, sans-serif",
  color: colors.primary,
}));

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const page: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const router = useRouter();

  const orders: Order[] = [
    {
      id: "253292", // Removed the '#' for consistency
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Paid",
      email: "johndoe@gmail.com",
      phone: "+94 124314422",
      addressLine: "14/A, Park Street",
      flatBuilding: "Flat / Building Name",
      cityState: "James Court, Colombo 05",
      postalCode: "10300",
      paymentMethod: "Card - 23485",
      discount: "$10.00",
      deliveryFee: "$85.00",
      platformFee: "$22.00",
      creditCardCharge: "$6.25",
      createdAt: "Sun, May 10 2025 09:59AM",
      history: [
        { status: "Pickup being Prepared", date: "24 Apr 2025", completed: true },
        { status: "Dispatched from Warehouse", date: "24 Apr 2025", completed: true },
        { status: "Shipped", date: "", completed: false },
        { status: "Delivered", date: "", completed: false },
      ],
      items: [
        { name: "IPS LCD Gaming Monitor dsfdsfs", quantity: 2, price: "$100.85", total: "$201.70" },
        { name: "IPS LCD Gaming Monitor dsfdsfs", quantity: 2, price: "$100.85", total: "$201.70" },
        { name: "IPS LCD Gaming Monitor dsfdsfs", quantity: 2, price: "$100.85", total: "$201.70" },
      ],
    },
    {
      id: "021", // Removed the '#' for consistency
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Delivered",
      payment: "Paid",
    },
    {
      id: "021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Return",
      payment: "Paid",
    },
    {
      id: "021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Delivered",
      payment: "Paid",
    },
  ];

  const getStatusColor = (status: Order["status"]): string => {
    switch (status) {
      case "Processing":
        return "#ff9800"; // Orange
      case "Shipped":
        return "#4caf50"; // Green
      case "Delivered":
        return "#4caf50"; // Green
      case "Return":
        return "#f44336"; // Red
      default:
        return "inherit";
    }
  };

  const filteredOrders: Order[] =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", px: 2, mt: 2 }}>
        <Header>All Orders</Header>
        <FilterContainer>
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
          />
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as string)}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </FilterContainer>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow
                key={index}
                onClick={() => router.push(`/seller/dashboard/orders/all-orders/${order.id}`)} // Navigate to /order/[id]
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell>#{order.id}</TableCell> {/* Add # for display */}
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.details}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <span style={{ color: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.payment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

export default page;