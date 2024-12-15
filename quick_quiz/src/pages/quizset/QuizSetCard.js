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

const QuizSetCard = ({ title, description, quizId }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/quizsetview/${quizId}`);
  };
  return (
    <Card
      sx={{
        minHeight: 150,
        minWidth: 350,
        width:'100%',
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
              maxWidth:'80%'
            }}
          >
            {title}
          </Typography>
          <Chip label={description} sx={{
            maxWidth: "80%"
          }}></Chip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizSetCard;
