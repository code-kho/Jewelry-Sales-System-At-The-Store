package com.example.salesystematthestore.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "shipping_method")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShippingMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_method_id")
    private int id;

    @Column(name = "ship_name")
    private String shipName;

    @OneToMany(mappedBy = "shippingMethod", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<OrderDetail> orderDetailList;

}
