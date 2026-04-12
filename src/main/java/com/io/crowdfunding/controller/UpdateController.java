package com.io.crowdfunding.controller;

import com.io.crowdfunding.entity.UpdatePost;
import com.io.crowdfunding.service.UpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/updates")
public class UpdateController {
    private final UpdateService updateService;
    @PostMapping("/{projectId}")
    public ResponseEntity<?> update(@PathVariable Long projectId, @RequestBody UpdatePost update) {
        return ResponseEntity.ok(updateService.addUpdate(projectId, update));
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectUpdates(@PathVariable Long projectId) {
        // Assuming your service has a method like this. Adjust the method name if needed!
        return ResponseEntity.ok(updateService.getUpdatesByProject(projectId));
    }
}