package com.example.backend.DTO.QuizSet;

import com.example.backend.DTO.Quiz.QuizDTO;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizSetResponseDTO {
  private int id;

  private String name;

  private String description;

  private Date createdTime;

  private List<QuizDTO> quizzes;

  private int topicId;
}
