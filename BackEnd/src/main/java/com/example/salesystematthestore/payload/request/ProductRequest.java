package com.example.salesystematthestore.payload.request;

import lombok.Data;

@Data
public class ProductRequest {
    private int productId;
    private String productName;
    private double weight;
    private double laborCost;
    private double ratioPrice;
    private double stonePrice;
    private int isGem;
    private String image;
    private int quantityInStock;
    private String description;
    private int goldId;
    private int typeId;
    private int collectionId;
    private int isActive;
    private int isJewel;
}
