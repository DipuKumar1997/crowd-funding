package com.io.crowdfunding.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Long pId;
    private String pName;
    @Column(length = 500)
    private String description;
    private String status ="PENDING";//to do set the enum
    @Column(name = "min_amount")
    private Double minAmount; //always set to 0 or 5 doller
    @Column(name = "max_amount")
    private Double maxAmount; //max amount to be collected a goal  od money  and also how much you can donate
    @Column(name = "current_amount")
    private Double currentAmount;//remaining amount
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    private String documentUrl;
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @Column(name = "end_time")
    private LocalDateTime endTime; // a goad when it end
    private String role;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonBackReference // Prevents infinite recursion during JSON serialization
    private User owner;


    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images;
    public void  addImage(Image image) {
        images.add(image);
        image.setProject(this);
    }
    public void removeImage(Image image) {
        images.remove(image);
        image.setProject(null);
    }

    @Transient
    public Long getOwnerId() {
        return owner != null ? owner.getId() : null;
    }
}
