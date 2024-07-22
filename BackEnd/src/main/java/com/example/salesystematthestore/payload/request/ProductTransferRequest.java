package com.example.salesystematthestore.payload.request;

import lombok.Data;

@Data
public class ProductTransferRequest {
    private int productId;
    private int quantity;
}
