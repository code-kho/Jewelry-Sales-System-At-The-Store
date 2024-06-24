package com.example.salesystematthestore.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private int customerId;
    private int userId;
    private double amount;
    private List<ProductItemRequest> productItemRequestList;
}
