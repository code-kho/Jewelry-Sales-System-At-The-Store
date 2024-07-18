package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.VoucherServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    @Autowired
    VoucherServiceImp voucherServiceImp;

    @PostMapping
    public ResponseEntity<?> createVoucher(@RequestParam double discountPercent) {
        ResponseData responseData = new ResponseData();
        responseData.setData(voucherServiceImp.createVoucher(discountPercent));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllVoucher() {
        ResponseData responseData = new ResponseData();
        responseData.setData(voucherServiceImp.getAllVoucher());

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> getVoucherByCode(@PathVariable UUID code) {
        ResponseData responseData = new ResponseData();
        responseData.setData(voucherServiceImp.getVoucherByCode(code));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
