package com.example.salesystematthestore.payload.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class OrderRequest {
    private int customerId;
    private int userId;
    private double amount;
    private UUID code;
    private List<ProductItemRequest> productItemRequestList;
}
