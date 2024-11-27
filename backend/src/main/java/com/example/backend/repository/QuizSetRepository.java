package com.example.backend.repository;

import com.example.backend.entity.QuizSet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSetRepository extends JpaRepository<QuizSet, Integer> {
  List<QuizSet> findAllByUserEmail(String email);

}
