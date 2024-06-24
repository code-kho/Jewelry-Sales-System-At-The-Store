package com.example.salesystematthestore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyBackDTO implements Serializable {
    private ProductDTO product;
    private OrderDTO order;
    private UserDTO user;
    private int quantity;
    private Date transactionDate;
    private double buyBackPrice;
}
