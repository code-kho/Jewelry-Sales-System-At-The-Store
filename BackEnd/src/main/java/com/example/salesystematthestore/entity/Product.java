package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity()
@Table(name = "product")
@NoArgsConstructor
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @Column(name = "barcode")
    @Lob
    private String barCode;

    @Column(name = "name")
    private String productName;

    @Column(name = "weight")
    private float weight;

    @Column(name = "price")
    private float price;

    @Column(name = "labor_cost")
    private float laborCost;

    @Column(name = "cost_price")
    private float costPrice;

    @Column(name = "stone_price")
    private float stonePrice;

    @Column(name = "is_gem")
    private boolean isGem;

    @Column(name = "image")
    @Lob
    private String image;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "buy_back_id")
    private BuyBack buyBack;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "warranty_id")
    private Warranty warranty;

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

    @ManyToMany(fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinTable(
            name = "product_counter",
            joinColumns = @JoinColumn(name ="product_id"),
            inverseJoinColumns = @JoinColumn(name ="counter_id")
    )
    private List<Counter> counterList;


    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<OrderItem> orderItemList;


}
