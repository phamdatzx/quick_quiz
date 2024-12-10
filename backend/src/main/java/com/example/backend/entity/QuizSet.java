package com.example.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_set")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSet {

  @Id
  @GeneratedValue
  private int id;

  private String name;

  private String description;

  private Date createdTime;

  private int totalQuestions;

  private boolean isPublic=true;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "creator_id")
  private User creator;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "topic_id")
  private Topic topic;

  @OneToMany(mappedBy = "quizSet", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
  private List<Quiz> quizList;

  public void addQuiz(Quiz quiz) {
    quizList.add(quiz);
  }
}
