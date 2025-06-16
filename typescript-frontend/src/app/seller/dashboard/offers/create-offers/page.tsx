"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
  Checkbox,
  Fab,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import colors from '@/theme/color'
// Define the Offer type
interface Offer {
  id: number;
  title: string;
  description: string;
  discountType: string;
  discountValue: string;
  eligibility: string;
  minPurchase: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

// Define the form data type
interface FormData {
  title: string;
  description: string;
  discountType: string;
  discountValue: string;
  eligibility: string;
  minPurchase: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const OfferForm = () => {
  const now = new Date();
  const startDate = now.toISOString().split("T")[0];
  const startTime = now.toTimeString().slice(0, 5);

  const startDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    discountType: "Percentage (%)",
    discountValue: "",
    eligibility: "All Customers",
    minPurchase: "",
    startDate: startDate,
    startTime: startTime,
    endDate: "",
    endTime: "",
  });

  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const savedOffers = localStorage.getItem("offers");
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOffer = () => {
    const newOffer: Offer = { ...formData, id: Date.now() };
    const updatedOffers: Offer[] = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    toast.success("Offer added successfully!");
    setFormData({
      title: "",
      description: "",
      discountType: "Percentage (%)",
      discountValue: "",
      eligibility: "All Customers",
      minPurchase: "",
      startDate: startDate,
      startTime: startTime,
      endDate: "",
      endTime: "",
    });
  };

  const handleCancel = () => {
    toast.success("Offer cancelled!");
    setFormData({
      title: "",
      description: "",
      discountType: "Percentage (%)",
      discountValue: "",
      eligibility: "All Customers",
      minPurchase: "",
      startDate: startDate,
      startTime: startTime,
      endDate: "",
      endTime: "",
    });
  };

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        paddingTop: "10px",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link underline="hover" color="black" href="/">
            Home
          </Link>
          <Link underline="hover" color="black" href="/">
            Coupons & Offers
          </Link>
          <Link underline="hover" color="black" href="/Offers">
            Offers
          </Link>
          <Link underline="hover" color="black" href="/Offers/Create-offers">
            Add Offers
          </Link>
        </Breadcrumbs>
        <Typography
          variant="h6"
          color="black"
          fontSize={16}
        >
          Welcome! User
        </Typography>
      </Box>
      <Typography variant="h5" sx={{color:colors.primary, paddingLeft:'30px'} } gutterBottom>
        Add Offers
      </Typography>
      <Box sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleAddOffer();
          }}
        >
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "black" }}>Offer Title</InputLabel>
            <TextField
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "black" }}>Offer Description</InputLabel>
            <TextField
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  mb: 2,
                  color: "#000000",
                  position: "static",
                  transform: "none",
                }}
              >
                Discount Type
              </InputLabel>
              <Select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                variant="outlined"
                displayEmpty
                renderValue={(selected) => selected || "Discount Type"}
                sx={{
                  "& .MuiSelect-select": {
                    color: formData.discountType ? "black" : "#757575",
                  },
                }}
              >
                <MenuItem value="Percentage (%)" color="black">
                  Percentage (%)
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  mb: 2,
                  color: "black",
                  position: "static",
                  transform: "none",
                }}
              >
                Discount Value
              </InputLabel>
              <TextField
                fullWidth
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                variant="outlined"
                placeholder="Discount Value"
                InputProps={{
                  sx: {
                    "& input": {
                      color: "black",
                    },
                  },
                }}
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  mb: 2,
                  color: "black",
                  position: "static",
                  transform: "none",
                }}
              >
                Eligibility
              </InputLabel>
              <Select
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                variant="outlined"
                displayEmpty
                renderValue={(selected) => selected || ""}
                sx={{
                  "& .MuiSelect-select": {
                    color: formData.discountType ? "black" : "#757575",
                  },
                }}
              >
                <MenuItem value="All Customers">All Customers</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  mb: 2,
                  color: "black",
                  position: "static",
                  transform: "none",
                }}
              >
                Minimum Purchase Requirement
              </InputLabel>
              <Select
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
              >
                <MenuItem value="Minimum Purchase Amount">
                  Minimum Purchase Amount
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  mb: 2,
                  color: "black",
                  position: "static",
                  transform: "none",
                }}
              >
                Amount
              </InputLabel>
              <TextField
                fullWidth
                type="number"
                value={formData.minPurchase}
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, color: "black" }}>Start Date</InputLabel>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                inputRef={startDateRef}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, color: "black" }}>
                Start Time (+05:30)
              </InputLabel>
              <TextField
                fullWidth
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                inputRef={startTimeRef} 
              />
            </Box>
          </Box>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={formData.endDate !== ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isChecked = e.target.checked;
                setFormData((prev) => ({
                  ...prev,
                  endDate: isChecked
                    ? prev.endDate || new Date().toISOString().split("T")[0]
                    : "",
                  endTime: isChecked ? prev.endTime || startTime : "",
                }));
              }}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 24 },
                color: "#000000",
                "&.Mui-checked": { color: "#000000" },
              }}
              size="medium"
            />
            <InputLabel sx={{ mb: 1, color: "black" }}>Set End Date</InputLabel>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, color: "black" }}>End Date</InputLabel>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                variant="outlined"
                disabled={!formData.endDate}
                inputRef={endDateRef}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, color: "black" }}>
                End Time (+05:30)
              </InputLabel>
              <TextField
                fullWidth
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                variant="outlined"
                disabled={!formData.endDate}
                inputRef={endTimeRef}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 5,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleAddOffer}
              sx={{
                textTransform: "none",
                color: "black",
                backgroundColor: "#ffca28",
                fontSize: "15px",
                width: "120px",
              }}
            >
              Add Offer
            </Button>
            <Button
              variant="contained"
              onClick={handleCancel}
              sx={{
                textTransform: "none",
                color: "black",
                backgroundColor: "#e6e1e1",
                fontSize: "15px",
                width: "120px",
              }}
            >
              Cancel
            </Button>

            <Fab
              color="primary"
              onClick={handleChatToggle}
              sx={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#ffca28",
                "&:hover": { backgroundColor: "#ffb300" },
              }}
            >
              <CommentOutlinedIcon />
            </Fab>

            {isChatOpen && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: "80px",
                  right: "20px",
                  width: "300px",
                  height: "400px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "black", padding: "20px" }}
                >
                  Chat with Us
                </Typography>
                <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 1,
                        p: 1,
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                      }}
                    >
                      {message}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <Button variant="contained" onClick={handleSendMessage}>
                    Send
                  </Button>
                </Box>
              </Box>
            )}
            <ToastContainer />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default OfferForm;