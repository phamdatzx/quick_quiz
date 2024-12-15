import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HistoryPreview = ({data, name, attempt, attemptTime }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/historydetail", { state: { data } });
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
            Quiz Set: {name} - Lần thử: {attempt}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thời gian làm bài: {attemptTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HistoryPreview;
