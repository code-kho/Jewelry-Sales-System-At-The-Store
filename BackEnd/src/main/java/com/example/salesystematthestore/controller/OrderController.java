package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/order")
public class OrderController {


    @Autowired
    OrderServiceImp orderServiceImp;


    @GetMapping("/get-money-by-date")
    public ResponseEntity<?> getOrder(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        Double totalMoney = orderServiceImp.getTotalMoneyByDate(countId, startDate, endDate);
        ResponseData responseData = new ResponseData();

        responseData.setData(totalMoney);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-number-order-by-date")
    public ResponseEntity<?> getNumberOfOrderByDate(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        int numberOfOrder = orderServiceImp.getNumberOfOrderByDate(countId, startDate, endDate);
        ResponseData responseData = new ResponseData();

        responseData.setData(numberOfOrder);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/get-number-item-by-date")
    public ResponseEntity<?> getNumberOfItemByDate(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        int numberOfItem = orderServiceImp.getNumberOfItemByDate(countId, startDate, endDate);

        ResponseData responseData = new ResponseData();

        responseData.setData(numberOfItem);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
