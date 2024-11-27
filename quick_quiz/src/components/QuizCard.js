import { Box, Button, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
const QuizCard = ({ question, choices, onSelectAnswer, index }) => {
  

  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
    onSelectAnswer(index, choiceIndex); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        m: 2,
        flexDirection: "column",
        gap: 2,
        borderRadius: 4,
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "60vw",
        justifySelf: "center",
      }}
    >
      {/* Question Section */}
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          gap: 2,
        }}
      >
        <Typography variant="subtitle1">Câu hỏi</Typography>
        <Typography
          sx={{
            width: "60vw",
            wordBreak: "break-word",
            justifyContent: "left",
          }}
        >
          {question}
        </Typography>
      </Box>

      {/* Multiple Choice Section */}
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          gap: 2,
          py: 2,
          width: "100%",
        }}
      >
        <Typography variant="subtitle1">Trả lời</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {choices.map((choice, choiceIndex) => (
            <Button
              key={choiceIndex}
              variant="outlined"
              sx={{
                width: "45%",
                wordBreak: "break-word",
                textAlign: "justify",
                backgroundColor:
                  selectedChoice === choiceIndex
                    ? "#1935CA"
                    : "#fff",
                    color:
                    selectedChoice === choiceIndex
                      ? "#fff"
                      : "#4A4A4A",
              }}
              onClick={() => handleChoiceSelect(choiceIndex)}
            >
              {choice}
            </Button>
          ))}
        </Box>
      </Box>

     
    </Box>
  );
};

export default QuizCard;
