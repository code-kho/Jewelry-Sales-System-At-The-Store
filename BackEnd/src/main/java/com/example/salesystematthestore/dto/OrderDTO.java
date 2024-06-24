package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class OrderDTO implements Serializable {
    private int orderId;
    private Date orderDate;
    private String status;
    private String customerName;
    private String staffName;
    private int userId;
    private Date paymentDate;
    private double totalAmount;
    private double priceBeforeVoucher;
    private double voucherPercent;
    private double tax;

    List<OrderItemDTO> orderItemList;
}

