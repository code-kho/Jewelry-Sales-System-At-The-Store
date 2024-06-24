package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.dto.PromotionDTO;
import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.entity.Promotion;
import com.example.salesystematthestore.payload.request.PromotionRequest;
import com.example.salesystematthestore.repository.ProductRepository;
import com.example.salesystematthestore.repository.PromotionRepository;
import com.example.salesystematthestore.service.imp.PromotionServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class PromotionService implements PromotionServiceImp {

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    ProductRepository productRepository;



    @Override
    public boolean addPromotion(PromotionRequest promotionRequest) {
        boolean result = true;
        Promotion promotion = new Promotion();
        promotionRepository.save(promotion);

        try {

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date endDate = formatter.parse(promotionRequest.getEndDate());

            Date initialDate = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(initialDate);
            calendar.add(Calendar.HOUR_OF_DAY, 7);

            Date startDate = new Date();

            promotion.setDiscount(promotionRequest.getDiscount());
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);
            promotionRepository.save(promotion);

            for (Integer productId : promotionRequest.getProductIdList()) {
                Product product = productRepository.findByProductId(productId);
                product.setPromotion(promotion);
            }

            promotionRepository.save(promotion);
        } catch (ParseException e) {
            result = false;
        }
        return result;
    }

    private PromotionDTO transferPromotion(Promotion promotion){
        PromotionDTO result = new PromotionDTO();
        List<Product> productList = promotion.getProductList();
        List<ProductDTO> productDTOS = new ArrayList<>();

        for(Product product : productList){
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductId(product.getProductId());
            productDTO.setBarCode(product.getBarCode());
            productDTO.setProductName(product.getProductName());
            productDTO.setWeight(product.getWeight());
            productDTO.setPrice(product.getPrice());
            productDTO.setLaborCost(product.getLaborCost());
            productDTO.setRatioPrice(product.getRatioPrice());
            productDTO.setCostPrice(product.getCostPrice());
            productDTO.setStonePrice(product.getStonePrice());
            productDTO.setImage(product.getImage());
            productDTO.setQuantityInStock(product.getQuantityInStock());
            productDTO.setDescription(product.getDescription());
            productDTO.setCategoryName(product.getProductType().getName());
            productDTOS.add(productDTO);
        }
        result.setId(promotion.getId());
        result.setDiscount(promotion.getDiscount());
        result.setDescription(promotion.getDescription());
        result.setStartDate(promotion.getStartDate());
        result.setEndDate(promotion.getEndDate());
        result.setProductDTOList(productDTOS);

        return result;
    }

    @Override
    public List<PromotionDTO> getAllPromotion(String startDate,String endDate,String description,double discount,int page,int size, String sort, String sortType) {
        Sort sortPage;
        if (sortType.equals("DESC")) {

            sortPage = Sort.by(Sort.Direction.DESC, sort);
        } else{
            sortPage = Sort.by(Sort.Direction.ASC, sort);
        }

        Pageable pageable = PageRequest.of(page, size, sortPage);

        Date startDateInput = convertStringToDate(startDate);
        Date endDateInput = convertStringToDate(endDate);

        Page<Promotion> promotions = promotionRepository.findByDiscountLessThanEqualAndDescriptionContainsAndStartDateAfterAndEndDateBefore(discount, description, startDateInput, endDateInput,pageable);

        List<PromotionDTO> result = new ArrayList<>();

        if (!promotions.isEmpty()) {
            for(Promotion promotion : promotions){
                PromotionDTO promotionDTO = transferPromotion(promotion);
                result.add(promotionDTO);
            }
        }

        return result;
    }

    private Date convertStringToDate(String dateString) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            return formatter.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public PromotionDTO getPromotionById(int id) {

        Promotion promotion = promotionRepository.findById(id).orElse(null);

        return transferPromotion(promotion);
    }



}
