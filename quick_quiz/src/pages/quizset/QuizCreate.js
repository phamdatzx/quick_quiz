import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function QuizCreate() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        correctAnswer: "",
      },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  // Handle quiz submission
  const handleCreate = async () => {
    try {
      await axios.post("/api/quizzes", { title, questions });
      alert("Quiz created successfully!");
      setTitle("");
      setQuestions([]);
    } catch (error) {
      alert("Failed to create quiz!");
    }
  };

  return (
    <Box
      sx={{
        width: "60vw",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Tạo Bộ câu hỏi
      </Typography>

      {/* Quiz Title Input */}
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          type="text"
          label="Tiêu đề của Bộ câu hỏi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Questions Section */}
      {questions.map((q, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Câu hỏi số {index + 1}
          </Typography>

          {/* Question Text */}
          <TextField
            type="text"
            label="Nhập câu hỏi"
            value={q.question}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index].question = e.target.value;
              setQuestions(updatedQuestions);
            }}
            fullWidth
            sx={{ marginBottom: 3 }}
          />

          {/* Options for the Question */}
          <Box>
            <Grid container spacing={2}>
              {q.options.map((option, optIndex) => (
                <Grid item xs={12} sm={6} key={optIndex}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      type="text"
                      label={`Lựa chọn số ${optIndex + 1}`}
                      value={option}
                      multiline
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].options[optIndex] =
                          e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      fullWidth
                      sx={{ marginRight: 1 }}
                    />
                    <Checkbox
                      checked={q.correctAnswer === option}
                      onChange={() => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].correctAnswer = option;
                        setQuestions(updatedQuestions);
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Remove Question Button */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeQuestion(index)}
            sx={{ marginTop: 2 }}
          >
            Xóa câu hỏi
          </Button>
        </Box>
      ))}

      <Box>
        {/* Add Question Button */}
        <Button variant="contained" onClick={addQuestion} sx={{ m: 2, p: 1 }}>
          Thêm câu hỏi
        </Button>

        {/* Submit Quiz Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ m: 2, p: 1 }}
        >
          Tạo bộ câu hỏi
        </Button>
      </Box>
    </Box>
  );
}

export default QuizCreate;
