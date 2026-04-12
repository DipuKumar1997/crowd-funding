package com.io.crowdfunding.repository;

import com.io.crowdfunding.entity.Comment;
import com.io.crowdfunding.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProject(Project project);
}