import React, { useState, useEffect } from "react";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import QuizSetCard from "../quizset/QuizSetCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import quizSetService from "../../services/quizSetService"; 

const calculateItemsPerPage = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 2200) return 4;
  if (screenWidth >= 1800) return 3;
  if (screenWidth >= 1400) return 2;
  if (screenWidth >= 1000) return 1;
  if (screenWidth >= 600) return 1;
  return 1;
};

const Home = () => {
  const [myQuizSets, setMyQuizSets] = useState([]);
  const [savedQuizSets, setSavedQuizSets] = useState([]);
  const [myPage, setMyPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const [loading, setLoading] = useState(false);
  const [hasMoreMyQuizSets, setHasMoreMyQuizSets] = useState(true); 
  const [hasMoreSavedQuizSets, setHasMoreSavedQuizSets] = useState(true);

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

  const fetchQuizSets = async (page, limit, setFunction, setHasMoreFunction, type = "my") => {
    setLoading(true);
    try {
      const data = await quizSetService.getQuizSetsByTopic({
        topicId:"",
        page: page - 1,
        limit,
      });

      if (data.quizSets.length > 0) {
        setFunction(data.quizSets); 
        setHasMoreFunction(true);  
      } else {
        setHasMoreFunction(false); 
      }
    } catch (error) {
      console.error('Failed to fetch ${type} quiz sets:', error);
      setHasMoreFunction(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizSets(myPage, itemsPerPage, setMyQuizSets, setHasMoreMyQuizSets, "my");
  }, [myPage, itemsPerPage]);

  useEffect(() => {
    fetchQuizSets(savedPage, itemsPerPage, setSavedQuizSets, setHasMoreSavedQuizSets, "saved");
  }, [savedPage, itemsPerPage]);

  const handlePageChange = (direction, type) => {
    if (type === "my") {
      if (direction === "next" && hasMoreMyQuizSets) setMyPage(myPage + 1);
      if (direction === "prev" && myPage > 1) setMyPage(myPage - 1);
    } else {
      if (direction === "next" && hasMoreSavedQuizSets) setSavedPage(savedPage + 1);
      if (direction === "prev" && savedPage > 1) setSavedPage(savedPage - 1);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
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
          {loading ? (
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
            myQuizSets.map((quizSet) => (
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
          disabled={!hasMoreMyQuizSets}
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
          {loading ? (
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
            savedQuizSets.map((quizSet) => (
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
          disabled={!hasMoreSavedQuizSets}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Home; 