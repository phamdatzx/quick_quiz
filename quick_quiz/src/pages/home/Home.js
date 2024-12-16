import React, { useState, useEffect } from "react";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import QuizSetCard from "../quizset/QuizSetCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import quizSetService from "../../services/quizSetService";

const calculateItemsPerPage = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 2200) return 4;
  if (screenWidth >= 1800) return 3;
  if (screenWidth >= 1200) return 2;
  if (screenWidth >= 600) return 1;
  return 1;
};

const Home = () => {
  const [myQuizSets, setMyQuizSets] = useState([]);
  const [savedQuizSets, setSavedQuizSets] = useState([]);
  const [randomQuizSets, setRandomQuizSets] = useState([]);
  const [myPage, setMyPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
  const [randomPage, setRandomPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const [loadingMy, setLoadingMy] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [hasMoreMyQuizSets, setHasMoreMyQuizSets] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage();
      setItemsPerPage(newItemsPerPage);

      setMyPage(1);
      setSavedPage(1);
      setRandomPage(1);
      fetchMyQuizSets(1, newItemsPerPage);
      fetchSavedQuizSets();
      fetchRandomQuizSets(1, newItemsPerPage);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchRandomQuizSets = async (page, limit) => {
    setLoadingRandom(true);
    try {
      const response = await quizSetService.getRandomQuizSets({ page: page - 1, limit });
      setRandomQuizSets(response);
    } catch (error) {
      console.error("Failed to fetch random quiz sets:", error);
    } finally {
      setLoadingRandom(false);
    }
  };

  const fetchMyQuizSets = async (page, limit) => {
    setLoadingMy(true);
    try {
      const data = await quizSetService.getQuizSetsByTopic({
        topicId: "",
        page: page - 1,
        limit,
      });

      if (data.quizSets.length > 0) {
        setMyQuizSets(data.quizSets);
        setHasMoreMyQuizSets(data.quizSets.length === limit);
      } else {
        setHasMoreMyQuizSets(false);
      }
    } catch (error) {
      console.error("Failed to fetch my quiz sets:", error);
      setHasMoreMyQuizSets(false);
    } finally {
      setLoadingMy(false);
    }
  };

  const fetchSavedQuizSets = async () => {
    setLoadingSaved(true);
    try {
      const data = await quizSetService.getBookmarkedQuizSets();
      setSavedQuizSets(data);
    } catch (error) {
      console.error("Failed to fetch saved quiz sets:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    fetchMyQuizSets(myPage, itemsPerPage);
    fetchSavedQuizSets();
    fetchRandomQuizSets(randomPage, itemsPerPage);
  }, [myPage, savedPage, randomPage, itemsPerPage]);

  const paginateRandomQuizSets = () => {
    const startIndex = (randomPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return randomQuizSets.slice(startIndex, endIndex);
  };

  const paginateSavedQuizSets = () => {
    const startIndex = (savedPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return savedQuizSets.slice(startIndex, endIndex);
  };

  const paginateMyQuizSets = () => {
    const startIndex = (myPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return myQuizSets.slice(startIndex, endIndex);
  };
  
  const handlePageChange = (direction, type) => {
    if (type === "my") {
      if (direction === "next" && hasMoreMyQuizSets) setMyPage(myPage + 1);
      if (direction === "prev" && myPage > 1) setMyPage(myPage - 1);
    } else if (type === "saved") {
      const maxSavedPages = Math.ceil(savedQuizSets.length / itemsPerPage);
      if (direction === "next" && savedPage < maxSavedPages) setSavedPage(savedPage + 1);
      if (direction === "prev" && savedPage > 1) setSavedPage(savedPage - 1);
    } else if (type === "random") {
      const maxRandomPages = Math.ceil(randomQuizSets.length / itemsPerPage);
      if (direction === "next" && randomPage < maxRandomPages) setRandomPage(randomPage + 1);
      if (direction === "prev" && randomPage > 1) setRandomPage(randomPage - 1);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Random Quizsets */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bộ câu hỏi ngẫu nhiên
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <IconButton
          onClick={() => handlePageChange("prev", "random")}
          disabled={randomPage === 1}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "stretch", gap: 2 }}>
          {loadingRandom ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 350,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Skeleton variant="rectangular" height={118} sx={{ borderRadius: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
              </Box>
            ))
          ) : (
            paginateRandomQuizSets().map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                title={quizSet.name}
                description={quizSet.description}
                quizId={quizSet.id}
              />
            ))
          )}
        </Box>

        <IconButton
          onClick={() => handlePageChange("next", "random")}
          disabled={randomPage === Math.ceil(randomQuizSets.length / itemsPerPage)}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Your Quizsets */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bộ câu hỏi của bạn
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <IconButton
          onClick={() => handlePageChange("prev", "my")}
          disabled={myPage === 1}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "stretch", gap: 2 }}>
          {loadingMy ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 350,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Skeleton variant="rectangular" height={118} sx={{ borderRadius: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
              </Box>
            ))
          ) : (
            paginateMyQuizSets().map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                title={quizSet.name}
                description={quizSet.description}
                quizId={quizSet.id}
              />
            ))
          )}
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
        <IconButton
          onClick={() => handlePageChange("prev", "saved")}
          disabled={savedPage === 1}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "stretch", gap: 2 }}>
          {loadingSaved ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 350,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Skeleton variant="rectangular" height={118} sx={{ borderRadius: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
              </Box>
            ))
          ) : (
            paginateSavedQuizSets().map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                title={quizSet.name}
                description={quizSet.description}
                quizId={quizSet.id}
              />
            ))
          )}
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
