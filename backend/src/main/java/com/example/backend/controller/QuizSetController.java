package com.example.backend.controller;

import com.example.backend.DTO.QuizSetResponseDTO;
import com.example.backend.service.QuizSetService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
  public List<QuizSetResponseDTO> getAllQuizSets(Principal principal) {
    return quizSetService.getAllQuizSetsByUserEmail(principal.getName());
  }

  @PostMapping
  public ResponseEntity<String> createQuizSet(Principal principal,@RequestBody QuizSetResponseDTO quizSetResponseDTO) {
    try {
      quizSetService.createQuizSet(principal.getName(), quizSetResponseDTO);
      return ResponseEntity.status(201).body("Quiz set created successfully");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error creating quiz set "+e.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizSet(Principal principal, @RequestBody int id) {
    try {
      return quizSetService.deleteQuizSet(principal.getName(), id);
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error deleting quiz set "+e.getMessage());
    }
  }

//  @PostMapping("/{id}")
//  public ResponseEntity<String> addQuizToQuizSet(Principal principal, @RequestBody int id) {
//    try {
//      return quizSetService.addQuizToQuizSet(principal.getName(), id);
//    } catch (Exception e) {
//      return ResponseEntity.status(500).body("Error adding quiz to quiz set "+e.getMessage());
//    }
//  }

}
