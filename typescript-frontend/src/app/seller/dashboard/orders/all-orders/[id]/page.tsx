// src/app/seller/dashboard/orders/all-orders/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
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
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import colors from "@/theme/color";
import { color } from "chart.js/helpers";

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
  history: { status: string; date: string; completed: boolean }[];
  items?: { name: string; quantity: number; price: string; total: string }[];
}

// Load orders from localStorage or use default data
const loadOrders = (): Order[] => {
  const savedOrders = localStorage.getItem("orders");
  return savedOrders ? JSON.parse(savedOrders) : [
    {
      id: "253292",
      date: "25-04-2025",
      customer: "John Doe",
      details: "model view",
      total: "$676.00",
      status: "Shipped",
      payment: "Paid",
      email: "johndoe@gmail.com",
      phone: "+94 124314422",
      addressLine: "14/A, Park Street",
      flatBuilding: "James Court",
      cityState: "Colombo 05",
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
        { status: "Shipped", date: "24 Apr 2025", completed: true },
        { status: "Delivered", date: "", completed: false },
      ],
      items: [
        { name: "IPS LCD Gaming Monitor with dsfdsfw", quantity: 2, price: "$100.85", total: "$201.70" },
        { name: "IPS LCD Gaming Monitor with dsfdsfw", quantity: 2, price: "$100.85", total: "$201.70" },
        { name: "IPS LCD Gaming Monitor with dsfdsfw", quantity: 2, price: "$100.85", total: "$201.70" },
      ],
    },
    // ... (other orders remain unchanged)
  ];
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  width: "98%",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: "55px",
    left: "8px",
    width: "2px",
    backgroundColor: colors.gray, // Light gray line
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  position: "relative",
  paddingLeft: theme.spacing(3),
}));

const TimelineDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "completed",
})<{ completed: boolean }>(({ theme, completed }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: completed ? colors.primary : colors.gray, // Yellow for completed, gray for pending
  position: "absolute",
  left: "3px", // Adjusted to align with the single line
  top: "6px",
  zIndex: 1,
}));

