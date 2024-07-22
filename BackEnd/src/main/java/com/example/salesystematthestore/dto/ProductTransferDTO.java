package com.example.salesystematthestore.dto;

import lombok.Data;

@Data
public class ProductTransferDTO {

    private int productId;

    private int quantity;

    private String productName;

    private String image;
}
