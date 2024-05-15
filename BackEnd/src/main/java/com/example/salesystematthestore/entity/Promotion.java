package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_id")
    private int id;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "discount_rate")
    private double discountRate;

    @OneToMany(mappedBy = "promotion", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<OrderDetail> orderDetailList;

}
