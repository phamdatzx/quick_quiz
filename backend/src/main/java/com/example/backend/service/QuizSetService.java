package com.example.backend.service;

import com.example.backend.DTO.QuizSetResponseDTO;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.User;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizSetService {

  private final QuizSetRepository quizSetRepository;

  private final UserRepository userRepository;

  private ModelMapper modelMapper;

  public List<QuizSetResponseDTO> getAllQuizSetsByUserEmail(String email) {
    List<QuizSet> allQuizSets = quizSetRepository.findAllByCreatorEmail(email);
    return allQuizSets.stream()
        .map(quizSet -> modelMapper.map(quizSet, QuizSetResponseDTO.class))
        .collect(Collectors.toList());
  }

  public void createQuizSet(String email, QuizSetResponseDTO quizSetResponseDTO) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    QuizSet quizSet = modelMapper.map(quizSetResponseDTO, QuizSet.class);
    quizSet.setCreator(user);
    quizSetRepository.save(quizSet);
  }

  public ResponseEntity<String> deleteQuizSet(String email,int id) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      return ResponseEntity.status(404).body("Quiz set not found");
    }

    if (quizSet.get().getCreator().getId() != user.getId()) {
      return ResponseEntity.status(401).body("You are not authorized to delete this quiz set");
    }
    quizSetRepository.deleteById(id);
    return ResponseEntity.status(200).body("Quiz set deleted successfully");
  }

  public ResponseEntity<String> updateQuizSet(String email, int id, QuizSetResponseDTO quizSetResponseDTO) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      return ResponseEntity.status(404).body("Quiz set not found");
    }

    if (quizSet.get().getCreator().getId() != user.getId()) {
      return ResponseEntity.status(401).body("You are not authorized to delete this quiz set");
    }
    quizSet.get().setName(quizSetResponseDTO.getName());
    quizSet.get().setDescription(quizSetResponseDTO.getDescription());
    quizSetRepository.save(quizSet.get());
    return ResponseEntity.status(200).body("Quiz set updated successfully");
  }
}
