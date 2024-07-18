package com.example.salesystematthestore.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProductTypeDTO {

    private int id;
    private String name;
    private Date createdDate;

}
