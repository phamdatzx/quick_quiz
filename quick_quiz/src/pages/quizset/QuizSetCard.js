import {
  Box,
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
import quizSetService from "../../services/quizSetService"; // Dịch vụ quản lý quiz set bookmark

const QuizSetCard = ({ title, description, quizId, isInitiallyBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);

  const navigate = useNavigate();

  // Xử lý điều hướng khi nhấn vào thẻ card
  const handleClick = () => {
    navigate(`/quizsetview/${quizId}`);
  };

  // Xử lý sự kiện bookmark
  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await quizSetService.unbookmarkQuizSet(quizId); // Gọi API xóa bookmark
      } else {
        await quizSetService.bookmarkQuizSet(quizId); // Gọi API thêm bookmark
      }
      setIsBookmarked((prev) => !prev); // Cập nhật trạng thái local
    } catch (error) {
      console.error("Error updating bookmark status:", error);
    }
  };

  return (
    <Card
      sx={{
        minHeight: 150,
        minWidth: 350,
        width: "100%",
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
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          {/* Phần nội dung hiển thị */}
          <Box sx={{ maxWidth: "80%" }}>
            <Typography
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

          {/* Nút Bookmark */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Ngăn chặn sự kiện click vào CardActionArea
              handleBookmark(); // Gọi xử lý bookmark
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

export default QuizSetCard;
