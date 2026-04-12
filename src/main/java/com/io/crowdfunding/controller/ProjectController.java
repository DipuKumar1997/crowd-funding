package com.io.crowdfunding.controller;

import com.io.crowdfunding.GlobalResponse.GlobalResponse;
import com.io.crowdfunding.dto.ProjectCreateRequest;
import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<GlobalResponse<List<Project>>> getAll() {//projectService.getAll()
        return ResponseEntity.ok(
            new GlobalResponse<> (true, "Projects fetched successfully", projectService.getAllApprovedRecent())
        );
    }
    @PostMapping
    public ResponseEntity<GlobalResponse<Project>> create(@RequestBody ProjectCreateRequest projectCreateRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println ("craeting project started");
        System.out.println(auth);
        System.out.println(auth.getAuthorities());
        //name is here email so donot worry
        String currentUserEmail = auth.getName();
        System.out.println ("usercuurent email is "+ currentUserEmail);
        Project savedProject = projectService.createProject(projectCreateRequest,projectCreateRequest.getDocumentUrl (), currentUserEmail);
        System.out.println ("is this we really come here ");
        return ResponseEntity.ok(
            new GlobalResponse<>(true, "Project created", savedProject)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<Project>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
            new GlobalResponse<>(true, "Project fetched", projectService.getById(id))
        );
    }
}