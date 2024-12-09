package com.example.backend;

import com.example.backend.entity.QuestionType;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import java.util.Arrays;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
public class BackendApplication {

	QuizRepository quizRepository;

	@Autowired
	public BackendApplication(QuizRepository quizRepository) {
		this.quizRepository = quizRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public ModelMapper getModelMapper() {
		return new ModelMapper();
	}

	@Bean
	public CommandLineRunner startup() {
		return args -> {
		};
	}

	public void test() {
		List<String> answers = Arrays.asList("answer1", "answer2", "answer3", "answer4");

		Quiz quiz = Quiz
				.builder()
				.content("first question")
				.answers(answers)
				.correctAnswer("answer1")
				.type(QuestionType.SINGLE_CHOICE)
				.build();

		quizRepository.save(quiz);

		System.out.println("Quiz created with id: " + quiz.getId());
	}
}
