package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@Table(name = "product_warranty")
public class Warranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warranty_id")
    private int id;

    @Column(name = "terms")
    private double terms;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;


}
