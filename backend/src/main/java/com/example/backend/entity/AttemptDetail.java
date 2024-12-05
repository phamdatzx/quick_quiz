package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attempt_detail")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttemptDetail {
  @Id
  @GeneratedValue
  private int id;

  @ManyToOne
  @JoinColumn(name = "quiz_set_attempt_id")
  private QuizSetAttempt quizSetAttempt;

  @ManyToOne
  @JoinColumn(name = "quiz_id")
  private Quiz quiz;

  String answer;

  boolean isCorrect;
}
