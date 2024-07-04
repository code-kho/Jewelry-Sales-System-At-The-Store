package com.example.salesystematthestore.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class TransferRequest {
    private int fromCounterId;
    private int toCounterId;
    private List<ProductTransferRequest> productTransferRequestList;
}
