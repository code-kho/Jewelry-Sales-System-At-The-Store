package com.example.salesystematthestore.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "payment_method")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private int id;

    @Column(name = "pay_time")
    private Date payTime;

    @Column(name = "amout")
    private double amount;

    @Column(name = "payment_mode")
    private String paymentMode;

    @Column(name = "external_momo_transaction_code", nullable = true)
    private String externalMomoTransactionCode;

    @OneToOne()
    @JoinColumn(name = "order_id")
    private OrderDetail orderDetail;
}
