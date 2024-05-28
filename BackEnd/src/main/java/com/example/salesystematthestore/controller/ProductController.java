package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductServiceImp productServiceImp;

    @GetMapping("/get-product-out-of-stock")
    public ResponseEntity<?> getProductOutOfStock(@RequestParam int countId ){


        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductOutOfStock(countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
