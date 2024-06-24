package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductDTO implements Serializable {
    private int productId;
    private String barCode;
    private String productName;
    private Double weight;
    private Double price;
    private Double discountPrice;
    private Double laborCost;
    private Double ratioPrice;
    private Double costPrice;
    private Double stonePrice;
    private boolean isGem;
    private String image;
    private int quantityInStock;
    private String description;
    private String categoryName;
    private int goldId;
    private int typeId;
    private boolean isActive;

}