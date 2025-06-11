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
  color: colors.primary, // Yellow as per the image
}));

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ShippedOrders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("Shipped"); // Default to Shipped
  const [paymentFilter, setPaymentFilter] = useState<string>("All"); // Default to All for payment status

  const orders: Order[] = [
    {
      id: "#022",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "#023",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Payment Pending",
    },
    {
      id: "#024",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Payment Pending",
    },
    {
      id: "#025",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "#026",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Shipped",
      payment: "Payment Pending",
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

  const filteredOrders: Order[] = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "All" || order.payment === paymentFilter;
    return matchesStatus && matchesPayment;
  });

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", px: 2, mt: 2 }}>
        <Header>Shipped Orders</Header>
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
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as string)}
              label="Payment Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Payment Pending">Payment Pending</MenuItem>
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
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
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

export default ShippedOrders;