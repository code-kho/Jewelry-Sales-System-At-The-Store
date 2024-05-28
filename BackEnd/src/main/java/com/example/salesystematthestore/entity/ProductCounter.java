package com.example.salesystematthestore.entity;


import com.example.salesystematthestore.entity.key.KeyProductCouter;
import jakarta.persistence.*;

@Entity
@Table(name = "product_counter")
public class ProductCounter {


    @EmbeddedId
    KeyProductCouter keyProductCouter;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "counter_id")
    private Counter counter;
}
