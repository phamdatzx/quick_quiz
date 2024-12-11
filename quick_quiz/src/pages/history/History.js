import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Grid,
} from "@mui/material";
import HistoryPreview from "./HistoryPreview"; // Assuming a preview component for individual history

// Mock data for history attempts
const mockHistoryData = [
  { id: 1, quizset_id: 101, attempt_time: "2024-12-01T10:00:00Z" },
  { id: 2, quizset_id: 102, attempt_time: "2024-12-02T14:30:00Z" },
  { id: 3, quizset_id: 103, attempt_time: "2024-12-05T09:15:00Z" },
  { id: 4, quizset_id: 104, attempt_time: "2024-12-06T16:45:00Z" },
  { id: 5, quizset_id: 105, attempt_time: "2024-12-07T18:00:00Z" },
  { id: 6, quizset_id: 106, attempt_time: "2024-12-08T20:30:00Z" },
  { id: 7, quizset_id: 107, attempt_time: "2024-12-09T11:00:00Z" },
  { id: 8, quizset_id: 108, attempt_time: "2024-12-10T13:10:00Z" },
  { id: 9, quizset_id: 109, attempt_time: "2024-12-10T17:25:00Z" },
  { id: 10, quizset_id: 110, attempt_time: "2024-12-11T15:40:00Z" },
  // Add more mock data if needed
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Simulate API call
    setHistoryData(mockHistoryData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filterAndSortHistory = (history) => {
    return history
      .filter((historyItem) => {
        // Search filter by quizset_id or attempt_time
        return (
          historyItem.quizset_id
            .toString()
            .includes(searchTerm.toLowerCase()) ||
          historyItem.attempt_time.includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortOption === "recent") return new Date(b.attempt_time) - new Date(a.attempt_time);
        if (sortOption === "alphabetical") return a.quizset_id - b.quizset_id;
        return 0;
      });
  };

  const paginatedHistory = (history) => {
    const startIndex = (page - 1) * itemsPerPage;
    return history.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredHistory = filterAndSortHistory(historyData);
  const displayedHistory = paginatedHistory(filteredHistory);
  const pageCount = Math.ceil(filteredHistory.length / itemsPerPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lịch sử Làm Bài
      </Typography>

      {/* Search and Sort Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "25%" }}>
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="recent">Gần đây</MenuItem>
            <MenuItem value="alphabetical">Thứ tự chữ cái</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {displayedHistory.map((historyItem) => (
          <Grid item xs={12} key={historyItem.id}>
            <HistoryPreview
              quizsetId={historyItem.quizset_id}
              attemptTime={historyItem.attempt_time}
              attemptId={historyItem.id}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default History;
