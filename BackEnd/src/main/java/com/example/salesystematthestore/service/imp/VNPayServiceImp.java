package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface VNPayServiceImp {
    PaymentDTO createVnPayPayment(HttpServletRequest request, int orderId);
}
