package com.example.backend.repository;

import com.example.backend.entity.QuizSet;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSetRepository extends JpaRepository<QuizSet, Integer> {
  List<QuizSet> findAllByCreatorEmail(String email);
  Page<QuizSet> findAll(Specification<QuizSet> spec, Pageable pageable);
}
