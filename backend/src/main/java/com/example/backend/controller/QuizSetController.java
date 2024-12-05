package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.service.QuizSetService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz-set")
@AllArgsConstructor
public class QuizSetController {

  private final QuizSetService quizSetService;

  @GetMapping("/all")
  public ListQuizSetDTO getAllQuizSets(Principal principal) {
    return quizSetService.getAllQuizSetsByUserEmail(principal.getName());
  }

  @PostMapping
  public ResponseEntity<QuizSetResponseDTO> createQuizSet(Principal principal,@RequestBody QuizSetRequestDTO quizSetRequestDTO) {
      return quizSetService.createQuizSet(principal.getName(), quizSetRequestDTO);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizSet(Principal principal, @RequestBody int id) {
      return quizSetService.deleteQuizSet(principal.getName(), id);
  }

  @PostMapping("/{id}")
  public ResponseEntity<QuizDTO> addQuizToQuizSet(Principal principal,@PathVariable int id,@RequestBody QuizDTO quizDTO) {
      return quizSetService.addQuizToQuizSet(principal.getName(),id, quizDTO);
  }
}
