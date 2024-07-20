package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "warranty_card")
public class WarrantyCard {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "url_card")
    private  String urlCard;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "expired_date")
    private Date expiredDate;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumns({
            @JoinColumn(name = "order_item_product_id", referencedColumnName = "product_id"),
            @JoinColumn(name = "order_item_order_id", referencedColumnName = "order_id")
    })
    private OrderItem orderItem;
}
