import React, { useState } from "react";
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
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import QuizSetPreview from "./QuizSetPreview";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const QuizSetLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("creationDateAscending");
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);

  const itemsPerPage = 10;

  const quizsets = [
    { title: "Math Basics", questionCount: 20, quizId: 1 },
    { title: "History 101", questionCount: 15, quizId: 2 },
    { title: "Science Trivia", questionCount: 10, quizId: 3 },
    // Add more quiz sets here...
  ];

  const savedQuizsets = [
    { title: "Geography Fun", questionCount: 25, quizId: 4 },
    { title: "Programming Basics", questionCount: 30, quizId: 5 },
    // Add more saved quiz sets here...
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(1); // Reset page to 1 when switching tabs
  };

  const filterAndSortQuizsets = (quizsets) => {

    // Condition checking for variable and API call
    return quizsets
  };

  const paginatedQuizsets = (quizsets) => {
    const startIndex = (page - 1) * itemsPerPage;
    return quizsets.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredQuizsets = filterAndSortQuizsets(quizsets);
  const filteredSavedQuizsets = filterAndSortQuizsets(savedQuizsets);

  const currentQuizsets =
    currentTab === 0 ? filteredQuizsets : filteredSavedQuizsets;
  const displayedQuizsets = paginatedQuizsets(currentQuizsets);
  const pageCount = Math.ceil(currentQuizsets.length / itemsPerPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4">
          Các bộ câu hỏi
        </Typography>
        <IconButton href="/createquizset" sx={{}}>
          <CreateNewFolderIcon />
          <Typography variant="subtitle1">
            Tạo bộ câu hỏi
          </Typography>
        </IconButton>
      </Box>

      {/* Tabs for Quizsets */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ marginBottom: 3 }}
      >
        <Tab label="Bộ câu hỏi của bạn" />
        <Tab label="Bộ câu hỏi đã lưu" />
      </Tabs>

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
          sx={{ width: "60%" }}
        />
        <FormControl sx={{ width: "35%" }}>
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="creationDateAscending">Ngày tạo (Tăng dần)</MenuItem>
            <MenuItem value="creationDateDescending">Ngày tạo (Giảm dần)</MenuItem>
            <MenuItem value="nameAscending">Tên (Tăng dần)</MenuItem>
            <MenuItem value="nameDescending">Tên (Giảm dần)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {displayedQuizsets.map((quizset) => (
          <Grid item xs={12} key={quizset.quizId}>
            <QuizSetPreview
              title={quizset.title}
              questionCount={quizset.questionCount}
              quizId={quizset.quizId}
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

export default QuizSetLibrary;
