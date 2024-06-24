package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderItemDTO implements Serializable {
    private int productId;
    private int quantity;
    private double price;
    private int availableBuyBack;
    private double discountPrice;
    private String img;

}
