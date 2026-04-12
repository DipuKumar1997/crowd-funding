package com.io.crowdfunding.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectCreateRequest {
    private String pName;
    private String description;
    private Double maxAmount;
    private LocalDateTime endTime;
    private String documentUrl; // Received from the frontend form
     private List<String> imageUrls;
}