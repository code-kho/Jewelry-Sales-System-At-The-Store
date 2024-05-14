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
@Table(name = "buy_back")
public class BuyBack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buy_back_id")
    private int buyBackId;

    @Column(name = "transaction_date")
    private Date transactionDate;

    @Column(name = "buy_back_price")
    private float buyBackPrice;

    @OneToMany(mappedBy = "product", fetch =  FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH
    })
    List<Product> productList;

}
