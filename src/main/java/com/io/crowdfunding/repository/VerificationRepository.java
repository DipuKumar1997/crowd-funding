package com.io.crowdfunding.repository;

import com.io.crowdfunding.entity.VerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerificationRepository extends JpaRepository<VerificationRequest, Long> {
    List<VerificationRequest> findVerificationRequestByStatus(String status);

    List<VerificationRequest> findByStatus(String status);
}