const EditableHistory: React.FC<{ history: { status: string; date: string; completed: boolean }[]; onSave: (updatedHistory: { status: string; date: string; completed: boolean }[]) => void }> = ({ history, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedHistory, setEditedHistory] = useState(history);

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const newHistory = [...editedHistory];
    newHistory[index] = { ...newHistory[index], [field]: value };
    setEditedHistory(newHistory);
  };

  const handleSave = () => {
    onSave(editedHistory);
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 2, border: `1px solid ${colors.gray}`, borderRadius: "8px", backgroundColor: "#FFF" }}>
      <DetailHeader variant="subtitle1">Order History</DetailHeader>
      <TimelineContainer>
        {editMode ? (
          <>
            {editedHistory.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineDot completed={item.completed} />
                <Box sx={{ flex: 1 }}>
                  <DetailText sx={{ fontWeight: item.completed ? "bold" : "normal", color: item.completed ? "#000" : "#757575" }}>
                    {item.status}
                  </DetailText>
                  <TextField
                    label="Date"
                    value={item.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
                  />
                  <FormControlLabel
                    control={<Switch checked={item.completed} onChange={(e) => handleChange(index, "completed", e.target.checked)} />}
                    label="Completed"
                    sx={{ mb: 1,  "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
                  />
                </Box>
              </TimelineItem>
            ))}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1, backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#1565C0" } }}>Save</Button>
              <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ borderColor: "#1976D2", color: "#1976D2", "&:hover": { borderColor: "#1565C0", color: "#1565C0" } }}>Cancel</Button>
            </Box>
          </>
        ) : (
          <>
            {history.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineDot completed={item.completed} />
                {item.completed && <CheckCircleIcon sx={{ color: colors.primary, position: "absolute", left: "2px", top: "4px", fontSize: "16px", zIndex: 2 }} />}
                <Box sx={{ flex: 1 }}>
                  <DetailText sx={{ fontWeight: item.completed ? "bold" : "normal", color: item.completed ? "#000" : "#757575" }}>
                    {item.status}
                  </DetailText>
                  <DetailText sx={{ color: "text.secondary" }}>
                    {item.date || "_"}
                  </DetailText>
                </Box>
              </TimelineItem>
            ))}
            <Button variant="outlined" onClick={() => setEditMode(true)} sx={{ mt: 1, borderColor: "#1976D2", color: "#1976D2", "&:hover": { borderColor: "#1565C0", color: "#1565C0" } }}>
              Edit History
            </Button>
          </>
        )}
      </TimelineContainer>
    </Box>
  );
};

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const loadedOrders = loadOrders();
    const foundOrder = loadedOrders.find((o) => o.id === id);
    setOrder(foundOrder);
  }, [id]);

  useEffect(() => {
    if (order) {
      const updatedOrders = loadOrders().map(o => o.id === order.id ? order : o);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  }, [order]);

  if (!order) {
    return <Typography>Order not found</Typography>;
  }

  const handleSaveHistory = (updatedHistory: { status: string; date: string; completed: boolean }[]) => {
    setOrder({ ...order, history: updatedHistory });
  };

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, p: 1, borderBottom: `1px solid ${colors.gray}` }}>
        <DetailHeader variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ color: colors.primary, mr: 2 }}>Order Number #{order.id}</Box>
          <Box>| Order Created:</Box>
          <Box sx={{ color: "#757575", mx: 1 }}>{order.createdAt || order.date}</Box>
        </DetailHeader>
        <IconButton onClick={() => router.push("/seller/dashboard/orders/all-orders")} sx={{ color: "#757575" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, mx: 0 }}>
        {/* Customer Details */}
        <Box sx={{ flex: 1, border: `1px solid ${colors.gray}`, p: 2, borderRadius: "8px", backgroundColor: "#FFF", minWidth: "auto" }}>
          <DetailHeader variant="subtitle1">Customer Details</DetailHeader>
          <DetailText>Name: {order.customer || "N/A"}</DetailText>
          <DetailText>Email: {order.email || "N/A"}</DetailText>
          <DetailText>Phone: {order.phone || "N/A"}</DetailText>
        </Box>

        {/* Delivery Address */}
        <Box sx={{ flex: 1, border: `1px solid ${colors.gray}`, p: 2, borderRadius: "8px", backgroundColor: "#FFF", minWidth: "30%" }}>
          <DetailHeader variant="subtitle1">Delivery Address</DetailHeader>
          <DetailText>Address Line: {order.addressLine || "N/A"}</DetailText>
          <DetailText>Flat / Building: {order.flatBuilding || "N/A"}</DetailText>
          <DetailText>City / State: {order.cityState || "N/A"}</DetailText>
          <DetailText>Postal Code: {order.postalCode || "N/A"}</DetailText>
        </Box>

        {/* Order History */}
        <Box sx={{ flex: 1, minWidth: "30%" }}>
          <EditableHistory history={order.history} onSave={handleSaveHistory} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mx: 0 }}>
        {/* Items Summary */}
        <Box sx={{ flex: 2, border: `1px solid ${colors.gray}`, p: 2, borderRadius: "8px", backgroundColor: "#FFF" }}>
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
              {order.items?.length ? (
                order.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No items available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        {/* Order Summary */}
        <Box sx={{ flex: 1, border: `1px solid ${colors.gray}`, p: 2, borderRadius: "8px", backgroundColor: "#FFF" }}>
          <DetailHeader variant="subtitle1">Order Summary</DetailHeader>
          <DetailText>Payment: {order.paymentMethod || "N/A"}</DetailText>
          <DetailText>Sub Total: {order.total || "$0.00"}</DetailText>
          <DetailText>Discount: {order.discount || "$0.00"}</DetailText>
          <DetailText>Delivery Fee: {order.deliveryFee || "$0.00"}</DetailText>
          <DetailText>Platform Fee (5%): {order.platformFee || "$0.00"}</DetailText>
          <DetailText>Credit Card Charge (2.5%): {order.creditCardCharge || "$0.00"}</DetailText>
          <Divider sx={{ my: 1 }} />
          <DetailText sx={{ fontWeight: "bold" }}>
            Eligible Total: $
            {(
              (parseFloat(order.total.replace(/[^0-9.-]+/g, "") || "0") || 0) +
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