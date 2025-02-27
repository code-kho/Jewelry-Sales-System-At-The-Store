package com.example.salesystematthestore.entity;

import com.example.salesystematthestore.entity.key.KeyOrderItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "order_item")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @EmbeddedId
    KeyOrderItem keys;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;


    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Order order;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private double price;

    @Column(name = "avalible_buy_back")
    private int avalibleBuyBack;

    @Column(name = "discount_percent")
    private Double discountPercent;

    @OneToMany(mappedBy = "orderItem", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<WarrantyCard> warrantyCard;
}
