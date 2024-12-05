package com.example.backend.service;

import com.example.backend.DTO.TopicDTO;
import com.example.backend.entity.Topic;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.TopicRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TopicService {

  private final TopicRepository topicRepository;

  private final UserRepository userRepository;

  private ModelMapper modelMapper;

  public ResponseEntity<String> createTopic(String email, TopicDTO topicDTO) {
      Topic topic = modelMapper.map(topicDTO, Topic.class);
      if(isTopicExistsByNameAndCreatorEmail(topic.getName(), email)){
        throw new ConflictException("Topic name already exists");
      }

      var user = userRepository.findByEmail(email);

      topic.setCreator(user.get());
      topicRepository.save(topic);
      return ResponseEntity.status(200).body("Topic created successfully");
  }

  public ResponseEntity<String> deleteTopic(String email, int id) {
      var topic = topicRepository.findById(id);
      if(topic.isEmpty()){
        throw new ResourceNotFoundException("Topic not found");
      }

      //check if request from user is not creator of topic
      if(!topic.get().getCreator().getEmail().equals(email)){
        throw new ForbiddenException("You are not allowed to delete this topic, only creator can delete this topic");
      }

      topicRepository.deleteById(id);
      return ResponseEntity.status(200).body("Topic deleted successfully");
  }

  public ResponseEntity<String> updateTopic(String email, int id, TopicDTO topicDTO) {
      var topic = topicRepository.findById(id);
      if(topic.isEmpty()){
        throw new ResourceNotFoundException("Topic not found");
      }

      //check if request from user is not creator of topic
      if(!topic.get().getCreator().getEmail().equals(email)){
        throw new ForbiddenException("You are not allowed to update this topic, only creator can update this topic");
      }

      Topic updatedTopic = modelMapper.map(topicDTO, Topic.class);
      updatedTopic.setId(id);
      updatedTopic.setCreator(topic.get().getCreator());
      topicRepository.save(updatedTopic);
      return ResponseEntity.status(200).body("Topic updated successfully");
  }

  private boolean isTopicExistsByNameAndCreatorEmail(String name, String email){
    return topicRepository.findByNameAndCreatorEmail(name,email).isPresent();
  }
}
