package com.example.salesystematthestore.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "counter")
@NoArgsConstructor
@AllArgsConstructor
public class Counter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "counter_id")
    private int id;

    @Column(name = "address", length = 50)
    private String address;


    @OneToMany(mappedBy = "counter", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private List<ProductCounter> productCounterList;

    @OneToMany(mappedBy = "counter", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<Users> usersList;

    @OneToMany(mappedBy = "fromCounter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TransferRequests> transferRequestsFrom;

    @OneToMany(mappedBy = "toCounter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TransferRequests> transferRequestsTo;
}
