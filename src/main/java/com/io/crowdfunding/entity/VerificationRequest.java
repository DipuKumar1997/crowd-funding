package com.io.crowdfunding.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "verification_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status; // PENDING, APPROVED, REJECTED, NEEDS_INFO
    private String documentUrl;
    private String adminFeedback; // The message the admin leaves for the owner
    @ManyToOne
    private User user;
    @OneToOne // Each request belongs to one project
    private Project project;
    private LocalDateTime createdAt = LocalDateTime.now();
}