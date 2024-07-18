package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.PromotionRequest;
import com.example.salesystematthestore.service.imp.ProductTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/product-type")
public class ProductTypeController {

    @Autowired
    ProductTypeServiceImp productTypeServiceImp;

    @PostMapping
    public ResponseEntity<?> createProductType(@RequestParam String productTypeName) {
        ResponseData responseData = new ResponseData();

        responseData.setData(productTypeServiceImp.createProductType(productTypeName));


        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllProductType() {
        ResponseData responseData = new ResponseData();

        responseData.setData(productTypeServiceImp.getAllProductTypes());


        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateProductType(@RequestParam int typeId,@RequestParam String name) {
        ResponseData responseData = new ResponseData();

        responseData.setData(productTypeServiceImp.updateProductType(typeId, name));


        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllProductType(@PathVariable int id){
        ResponseData responseData = new ResponseData();

        responseData.setData(productTypeServiceImp.getProductTypeById(id));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }




}
