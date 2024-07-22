package com.example.salesystematthestore.service.imp;


import com.example.salesystematthestore.dto.PromotionDTO;
import com.example.salesystematthestore.payload.request.PromotionRequest;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

public interface PromotionServiceImp {

    boolean addPromotion(PromotionRequest promotionRequest);

    LinkedHashMap<String, Object> getAllPromotion(String startDate, String endDate, String description, double discount, int page, int size, String sort, String sortType);

    PromotionDTO getPromotionById(int id);

    boolean updatePromotion(PromotionRequest promotionRequest);
}
