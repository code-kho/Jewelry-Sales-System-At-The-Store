package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.BuybackServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyback")
public class BuyBackController {

    @Autowired
    BuybackServiceImp buybackServiceImp;

    @PostMapping
    public ResponseEntity<?> createBuyBack(@RequestParam int orderId,@RequestParam int userId,@RequestParam int productId,@RequestParam int quantity) {
        ResponseData responseData = new ResponseData();
        responseData.setData(buybackServiceImp.saveBuyback(orderId, userId, productId, quantity));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
