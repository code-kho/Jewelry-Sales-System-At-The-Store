package com.example.salesystematthestore.dto;

import com.example.salesystematthestore.entity.ProductRequests;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RequestTransferDTO implements Serializable {

    private int id;

    private CounterDTO fromCounter;

    private CounterDTO toCounter;

    private List<ProductTransferDTO> products;

    private int totalQuantity;

    private String status;
}
