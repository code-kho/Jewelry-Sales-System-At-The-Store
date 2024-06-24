package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.GoldTokenServiceImp;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
@Hidden
public class TokenController {

    @Autowired
    GoldTokenServiceImp goldTokenServiceImp;

    @GetMapping("/get-token")
    public ResponseEntity<?> getToken() {

        ResponseData responseData = new ResponseData();

        responseData.setData(goldTokenServiceImp.getToken());

        return new ResponseEntity<>(responseData, HttpStatus.OK);


    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam String token) {

        ResponseData responseData = new ResponseData();

        responseData.setData(goldTokenServiceImp.refreshToken(token));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-gold-price")
    public ResponseEntity<?> getGoldPrice() {

        ResponseData responseData = new ResponseData();

        responseData.setData(goldTokenServiceImp.getGoldPrice());

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/add-token")
    public ResponseEntity<?> getGoldPrice(@RequestParam String token) {

        ResponseData responseData = new ResponseData();

        responseData.setData(goldTokenServiceImp.addToken(token));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

}
