package com.io.crowdfunding.controller;

import com.io.crowdfunding.entity.Comment;
import com.io.crowdfunding.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    @PostMapping("/{projectId}")
    public ResponseEntity<?> comment(@PathVariable Long projectId, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.addComment(projectId, comment));
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectComments(@PathVariable Long projectId) {
        // Assuming your service has a method like this. Adjust the method name if needed!
        return ResponseEntity.ok(commentService.getCommentsByProject(projectId));
    }
}