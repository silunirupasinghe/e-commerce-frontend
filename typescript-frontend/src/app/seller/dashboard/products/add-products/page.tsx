"use client";
import { useState, useEffect } from "react";
import { Box, Breadcrumbs, Link, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, 
SelectChangeEvent, Checkbox, FormControlLabel, IconButton, ImageList, ImageListItem, Radio, RadioGroup } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { styled } from '@mui/material/styles';

const ProductsForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    modelNumber:"",
    category: "Phones",
    description: "",
    images: [] as File[],
    price: "",
    quantity: "",
    registeryStatus: "Pre registered",
    tags: "",
    sku: "",
    status:"Active",
    marketingSupport: "",
  });

  const [products, setProducts] = useState<any[]>([]);

  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(100%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

useEffect(() => {
  const savedProducts = localStorage.getItem("products");
  if (savedProducts) {
    setProducts(JSON.parse(savedProducts));
  }
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts((prev) => ({ ...prev, marketingSupport: e.target.value }));
  };

  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const [requestSupport, setRequestSupport] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestSupport(event.target.checked);
    if (!event.target.checked) setSelectedPlatform('');
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };
  
  const handleAddProduct = () => {
    const newProduct= { ...formData, id: Date.now().toString() };
    const updatedProducts = [...products, newProduct];
    setProducts (updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product added successfully!");
      setFormData({
        name: "",
        modelNumber:"",
        category: "Phones",
        description: "",
        images: [],
        price: "",
        quantity: "",
        registeryStatus: "Pre registered",
        tags: "",
        sku: "",
        status:"Active",
        marketingSupport: "",
      });
    };

    const handleSaveDraft = () => {
        const draftData = { ...formData, draftTimestamp: new Date().toISOString() };
        const existingDrafts = JSON.parse(localStorage.getItem("productDrafts") || "[]");
        const updatedDrafts = [...existingDrafts, draftData];
        localStorage.setItem("productDrafts", JSON.stringify(updatedDrafts));
        toast.info("Draft saved successfully!");
    };

  const handleCancel = () => {
    toast.success("Product cancelled!");
  };

  return (
    <Box sx={{alignItems: 'center', backgroundColor: "#fff", minHeight: "100vh" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, paddingLeft: '150px'}}>
                <Link underline="hover" color="black" href="/">
                  Home
                </Link>
                <Link underline="hover" color="black" href="/">
                  Products
                </Link>
                <Link underline="hover" color="black" href="/Add-products">
                  Add Products
                </Link>
              </Breadcrumbs>
            <Typography variant="h6" color="black" fontSize={16} paddingRight="300px">Welcome! User</Typography>
      </Box>
      <Typography variant="h5" color="#ffca28" paddingLeft="280px" gutterBottom>
           Add Products
      </Typography>
      <Box sx={{ maxWidth: 900, margin: "auto", padding: 2, alignItems: 'center', }}>
      <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "black", position: "static", transform: "none" }}>Product Name</InputLabel>
                <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                />
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "black", position: "static", transform: "none" }}>Model Number</InputLabel>
                <TextField
                    fullWidth
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    margin="normal"
                />
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "black", position: "static", transform: "none" }}>Category</InputLabel>
                <FormControl sx={{ mt: 2}}>
                <Select
                    fullWidth
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    variant="outlined"
                    displayEmpty
                    renderValue={(selected) => selected || "Category"}
                    sx={{
                        "& .MuiSelect-select": {
                        color: formData.category ? "black" : "#757575",
                        },
                    }}
                >
                    <MenuItem value="Phones" color="black">Phones</MenuItem>
                    <MenuItem value="Laptops" color="black">Laptops</MenuItem>
                    <MenuItem value="Monitors" color="black">Monitors</MenuItem>
                    <MenuItem value="Keyboards" color="black">Keyboards</MenuItem>
                </Select>
                </FormControl>
            </FormControl>
        </Box>
            
        <Box sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "black" }}>Product Description</InputLabel>
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

    <Box sx={{ mb: 3 }}>
        <Typography variant="h6" mb="2" color="#000000" fontSize="16px" gutterBottom>
          Product Images
        </Typography>
      <Box sx={{ width: '600px', border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
        <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              sx={{ position: 'absolute', top: 0, right: 0, color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            >
              X
            </IconButton>
          </ImageListItem>
        ))}
        <ImageListItem>
          <Button
              component="label"
              variant="outlined"
              startIcon={<AddPhotoAlternateOutlinedIcon sx={{color: 'gray', fontSize: '30px'}}/>}
              sx={{ height: '80%', width: '80%', borderStyle: 'dashed', color: 'gray', borderColor: 'gray'}}
            >
              Upload
              <VisuallyHiddenInput type="file" multiple onChange={handleImageUpload} accept="image/*" />
            </Button>
        </ImageListItem>
      </ImageList>
    </Box>
  </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2}}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "#000000", position: "static", transform: "none"}}>Price</InputLabel>
            <TextField
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
            />
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none"  }}>Quantity</InputLabel>
            <TextField
                fullWidth
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
            />
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Registery Status</InputLabel>
            <FormControl sx={{mt: 2}}>
            <Select
              fullWidth
              name="registeryStatus"
              value={formData.registeryStatus}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
              renderValue={(selected) => selected || "Registered Status"}
              sx={{
                "& .MuiSelect-select": {
                  color: formData.registeryStatus ? "black" : "#757575",
                },
              }}
            >
              <MenuItem value="Pre registered">Pre registered</MenuItem>
              <MenuItem value="Registered now">Registered now</MenuItem>
              <MenuItem value="Not registered">Not registered</MenuItem>
            </Select>
            </FormControl>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
          <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Tags</InputLabel>
          <TextField
            fullWidth
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            margin="normal"
          />
          </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>SKU</InputLabel>
          <TextField
            fullWidth
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            margin="normal"            
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <InputLabel sx={{ mb: 2, color: "black", position: "static", transform: "none" }}>Status</InputLabel>
          <FormControl sx={{mt:2}}>
          <Select
            fullWidth
            name="status"
            value={formData.status}
            onChange={handleChange}  
            variant="outlined"
            displayEmpty
            renderValue={(selected) => selected || "Status"}
            sx={{
                "& .MuiSelect-select": {
                  color: formData.status ? "black" : "#757575",
                },
              }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            </FormControl>
        </FormControl>       
    </Box>

    <Box sx={{ mt: 2 }}>
      <FormControl component="fieldset">
        <FormControlLabel
          control={<Checkbox checked={requestSupport} onChange={handleRequestChange} />}
          label="Request marketing support"
          sx={{color: 'black'}}
        />
        {requestSupport && (
          <RadioGroup
            value={selectedPlatform}
            onChange={handlePlatformChange}
            sx={{ ml: 4, mt: 1, color: 'gray' }}
          >
            <FormControlLabel value="facebook" control={<Radio />} label="Facebook" />
            <FormControlLabel value="instagram" control={<Radio />} label="Instagram" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        )}
      </FormControl>
    </Box>

        <Box sx={{ display: "flex", gap: 2, marginTop: 5, justifyContent: "flex-end" }}>
          
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

            <Button variant="contained" 
                    onClick={handleSaveDraft} 
                    sx={{textTransform: 'none',
                        color: 'black',
                        backgroundColor: '#e6e1e1',
                        fontSize: '15px',
                        width: '120px'
                    }}>
                          
                  Save Draft
            </Button>


            <Button variant="contained" 
                    onClick={handleAddProduct} 
                    sx={{textTransform: 'none',
                        color: 'black',
                        backgroundColor: '#ffca28',
                        fontSize: '15px',
                        width: '120px'
                    }}>
                    Add Product
            </Button>
          
        <ToastContainer />
        </Box>
      </form>
    </Box>
    </Box>
  );
};

export default ProductsForm;