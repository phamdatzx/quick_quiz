import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';

function QuizCreate() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  // Handle quiz submission
  const handleCreate = async () => {
    try {
      await axios.post('/api/quizzes', { title, questions });
      alert('Quiz created successfully!');
      setTitle('');
      setQuestions([]);
    } catch (error) {
      alert('Failed to create quiz!');
    }
  };

  return (
      <Box sx={{
        width: '60vw', 
        margin: '0 auto', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }}>
      <Typography variant="h4" sx={{marginBottom:2,}}>Tạo Quiz</Typography>

      {/* Quiz Title Input */}
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          type="text"
          label="Tiêu đề của Quiz"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Questions Section */}
      {questions.map((q, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="subtitle1" sx={{marginBottom:2,}}>Câu hỏi số {index + 1}</Typography>

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
          <Box sx={{ marginBottom: 2 }}>
            {q.options.map((option, optIndex) => (
              <TextField
                key={optIndex}
                type="text"
                label={`Lựa chọn số ${optIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[optIndex] = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ))}
          </Box>

          {/* Correct Answer Autocomplete */}
          <Box>
            <Typography variant="subtitle1" sx={{marginBottom:2,}}>Đáp án đúng:</Typography>
            <Autocomplete
              options={q.options} // Dynamic options based on question's options
              value={q.correctAnswer} // Current correct answer
              onChange={(event, newValue) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].correctAnswer = newValue;
                setQuestions(updatedQuestions);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn đáp án đúng" fullWidth />
              )}
              disableClearable // Prevents clearing the input accidentally
            />
          </Box>
        </Box>
      ))}

          <Box>
              {/* Add Question Button */}
      <Button variant="contained" onClick={addQuestion} sx={{ marginRight: 2 }}>
        Thêm câu hỏi
      </Button>

      {/* Submit Quiz Button */}
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Tạo quiz
      </Button>
          </Box>
      
    </Box>
  );
}

export default QuizCreate;