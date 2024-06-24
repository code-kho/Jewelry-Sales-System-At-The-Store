package com.example.salesystematthestore.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CustomerDTO implements Serializable {
    private int id;

    private String name;

    private String gender;

    private String email;

    private String address;

    private String phoneNumber;

    private int loyaltyPoints;

    private String memberShipTier;
}
