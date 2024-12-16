// TopicServiceTest.java
package com.example.backend.service;

import com.example.backend.DTO.Topic.TopicDTO;
import com.example.backend.entity.Topic;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.TopicRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

public class TopicServiceTest {

  @Mock
  private TopicRepository topicRepository;

  @Mock
  private UserRepository userRepository;

  @Mock
  private ModelMapper modelMapper;

  @InjectMocks
  private TopicService topicService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testCreateTopic_ValidCase() {
    String email = "test@example.com";
    TopicDTO topicDTO = new TopicDTO();
    topicDTO.setName("Test Topic");
    topicDTO.setDescription("Test Description");

    User user = new User();
    user.setEmail(email);

    Topic topic = new Topic();
    topic.setName("Test Topic");
    topic.setDescription("Test Description");
    topic.setCreator(user);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(topicRepository.findByNameAndCreatorEmail("Test Topic", email)).thenReturn(Optional.empty());
    when(modelMapper.map(topicDTO, Topic.class)).thenReturn(topic);
    when(topicRepository.save(any(Topic.class))).thenReturn(topic);
    when(modelMapper.map(topic,TopicDTO.class)).thenReturn(topicDTO);

    ResponseEntity<TopicDTO> response = topicService.createTopic(email, topicDTO);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals(topicDTO, response.getBody());
  }

  @Test
  public void testCreateTopic_TopicNameExists() {
    String email = "test@example.com";
    TopicDTO topicDTO = new TopicDTO();
    topicDTO.setName("Test Topic");
    topicDTO.setDescription("Test Description");

    User user = new User();
    user.setEmail(email);

    Topic existTopic = new Topic();
    existTopic.setName("Test Topic");

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(topicRepository.findByNameAndCreatorEmail(topicDTO.getName(), email)).thenReturn(Optional.of(existTopic));
    when(modelMapper.map(topicDTO, Topic.class)).thenReturn(existTopic);

    ConflictException exception = assertThrows(ConflictException.class, () -> {
      topicService.createTopic(email, topicDTO);
    });

    assertEquals("Topic name already exists", exception.getMessage());
  }

  @Test
  public void testDeleteTopic_TopicNotFound() {
    String email = "test@example.com";
    int topicId = 1;

    when(topicRepository.findById(topicId)).thenReturn(Optional.empty());

    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
      topicService.deleteTopic(email, topicId);
    });

    assertEquals("Topic not found", exception.getMessage());
  }

  @Test
  public void testDeleteTopic_NotCreator() {
    String email = "test@example.com";
    int topicId = 1;

    User creator = new User();
    creator.setEmail("creator@example.com");

    Topic topic = new Topic();
    topic.setId(topicId);
    topic.setCreator(creator);

    when(topicRepository.findById(topicId)).thenReturn(Optional.of(topic));

    ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
      topicService.deleteTopic(email, topicId);
    });

    assertEquals("You are not allowed to delete this topic, only creator can delete this topic", exception.getMessage());
  }

  @Test
  public void testDeleteTopic_Success() {
    String email = "test@example.com";
    int topicId = 1;

    User creator = new User();
    creator.setEmail(email);

    Topic topic = new Topic();
    topic.setId(topicId);
    topic.setCreator(creator);

    when(topicRepository.findById(topicId)).thenReturn(Optional.of(topic));
    doNothing().when(topicRepository).deleteById(topicId);

    ResponseEntity<String> response = topicService.deleteTopic(email, topicId);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Topic deleted successfully", response.getBody());
  }

  @Test
  public void testUpdateTopic_TopicNotFound() {
    String email = "test@example.com";
    int topicId = 1;
    TopicDTO topicDTO = new TopicDTO();

    when(topicRepository.findById(topicId)).thenReturn(Optional.empty());

    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
      topicService.updateTopic(email, topicId, topicDTO);
    });

    assertEquals("Topic not found", exception.getMessage());
  }

  @Test
  public void testUpdateTopic_NotCreator() {
    String email = "test@example.com";
    int topicId = 1;
    TopicDTO topicDTO = new TopicDTO();

    User creator = new User();
    creator.setEmail("creator@example.com");

    Topic topic = new Topic();
    topic.setId(topicId);
    topic.setCreator(creator);

    when(topicRepository.findById(topicId)).thenReturn(Optional.of(topic));

    ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
      topicService.updateTopic(email, topicId, topicDTO);
    });

    assertEquals("You are not allowed to update this topic, only creator can update this topic", exception.getMessage());
  }

  @Test
  public void testUpdateTopic_Success() {
    String email = "test@example.com";
    int topicId = 1;
    TopicDTO topicDTO = new TopicDTO();
    topicDTO.setName("Updated Topic");
    topicDTO.setDescription("Updated Description");

    User creator = new User();
    creator.setEmail(email);

    Topic topic = new Topic();
    topic.setId(topicId);
    topic.setCreator(creator);

    Topic updatedTopic = new Topic();
    updatedTopic.setId(topicId);
    updatedTopic.setName("Updated Topic");
    updatedTopic.setDescription("Updated Description");
    updatedTopic.setCreator(creator);

    when(topicRepository.findById(topicId)).thenReturn(Optional.of(topic));
    when(modelMapper.map(topicDTO, Topic.class)).thenReturn(updatedTopic);
    when(topicRepository.save(updatedTopic)).thenReturn(updatedTopic);
    when(modelMapper.map(updatedTopic, TopicDTO.class)).thenReturn(topicDTO);

    ResponseEntity<TopicDTO> response = topicService.updateTopic(email, topicId, topicDTO);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals(topicDTO, response.getBody());
  }


}