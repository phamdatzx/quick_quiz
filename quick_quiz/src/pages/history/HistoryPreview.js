import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HistoryPreview = ({ quizsetId, attemptTime, attemptId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    //TODO more
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
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ paddingBottom: 1, fontWeight: "bold" }}>
            Quiz Set ID: {quizsetId}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thời gian làm bài: {new Date(attemptTime).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HistoryPreview;
