package com.example.backend.service;

import com.example.backend.entity.QuizSet;
import com.example.backend.entity.QuizSetPermission;
import com.example.backend.entity.User;
import com.example.backend.repository.QuizSetPermissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizSetPermissionService {

  private final QuizSetPermissionRepository quizSetPermissionRepository;

  boolean checkPermission(int userId, int quizSetId) {
    return quizSetPermissionRepository.existsByUserIdAndQuizSetId(userId, quizSetId);
  }

  void addPermission(User user, QuizSet quizSet) {
    quizSetPermissionRepository.save(QuizSetPermission.builder().user(user).quizSet(quizSet).build());
  }
}
