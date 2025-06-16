"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Breadcrumbs, Link, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, 
SelectChangeEvent, IconButton, InputAdornment } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const CouponForm = () => {
  const now = new Date();
  const startDate = now.toISOString().split('T')[0];
  const endDate = now.toISOString().split('T')[0];

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    code:"",
    description: "",
    type: "Fixed Amount",
    discountValue: "",
    usage: "Once per user",
    minPurchase: "Minimum Purchase Amount",
    startDate: startDate,
    endDate: endDate,
  });

  const [coupons, setCoupons] = useState<any[]>([]);


useEffect(() => {
  const savedCoupons = localStorage.getItem("coupons");
  if (savedCoupons) {
    setCoupons(JSON.parse(savedCoupons));
  }
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCoupon = () => {
    const newCoupon = { ...formData, id: Date.now() };
    const updatedCoupons = [...coupons, newCoupon];
    setCoupons(updatedCoupons);
    localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
    toast.success("Coupon added successfully!");
      setFormData({
        title: "",
        code:"",
        description: "",
        type: "Fixed Amount",
        discountValue: "",
        usage: "Once per user",
        minPurchase: "Minimum Purchase Amount",
        startDate: startDate,
        endDate: endDate,
      });
    };

  const handleCancel = () => {
    toast.success("Coupon cancelled!");
    setFormData({
        title: "",
        code:"",
        description: "",
        type: "Fixed Amount",
        discountValue: "",
        usage: "Once per user",
        minPurchase: "Minimum Purchase Amount",
        startDate: startDate,
        endDate: endDate,
    });
  };

  return (
    <Box sx={{alignItems: 'center', paddingTop: '70px', backgroundColor: "#fff", minHeight: "100vh" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2}}>
                <Link underline="hover" color="black" href="/">
                  Home
                </Link>
                <Link underline="hover" color="black" href="/">
                  Coupons & Offers
                </Link>
                <Link underline="hover" color="black" href="/Coupons">
                  Coupons
                </Link>
                <Link underline="hover" color="black" href="/Coupons/Create-coupons">
                  Add Coupons
                </Link>
              </Breadcrumbs>
            <Typography variant="h6" color="black" fontSize={16} >Welcome! User</Typography>
      </Box>
      <Typography variant="h5" color="#ffca28" paddingLeft="30px" gutterBottom>
           Add Coupons
      </Typography>
      <Box sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCoupon(); }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "black", position: "static", transform: "none" }}>Coupon Title</InputLabel>
                <TextField
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                />
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "black", position: "static", transform: "none" }}>Coupon Code</InputLabel>
                <TextField
                    fullWidth
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    margin="normal"
                />
            </FormControl>
        </Box>
            
        <Box sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "black" }}>Coupon Description</InputLabel>
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
        <Box sx={{ display: "flex", gap: 2, mb: 2}}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "#000000", position: "static", transform: "none"}}>Coupon Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
              renderValue={(selected) => selected || "Coupon Type"}
              sx={{
                "& .MuiSelect-select": {
                  color: formData.type ? "black" : "#757575",
                },
              }}
            >
              <MenuItem value="Fixed Amount" color="black">Fixed Amount</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none"  }}>Discount Value</InputLabel>
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
                }
              },
            }}
          />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Usage</InputLabel>
            <Select
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
              renderValue={(selected) => selected || ""}
              sx={{
                "& .MuiSelect-select": {
                  color: formData.usage ? "black" : "#757575",
                },
              }}
            >
              <MenuItem value="Once per user">Once per user</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
          <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Minimum Purchase Requirement</InputLabel>
          <Select
            name="minPurchase"
            value={formData.minPurchase}
            onChange={handleChange}
          >
            <MenuItem value="Minimum Purchase Amount">Minimum Purchase Amount</MenuItem>
          </Select>
          </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Amount</InputLabel>
          <TextField
            fullWidth
            type="number"
            value={formData.minPurchase}
            onChange={handleChange}
            
          />
          </FormControl>
          </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Start Date</InputLabel>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                inputRef={startDateRef}
                InputProps={{
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => startDateRef.current?.showPicker()}>
                      <CalendarMonthOutlinedIcon sx={{color: "black" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              />
            </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>End Date</InputLabel>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              inputRef={endDateRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => endDateRef.current?.showPicker()}>
                      <CalendarMonthOutlinedIcon sx={{color: "black" }}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        
        <Box sx={{ display: "flex", gap: 2, marginTop: 5, justifyContent: "flex-end" }}>
          <Button variant="contained" 
                  onClick={handleAddCoupon} 
                  sx={{textTransform: 'none',
                       color: 'black',
                       backgroundColor: '#ffca28',
                       fontSize: '15px',
                       width: '120px'
                  }}>
                  Add Coupon
          </Button>
          <Button variant="contained" 
                  onClick={handleCancel} 
                  sx={{textTransform: 'none',
                       color: 'black',
                       backgroundColor: '#e6e1e1',
                       fontSize: '15px',
                       width: '120px'
                  }}>
                          
                  Cancel
          </Button>

          
        <ToastContainer />
        </Box>
      </form>
    </Box>
    </Box>
  );
};

export default CouponForm;