import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  
  const TopicPreview = ({ title, description, topicId }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/topic/${topicId}`);
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
              variant="h6"
              sx={{
                paddingBottom: 1,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                paddingBottom: 1,
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
  export default TopicPreview;