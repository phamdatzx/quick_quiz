package com.example.backend.authenticate;

import com.example.backend.service.JwtService;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

    var user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    var jwt = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(jwt)
        .build();
  }

  // Thêm phương thức forgotPassword
  public AuthenticationResponse forgotPassword(ForgotPasswordRequest request) {
    var user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Tạo token JWT dành cho đặt lại mật khẩu
    String resetToken = jwtService.generateResetToken(user);

    // Gửi email chứa đường dẫn đặt lại mật khẩu (có chứa token)
    emailSenderService.sendEmail(user.getEmail(), "Reset Password",
        "Click the link to reset your password: http://localhost:8080/api/auth/set-password?token=" + resetToken);

    return AuthenticationResponse.builder()
        .token(resetToken)
        .build();
  }

  // Thêm phương thức setPassword
  public String setPassword(SetPasswordRequest request) {
    // Kiểm tra tính hợp lệ của token và xác thực
    String email = jwtService.extractEmail(request.getToken());
    var user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!jwtService.isTokenValid(request.getToken(), (UserDetails) user)) {
      return "Invalid token";
    }

    // Kiểm tra khớp mật khẩu mới và xác nhận mật khẩu mới
    if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
      throw new RuntimeException("Passwords do not match");
    }

    // Cập nhật mật khẩu mới sau khi mã hóa
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);

    return "Password has been reset successfully";
  }
}
