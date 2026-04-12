package com.io.crowdfunding.controller;

import com.io.crowdfunding.entity.Donation;
import com.io.crowdfunding.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping("/{projectId}")
    public ResponseEntity<?> donate(@PathVariable Long projectId, @RequestBody Donation donation) {
        return ResponseEntity.ok(donationService.donate(projectId, donation));
    }
    @PostMapping("/confirm/{projectId}")
    public ResponseEntity<?> confirmDonation( @PathVariable Long projectId,
        @RequestBody Map<String, Object> data) {
        System.out.println ("map data we receiving in confirm/{projectId} is "+ data);
        Double amount = Double.valueOf(data.get("amount").toString());
        String paymentId = (String) data.get("paymentIntentId");
        return ResponseEntity.ok(donationService.saveSuccessfulDonation(projectId, amount, paymentId));
    }
}
//  Double amount = ((Number) data.get("amount")).doubleValue();
// Logic inside Service:
// 1. Create Donation record
// 2. project.setCurrentAmount(project.getCurrentAmount() + amount)
// 3. projectRepository.save(project)
