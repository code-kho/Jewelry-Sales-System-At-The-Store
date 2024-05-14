package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "order_details")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int id;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "status")
    private String status;

    @Column(name = "address")
    private String address;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "shipping_cost")
    private double shippingCost;

    @OneToMany(mappedBy = "orderDetail", fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<OrderItem> orderItemList;


}
