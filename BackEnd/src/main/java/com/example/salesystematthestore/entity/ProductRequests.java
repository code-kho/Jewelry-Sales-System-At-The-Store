package com.example.salesystematthestore.entity;

import com.example.salesystematthestore.entity.key.KeyProductRequest;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_request")
@Data
public class ProductRequests {

    @EmbeddedId
    KeyProductRequest keyProductRequest;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "product_id",insertable=false, updatable=false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name = "request_id",insertable=false, updatable=false)
    private TransferRequests transferRequests;


    @Column(name = "quantity")
    private int quantity;

}
