import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
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
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());

 
  function calculateItemsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 2200) return 5;
    if (screenWidth >= 1800) return 4;
    if (screenWidth >= 1400) return 3;
    if (screenWidth >= 1000) return 2;
    if (screenWidth >= 600) return 1;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
      setMyPage(1); 
      setSavedPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (direction, type) => {
    if (type === "my") {
      const maxPage = Math.ceil(myQuizSets.length / itemsPerPage);
      if (direction === "next" && myPage < maxPage) setMyPage(myPage + 1);
      if (direction === "prev" && myPage > 1) setMyPage(myPage - 1);
    } else {
      const maxPage = Math.ceil(savedQuizSets.length / itemsPerPage);
      if (direction === "next" && savedPage < maxPage) setSavedPage(savedPage + 1);
      if (direction === "prev" && savedPage > 1) setSavedPage(savedPage - 1);
    }
  };

  const getPaginatedQuizSets = (quizSets, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return quizSets.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Your Quizsets */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bộ câu hỏi của bạn
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <IconButton onClick={() => handlePageChange("prev", "my")} disabled={myPage === 1}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "stretch", gap: 2 }}>
          {getPaginatedQuizSets(myQuizSets, myPage).map((quizSet) => (
            <QuizSetCard
              key={quizSet.quizId}
              title={quizSet.title}
              questionCount={quizSet.questionCount}
              quizId={quizSet.quizId}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => handlePageChange("next", "my")}
          disabled={myPage === Math.ceil(myQuizSets.length / itemsPerPage)}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Saved Quizsets */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bộ câu hỏi đã lưu
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <IconButton onClick={() => handlePageChange("prev", "saved")} disabled={savedPage === 1}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "stretch", gap: 2 }}>
          {getPaginatedQuizSets(savedQuizSets, savedPage).map((quizSet) => (
            <QuizSetCard
              key={quizSet.quizId}
              title={quizSet.title}
              questionCount={quizSet.questionCount}
              quizId={quizSet.quizId}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => handlePageChange("next", "saved")}
          disabled={savedPage === Math.ceil(savedQuizSets.length / itemsPerPage)}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Home;