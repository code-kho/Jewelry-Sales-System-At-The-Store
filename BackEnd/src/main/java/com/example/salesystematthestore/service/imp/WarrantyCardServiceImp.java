package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.WarrantyCardDTO;
import com.example.salesystematthestore.dto.WarrantyHistoryDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.WarrantyHistory;

import java.util.List;
import java.util.UUID;

public interface WarrantyCardServiceImp {
    public void createWarrantyCardForOrder(Order order);

    public List<WarrantyCardDTO> viewAllWarrantyForCustomer(int orderId, String customerPhone);

    public List<WarrantyCardDTO> viewAllWarrantyCardByOrderId(int orderId);

    public boolean makeWarranty(int userId, UUID warrantyCardCode);

    public List<WarrantyHistoryDTO> viewAllWarrantyHistory(int userId, UUID cardCode);

}
