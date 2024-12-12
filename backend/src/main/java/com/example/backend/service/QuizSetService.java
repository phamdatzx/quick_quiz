package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.User;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizSetService {

  private final QuizSetRepository quizSetRepository;

  private final UserRepository userRepository;

  private final QuizService quizService;

  private ModelMapper modelMapper;

  public ListQuizSetDTO getAllQuizSetsByUserEmail(String email, String sortElement, String direction, String search, int page, int limit) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement != null ? sortElement : "name");
    Pageable pageable = PageRequest.of(page, limit, sort);

    Specification<QuizSet> spec = (root, query, criteriaBuilder) -> {
      Predicate predicate = criteriaBuilder.equal(root.get("creator").get("email"), email);
      if (search != null && !search.isEmpty()) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + search + "%"));
      }
      return predicate;
    };

    Page<QuizSet> quizSetPage = quizSetRepository.findAll(spec, pageable);

    List<QuizSetResponseDTO> quizSetDTOs = quizSetPage.getContent().stream()
        .map(quizSet -> modelMapper.map(quizSet, QuizSetResponseDTO.class))
        .collect(Collectors.toList());

    return ListQuizSetDTO.builder().quizSets(quizSetDTOs).build();
  }

  public ResponseEntity<QuizSetResponseDTO> getQuizSetById(int id) {
    return null;

  }

  public ResponseEntity<QuizSetResponseDTO> createQuizSet(String email, QuizSetRequestDTO quizSetRequestDTO) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    QuizSet quizSet = modelMapper.map(quizSetRequestDTO, QuizSet.class);
    quizSet.setCreator(user);
    var resultDTO = modelMapper.map(quizSetRepository.save(quizSet), QuizSetResponseDTO.class);
    return ResponseEntity.status(200).body(resultDTO);
  }

  public ResponseEntity<String> deleteQuizSet(String email,int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to delete this quiz set");
    }
    quizSetRepository.deleteById(id);
    return ResponseEntity.status(200).body("Quiz set deleted successfully");
  }

  public ResponseEntity<QuizSetResponseDTO> updateQuizSet(String email, int id, QuizSetRequestDTO quizSetRequestDTO) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to update this quiz set");
    }

    quizSet.get().setName(quizSetRequestDTO.getName());
    quizSet.get().setDescription(quizSetRequestDTO.getDescription());
    var resultDTO = modelMapper.map(quizSetRepository.save(quizSet.get()), QuizSetResponseDTO.class);
    return ResponseEntity.status(200).body(resultDTO);
  }

  public ResponseEntity<QuizDTO> addQuizToQuizSet(String email, int id, QuizDTO quizDTO) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to add quiz to this quiz set");
    }

    var quiz = modelMapper.map(quizDTO, Quiz.class);

    var quizResponseDTO = modelMapper.map(quizService.saveQuiz(quiz), QuizDTO.class);

    return ResponseEntity.status(200).body(quizResponseDTO);

  }
}
