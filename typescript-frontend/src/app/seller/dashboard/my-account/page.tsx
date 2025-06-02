"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import colors from "@/theme/color"; // Assuming you have a theme file with colors

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel11@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Add save logic here (e.g., API call)
    console.log("Form data saved:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate away
    setFormData({
      firstName: "Md",
      lastName: "Rimel",
      email: "rimel11@gmail.com",
      address: "Kingston, 5236, United State",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      sx={{
        px: {md:10, xs:2},
        py:{md:4, xs:2},
        maxWidth: 800,
        mx: {md:"auto", xs:"0"},
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderRadius: 1,
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: colors.primary, fontFamily: "Poppins, sans-serif" }}>
          Edit Your Profile
        </Typography>
      </Box>

      {/* Form Fields */}
      <Grid sx={{ display: "flex", flexDirection: {md:"row", xs:"column"}, gap: {md:4, xs:1} }}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 , backgroundColor: colors.lightGray}}
          variant="outlined"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 ,backgroundColor: colors.lightGray}}
          variant="outlined"
        />
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: {md:"row", xs:"column"}, gap: {md:4, xs:1} }}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2, backgroundColor: colors.lightGray }}
          variant="outlined"
          disabled // Email is typically read-only
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2, backgroundColor: colors.lightGray }}
          variant="outlined"
        />
      </Grid>

      {/* Password Section */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontFamily: "Poppins, sans-serif" }}>
        Password Changes
      </Typography>
      <TextField
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2, backgroundColor: colors.lightGray }}
        variant="outlined"
      />
      <TextField
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2, backgroundColor: colors.lightGray }}
        variant="outlined"
      />
      <TextField
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 3, backgroundColor: colors.lightGray }}
        variant="outlined"
      />

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{ color: "grey.700" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: "#ffcc00",
            color: "black",
            "&:hover": { bgcolor: "#e6b800" },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
