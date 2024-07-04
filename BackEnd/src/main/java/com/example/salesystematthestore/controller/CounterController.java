package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.CounterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/counter")
public class CounterController {

    @Autowired
    CounterServiceImp counterServiceImp;

    @GetMapping
    public ResponseEntity showAllCounter(){
        ResponseData responseData = new ResponseData();
        responseData.setData(counterServiceImp.showAllCounter());

        return new ResponseEntity(responseData, HttpStatus.OK);
    }



}
