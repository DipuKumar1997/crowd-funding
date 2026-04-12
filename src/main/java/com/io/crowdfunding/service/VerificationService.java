package com.io.crowdfunding.service;

import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.VerificationRequest;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.VerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VerificationService {

    private final VerificationRepository verificationRepository;
    private final ProjectRepository projectRepository;

    public VerificationRequest submit(VerificationRequest request) {
        request.setStatus("PENDING");
        return verificationRepository.save(request);
    }
    public List<VerificationRequest> getAllRequests() {
        return verificationRepository.findAll();
    }
    public List<VerificationRequest> getPendingRequests() {
        return verificationRepository.findByStatus("PENDING");
    }

   @Transactional
    public VerificationRequest updateStatus(Long requestId, String status, String feedback) {
        VerificationRequest request = verificationRepository.findById(requestId) .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        request.setAdminFeedback(feedback);
        Project project = request.getProject();

        if ("APPROVED".equalsIgnoreCase(status)) {
            project.setStatus("APPROVED");   // visible to users
        }
        else if ("REJECTED".equalsIgnoreCase(status)) {
            project.setStatus("REJECTED");   // ❗ YOU MISSED THIS
        }
        else {
            project.setStatus("PENDING");    // optional (for query/review)
        }
        projectRepository.save(project);
        return verificationRepository.save(request);
    }
}
