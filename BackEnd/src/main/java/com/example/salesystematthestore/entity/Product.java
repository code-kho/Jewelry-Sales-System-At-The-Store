package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity()
@Table(name = "product")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @Column(name = "barcode", columnDefinition = "LONGTEXT")
    @Lob
    private String barCode;

    @Column(name = "name")
    private String productName;

    @Column(name = "ratio_price")
    private Double ratioPrice;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "price")
    private Double price;

    @Column(name = "labor_cost")
    private Double laborCost;

    @Column(name = "cost_price")
    private Double costPrice;

    @Column(name = "stone_price")
    private Double stonePrice;

    @Column(name = "is_gem")
    private boolean isGem;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_jewel")
    private boolean isJewel;

    @Column(name = "image")
    private String image;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "gold_id")
    private GoldType goldType;


    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "type_id")
    private ProductType productType;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<ProductCounter> productCounterList;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<BuyBack> buyBackList;


    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<OrderItem> orderItemList;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<ProductRequests> productRequestsList;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "collection_id")
    private Collection collection;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;


    @OneToOne(mappedBy = "product")
    private Warranty warranty;


}
