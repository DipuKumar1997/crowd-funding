package com.io.crowdfunding.repository;

import com.io.crowdfunding.entity.Donation;
import com.io.crowdfunding.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByProject(Project project);
//     Donation findByProjectt(Project project);
    List<Donation> findByUserId(Long userId);
}