import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import topicService from "../../services/topicService";
import quizService from "../../services/quizService";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function QuizCreate() {
  const location = useLocation(); // Hook để lấy query params
  const queryParams = new URLSearchParams(location.search);
  const defaultTopicId = queryParams.get("topicId"); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]); 
  const [selectedTopic, setSelectedTopic] = useState(defaultTopicId || "");

  useEffect(() => {
    
    const fetchTopics = async () => {
      try {
        const response = await topicService.getTopics({page:"",limit:""});
        setTopics(response.topics);
      } catch (error) {
        console.error("Failed to fetch topics", error);
      }
    };

    fetchTopics();
  }, []);

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

  const handleCreate = async () => {
    if (!selectedTopic || !title || questions.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi tạo bộ câu hỏi.");
      return;
    }
  
    const requestBodyForQuizSet = {
      topicId: Number(selectedTopic),
      name: title,
      description: description,
    };
  
    try {
      const response = await quizService.createQuizSet(requestBodyForQuizSet);
      const createdTopicId = response.id; 
      console.log("Quiz set created successfully:", response);
  
      const requestBodyForQuiz = questions.map((q) => ({
        content: q.question,
        answers: q.options,
        type: "SINGLE_CHOICE",
        correctAnswer: q.correctAnswer,
      }));
  
      await quizService.createQuiz(createdTopicId, requestBodyForQuiz);
  
      toast.success("Bộ câu hỏi được tạo thành công!");
      setTitle("");
      setDescription("");
      setSelectedTopic("");
      setQuestions([]);
    } catch (error) {
      console.error("Error creating quiz set or quiz:", error);
      toast.error("Tạo bộ câu hỏi thất bại! Vui lòng thử lại.");
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
      <Box sx={{ marginBottom: 3, display: "flex", width: "100%" }}>
        <TextField
          type="text"
          label="Tiêu đề của Bộ câu hỏi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Quiz Description Input */}
      <Box sx={{ marginBottom: 3, display: "flex", width: "100%" }}>
        <TextField
          type="text"
          label="Mô tả của Bộ câu hỏi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
        />
      </Box>

      {/* Topic Selector */}
      <Box sx={{ marginBottom: 3, display: "flex", width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="topic-select-label">Chủ đề</InputLabel>
          <Select
            labelId="topic-select-label"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map((topic) => (
              <MenuItem key={topic.id} value={topic.id}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
