package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.LinkedHashMap;

@Data
public class ProductDTO implements Serializable {
    private Integer productId;
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
    private Integer quantityInStock;
    private String description;
    private String categoryName;
    private Integer goldId;
    private Integer typeId;
    private boolean isActive;
    private boolean availableBuyBack;
    private boolean availableRotate;
    private String goldTypeName;
    private int quantityRequest;
    private LinkedHashMap<Integer, Integer> quantityInCounter;
    private double warrantyYear;
    private boolean isPromotion;
    private double discountPercent;
}