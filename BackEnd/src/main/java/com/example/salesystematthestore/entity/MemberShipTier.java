package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "membership_tier")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberShipTier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private int id;

    @Column(name="membership_name")
    private String membershipName;

    @Column(name = "discount_percent")
    private int discountPercent;

    @Column(name = "point")
    private int point;

    @OneToMany(mappedBy = "memberShipTier", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<Customer> customerList;
}
