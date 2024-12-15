import React, { useEffect, useState } from "react";
import QuizCard from "../../components/QuizCard";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import quizSetService from "../../services/quizSetService";

const Quiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Fetch quiz data from API
    const fetchQuizzes = async () => {
      try {
        const response = await quizSetService.getQuizzesByQuizSetId(quizId);
        setQuizzes(response);
        setUserAnswers(Array(response.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError("Đã có lỗi trong quá trình tải bộ câu hỏi. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [quizId]);

  // Hàm xử lý chọn câu trả lời
  const handleSelectAnswer = (quizIndex, selectedAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[quizIndex] = selectedAnswer; // Store the selected answer directly
    setUserAnswers(newAnswers);
    console.log(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = quizzes.map((quiz, index) => {
      return quiz.correctAnswer === userAnswers[index]; 
    });

    navigate("/result", { state: { quizzes, userAnswers } });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 2, justifyItems: "center" }}>
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={quiz.id}
          index={index}
          question={quiz.content}
          choices={quiz.answers}
          onSelectAnswer={handleSelectAnswer}
        />
      ))}
      <Button
        variant="contained"
        sx={{ mt: 2, height: "10vh", width: "60vw" }}
        onClick={handleSubmit}
        disabled={userAnswers.includes(null)}
      >
        Nộp bài
      </Button>
    </Box>
  );
};

export default Quiz;
