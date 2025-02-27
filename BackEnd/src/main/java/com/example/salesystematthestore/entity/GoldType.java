package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gold_type")
public class GoldType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gold_id")
    private int id;

    @Column(name = "type_name", length = 50)
    private String typeName;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "price")
    private double price;

    @OneToMany(mappedBy = "goldType", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<Product> productList;

}
