package com.io.crowdfunding.repository;

import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.UpdatePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UpdateRepository extends JpaRepository<UpdatePost, Long> {
    List<UpdatePost> findByProject(Project project);
}