import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
} from "@mui/material";
import TopicPreview from "./TopicPreview";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import topicService from "../../services/topicService";

const Topic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreTopics, setHasMoreTopics] = useState(true);

  const itemsPerPage = 5;

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await topicService.getTopics({
        search: searchTerm || "",
        sort: sortOption,
        page, // No need to subtract 1 since API starts from page 1
        limit: itemsPerPage,
      });

      if (response.topics.length > 0) {
        setTopics(response.topics);
        setHasMoreTopics(response.topics.length === itemsPerPage);
      } else {
        setTopics([]);
        setHasMoreTopics(false);
        if (page > 1) setPage(page - 1); // Prevent staying on an empty page
      }
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [searchTerm, sortOption, page]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && hasMoreTopics) setPage(page + 1);
    if (direction === "prev" && page > 1) setPage(page - 1);
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
        <Typography variant="h4">Các chủ đề</Typography>
        <IconButton href="/createtopic">
          <CreateNewFolderIcon />
          <Typography variant="subtitle1">Tạo chủ đề</Typography>
        </IconButton>
      </Box>

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
            <MenuItem value="recent">Mới nhất</MenuItem>
            <MenuItem value="alphabetical">Theo bảng chữ cái</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading State */}
      {loading && <Typography variant="h6">Đang tải...</Typography>}

      {/* Topics Display */}
      <Grid container spacing={2}>
        {topics.map((topic) => (
          <Grid item xs={12} key={topic.id}>
            <TopicPreview
              title={topic.name}
              description={topic.description}
              topicId={topic.id}
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

        <Typography sx={{ alignSelf: "center", marginX: 2 }}>
          Trang {page}
        </Typography>

        <IconButton
          onClick={() => handlePageChange("next")}
          disabled={!hasMoreTopics}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topic;
