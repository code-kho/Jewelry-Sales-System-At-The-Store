package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.BuyBackDTO;

import java.util.List;

public interface BuybackServiceImp {

    boolean saveBuyback(int orderId, int userId, int productId);

    BuyBackDTO getBuyBackDetails(int id);

    List<BuyBackDTO> getByCustomerPhone(String phoneNumber);
}
