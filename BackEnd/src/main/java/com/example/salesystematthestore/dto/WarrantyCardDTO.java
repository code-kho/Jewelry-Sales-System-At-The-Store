package com.example.salesystematthestore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WarrantyCardDTO implements Serializable {

    private UUID code;
    private String orderDate;
    private String expiredDate;
    private boolean isExpired;
    private ProductDTO product;
    private OrderDTO order;
    private UserDTO user;
    private String url;
}
