package com.example.salesystematthestore.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
    private double buyBackPrice;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id")
    private Users users;

}
