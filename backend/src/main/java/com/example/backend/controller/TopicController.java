package com.example.backend.controller;

import com.example.backend.DTO.Topic.TopicDTO;
import com.example.backend.service.TopicService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class TopicController {

  private final TopicService topicService;

  @PostMapping("/topic")
  public ResponseEntity<TopicDTO> createTopic(Principal principal,@RequestBody TopicDTO topicDTO) {
    return topicService.createTopic(principal.getName(),topicDTO);
  }

  @DeleteMapping("/topic/{id}")
  public ResponseEntity<String> deleteTopic(Principal principal,@PathVariable int id) {
    return topicService.deleteTopic(principal.getName(),id);
  }

  @PatchMapping("/topic/{id}")
  public ResponseEntity<TopicDTO> updateTopic(Principal principal,@PathVariable int id,@RequestBody TopicDTO topicDTO) {
    return topicService.updateTopic(principal.getName(),id,topicDTO);
  }
}
