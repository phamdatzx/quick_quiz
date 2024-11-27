package com.example.backend.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizSetDTO {
  private String name;

  private String description;

  private String createdTime;

  private String lastUpdatedTime;

  private String topicId;
}
