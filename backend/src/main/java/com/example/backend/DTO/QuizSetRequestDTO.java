package com.example.backend.DTO;

import lombok.Data;

@Data
public class QuizSetRequestDTO {
  private int id;

  private String name;

  private String description;

  private int topicId;
}
