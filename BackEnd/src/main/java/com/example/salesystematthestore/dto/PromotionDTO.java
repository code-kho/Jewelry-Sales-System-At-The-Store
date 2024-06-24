package com.example.salesystematthestore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDTO implements Serializable {
    private int id;
    private double discount;
    private String description;
    private Date startDate;
    private Date endDate;
    List<ProductDTO> productDTOList;

}
