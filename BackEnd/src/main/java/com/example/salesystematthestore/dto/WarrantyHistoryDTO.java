package com.example.salesystematthestore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WarrantyHistoryDTO {
    private int id;

    private Date date;
}
