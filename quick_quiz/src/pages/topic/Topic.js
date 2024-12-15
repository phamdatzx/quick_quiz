import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import TopicPreview from "./TopicPreview";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import topicService from "../../services/topicService";

const Topic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const [topics, setTopics] = useState([]); 
  
    useEffect(() => {
      
      const fetchTopics = async () => {
        try {
          const response = await topicService.getTopics();
          setTopics(response.topics);
        } catch (error) {
          console.error("Failed to fetch topics", error);
        }
      };
  
      fetchTopics();
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

  const filterAndSortTopics = (topics) => {
    return topics
      .filter((topic) => topic.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === "recent") return b.topicId - a.topicId;
        if (sortOption === "alphabetical") return a.title.localeCompare(b.title);
        return 0;
      });
  };

  const paginatedTopics = (topics) => {
    const startIndex = (page - 1) * itemsPerPage;
    return topics.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredTopics = filterAndSortTopics(topics);
  const displayedTopics = paginatedTopics(filteredTopics);
  const pageCount = Math.ceil(filteredTopics.length / itemsPerPage);

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
          Các chủ đề
        </Typography>
        <IconButton href="/createtopic" sx={{}}>
          <CreateNewFolderIcon />
          <Typography variant="subtitle1">
            Tạo chủ đề
          </Typography>
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
          sx={{ width: "100%" }}
        />
      </Box>

      <Grid container spacing={2}>
        {displayedTopics.map((topic) => (
          <Grid item xs={12} key={topic.id}>
            <TopicPreview
              title={topic.name}
              description={topic.description}
              topicId={topic.id}
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
export default Topic;