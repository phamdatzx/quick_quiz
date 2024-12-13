import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const QuizSetView = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  // Fetch questions based on quizId (mocked data for now)
  useEffect(() => {
    // Replace with actual API call to fetch questions for the quizId
    const fetchQuestions = async () => {
      const mockQuestions = [
        { id: 1, text: "What is the capital of France?" },
        { id: 2, text: "Solve: 2 + 2 = ?" },
        { id: 3, text: "Who wrote 'Hamlet'?" },
        { id: 4, text: "What is the boiling point of water in Celsius?" },
        { id: 5, text: "Name the largest planet in the Solar System." },
        // Add more mock questions...
      ];
      setQuestions(mockQuestions);
    };

    fetchQuestions();
  }, [quizId]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách câu hỏi của bộ câu hỏi này
      </Typography>

      <List>
        {questions.map((question) => (
          <ListItem key={question.id} divider>
            <ListItemText primary={question.text} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartQuiz}
        >
          Bắt đầu làm bài
        </Button>
      </Box>
    </Box>
  );
};

export default QuizSetView;