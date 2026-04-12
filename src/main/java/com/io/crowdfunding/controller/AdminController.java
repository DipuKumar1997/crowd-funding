package com.io.crowdfunding.controller;

import com.io.crowdfunding.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final VerificationService verificationService;

    @GetMapping("/verifications")
    public ResponseEntity<?> getAllVerifications() {
        return ResponseEntity.ok(verificationService.getPendingRequests());
    }

    @PutMapping("/verifications/{id}")
    public ResponseEntity<?> processVerification(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String feedback = body.get("feedback");
        return ResponseEntity.ok(verificationService.updateStatus(id, status, feedback));
    }
}
