package com.io.crowdfunding.controller;

import com.io.crowdfunding.entity.VerificationRequest;
import com.io.crowdfunding.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/verification")
@RequiredArgsConstructor
public class VerificationController {
    private final VerificationService verificationService;
    @PostMapping
    public ResponseEntity<?> submit(@RequestBody VerificationRequest request) {
        return ResponseEntity.ok(verificationService.submit(request));
    }
}
