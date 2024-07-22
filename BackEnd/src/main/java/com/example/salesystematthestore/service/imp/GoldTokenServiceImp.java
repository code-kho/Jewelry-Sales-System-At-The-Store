package com.example.salesystematthestore.service.imp;

import java.util.HashMap;
import java.util.Map;

public interface GoldTokenServiceImp {
    
    String getToken();

    String refreshToken(String token);

    Map<String,Object> getGoldPrice();

    void updateGoldPrice();

    boolean addToken(String token);
}
