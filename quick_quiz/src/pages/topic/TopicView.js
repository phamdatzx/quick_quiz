import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { useParams } from "react-router-dom";
import QuizSetPreview from "../quizset/QuizSetPreview";

const TopicView = () => {
  const { topicId } = useParams();
  const [quizSets, setQuizSets] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch quiz sets based on topicId (mocked data for now)
  useEffect(() => {
    // Replace with actual API call to fetch quiz sets for the topicId
    const fetchQuizSets = async () => {
      const mockQuizSets = [
        { title: "Algebra Basics", questionCount: 20, quizId: 1 },
        { title: "World War II", questionCount: 15, quizId: 2 },
        { title: "Physics Fundamentals", questionCount: 10, quizId: 3 },
        { title: "Organic Chemistry", questionCount: 25, quizId: 4 },
        { title: "JavaScript Essentials", questionCount: 30, quizId: 5 },
        // Add more mock data...
      ];
      setQuizSets(mockQuizSets);
    };

    fetchQuizSets();
  }, [topicId]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedQuizSets = () => {
    const startIndex = (page - 1) * itemsPerPage;
    return quizSets.slice(startIndex, startIndex + itemsPerPage);
  };

  const displayedQuizSets = paginatedQuizSets();
  const pageCount = Math.ceil(quizSets.length / itemsPerPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách bộ câu hỏi của chủ đề 
      </Typography>

      <Grid container spacing={2}>
        {displayedQuizSets.map((quizSet) => (
          <Grid item xs={12} key={quizSet.quizId}>
            <QuizSetPreview
              title={quizSet.title}
              questionCount={quizSet.questionCount}
              quizId={quizSet.quizId}
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

export default TopicView;