package com.example.salesystematthestore.payload.request;

import com.example.salesystematthestore.entity.Product;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PromotionRequest {
    private String description;
    private double discount;
    private String endDate;
    List<Integer> productIdList;

}
