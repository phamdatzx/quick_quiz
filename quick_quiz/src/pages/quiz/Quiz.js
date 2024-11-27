import React, { useState } from "react";
import QuizCard from "../../components/QuizCard";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const navigate = useNavigate();

  // Mock dữ liệu câu hỏi
  const quizzes = [
    {
      question:
        "Theo quan điểm của triết gia Aristotle, nguyên nhân nào được coi là quan trọng nhất trong việc giải thích sự tồn tại và bản chất của mọi sự vật?",
      choices: [
        "Nguyên nhân vật chất: Chất liệu cấu tạo nên sự vật, như gỗ để làm bàn ghế",
        "Nguyên nhân hình thức: Hình dạng, cấu trúc giúp định hình bản chất của sự vật",
        "Nguyên nhân tác động: Động lực hoặc sự kiện làm cho sự vật trở thành hiện thực",
        "Nguyên nhân mục đích: Mục tiêu cuối cùng mà sự vật được tạo ra để hướng tới",
      ],
      correctAnswer: 3,
    },
    {
      question:
        "Theo thuyết tương đối hẹp của Albert Einstein, điều gì xảy ra với thời gian khi một vật thể di chuyển gần vận tốc ánh sáng so với một người quan sát đứng yên?",
      choices: [
        "Thời gian trôi nhanh hơn đối với vật thể đang di chuyển.",
        "Thời gian trôi chậm hơn đối với vật thể đang di chuyển.",
        "Thời gian trôi giống nhau cho cả vật thể di chuyển và người quan sát đứng yên.",
        "Thời gian không bị ảnh hưởng bởi vận tốc của vật thể di chuyển.",
      ],
      correctAnswer: 1,
    },
  ];

  // State để lưu câu trả lời của người dùng
  const [userAnswers, setUserAnswers] = useState(
    Array(quizzes.length).fill(null)
  );

  // Hàm xử lý chọn câu trả lời
  const handleSelectAnswer = (quizIndex, choiceIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[quizIndex] = choiceIndex;
    setUserAnswers(newAnswers);
  };

  // Xử lý nộp bài
  const handleSubmit = () => {
    navigate("/result", { state: { quizzes, userAnswers } });
  };

  return (
    <Box sx={{ p: 2, justifyItems: "center" }}>
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          index={index}
          question={quiz.question}
          choices={quiz.choices}
          onSelectAnswer={handleSelectAnswer}
        />
      ))}
      <Button
        variant="contained"
        sx={{ mt: 2, height: "10vh", width: "60vw" }}
        onClick={handleSubmit}
      >
        Nộp bài
      </Button>
    </Box>
  );
};

export default Quiz;
