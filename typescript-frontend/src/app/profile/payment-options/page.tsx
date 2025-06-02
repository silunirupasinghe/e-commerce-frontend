// PaymentMethodsPage.tsx
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
import { Lock, Edit, Delete } from "@mui/icons-material";
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
      cardNumber: "**** **** **** 3751",
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
        mx: { md: "auto", xs: "0" },
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
          <Lock sx={{ fontSize: "small", color: colors.green }} /> {/* Changed size to fontSize */}
          <Typography
            variant="body2"
            sx={{ color: colors.green }}
            gutterBottom
          >
            All data will be encrypted
          </Typography>
        </Box>
      </Box>

      {/* Payment Methods List */}
      {paymentMethods.map((method) => (
        <Box
          key={method.id}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 1,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">{method.type}</Typography>
            <Box>
              <Typography variant="body1">{method.cardNumber}</Typography>
              <Typography variant="body2" color="grey.500">
                {method.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
              checked={method.isDefault}
              onChange={() => handleSetDefault(method.id)}
            />
            <Typography
              variant="body2"
              color={method.isDefault ? "primary" : "grey.500"}
            >
              {method.isDefault ? "Default" : "Set as default"}
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

      {/* Add New Card Section */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="body1" color="grey.500">
            Save cards for faster checkout
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{
            bgcolor: "#ffcc00",
            color: "black",
            "&:hover": { bgcolor: "#e6b800" },
            mb: 2,
          }}
        >
          + Add a credit or debit card
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Typography variant="body2" color="grey.500">
            Visa
          </Typography>
          <Typography variant="body2" color="grey.500">
            Mastercard
          </Typography>
          <Typography variant="body2" color="grey.500">
            PayPal
          </Typography>
        </Box>
      </Box>

      {/* Dialog for adding new card */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Type"
            value={newCard.type}
            onChange={(e) =>
              setNewCard({ ...newCard, type: e.target.value })
            }
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
            onChange={(e) =>
              setNewCard({ ...newCard, name: e.target.value })
            }
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
            sx={{ bgcolor: "#ffcc00", color: "black", "&:hover": { bgcolor: "#e6b800" } }}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}