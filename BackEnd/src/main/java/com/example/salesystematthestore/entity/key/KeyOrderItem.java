package com.example.salesystematthestore.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeyOrderItem implements Serializable {

    @Column(name = "product_id")
    private int productId;

    @Column(name = "order_id")
    private int orderId;


}
