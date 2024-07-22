package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.WarrantyCardDTO;
import com.example.salesystematthestore.entity.Order;

import java.util.List;

public interface WarrantyCardServiceImp {
    public void createWarrantyCardForOrder(Order order);

    public List<WarrantyCardDTO> viewAllWarrantyForCustomer(int orderId, String customerPhone);

    public List<WarrantyCardDTO> viewAllWarrantyCardByOrderId(int orderId);
}
