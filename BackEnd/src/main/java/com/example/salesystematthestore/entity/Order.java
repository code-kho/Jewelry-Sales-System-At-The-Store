package com.example.salesystematthestore.entity;

import com.example.salesystematthestore.payload.request.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "[order]")
@Data
public class Order {

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

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<OrderItem> orderItemList;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id")
    private Users user;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
            private List<Payment> paymentList;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(mappedBy = "order")
    private Warranty warranty;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "status_id")
    private OrderStatus orderStatus;

}
