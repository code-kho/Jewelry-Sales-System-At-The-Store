package com.example.salesystematthestore.payload.request;


import lombok.Data;

@Data
public class User {

    private String name;
    private String userName;
    private String address;
    private String email;
    private String password;
    private String phoneNumber;
    private int roleId;
    private int counterId;

}

