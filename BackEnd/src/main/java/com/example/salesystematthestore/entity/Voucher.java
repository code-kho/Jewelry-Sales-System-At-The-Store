package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "voucher")
@Data
public class Voucher {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID code;

    @Column(name = "discount_percent")
    private double discountPercent;

    @Column(name = "is_used")
    private boolean isUsed;



}
