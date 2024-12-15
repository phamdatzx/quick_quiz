package com.example.backend.controller;

import com.example.backend.DTO.Practice.PracticeQuizDTO;
import com.example.backend.service.PracticeService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PracticeController {

  private final PracticeService practiceService;

  @PostMapping("/practice/{quizSetId}")
  public ResponseEntity<String> savePractice(Principal principal,@PathVariable int quizSetId, @RequestBody List<PracticeQuizDTO> listPracticeQuizDTO) {
    return practiceService.savePractice(principal.getName(), quizSetId, listPracticeQuizDTO);
  }

}
