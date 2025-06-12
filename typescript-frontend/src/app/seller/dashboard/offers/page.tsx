// pages/OffersPage.tsx
"use client";
import { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  // Fab, // Remove
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
// import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'; // Remove

interface Offer {
  id: string;
  title: string;
  status: string;
  products: string;
  startDate: string;
  endDate: string;
  usage: number;
}

const OffersPage = () => {
  const [originalOffers, setOriginalOffers] = useState<Offer[]>([
    {
      id: 'D0001',
      title: '11:11 sale Up-to-40% Off',
      status: 'Active',
      products: 'Headset M2392, Screen 2osl',
      startDate: '2025-02-12',
      endDate: '2025-03-12',
      usage: 12,
    },
    {
      id: 'D0002',
      title: '11:22 sale Up-to-40% Off',
      status: 'Inactive',
      products: 'Headset M2392, Screen 2osl',
      startDate: '2025-02-12',
      endDate: '2025-03-12',
      usage: 12,
    },
    {
      id: 'D0003',
      title: '11:33 sale Up-to-40% Off',
      status: 'Active',
      products: ['Headset M2392', 'Screen 2osl'],
      startDate: '2025-02-12',
      endDate: '2025-03-12',
      usage: 12,
    },
  ]);
const [offers, setOffers] = useState(originalOffers);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (status: string) => {
    if (status === 'All') {
      setOffers([...originalOffers]);
    } else {
      const filteredOffers = originalOffers.filter((offer) => offer.status === status);
      setOffers(filteredOffers);
    }
    handleFilterClose();
    toast.info(`Filtered by ${status} status`);
  };

  const handleAddOffer = () => {
    toast.success('Offer added successfully!');
  };

  // Remove chatbot-related state and handlers
  // const [isChatOpen, setIsChatOpen] = useState(false);
  // const [messages, setMessages] = useState<string[]>([]);
  // const [newMessage, setNewMessage] = useState('');
  // const handleChatToggle = () => {
  //   setIsChatOpen(!isChatOpen);
  // };
  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     setMessages([...messages, newMessage]);
  //     setNewMessage('');
  //   }
  // };

  return (
    <Box sx={{ alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link underline="hover" color="black" href="/">
                Home
              </Link>
              <Link underline="hover" color="black" href="/">
                Coupons & Offers
              </Link>
              <Link underline="hover" color="black" href="/Offers">
                Offers
              </Link>
            </Breadcrumbs>
            <Typography
              variant="h6"
              color="black"
              fontSize={16}
              paddingLeft="750px"
            >
              Welcome! User
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5" color="#ffca28" gutterBottom>
              Offers
            </Typography>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid size={{}}>
                  <TextField
                    placeholder="Search"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{}}>
                  <IconButton onClick={handleFilterClick}>
                    <FilterListOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleFilterClose}
                  >
                    <MenuItem onClick={() => handleFilterSelect('All')}>
                      All
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterSelect('Active')}>
                      Active
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterSelect('Inactive')}>
                      Inactive
                    </MenuItem>
                  </Menu>
                </Grid>
                <Grid size={{}}>
                  <Button
                    variant="contained"
                    onClick={handleAddOffer}
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      backgroundColor: '#ffca28',
                      fontSize: '15px',
                      width: '120px',
                    }}
                  >
                    Add Offers
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ paddingLeft: '130px' }}>
            <Box
              sx={{
                padding: 2,
                border: 'solid 1px',
                borderColor: '#7c827d',
                borderRadius: '15px',
                paddingLeft: '50px',
                maxWidth: '900px',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid
                  size={{ xs: 12, sm: 5 }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '18px',
                      color: 'black',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                    gutterBottom
                  >
                    Offers Overview
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: '#dce0dd',
                      maxWidth: '200px',
                      maxHeight: '70px',
                      border: 'solid 1px',
                      borderColor: '#b1b5b2',
                      flexGrow: 1,
                    }}
                  >
                    <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <PercentOutlinedIcon />
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paddingLeft="20px"
                        >
                          Active offers
                        </Typography>
                        <Typography
                          variant="h5"
                          fontSize="20px"
                          paddingLeft="20px"
                        >
                          2
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: '#dce0dd',
                      maxWidth: '200px',
                      maxHeight: '70px',
                      border: 'solid 1px',
                      borderColor: '#b1b5b2',
                    }}
                  >
                    <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Inventory2OutlinedIcon />
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paddingLeft="20px"
                        >
                          Total Usage
                        </Typography>
                        <Typography
                          variant="h5"
                          fontSize="20px"
                          paddingLeft="20px"
                        >
                          56
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card
                    sx={{
                      backgroundColor: '#dce0dd',
                      maxWidth: '200px',
                      maxHeight: '70px',
                      border: 'solid 1px',
                      borderColor: '#b1b5b2',
                      flexGrow: 1,
                    }}
                  >
                    <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <AttachMoneyOutlinedIcon />
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paddingLeft="4px"
                        >
                          Total Discount Value
                        </Typography>
                        <Typography
                          variant="h5"
                          fontSize="20px"
                          paddingLeft="8px"
                        >
                          $16,560.00
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box sx={{ marginTop: '30px', width: '950px', marginLeft: '110px' }}>
            <Table
              sx={{ minWidth: '100%', textAlign: 'center' }}
              aria-label="offers table"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ width: '115px', fontSize: '16px' }}>
                    Discount Id
                  </TableCell>
                  <TableCell sx={{ width: '200px', fontSize: '16px' }}>
                    Discount Title
                  </TableCell>
                  <TableCell sx={{ width: '120px', fontSize: '16px' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ width: '130px', fontSize: '16px' }}>
                    Products
                  </TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Usage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers.map((offer) => (
                  <TableRow
                    key={offer.id}
                    sx={{
                      backgroundColor: '#fff',
                      border: '2px solid',
                      borderColor: '#d4d9d5',
                    }}
                  >
                    <TableCell>{offer.id}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{offer.title}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          backgroundColor:
                            offer.status === 'Active' ? '#ffeb3b' : '#bdbdbd',
                          color: '#000',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          textAlign: 'center',
                          width: '80px',
                        }}
                      >
                        {offer.status}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px' }}>{offer.products}</TableCell>
                    <TableCell sx={{ fontSize: '15px' }}>{offer.startDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '15px' }}>{offer.endDate}</Typography>
                        {offer.status === 'Inactive' && null}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '15px' }}>{offer.usage} uses</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Remove chatbot UI */}
          {/* <Fab ... /> */}
          {/* {isChatOpen && <Box ... />} */}

          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default OffersPage;