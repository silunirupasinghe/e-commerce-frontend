"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Lock, Edit, Delete, Verified, Wallet } from "@mui/icons-material";
import colors from "@/theme/color"; // Assuming this exists in your project

// Define TypeScript interface for payment method
interface PaymentMethod {
  id: number;
  type: string;
  cardNumber: string;
  name: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "Mastercard",
      cardNumber: "**** **** **** 3751",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      cardNumber: "**** **** **** 1791",
      name: "John Doe",
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    type: "",
    cardNumber: "",
    name: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCard({ type: "", cardNumber: "", name: "" }); // Reset form
  };

  const handleAddCard = () => {
    setPaymentMethods([
      ...paymentMethods,
      { ...newCard, id: Date.now(), isDefault: false },
    ]);
    handleCloseDialog(); // Close dialog after adding
  };

  return (
    <Box
      sx={{
        px: { md: 10, xs: 2 },
        py: { md: 4, xs: 2 },
        maxWidth: 800,
        mx: "auto",
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ color: "#ffcc00", flexGrow: 1 }}>
          Your payment methods
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Lock sx={{ fontSize: "small", color: colors.green, mt: 0.5 }} />
          <Typography variant="body2" sx={{ color: colors.green }} gutterBottom>
            All data is encrypted
          </Typography>
        </Box>
      </Box>

      {/* Payment Methods List */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}
      >
        {paymentMethods.map((method) => (
          <Box
            key={method.id}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              width: { md: 250, xs: "100%" }, // Fixed width for cards on medium screens
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">{method.type}</Typography>
              <Box
                component="img"
                src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png"
                alt="Mastercard"
                sx={{ width: 24, height: 18 }}
              />
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {method.cardNumber}
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mt: 1 }}>
              {method.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <Checkbox
                checked={method.isDefault}
                onChange={() => handleSetDefault(method.id)}
              />
              <Typography
                variant="body2"
                color={method.isDefault ? "primary" : "grey.500"}
              >
                {method.isDefault ? "Default" : "Default"}
              </Typography>
              <IconButton
                onClick={() => console.log("Edit card", method.id)}
                size="small"
              >
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(method.id)} size="small">
                <Delete color="error" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Save Cards Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        
        <Typography variant="body1" color={colors.black}>
          Save cards for faster checkout
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
          <Verified sx={{ fontSize: "small", color: colors.green , mt:0.7}} />
          <Typography variant="body2" color={colors.textGray}>
            Secure Payment
          </Typography>
        </Box>
      </Box>

      {/* Add New Card Button */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{
            bgcolor: "#ffcc00",
            color: colors.black,
            "&:hover": { bgcolor: "#e6b800" },
          }}
        >
          + Add a credit or debit card
        </Button>
      </Box>

      {/* Supported Payment Logos */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Box
          component="img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-JdvERxNmetMNVTdalsk51FtT7FT3HOf6A&s"
          alt="Visa"
          sx={{ width: 40, height: 30 }}
        />
        <Box
          component="img"
          src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png"
          alt="Mastercard"
          sx={{ width: 40, height: 30 }}
        />
        <Box
          component="img"
          src="https://1000logos.net/wp-content/uploads/2017/05/Color-Paypal-Logo.jpg"
          alt="PayPal"
          sx={{ width: 40, height: 30 }}
        />
        <Box
          component="img"
          src="https://static-00.iconduck.com/assets.00/maestro-icon-512x396-vptgxibs.png"
          alt="Maestro"
          sx={{ width: 40, height: 30 }}
        />
      </Box>

      {/* Dialog for adding new card */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Type"
            value={newCard.type}
            onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="Card Number"
            value={newCard.cardNumber}
            onChange={(e) =>
              setNewCard({ ...newCard, cardNumber: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Name on Card"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddCard}
            disabled={!newCard.type || !newCard.cardNumber || !newCard.name}
            sx={{
              bgcolor: "#ffcc00",
              color: "black",
              "&:hover": { bgcolor: "#e6b800" },
            }}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}