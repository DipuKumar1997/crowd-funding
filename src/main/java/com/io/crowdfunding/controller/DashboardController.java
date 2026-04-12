package com.io.crowdfunding.controller;

import com.io.crowdfunding.GlobalResponse.GlobalResponse;
import com.io.crowdfunding.entity.Donation;
import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.repository.DonationRepository;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DonationRepository donationRepository;
    @Autowired
    private UserRepository userRepository;

    // 1. GET My Campaigns (Projects I created)
    @GetMapping("/projects/user/my-campaigns")
    public ResponseEntity<?> getMyCampaigns(Principal principal) {
        // Logic to get current user's ID from session/token
        Long currentUserId = getCurrentUserId(principal);

        List<Project> myProjects = projectRepository.findByOwnerId(currentUserId);
        return ResponseEntity.ok(new GlobalResponse<> (true, "My campaigns fetched", myProjects));
    }

    // 2. GET My Contributions (Donations I made)
    @GetMapping("/donations/user/my-contributions")
    public ResponseEntity<?> getMyDonations(Principal principal) {
        Long currentUserId = getCurrentUserId(principal);

        List<Donation> myDonations = donationRepository.findByUserId(currentUserId);
        return ResponseEntity.ok(new GlobalResponse<> (true, "My contributions fetched", myDonations));
    }

    private Long getCurrentUserId(Principal principal) {
        // This is a placeholder. You would typically extract the ID
        // from your UserDetails or JWT token.
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); // or email depending on your setup
        System.out.println ("username is what alue "+ username);
        User u= userRepository.findByEmail ( username ).orElseThrow ();
        return u.getId();
    }
}