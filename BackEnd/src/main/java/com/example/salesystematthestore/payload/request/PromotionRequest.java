package com.example.salesystematthestore.payload.request;

import com.example.salesystematthestore.entity.Product;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PromotionRequest {
    private int id;
    private String description;
    private double discount;
    private String startDate;
    private String endDate;
    List<Integer> productIdList;
    List<Integer> removeProductList;
}
