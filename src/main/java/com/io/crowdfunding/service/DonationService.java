package com.io.crowdfunding.service;

import com.io.crowdfunding.entity.Donation;
import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.repository.DonationRepository;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Donation donate(Long projectId, Donation donation) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        project.setCurrentAmount(project.getCurrentAmount() + donation.getAmount());
        donation.setProject(project);
        return donationRepository.save(donation);
    }

    public Donation saveSuccessfulDonation(Long projectId, Double amount, String paymentId) {
         Project project = projectRepository.findById(projectId) .orElseThrow(() -> new RuntimeException("Project not found"));

        // 2. Get logged-in user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); // or email depending on your setup
        System.out.println ("username is what alue "+ username);
        User user = userRepository.findByEmail(username) .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Create donation
        Donation donation = new Donation();
        donation.setAmount(amount);
        donation.setPaymentId(paymentId);
        donation.setUser(user);
        donation.setProject(project);

        // 4. Update project funding
        project.setCurrentAmount(project.getCurrentAmount() + amount);

        // 5. Save both
        projectRepository.save(project);
        return donationRepository.save(donation);
    }
}