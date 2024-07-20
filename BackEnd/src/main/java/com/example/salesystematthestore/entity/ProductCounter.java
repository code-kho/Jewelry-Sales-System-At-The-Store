package com.example.salesystematthestore.entity;


import com.example.salesystematthestore.entity.key.KeyProductCouter;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_counter")
@Data
public class ProductCounter {


    @EmbeddedId
    KeyProductCouter keyProductCouter;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "product_id",insertable=false, updatable=false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "counter_id",insertable=false, updatable=false)
    private Counter counter;

    @Column(name = "quantity")
    private int quantity;
}
