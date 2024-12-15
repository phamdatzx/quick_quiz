package com.example.backend.service;

import com.example.backend.DTO.Practice.PracticeQuizDTO;
import com.example.backend.DTO.Practice.PracticeRequestDTO;
import com.example.backend.entity.AttemptDetail;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.QuizSetAttempt;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.AttemptDetailRepository;
import com.example.backend.repository.QuizSetAttemptRepository;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PracticeService {
  QuizSetRepository quizSetRepository;

  AttemptDetailRepository attemptDetailRepository;

  QuizSetAttemptRepository quizSetAttemptRepository;

  UserRepository userRepository;

  public ResponseEntity<String> savePractice(String email, int quizSetId, PracticeRequestDTO practiceRequestDTO) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    QuizSet quizSet = quizSetRepository.findById(quizSetId).orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    QuizSetAttempt quizSetAttempt = new QuizSetAttempt();
    quizSetAttempt.setUser(user);
    quizSetAttempt.setQuizSet(quizSet);
    quizSetAttempt.setAttempt(this.getMaxAttempt(user.getId(), quizSetId) + 1);
    quizSetAttempt.setPracticeTime(new Date());

    List<AttemptDetail> attemptDetails = practiceRequestDTO.getQuizzes().stream().map(quizDTO -> {
      AttemptDetail attemptDetail = new AttemptDetail();
      attemptDetail.setQuizSetAttempt(quizSetAttempt);
      attemptDetail.getQuiz().setId(quizDTO.getQuizId());
      attemptDetail.setAnswer(quizDTO.getAnswer());
      attemptDetail.setIsCorrect(quizDTO.getIsCorrect());
      return attemptDetail;
    }).collect(Collectors.toList());

    quizSetAttempt.setAttemptDetails(attemptDetails);
    quizSetAttempt.setNumberOfCorrectAnswers((int) attemptDetails.stream().filter(AttemptDetail::getIsCorrect).count());

    quizSetAttemptRepository.save(quizSetAttempt);
    attemptDetailRepository.saveAll(attemptDetails);

    return ResponseEntity.status(200).body("Practice saved successfully");
  }

  public int getMaxAttempt(int userId, int quizSetId) {
    return quizSetAttemptRepository.findMaxAttemptByUserIdAndQuizSetId(userId, quizSetId);
  }
}
