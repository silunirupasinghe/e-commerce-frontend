'use client';
import React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { OrderType } from '../../../data/mockOrders';

type Props = {
  order: OrderType;
};

const OrderTile: React.FC<Props> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [openTrack, setOpenTrack] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [openHelp, setOpenHelp] = useState(false);
  const [helpReason, setHelpReason] = useState('');
  const [helpMessage, setHelpMessage] = useState('');
  const [helpSubmitted, setHelpSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 2,
        p: { xs: 2, sm: 3 },
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        mb: 4,
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Header */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#f3f3f3',
          px: 2,
          py: 1,
          borderRadius: 1,
          mb: 2,
          cursor: 'pointer',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <Typography fontWeight={600}>{order.status}</Typography>
        <Typography sx={{ color: '#fbbc04', fontWeight: 500, fontSize: '0.9rem' }}>
          View Order Details
        </Typography>
      </Box>

      {/* Summary */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexWrap="wrap"
      >
        {/* Images */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {order.items.slice(0, 2).map((item, i) => (
            <Box
              key={i}
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
                border: '1px solid #eee',
              }}
            />
          ))}
        </Stack>

        {/* Buttons */}
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'column', md: 'column' }}
          alignItems={{ xs: 'stretch', sm: 'flex-end' }}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenTrack(true)}
            sx={{
              bgcolor: '#fbbc04',
              color: '#000',
              fontWeight: 600,
              borderRadius: '999px',
              textTransform: 'none',
              width: { xs: '100%', sm: 160 },
            }}
          >
            Track
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '999px',
              textTransform: 'none',
              width: { xs: '100%', sm: 160 },
              color: '#5b5b5b',
              borderColor: '#5b5b5b',
              '&:hover': {
                borderColor: '#000',
                backgroundColor: '#f5f5f5',
              }, 
            }}
          >
            Buy this again
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenHelp(true)}
            sx={{
              borderRadius: '999px',
              textTransform: 'none',
              width: { xs: '100%', sm: 160 },
              color: '#5b5b5b',
              borderColor: '#5b5b5b',
              '&:hover': {
                borderColor: '#000',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Return / Other help
          </Button>
        </Stack>
      </Stack>

      {/* Footer */}
      <Divider sx={{ my: 2 }} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        justifyContent="space-between"
        flexWrap="wrap"
        fontSize="0.95rem"
        color="#444"
      >
        <span>Total : <strong>${order.total}</strong></span>
        <span>Order Time: <strong>{order.date}</strong></span>
        <span>Order ID : <strong>{order.id}</strong></span>
      </Stack>

      {/* Expanded Section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 3, px: 2, py: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
          <Typography fontWeight={600} mb={1}>Items Ordered</Typography>
          <Stack spacing={1} mb={2}>
            {order.items.map((item, i) => (
              <Typography key={i} fontSize="0.95rem">
                {item.quantity}x {item.name} – ${item.price}
              </Typography>
            ))}
          </Stack>

          <Typography fontWeight={600} mb={1}>Shipping Information</Typography>
          <Typography fontSize="0.95rem" mb={0.5}>Estimated Delivery: {order.deliveryDate}</Typography>
          <Typography fontSize="0.95rem" mb={0.5}>Carrier: {order.carrier}</Typography>
          <Typography fontSize="0.95rem" mb={2}>Tracking Number: {order.trackingNumber}</Typography>

          <Typography fontWeight={600} mb={1}>Payment Summary</Typography>
          <Typography fontSize="0.95rem">Payment Method: {order.paymentMethod}</Typography>
          <Typography fontSize="0.95rem">Subtotal: ${order.subtotal}</Typography>
          <Typography fontSize="0.95rem" mb={2}>Shipping: ${order.shippingFee}</Typography>

          <Typography fontWeight={600} mb={1}>Order Status History</Typography>
          <Stack spacing={0.5} mb={2}>
            {order.statusHistory.map((s, i) => (
              <Typography key={i} fontSize="0.9rem">
                {s}
              </Typography>
            ))}
          </Stack>

          <Typography fontWeight={600} mb={1}>Need Help?</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#5b5b5b',
                borderColor: '#5b5b5b',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#5b5b5b',
                  backgroundColor: '#f2f2f2',
                },
              }}
            >
              Contact Support
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#5b5b5b',
                borderColor: '#5b5b5b',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#5b5b5b',
                  backgroundColor: '#f2f2f2',
                },
              }}
            >
              Print Invoice
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#5b5b5b',
                borderColor: '#5b5b5b',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#5b5b5b',
                  backgroundColor: '#f2f2f2',
                },
              }}
            >
              Leave a Review
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {/* Track Dialog */}
      <Dialog open={openTrack} onClose={() => setOpenTrack(false)} fullWidth maxWidth="sm">
        <Box sx={{ backgroundColor: '#fbbc04', px: 3, py: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#000' }}>
            Track Order — {order.id}
          </Typography>
          <IconButton onClick={() => setOpenTrack(false)} sx={{ color: '#000' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent dividers sx={{ bgcolor: '#f9f9f9' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              Carrier
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {order.carrier}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              Tracking Number
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body1" fontWeight={500}>
                {order.trackingNumber}
              </Typography>
              <Button
                onClick={handleCopy}
                size="small"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  px: 1.5,
                  backgroundColor: '#fbbc04',
                  color: '#000',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#e0a800',
                  },
                }}
              >
                Copy
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              Expected Delivery
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {order.deliveryDate}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Status Timeline
            </Typography>
            <Stack spacing={1}>
              {order.statusHistory.map((step, i) => {
                const isCurrent = step.includes('⏳') || step.includes('🟡');
                const isCompleted = step.includes('✔');

                return (
                  <Box
                    key={i}
                    sx={{
                      pl: 2,
                      borderLeft: `3px solid ${isCompleted ? '#4caf50' : isCurrent ? '#fbbc04' : '#ccc'}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: isCurrent ? 600 : 400, color: isCurrent ? '#000' : '#555' }}
                    >
                      {step}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions sx={{ bgcolor: '#f9f9f9' }}>
          <Button 
            onClick={() => setOpenTrack(false)} 
            variant="contained"
            sx={{
              backgroundColor: '#fbbc04',
              color: '#000',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e0a800',
              },
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)} fullWidth maxWidth="sm">
        <DialogTitle>Help with Order — {order.id}</DialogTitle>
        <DialogContent dividers>
          {helpSubmitted ? (
            <Typography color="success.main" variant="body1">
              ✅ Your return/help request has been submitted.
              <br />You will be contacted within 24 hours.
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Why do you need help?
              </Typography>
              <RadioGroup
                value={helpReason}
                onChange={(e) => setHelpReason(e.target.value)}
                sx={{ mb: 2, '& .Mui-checked': {color: '#fbbc04 !important'}, }}
              >
                <FormControlLabel value="damaged" control={<Radio />} label="Item arrived damaged" />
                <FormControlLabel value="wrong" control={<Radio />} label="I received the wrong item" />
                <FormControlLabel value="return" control={<Radio />} label="I want to return this item" />
                <FormControlLabel value="missing" control={<Radio />} label="My item never arrived" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>

              <TextField
                multiline
                minRows={3}
                fullWidth
                variant="outlined"
                label="Add any additional details (optional)"
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                sx={{
                  '& label.Mui-focused': {
                    color: '#fbbc04', // Label when focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc', // Default border
                    },
                    '&:hover fieldset': {
                      borderColor: '#fbbc04', // Hover border
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fbbc04', // Focused border
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#000', // Text color
                    caretColor: '#fbbc04', // Blinking cursor
                  },
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenHelp(false)} 
            variant="contained"
            sx={{
              backgroundColor: '#fbbc04',
              color: '#000',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e0a800',
              },
            }}>
            Cancel
          </Button>
          {!helpSubmitted && (
            <Button
              onClick={() => {
                setHelpSubmitted(true);
                setTimeout(() => {
                  setOpenHelp(false);
                  setHelpReason('');
                  setHelpMessage('');
                  setHelpSubmitted(false);
                }, 2000);
              }}
              variant="contained"
              sx={{ bgcolor: '#fbbc04', color: '#000', fontWeight: 600, textTransform: 'none' }}
              disabled={!helpReason}
            >
              Submit Request
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Tracking number copied!"
      />
    </Box>
  );
}
export default OrderTile;
