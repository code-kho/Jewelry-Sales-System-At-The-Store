package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "user_status")
@Data
public class UserStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private int id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "descripion", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "userStatus", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<Users> usersList;

}
