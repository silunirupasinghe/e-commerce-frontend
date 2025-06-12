"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colors from '@/theme/color'
// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface Review {
  id: number;
  userName: string;
  timeAgo: string;
  rating: number;
  product: string;
  comment: string;
}

// 🔧 Placeholder for database customer count
const fetchCustomerCount = async (): Promise<number> => {
  // TODO: Replace with real database/API call
  return 0;
};

const ReviewsPage = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "John Doe",
      timeAgo: "15 mins ago",
      rating: 4,
      product: "Sony WH-1000XM4 Headphones",
      comment:
        "Comfort is top-notch with plush earpads, though they can feel slightly warm during extended use. Battery life is impressive at 30+.",
    },
    {
      id: 2,
      userName: "Jane Smith",
      timeAgo: "1 hour ago",
      rating: 5,
      product: "Sony WH-1000XM4 Headphones",
      comment: "Excellent noise cancellation and great battery life!",
    },
    {
      id: 3,
      userName: "David Lee",
      timeAgo: "Yesterday",
      rating: 3,
      product: "Sony WH-1000XM4 Headphones",
      comment: "Sound quality is good, but price is a bit high.",
    },
    {
      id: 4,
      userName: "Alice Green",
      timeAgo: "2 days ago",
      rating: 5,
      product: "Sony WH-1000XM4 Headphones",
      comment: "Very comfortable and amazing sound clarity!",
    },
    {
      id: 5,
      userName: "Michael Brown",
      timeAgo: "3 days ago",
      rating: 2,
      product: "Sony WH-1000XM4 Headphones",
      comment: "Didn't meet my expectations. Returned it.",
    },
  ]);

  const averageRating = Math.round(
    (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0) * 10
  ) / 10;

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1] += 1;
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    toast.info("Search functionality to be implemented");
  };

  const chartData = {
    labels: ["5", "4", "3", "2", "1"],
    datasets: [
      {
        data: [
          ratingCounts[4],
          ratingCounts[3],
          ratingCounts[2],
          ratingCounts[1],
          ratingCounts[0],
        ],
        backgroundColor: colors.primary,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.raw} review(s)`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0 },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: {
          callback: function (value: any, index: number) {
            const count = chartData.datasets[0].data[index];
            return `${chartData.labels[index]}  (${count})`;
          },
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: colors.lightGray }}>
      <ToastContainer />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: colors.primary }}>
          Reviews
        </Typography>
        <TextField
          placeholder="Search"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton>
                <FilterListOutlinedIcon />
              </IconButton>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Review Breakdown */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Review Breakdown
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Average and Stars */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h3" color="#ffcc00" sx={{ fontWeight: "bold" }}>
              {averageRating}
            </Typography>
            <Rating value={averageRating} precision={0.1} readOnly />
            <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
              {reviews.length} Reviews
            </Typography>
          </Grid>

          {/* Chart */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Bar data={chartData} options={chartOptions} />
          </Grid>

          {/* Summary Cards with Icons */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Card
                  sx={{
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <PeopleAltIcon sx={{ color: "#555" }} />
                  <Box>
                    <Typography variant="body2" color="gray">
                      Total Customers
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {/* Placeholder value */}
                      678
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Card
                  sx={{
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <ReviewsIcon sx={{ color: "#555" }} />
                  <Box>
                    <Typography variant="body2" color="gray">
                      Total Reviews
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {reviews.length}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Card
                  sx={{
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <SentimentSatisfiedAltIcon sx={{ color: "#555" }} />
                  <Box>
                    <Typography variant="body2" color="gray">
                      Overall Review
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Mostly Positive
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Review Cards */}
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid size={{md:4, sm:12}} key={review.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: colors.white,
                height: 240, 
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle1" color="black">
                    {review.userName}
                  </Typography>
                  <Typography variant="caption" color="gray" sx={{ ml: 1 }}>
                    {review.timeAgo}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
                <Typography variant="body2" color="black" sx={{ mb: 1 }}>
                  Product: {review.product}
                </Typography>
                <Typography variant="body2" color="gray">
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewsPage;
