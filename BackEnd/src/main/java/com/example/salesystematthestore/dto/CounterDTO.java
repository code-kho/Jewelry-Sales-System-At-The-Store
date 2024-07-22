package com.example.salesystematthestore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CounterDTO implements Serializable {

    private int counterId;

    private String address;

    private String managerName;
}
