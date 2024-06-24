package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gold_token")
@Data
public class GoldToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "token")
    private String token;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "number_left")
    private int numberLeft;

}
