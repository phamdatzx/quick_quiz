package com.example.backend.authenticate;

import lombok.Data;

@Data
public class SetPasswordRequest {
    private String token;
    private String newPassword;
    private String confirmNewPassword;
}
