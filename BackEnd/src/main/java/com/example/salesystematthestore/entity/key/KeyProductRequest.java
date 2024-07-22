package com.example.salesystematthestore.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class KeyProductRequest {
    @Column(name = "product_id")
    private int productId;

    @Column(name = "request_id")
    private int requestId;
}
