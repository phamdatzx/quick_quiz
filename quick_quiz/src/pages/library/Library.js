import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import QuizSetCard from "../home/QuizSetCard";


const Library = () => {
  const [quizSets, setQuizSets] = useState([
    // Sample data
    { id: 1, title: "Math Quiz", questionCount: 10 },
    { id: 2, title: "Science Quiz", questionCount: 15 },
    { id: 3, title: "History Quiz", questionCount: 8 },
    { id: 4, title: "Geography Quiz", questionCount: 12 },
    { id: 5, title: "Programming Quiz", questionCount: 20 },
    { id: 6, title: "Literature Quiz", questionCount: 18 },
    { id: 7, title: "Art Quiz", questionCount: 9 },
    { id: 8, title: "Music Theory Quiz", questionCount: 14 },
    { id: 9, title: "Physics Quiz", questionCount: 13 },
    { id: 10, title: "Chemistry Quiz", questionCount: 11 },
    { id: 11, title: "World Capitals Quiz", questionCount: 10 },
    { id: 12, title: "Space Exploration Quiz", questionCount: 7 },
  ]);

  
  useEffect(() => {
    // Example API call
    // axios.get("/api/quizzes").then((response) => setQuizSets(response.data));
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5", // Optional background color
        minHeight: "100vh", // Full viewport height
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Quiz Sets
      </Typography>
      <Grid
        container
        spacing={3} // Space between grid items
        justifyContent="center" // Center grid content
      >
        {quizSets.map((quiz) => (
          <Grid
            item
            key={quiz.id}
            sx={{
              display: "flex",
              justifyContent: "center", // Center individual card in its grid cell
            }}
          >
            <QuizSetCard
              title={quiz.title}
              questionCount={quiz.questionCount}
              quizId={quiz.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Library;