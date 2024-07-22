package com.example.salesystematthestore.entity.key;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class KeyProductCouter implements Serializable {

    @Column(name = "product_id")
    private int productId;

    @Column(name = "counter_id")
    private int couterId;


}
