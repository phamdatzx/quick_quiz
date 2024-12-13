package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // Apply to all endpoints
        .allowedOrigins("localhost:3000") // Allowed origins
        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
        .allowedHeaders("Content-Type", "Authorization") // Allowed headers
        .allowCredentials(true) // Allow credentials (cookies, authorization headers)
        .maxAge(3600); // Cache preflight response for 1 hour
  }
}

