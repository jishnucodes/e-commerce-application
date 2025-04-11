import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { format } from 'date-fns';

// Mock data for reviews
const initialReviews = [
  {
    id: 1,
    user: 'John Doe',
    rating: 5,
    comment: 'Excellent product! The quality is outstanding and it works perfectly.',
    date: new Date('2023-05-15'),
    likes: 12,
    liked: false,
  },
  {
    id: 2,
    user: 'Jane Smith',
    rating: 4,
    comment: 'Good product overall, but a bit expensive for what it offers.',
    date: new Date('2023-06-20'),
    likes: 8,
    liked: false,
  },
];

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: Date;
  likes: number;
  liked: boolean;
}

const ProductReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [hover, setHover] = useState<number | null>(null);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  // Handle like/unlike a review
  const handleLikeReview = (reviewId: number) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          liked: !review.liked,
          likes: review.liked ? review.likes - 1 : review.likes + 1,
        };
      }
      return review;
    }));
  };

  // Handle submit new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!newReview.comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      user: 'Current User', // In a real app, this would come from authentication
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date(),
      likes: 0,
      liked: false,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
  };

  const labels: { [index: number]: string } = {
    0: 'No rating',
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Customer Reviews
      </Typography>
      
      {/* Rating Summary */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 4 }}>
          <Typography variant="h3" component="div" fontWeight="bold">
            {averageRating.toFixed(1)}
          </Typography>
          <Rating 
            value={averageRating} 
            precision={0.5} 
            readOnly 
            size="large"
          />
          <Typography variant="body2" color="text.secondary">
            Based on {reviews.length} reviews
          </Typography>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(review => review.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 30 }}>{rating}</Typography>
                <Box sx={{ flex: 1, mx: 1, height: 8, bgcolor: 'grey.200', borderRadius: 1 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${percentage}%`, 
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                    }} 
                  />
                </Box>
                <Typography variant="body2" sx={{ minWidth: 40 }}>{count}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Add Review Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        <form onSubmit={handleSubmitReview}>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Your Rating</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={newReview.rating}
                precision={1}
                onChange={(_, newValue) => {
                  setNewReview({ ...newReview, rating: newValue || 0 });
                }}
                onChangeActive={(_, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<Box sx={{ opacity: 0.55, fontSize: '1.2rem' }}>★</Box>}
              />
              <Box sx={{ ml: 2 }}>
                {newReview.rating !== null && (
                  <Typography variant="body2">
                    {labels[hover !== null ? hover : newReview.rating]}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <Button 
            variant="contained" 
            type="submit"
            sx={{ textTransform: 'none' }}
          >
            Submit Review
          </Button>
        </form>
      </Paper>
      
      {/* Reviews List */}
      <Box>
        <Typography variant="h6" gutterBottom>
          All Reviews
        </Typography>
        
        {reviews.map((review) => (
          <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar sx={{ mr: 2 }}>{review.user.charAt(0)}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.user}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(review.date, 'MMM dd, yyyy')}
                  </Typography>
                </Box>
                
                <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                
                <Typography variant="body1" paragraph>
                  {review.comment}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleLikeReview(review.id)}
                    color={review.liked ? 'primary' : 'default'}
                  >
                    {review.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {review.likes} {review.likes === 1 ? 'person' : 'people'} found this helpful
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProductReviews; 