package com.io.crowdfunding.service;

import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.UpdatePost;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.UpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UpdateService {

    private final UpdateRepository updateRepository;
    private final ProjectRepository projectRepository;

    public UpdatePost addUpdate(Long projectId, UpdatePost update) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        update.setProject(project);
        return updateRepository.save(update);
    }

    public List<UpdatePost> getUpdatesByProject(Long projectId) {
           Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

        return updateRepository.findByProject ( project );
    }
}
