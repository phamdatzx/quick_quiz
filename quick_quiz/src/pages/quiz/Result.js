import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import quizSetService from "../../services/quizSetService";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizzes = [], userAnswers = [], quizId, submitTime } = location.state || {};

  const [quizOverview, setQuizOverview] = useState(null);
  const correctCount = quizzes.reduce(
    (count, quiz, index) =>
      userAnswers[index] === quiz.correctAnswer ? count + 1 : count,
    0
  );
  console.log(quizId);

  useEffect(() => {
      const fetchQuizOverview = async () => {
        try {
          const overview = await quizSetService.getQuizSetById(quizId);
          setQuizOverview(overview);
        } catch (err) {
          console.error();
        } 
      };
  
      fetchQuizOverview();
    }, [quizId]);

  return (
    <Box sx={{
      p: 2,
      justifyItems: "center",
      flexDirection: "column",
    }}>
      {/* Tổng quát quiz */}
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
        {quizOverview && (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
              Bộ câu hỏi: {quizOverview.name}
            </Typography>
            <Typography variant="body1" gutterBottom marginBottom={3} sx={{ color: "#fff" }}>
              {quizOverview.description}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: "#fff" }}>
              Hoàn thành vào lúc: {submitTime}
            </Typography>
          </Box>)}
      </Box>

      {/* Kết quả tổng quát */}
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

      {/* Hiển thị câu hỏi và các lựa chọn */}
      {quizOverview?.allowShowAnswer ? (
      <Box sx={{
        mt: 2,
        display: "flex",
        width: "60vw",
            gap: 1,
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap", }}>
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
              width: "100%",
              justifySelf: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Câu {index + 1}: {quiz.content}
            </Typography>

            <Box sx={{display: "flex",
            gap: 1,
              justifyContent: "space-evenly",
            
            alignItems: "center",
            flexWrap: "wrap",
            }}>
              {quiz.answers && Array.isArray(quiz.answers) && quiz.answers.map((answer, choiceIndex) => {
                // Kiểm tra đáp án đúng và đáp án người dùng đã chọn
                const isCorrect = answer === quiz.correctAnswer;
                const isSelected = answer === userAnswers[index];

                return (
                  <Box
                    key={choiceIndex}
                    sx={{
                      display: "flex",
                      width: "45%",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: isCorrect
                        ? "#6FD181" // Màu xanh nếu đúng
                        : isSelected
                        ? "#A70F0F" // Màu đỏ nếu chọn sai
                        : "#f0f0f0", // Màu xám nếu chưa chọn
                      boxShadow: isCorrect || isSelected
                        ? "0px 4px 6px rgba(0, 0, 0, 0.2)"
                        : "none",
                    }}
                  >
                    <Typography
                      sx={{
                        textWrap:'balance',
                        color: isCorrect || isSelected ? "#fff" : "#000",
                      }}
                    >
                      {answer}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
      ) : (
          <></>
      )}
      

      <Button
        variant="contained"
        sx={{ mt: 2, height: "10vh", width: "60vw" }}
        onClick={() => navigate("/home")}
      >
        Trở về màn hình chính
      </Button>
    </Box>
  );
};

export default Result;
