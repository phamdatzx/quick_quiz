import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizzes, userAnswers } = location.state;

  const correctCount = quizzes.reduce(
    (count, quiz, index) =>
      userAnswers[index] === quiz.correctAnswer ? count + 1 : count,
    0
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          m: 2,
          flexDirection: "column",
          gap: 2,
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "60vw",
          justifySelf: "center",
        }}
      >
        <Typography variant="h5">Kết quả làm bài</Typography>
        <Typography sx={{ mt: 2 }}>
          Bạn đã trả lời đúng {correctCount}/{quizzes.length} câu.
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        {quizzes.map((quiz, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              p: 2,
              m: 2,
              flexDirection: "column",
              gap: 2,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "60vw",
              justifySelf: "center",
            }}
          >
            <Typography variant="subtitle1">Câu {index + 1}: </Typography>
            <Typography>{quiz.question}</Typography>

            <Typography variant="subtitle1">Đáp án của bạn: </Typography>
            <Box
              sx={{
                fontFamily: 'Lexend',
                border: "none",
                borderRadius: 2,
                backgroundColor:
                  userAnswers[index] === quiz.correctAnswer
                    ? "#6FD181"
                    : "#A70F0F",
                color: "#fff",
                padding: "8px 16px",
                textAlign: "center",
              }}
            >
              {quiz.choices[userAnswers[index]] || "Chưa trả lời"}
            </Box>

            <Typography variant="subtitle1">Đáp án đúng: </Typography>
            <Box
              sx={{
                fontFamily: 'Lexend',
                border: "none",
                borderRadius: 2,
                backgroundColor: "#fff",
                color: "#000",
                padding: "8px 16px",
                textAlign: "center",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {quiz.choices[quiz.correctAnswer]}
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate("/quizpage")}
      >
        Làm lại
      </Button>
    </Box>
  );
};

export default Result;
