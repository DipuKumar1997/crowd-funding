package com.io.crowdfunding.service;

import com.io.crowdfunding.entity.Comment;
import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.repository.CommentRepository;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Comment addComment(Long projectId, Comment comment) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        comment.setProject(project);
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); // or email depending on your setup
        User u = userRepository.findByEmail ( username ).orElseThrow ();
        comment.setUser ( u );
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByProject(Long projectId) {

        Project project = projectRepository.findById(projectId).orElseThrow();
       return  commentRepository.findByProject(project);
    }
}