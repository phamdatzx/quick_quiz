package com.example.backend.service;

import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizService {

  QuizRepository quizRepository;

  public Quiz saveQuiz(Quiz quiz) {
    return quizRepository.save(quiz);
  }
}
