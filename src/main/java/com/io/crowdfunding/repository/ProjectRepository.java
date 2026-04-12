package com.io.crowdfunding.repository;

import com.io.crowdfunding.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
        List<Project> findByStatusOrderByCreatedAtDesc(String status);
//        List<Project> findByOwnerId(Long ownerId);
        @Query("SELECT p FROM Project p WHERE p.owner.id = :ownerId")
        List<Project> findByOwnerId(@Param("ownerId") Long ownerId);
}