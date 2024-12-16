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
import HistoryPreview from "./HistoryPreview";
import practiceService from "../../services/practiceService";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [historyData, setHistoryData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await practiceService.getAllPracticeAttempt();
        
        setHistoryData(response);
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      }
    };

    fetchHistoryData();
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
        // Search filter by quizSet.name or practiceTime
        return (
          historyItem.quizSet.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          historyItem.practiceTime.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortOption === "recent")
          return new Date(b.practiceTime) - new Date(a.practiceTime);
        if (sortOption === "alphabetical")
          return a.quizSet.name.localeCompare(b.quizSet.name);
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
              data={historyItem}
              name={historyItem.quizSet.name}
              attempt={historyItem.attempt}
              attemptTime={new Date(historyItem.practiceTime).toLocaleString()}
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
