package com.example.backend.controller;

import com.example.backend.DTO.QuizSetDTO;
import com.example.backend.entity.QuizSet;
import com.example.backend.service.QuizSetService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz-set")
@AllArgsConstructor
public class QuizSetController {

  private final QuizSetService quizSetService;

  @GetMapping("/all")
  public List<QuizSetDTO> getAllQuizSets(Principal principal) {

    return quizSetService.getAllQuizSetsByUserEmail(principal.getName());
  }

}
