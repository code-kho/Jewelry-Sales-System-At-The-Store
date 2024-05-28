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
    private String terms;

    @Column(name = "valid_until")
    private Date validUntil;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;


}
