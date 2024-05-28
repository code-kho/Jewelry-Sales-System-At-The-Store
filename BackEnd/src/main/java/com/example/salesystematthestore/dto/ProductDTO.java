package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductDTO implements Serializable {
    private int productId;
    private String barCode;
    private String productName;
    private float weight;
    private float price;
    private float laborCost;
    private float costPrice;
    private float stonePrice;
    private boolean isGem;
    private String image;
    private int quantityInStock;
    private String description;
}