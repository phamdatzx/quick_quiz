package com.example.backend.service;

import com.example.backend.DTO.QuizSetDTO;
import com.example.backend.entity.QuizSet;
import com.example.backend.repository.QuizSetRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizSetService {

  private final QuizSetRepository quizSetRepository;

  private ModelMapper modelMapper;

  public List<QuizSetDTO> getAllQuizSetsByUserEmail(String email) {
    List<QuizSet> allQuizSets = quizSetRepository.findAllByUserEmail(email);
    return allQuizSets.stream()
        .map(quizSet -> modelMapper.map(quizSet, QuizSetDTO.class))
        .collect(Collectors.toList());
  }
}
