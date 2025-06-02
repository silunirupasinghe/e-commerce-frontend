"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Checkbox,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ContentCopy, Edit, Lock } from "@mui/icons-material";
import colors from "@/theme/color";


export default function ProfilePage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "34, St. 91, 071 9751",
      fullAddress: "Colombo 03, Western Province, Sri Lanka",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      address: "140/1A, R. A. De Mel Mawatha, Colombo 03",
      fullAddress: "Colombo 03, Western Province, Sri Lanka",
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    fullAddress: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAddress({ name: "", address: "", fullAddress: "" }); // Reset form
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { ...newAddress, id: Date.now(), isDefault: false },
    ]);
    handleCloseDialog(); // Close dialog after adding
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
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
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: colors.primary, cursor: "pointer" }}
        onClick={handleOpenDialog}
      >
        + Add a new address
      </Typography>
      
      <Box sx={{display: "flex", gap:1}}>
        <Lock size={"small"} sx={{color:colors.green}}  />
        <Typography variant="body2" sx={{color:colors.green}} gutterBottom>
        All data will be encrypted
      </Typography>

      </Box>
      

      {/* Dialog for adding new address */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Full Address"
            value={newAddress.fullAddress}
            onChange={(e) =>
              setNewAddress({ ...newAddress, fullAddress: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddAddress}
            disabled={!newAddress.name || !newAddress.address || !newAddress.fullAddress}
          >
            Add Address
          </Button>
        </DialogActions>
      </Dialog>

      {addresses.map((addr) => (
        <Box
          key={addr.id}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 1,
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>{addr.name}</Typography>
            <Typography>{addr.address}</Typography>
            <Typography variant="body2" color="textSecondary">
              {addr.fullAddress}
            </Typography>
          </Box>
          <Box>
            <Checkbox
              checked={addr.isDefault}
              onChange={() => handleSetDefault(addr.id)}
            />
            <IconButton>
              <ContentCopy />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
              <Typography color="error">Delete</Typography>
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
    </Box>
  );
}