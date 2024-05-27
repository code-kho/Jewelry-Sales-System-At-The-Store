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


    @GetMapping("/getbydate")
    public ResponseEntity<?> getOrder(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate ){

        Double totalMoney = orderServiceImp.getTotalMoneyByDate(countId, startDate,endDate);
        ResponseData responseData = new ResponseData();

        responseData.setData(totalMoney);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
