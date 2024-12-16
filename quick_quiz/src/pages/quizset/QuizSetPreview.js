import {
    Box,
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    IconButton,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import quizSetService from "../../services/quizSetService";
  
  const QuizSetPreview = ({ title, description, quizId,isInitiallyBookmarked }) => {
    const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);

    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/quizsetview/${quizId}`);
      
    };

    const handleBookmark = async () => {
      try {
        if (isBookmarked) {
          await quizSetService.unbookmarkQuizSet(quizId); 
        } else {
          await quizSetService.bookmarkQuizSet(quizId); 
        }
        setIsBookmarked((prev) => !prev); 
      } catch (error) {
        console.error("Error updating bookmark status:", error);
      }
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
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ maxWidth: "80%" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  paddingBottom: 1,
                }}
              >
                {title}
              </Typography>
              <Chip
                label={description}
                sx={{
                  maxWidth: "100%",
                }}
              />
            </Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); 
                handleBookmark();
              }}
              sx={{ marginLeft: 1 }}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
  export default QuizSetPreview;
  