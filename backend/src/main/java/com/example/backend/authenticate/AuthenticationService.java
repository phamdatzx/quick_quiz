package com.example.backend.authenticate;

import com.example.backend.service.JwtService;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
      .username(request.getUsername())
      .password(passwordEncoder.encode(request.getPassword()))
      .role(Role.MEMBER)
      .build();
    userRepository.save(user);

    var jwt = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(jwt)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    var user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    var jwt = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(jwt)
        .build();
  }
}
