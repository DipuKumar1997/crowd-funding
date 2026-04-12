package com.io.crowdfunding.service;

import com.io.crowdfunding.dto.ProjectCreateRequest;
import com.io.crowdfunding.entity.Image;
import com.io.crowdfunding.entity.Project;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.entity.VerificationRequest;
import com.io.crowdfunding.repository.ProjectRepository;
import com.io.crowdfunding.repository.UserRepository;
import com.io.crowdfunding.repository.VerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;

    @Transactional
    public Project createProject(ProjectCreateRequest req, String documentUrl, String currentUser) {
        // 1. Assign the owner
//        User u = userRepository.findByEmail ( currentUser ).orElseThrow (new RuntimeException ("j"));
        User u = userRepository.findByEmail(currentUser) .orElseThrow(() -> new RuntimeException("User not found: " + currentUser));

        Project project = new Project ();
        project.setOwner(u);
         project.setPName(req.getPName());
        project.setDescription(req.getDescription());
        project.setMaxAmount(req.getMaxAmount());
        project.setEndTime(req.getEndTime());
        project.setDocumentUrl ( documentUrl );

        // 2. Set defaults
        project.setCurrentAmount(0.0);
        project.setStatus("PENDING");
        System.out.println (req);
        System.out.println (req.getImageUrls ());
         if (req.getImageUrls() != null) {
            List<Image> images = req.getImageUrls().stream().map( url -> {
                Image img = new Image();
                img.setFilePath(url);
                img.setProject(project);
                return img;
            }).toList();
            project.setImages(images);
        }
        // 3. Save Project
        Project savedProject = projectRepository.save(project);

        // 4. Create the verification request we discussed earlier
        VerificationRequest vReq = new VerificationRequest();
        vReq.setProject(savedProject);
        vReq.setUser(u);
        vReq.setDocumentUrl(documentUrl);
        vReq.setStatus("PENDING");
        verificationRepository.save(vReq);
        return savedProject;
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }
    public List<Project> getAllApprovedRecent() {
        return projectRepository.findByStatusOrderByCreatedAtDesc("APPROVED");
    }


    public Project getById(Long id) {
        return projectRepository.findById(id).orElseThrow();
    }

    public Project create(ProjectCreateRequest projectCreateRequest) {
        return  null;
    }
}