// app/order/[id]/page.tsx
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  IconButton,
  Box,
  styled,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
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

const orders: Order[] = [
  {
    id: "253292", // Consistent with OrdersTable
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
    id: "021", // Consistent with OrdersTable
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  my: 200,
  width: "98%",
}));

const DetailHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  fontFamily: "Poppins, sans-serif",
 
}));

const DetailText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  marginBottom: theme.spacing(0.5),
}));

const HistoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  "&::before": {
    content: '""',
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    marginRight: theme.spacing(1),
  },
}));

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <Typography>Order not found</Typography>;
  }

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <DetailHeader variant="h6">
            <Box></Box>
          Order Number #{order.id} | Order Created: {order.createdAt || order.date}
        </DetailHeader>
        <IconButton onClick={() => router.push("/seller/dashboard/orders/all-orders")}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 3, mb: 2, mx:2 }}>
        {/* Customer Details */}
        <Box sx={{ flex: "1 1 30%" , border: `2px solid ${colors.gray}`, padding: 2, borderRadius: 2 }}>
          <DetailHeader variant="subtitle1">Customer Details</DetailHeader>
          <DetailText>Name: {order.customer}</DetailText>
          <DetailText>Email: {order.email || "N/A"}</DetailText>
          <DetailText>Phone: {order.phone || "N/A"}</DetailText>
        </Box>

        {/* Delivery Address */}
        <Box sx={{ flex: "1 1 30%", border: `2px solid ${colors.gray}` , padding: 2, borderRadius: 2 }}>
          <DetailHeader variant="subtitle1">Delivery Address</DetailHeader>
          <DetailText>Address Line: {order.addressLine || "N/A"}</DetailText>
          <DetailText>Flat / Building: {order.flatBuilding || "N/A"}</DetailText>
          <DetailText>City / State: {order.cityState || "N/A"}</DetailText>
          <DetailText>Postal Code: {order.postalCode || "N/A"}</DetailText>
        </Box>

        {/* Order History */}
        <Box sx={{ flex: "1 1 30%", border: `2px solid ${colors.gray}`, padding: 2, borderRadius: 2 }}>
          <DetailHeader variant="subtitle1">Order History</DetailHeader>
          {order.history?.map((item, idx) => (
            <HistoryItem key={idx}>
              <Box>
                <DetailText sx={{ fontWeight: item.completed ? "bold" : "normal" }}>
                  {item.status}
                </DetailText>
                <DetailText sx={{ color: "text.secondary" }}>{item.date || "Pending"}</DetailText>
              </Box>
            </HistoryItem>
          ))}
        </Box>
      </Box>



      <Box sx={{ display: "flex", gap: 2, mx:2, my:2 }}>
        {/* Items Summary */}
        <Box sx={{ flex: "1 1 65%", border: `2px solid ${colors.gray}`, padding: 2, borderRadius: 2 }}>
          <DetailHeader variant="subtitle1">Items Summary</DetailHeader>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Order Summary */}
        <Box sx={{ flex: "1 1 30%", border: `2px solid ${colors.gray}`, padding: 2, borderRadius: 2 }}>
          <DetailHeader variant="subtitle1">Order Summary</DetailHeader>
          <DetailText>Payment: {order.paymentMethod || "N/A"}</DetailText>
          <DetailText>Sub Total: ${(parseFloat(order.total.replace(/[^0-9.-]+/g, "")) || 0).toFixed(2)}</DetailText>
          <DetailText>Discount: {order.discount || "N/A"}</DetailText>
          <DetailText>Delivery Fee: {order.deliveryFee || "N/A"}</DetailText>
          <DetailText>Platform Fee (5%): {order.platformFee || "N/A"}</DetailText>
          <DetailText>Credit Card Charge (2.5%): {order.creditCardCharge || "N/A"}</DetailText>
          <Divider sx={{ my: 1 }} />
          <DetailText sx={{ fontWeight: "bold" }}>
            Eligible Total: ${(
              (parseFloat(order.total.replace(/[^0-9.-]+/g, "")) || 0) +
              (parseFloat(order.deliveryFee?.replace(/[^0-9.-]+/g, "") || "0") || 0) +
              (parseFloat(order.platformFee?.replace(/[^0-9.-]+/g, "") || "0") || 0) +
              (parseFloat(order.creditCardCharge?.replace(/[^0-9.-]+/g, "") || "0") || 0) -
              (parseFloat(order.discount?.replace(/[^0-9.-]+/g, "") || "0") || 0)
            ).toFixed(2)}
          </DetailText>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default OrderDetail;