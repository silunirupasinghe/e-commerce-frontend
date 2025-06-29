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

const ProcessingOrders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("Processing"); // Default to Processing
  const [paymentFilter, setPaymentFilter] = useState<string>("All"); // Default to All for payment status

  const orders: Order[] = [
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Paid",
    },
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Payment Pending",
    },
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Payment Pending",
    },
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Paid",
    },
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Paid",
    },
    {
      id: "#021",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "Rs. 5,000",
      status: "Processing",
      payment: "Paid",
    },
  ];

  const getPaymentColor = (payment: Order["payment"]): string => {
    switch (payment) {
      case "Paid":
        return "#f44336"; // Orange
      case "Payment Pending":
        return "#4caf50"; // Green
      default:
        return "inherit";
    }
  };

  const filteredOrders: Order[] = orders.filter((order) => {
    const matchesPayment =
      paymentFilter === "All" || order.payment === paymentFilter;
    return matchesPayment;
  });

  return (
    <StyledPaper elevation={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          px: 2,
          mt: 2,
        }}
      >
        <Header>Processing Orders</Header>
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
                <TableCell> {order.status} </TableCell>
                <TableCell>
                  <span style={{ color: getPaymentColor(order.payment) }}>
                    {order.payment}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

export default ProcessingOrders;
