import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, IconButton, Pagination, Typography } from "@mui/material";
import QuizSetCard from "../quizset/QuizSetCard"; // Import QuizSetCard
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Home = () => {
  const myQuizSets = [
    { title: "Quiz Set 1", questionCount: 10, quizId: 1 },
    { title: "Quiz Set 2", questionCount: 15, quizId: 2 },
    { title: "Quiz Set 3", questionCount: 20, quizId: 3 },
    { title: "Quiz Set 4", questionCount: 5, quizId: 4 },
    { title: "Quiz Set 5", questionCount: 25, quizId: 5 },
    { title: "Quiz Set 6", questionCount: 18, quizId: 6 },
    { title: "Quiz Set 7", questionCount: 7, quizId: 7 },
    { title: "Quiz Set 8", questionCount: 14, quizId: 8 },
    { title: "Quiz Set 9", questionCount: 13, quizId: 9 },
    { title: "Quiz Set 10", questionCount: 30, quizId: 10 },
  ];

  const savedQuizSets = [
    { title: "Saved Quiz Set 1", questionCount: 8, quizId: 11 },
    { title: "Saved Quiz Set 2", questionCount: 12, quizId: 12 },
    { title: "Saved Quiz Set 3", questionCount: 5, quizId: 13 },
    { title: "Saved Quiz Set 4", questionCount: 20, quizId: 14 },
    { title: "Saved Quiz Set 5", questionCount: 6, quizId: 15 },
    { title: "Saved Quiz Set 6", questionCount: 17, quizId: 16 },
    { title: "Saved Quiz Set 7", questionCount: 3, quizId: 17 },
    { title: "Saved Quiz Set 8", questionCount: 22, quizId: 18 },
    { title: "Saved Quiz Set 9", questionCount: 11, quizId: 19 },
    { title: "Saved Quiz Set 10", questionCount: 19, quizId: 20 },
  ];

  const [myPage, setMyPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);

  const itemsPerPage = 3;

  const handleMyPageChange = (direction) => {
    if (
      direction === "next" &&
      myPage < Math.ceil(myQuizSets.length / itemsPerPage)
    ) {
      setMyPage(myPage + 1);
    } else if (direction === "prev" && myPage > 1) {
      setMyPage(myPage - 1);
    }
  };

  const handleSavedPageChange = (direction) => {
    if (
      direction === "next" &&
      savedPage < Math.ceil(savedQuizSets.length / itemsPerPage)
    ) {
      setSavedPage(savedPage + 1);
    } else if (direction === "prev" && savedPage > 1) {
      setSavedPage(savedPage - 1);
    }
  };

  const getPaginatedQuizSets = (quizSets, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return quizSets.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Quizset của bạn */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Quizset của bạn
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={() => handleMyPageChange("prev")}
          disabled={myPage === 1}
        >
          <ArrowBack />
        </IconButton>

        <Box
          sx={{ display: "flex", justifyContent: "stretch", paddingBottom: 2 }}
        >
          {getPaginatedQuizSets(myQuizSets, myPage).map((quizSet) => (
            <QuizSetCard
              key={quizSet.id}
              title={quizSet.title}
              questionCount={quizSet.questionCount}
              quizId={quizSet.id}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => handleMyPageChange("next")}
          disabled={myPage === Math.ceil(myQuizSets.length / itemsPerPage)}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Quizset đã lưu */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Quizset đã lưu
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}
      >
        <IconButton
          onClick={() => handleSavedPageChange("prev")}
          disabled={savedPage === 1}
        >
          <ArrowBack />
        </IconButton>

        <Box
          sx={{ display: "flex", justifyContent: "stretch", paddingBottom: 2 }}
        >
          {getPaginatedQuizSets(savedQuizSets, savedPage).map((quizSet) => (
            <QuizSetCard
              key={quizSet.id}
              title={quizSet.title}
              questionCount={quizSet.questionCount}
              quizId={quizSet.id}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => handleSavedPageChange("next")}
          disabled={
            savedPage === Math.ceil(savedQuizSets.length / itemsPerPage)
          }
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Home;
