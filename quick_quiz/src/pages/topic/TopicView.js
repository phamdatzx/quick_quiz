import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import QuizSetPreview from "../quizset/QuizSetPreview";
import quizSetService from "../../services/quizSetService";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TopicView = () => {
  const { topicId } = useParams(); 
  const navigate = useNavigate();
  const [quizSets, setQuizSets] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const itemsPerPage = 10; 


  useEffect(() => {
    const fetchQuizSets = async () => {
      if (!topicId) {
        console.error("Topic ID is missing.");
        return;
      }
  
      try {
        const data = await quizSetService.getQuizSetsByTopic({
          topicId, 
          page: page - 1, 
          limit: itemsPerPage,

        });
  
        setQuizSets(data.quizSets || []);
        setTotalPages(Math.ceil(data.totalElements / itemsPerPage)); 
      } catch (error) {
        console.error("Error fetching quiz sets:", error);
      }
    };
  
    fetchQuizSets();
  }, [topicId, page]);

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  const handleCreateQuizSet = () => {
    navigate(`/Createquizset?topicId=${topicId}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách bộ câu hỏi của chủ đề
      </Typography>

      <Box sx={{ my: 2, textAlign: "left" }}>
        <IconButton
          color="primary"
          onClick={handleCreateQuizSet}
          sx={{ fontSize: 30 }}
        >
          <AddCircleIcon />
          <Typography variant="subtitle1" sx={{mx:1}}> Tạo thêm bộ câu hỏi</Typography>
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress /> {/* Hiển thị spinner khi loading */}
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {quizSets.map((quizSet) => (
              <Grid item xs={12} key={quizSet.id}>
                <QuizSetPreview
                  title={quizSet.name}
                  description={quizSet.description || "Không có mô tả"}
                  quizId={quizSet.id}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TopicView;
