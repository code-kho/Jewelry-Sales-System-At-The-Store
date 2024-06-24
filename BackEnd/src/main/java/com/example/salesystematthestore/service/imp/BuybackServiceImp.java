package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.BuyBackDTO;

public interface BuybackServiceImp {

    boolean saveBuyback(int orderId, int userId, int productId, int quantity);

    BuyBackDTO getBuyBackDetails(int id);
}
