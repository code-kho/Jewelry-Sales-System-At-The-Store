package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.PromotionRequest;
import com.example.salesystematthestore.service.imp.PromotionServiceImp;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/promotions")
@Tag(name = "Promotion", description = "Operations related to promotion management ")
public class PromotionController {

    @Autowired
    PromotionServiceImp promotionServiceImp;

    @PostMapping
    public ResponseEntity<?> createPromotions(@RequestBody PromotionRequest promotionRequest) throws ParseException {
        ResponseData responseData = new ResponseData();

        responseData.setData(promotionServiceImp.addPromotion(promotionRequest));


        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllPromotion(@RequestParam(required = false, defaultValue = "01/01/2021") String startDate, @RequestParam(required = false, defaultValue = "01/01/2029") String endDate,
                                             @RequestParam(required = false, defaultValue = "") String description, @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size, @RequestParam(required = false, defaultValue = "100") double discount, @RequestParam(required = false, defaultValue = "id") String sort,
                                             @RequestParam(required = false, defaultValue = "ASC") String sortType) throws ParseException {
        ResponseData responseData = new ResponseData();
        responseData.setData(promotionServiceImp.getAllPromotion(startDate, endDate, description, discount,page, size,sort,sortType));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(promotionServiceImp.getPromotionById(id));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updatePromotion(@RequestBody PromotionRequest promotionRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(promotionServiceImp.updatePromotion(promotionRequest));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
