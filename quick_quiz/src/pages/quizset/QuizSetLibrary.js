import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import QuizSetPreview from "./QuizSetPreview";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import quizSetService from "../../services/quizSetService";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const QuizSetLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("creationDateAscending");
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const [quizsets, setQuizsets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreQuizSets, setHasMoreQuizSets] = useState(true);

  const itemsPerPage = 5;

  const fetchQuizSets = async () => {
    setLoading(true);
    try {
      const direction = sortOption.includes("Descending") ? "desc" : "asc";
      const search = searchTerm || "";

      const response = await quizSetService.getQuizSetsByTopic({
        topicId: "",  
        page: page - 1,  
        limit: itemsPerPage,
        direction: direction,
        search: search,
      });

      if (response.quizSets.length > 0) {
        setQuizsets(response.quizSets);
        setHasMoreQuizSets(response.quizSets.length === itemsPerPage);
      } else {
        setQuizsets([]);
        setHasMoreQuizSets(false);
        if (page > 1) setPage(page - 1);
      }
    } catch (error) {
      console.error("Failed to fetch quiz sets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() || sortOption || currentTab) {
      setQuizsets([]);
    }
    fetchQuizSets();
  }, [searchTerm, sortOption, page, currentTab]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && hasMoreQuizSets) setPage(page + 1);
    if (direction === "prev" && page > 1) setPage(page - 1);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(1); 
  };

  const paginatedQuizsets = (quizsets) => {
    const startIndex = (page - 1) * itemsPerPage;
    return quizsets.slice(startIndex, startIndex + itemsPerPage);
  };

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
        <Typography variant="h4">Các bộ câu hỏi</Typography>
        <IconButton href="/createquizset">
          <CreateNewFolderIcon />
          <Typography variant="subtitle1">Tạo bộ câu hỏi</Typography>
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

      {/* Loading State */}
      {loading && <Typography variant="h6">Loading...</Typography>}

      <Grid container spacing={2}>
      {quizsets.map((quizset) => (
  <Grid item xs={12} key={quizset.id}>
    <QuizSetPreview
      title={quizset.name}
      description={quizset.description}
      quizId={quizset.id}
    />
  </Grid>
))}
      </Grid>

       {/* Pagination Controls */}
       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <IconButton
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
        >
          <ArrowBack />
        </IconButton>

        {/* Page Numbers */}
        <Typography sx={{ alignSelf: "center", marginX: 2 }}>
          Trang {page}
        </Typography>

        <IconButton
          onClick={() => handlePageChange("next")}
          disabled={!hasMoreQuizSets}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default QuizSetLibrary;
