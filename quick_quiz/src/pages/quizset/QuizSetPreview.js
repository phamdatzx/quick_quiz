import {
    Box,
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  
  const QuizSetPreview = ({ title, questionCount, quizId }) => {
  
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/quiz/${quizId}`);
    };
    return (
      <Card
        sx={{
          ":hover": {
            transform: "scale(1.02)",
          },
          transition: "transform 0.2s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          m: 2,
        }}
      >
        <CardActionArea
          disableRipple
          onClick={handleClick}
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                paddingBottom: 1,
              }}
            >
              {title}
            </Typography>
            <Chip label={questionCount + " Câu hỏi"} sx={{}}></Chip>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
  export default QuizSetPreview;
  