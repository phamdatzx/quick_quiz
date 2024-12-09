package com.example.backend.repository;

import com.example.backend.entity.QuizSetPermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSetPermissionRepository extends JpaRepository<QuizSetPermission, Integer> {
  boolean existsByUserIdAndQuizSetId(int userId, int quizSetId);
}
