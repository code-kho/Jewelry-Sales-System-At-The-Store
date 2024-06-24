package com.example.salesystematthestore.payload.request;

import lombok.Data;

@Data
public class ProductItemRequest {
    private int productId;
    private int quantity;
    private double price;

}
