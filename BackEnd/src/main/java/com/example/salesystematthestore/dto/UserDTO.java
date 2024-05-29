package com.example.salesystematthestore.dto;

import com.example.salesystematthestore.entity.Users;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Users}
 */
@Data
public class UserDTO implements Serializable {
    private int id;
    private String fullName;
    private String username;
    private String address;
    private String phoneNumber;
    private String roleName;
    private double revenue;

}