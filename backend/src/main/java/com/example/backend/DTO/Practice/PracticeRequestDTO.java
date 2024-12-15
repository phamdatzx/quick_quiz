package com.example.backend.DTO.Practice;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PracticeRequestDTO {
  private int quizSetId;

  List<PracticeQuizDTO> quizzes;
}
