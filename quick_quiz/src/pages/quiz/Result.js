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
    <Box sx={{ p: 2, justifyItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          m: 2,
          flexDirection: "column",
          gap: 2,
          borderRadius: 4,
          backgroundColor: "#1935CA",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "60vw",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Kết quả làm bài
        </Typography>
        <Typography sx={{ mt: 1, color: "#fff" }}>
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
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Câu {index + 1}: {quiz.question}
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}> 
              {quiz.choices.map((choice, choiceIndex) => {
                const isCorrect = choiceIndex === quiz.correctAnswer;
                const isSelected = choiceIndex === userAnswers[index];

                return (
                  <Box
                    key={choiceIndex}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: isCorrect
                        ? "#6FD181"
                        : isSelected
                        ? "#A70F0F"
                        : "#f0f0f0",
                      
                      boxShadow: isCorrect || isSelected
                        ? "0px 4px 6px rgba(0, 0, 0, 0.2)"
                        : "none",
                    }}
                  >
                    <Typography sx={{
                      color: isCorrect || isSelected ? "#fff" : "#000",
                    }}>
                      {choice}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 2, height: "10vh", width: "60vw" }}
        onClick={() => navigate("/home")}
      >
        Làm lại
      </Button>
    </Box>
  );
};

export default Result;
