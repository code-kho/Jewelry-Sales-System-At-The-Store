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

    private final BuybackServiceImp buybackServiceImp;

    @Autowired
    public BuyBackController(BuybackServiceImp buybackServiceImp) {
        this.buybackServiceImp = buybackServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> createBuyBack(@RequestParam int orderId, @RequestParam int userId, @RequestParam int productId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(buybackServiceImp.saveBuyback(orderId, userId, productId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> viewBuyBackByCustomerPhone(@RequestParam(required = false, defaultValue = "") String phoneNumber) {
        ResponseData responseData = new ResponseData();
        responseData.setData(buybackServiceImp.getByCustomerPhone(phoneNumber));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> viewBuyBackDetails(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(buybackServiceImp.getBuyBackDetails(id));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
