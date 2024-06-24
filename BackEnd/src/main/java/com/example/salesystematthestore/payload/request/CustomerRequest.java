package com.example.salesystematthestore.payload.request;

import lombok.Data;

@Data
public class CustomerRequest {
    private String name;
    private String gender;
    private String email;
    private String address;
    private String phoneNumber;


}
