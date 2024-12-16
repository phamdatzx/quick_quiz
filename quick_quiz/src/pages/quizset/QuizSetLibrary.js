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
} from "@mui/material";
import QuizSetPreview from "./QuizSetPreview";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import quizSetService from "../../services/quizSetService";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const QuizSetLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("creationDateAscending");
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0); // Tab index
  const [quizsets, setQuizsets] = useState([]); // List of quizsets to display
  const [loading, setLoading] = useState(false);
  const [hasMoreQuizSets, setHasMoreQuizSets] = useState(true);
  const [bookmarkedQuizSetIds, setBookmarkedQuizSetIds] = useState(new Set());
  const itemsPerPage = 5;

  // Fetch quizsets based on the current tab
  const fetchQuizSets = async () => {
    setLoading(true);
    try {
      if (currentTab === 0) {
        // Fetch "Bộ câu hỏi của bạn"
        const direction = sortOption.includes("Descending") ? "desc" : "asc";
        const search = searchTerm || "";

        const response = await quizSetService.getQuizSetsByTopic({
          topicId: "", // Replace with topicId if applicable
          page: page - 1, // API uses 0-based pagination
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
        }
      } else if (currentTab === 1) {
        // Fetch "Bộ câu hỏi đã lưu"
        const response = await quizSetService.getBookmarkedQuizSets();
        setQuizsets(response.map((quizSet) => quizSet));
        setHasMoreQuizSets(false); // Bookmark list doesn't use pagination
      }
    } catch (error) {
      console.error("Failed to fetch quiz sets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarkedQuizSets = async () => {
    try {
      const bookmarkedQuizSets = await quizSetService.getBookmarkedQuizSets();
      const bookmarkedIds = new Set(bookmarkedQuizSets.map((quizSet) => quizSet.id));
      setBookmarkedQuizSetIds(bookmarkedIds);
    } catch (error) {
      console.error("Error fetching bookmarked quiz sets:", error);
    }
  };

  // Fetch data when searchTerm, sortOption, page, or currentTab changes
  useEffect(() => {
    fetchQuizSets();
  }, [searchTerm, sortOption, page, currentTab]);

  // Fetch bookmarked quiz sets once on component mount
  useEffect(() => {
    fetchBookmarkedQuizSets();
  }, [currentTab]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setPage(1); // Reset to page 1 when sorting
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && hasMoreQuizSets) setPage(page + 1);
    if (direction === "prev" && page > 1) setPage(page - 1);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(1); // Reset to page 1 when switching tabs
    setQuizsets([]); // Clear quizsets to prevent showing old data
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
      {currentTab === 0 && (
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
      )}

      {/* Loading State */}
      {loading && <Typography variant="h6">Loading...</Typography>}

      <Grid container spacing={2}>
        {quizsets.map((quizset) => (
          <Grid item xs={12} key={quizset.id}>
            <QuizSetPreview
              title={quizset.name}
              description={quizset.description}
              quizId={quizset.id}
              isInitiallyBookmarked={bookmarkedQuizSetIds.has(quizset.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      {currentTab === 0 && (
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
      )}
    </Box>
  );
};

export default QuizSetLibrary;
