"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import colors from "@/theme/color";
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      sx={{ backgroundColor: "#fff", minHeight: "100vh" }}
      suppressHydrationWarning
    >
      <Container maxWidth="lg" sx={{ py: 4}}>
        <Box sx={{ mb: 4 }} paddingTop={10}>
          <Typography variant="body2" color="black">
            Home / Contact
          </Typography>
        </Box>
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 3, sm: 4 }}>
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    paddingTop: "60px",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <PhoneEnabledOutlinedIcon
                      sx={{ fontSize: "1.5rem", color: "white" }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "black",
                        mb: 1,
                        display: "inline",
                      }}
                    >
                      Call To Us
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.9rem",
                      color: "black",
                      lineHeight: 1.5,
                      mb: 1,
                      paddingTop: "20px",
                      display: "block",
                    }}
                  >
                    We are available 24/7, 7 days a week.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.9rem",
                      color: "black",
                      lineHeight: 1.5,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Phone: +88018172222
                  </Typography>
                </Box>
              </Box>
              <Divider
                sx={{ my: 6, borderColor: "darkgrey", width: "320px" }}
              />

              <Box sx={{ }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <EmailOutlinedIcon
                      sx={{ fontSize: "1.5rem", color: "white" }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "black",
                        mb: 1,
                        display: "inline",
                      }}
                    >
                      Write To Us
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "black",
                        lineHeight: 1.5,
                        paddingTop: "20px",
                        mb: 1,
                        display: "block",
                        width: "300px",
                      }}
                    >
                      Fill out our form and we will contact you within 24 hours.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "black",
                        lineHeight: 1.5,
                        mb: 1,
                        display: "block",
                      }}
                    >
                      Emails: customer@ecartclusive.com
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "black",
                        lineHeight: 1.5,
                        mb: 1,
                        display: "block",
                      }}
                    >
                      Emails: support@ecartclusive.com
                    </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 9, sm: 8 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} paddingLeft={{md:12, sm:10}} paddingTop={{md:8}}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Your Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        backgroundColor: colors.lightGray,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
                          "&.Mui-focused fieldset": { border: "none" },
                        },

                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "text.secondary",
                          transform: "translate(12px, 10px) scale(1)",
                          "&.MuiInputLabel-shrink": {
                            transform: "translate(12px, -6px) scale(0.75)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Your Email *"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        backgroundColor: colors.lightGray,
                        borderRadius: 1,
                        
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
                          "&.Mui-focused fieldset": { border: "none" },
                        },

                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "text.secondary",
                          transform: "translate(12px, 10px) scale(1)",
                          "&.MuiInputLabel-shrink": {
                            transform: "translate(12px, -6px) scale(0.75)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Your Phone *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        backgroundColor: colors.lightGray,
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
                          "&.Mui-focused fieldset": { border: "none" },
                        },

                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "text.secondary",
                          transform: "translate(12px, 10px) scale(1)",
                          "&.MuiInputLabel-shrink": {
                            transform: "translate(12px, -6px) scale(0.75)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }} paddingTop={4}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{
                        backgroundColor: colors.lightGray,
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
                          "&.Mui-focused fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-root": {
                          padding: "45px 12px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "text.secondary",
                          transform: "translate(12px, 10px) scale(1)",
                          "&.MuiInputLabel-shrink": {
                            transform: "translate(12px, -6px) scale(0.75)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    size={{ xs: 12 }}
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: colors.primary,
                        color: "black",
                        "&:hover": { backgroundColor: "#ffb300" },
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 4,
                        py: 1,
                        borderRadius: 1,
                        width: "200px",
                        padding: "15px",
                        boxShadow: "none",
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
