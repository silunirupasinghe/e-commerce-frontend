'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Link,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarIcon from '@mui/icons-material/Star';
import colors from '@/theme/color';
import mockReviews, { Review } from '../../../data/mockReviews';

export default function MyReviewsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<string>('Most Recent');
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteReview, setDeleteReview] = useState<Review | null>(null);
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = (option?: string) => {
    if (option) setSortOption(option);
    setAnchorEl(null);
  };

  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortOption) {
      case 'Highest Rated':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'Lowest Rated':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'Most Recent':
      default:
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  };

  const toggleExpanded = (id: number) => {
    setExpandedReviewId(prev => (prev === id ? null : id));
  };

  const handleEdit = (review: Review) => setEditingReview(review);
  const handleDelete = (review: Review) => setDeleteReview(review);

  const confirmDelete = () => {
    if (deleteReview) {
      setReviews(reviews.filter(r => r.id !== deleteReview.id));
      setDeleteReview(null);
    }
  };

  const saveEdit = () => {
    if (editingReview) {
      setReviews(reviews.map(r => (r.id === editingReview.id ? editingReview : r)));
      setEditingReview(null);
    }
  };

  const sortedReviews = getSortedReviews();

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4, maxWidth: 1000, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={600} mb={0.5}>My Reviews</Typography>
          <Typography variant="body2" color="text.secondary">
            You've submitted {reviews.length} reviews so far.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleSortClick}
          endIcon={<ArrowDropDownIcon />}
          sx={{ backgroundColor: colors.primary, color: colors.black, fontWeight: 600, textTransform: 'none', borderRadius: '999px' }}
        >
          Sort by
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{ sx: { borderRadius: 2, boxShadow: 3 } }}
        >
          {['Most Recent', 'Highest Rated', 'Lowest Rated'].map(option => (
            <MenuItem key={option} onClick={() => handleClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      <Stack spacing={3}>
        {sortedReviews.map((review) => (
          <Paper key={review.id} sx={{ p: 3, borderRadius: 3, cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => toggleExpanded(review.id)}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Stack direction="row" spacing={2}>
                <Box component="img" src={review.image} alt={review.product} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }} />
                <Box>
                  <Typography fontWeight={600}>{review.product}</Typography>
                  <Stack direction="row" spacing={0.5} mt={0.5}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: i < review.rating ? colors.primary : colors.textGray, fontSize: '1.2rem' }} />
                    ))}
                  </Stack>
                  <Typography mt={1} fontSize="0.95rem">{review.text}</Typography>
                  <Typography variant="caption" mt={1}>
                    <Box component="span" sx={{ color: colors.textGray }}>Date:</Box>{' '}
                    <Box component="span" sx={{ color: colors.black }}>{review.date}</Box>
                  </Typography>

                  {expandedReviewId === review.id && (
                    <Box mt={2}>
                      <Typography fontWeight={600}>Product Details:</Typography>
                      <Typography variant="body2">Product ID: {review.productId}</Typography>
                      <Typography variant="body2">Price: {review.price}</Typography>
                      <Typography variant="body2">
                        Store Link:{' '}
                        <Box component="a" href={review.storeLink} target="_blank" rel="noopener noreferrer" sx={{ color: colors.primary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          View Product
                        </Box>
                      </Typography>
                      <Typography fontWeight={600} mt={2}>Review Details:</Typography>
                      <Typography variant="body2">Date Created: {review.date}</Typography>
                      <Typography variant="body2">Date Edited: {review.editedDate}</Typography>
                    </Box>
                  )}
                </Box>
              </Stack>
              <Stack spacing={1} direction="row" alignSelf="flex-end">
                <Button onClick={(e) => { e.stopPropagation(); handleEdit(review); }} variant="outlined" sx={{ borderRadius: '999px', textTransform: 'none', color: colors.textGray, borderColor: colors.textGray, '&:hover': { color: colors.black, borderColor: colors.black } }}>Edit</Button>
                <Button onClick={(e) => { e.stopPropagation(); handleDelete(review); }} variant="outlined" sx={{ borderRadius: '999px', textTransform: 'none', color: colors.textGray, borderColor: colors.textGray, '&:hover': { color: colors.black, borderColor: colors.black } }}>Delete</Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={!!editingReview} onClose={() => setEditingReview(null)}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Review"
            multiline
            rows={3}
            value={editingReview?.text || ''}
            onChange={(e) => setEditingReview(prev => prev ? { ...prev, text: e.target.value } : prev)}
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.primary,
                },
              },
              '& label.Mui-focused': {
                color: colors.primary,
              },
            }}
          />
          <Rating
            value={editingReview?.rating || 0}
            onChange={(_, newValue) => setEditingReview(prev => prev && newValue ? { ...prev, rating: newValue } : prev)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingReview(null)} color="inherit">Cancel</Button>
          <Button onClick={saveEdit} sx={{ color: colors.black }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteReview} onClose={() => setDeleteReview(null)}>
        <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteReview(null)} color="inherit">Cancel</Button>
          <Button onClick={confirmDelete} sx={{ color: colors.black }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
