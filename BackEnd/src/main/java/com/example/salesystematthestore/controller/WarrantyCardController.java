package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.repository.CustomerRepository;
import com.example.salesystematthestore.service.imp.BuybackServiceImp;
import com.example.salesystematthestore.service.imp.WarrantyCardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/warranty-card")
public class WarrantyCardController {

    private final CustomerRepository customerRepository;
    private final WarrantyCardServiceImp warrantyCardServiceImp;

    @Autowired
    public WarrantyCardController(CustomerRepository customerRepository, WarrantyCardServiceImp warrantyCardServiceImp) {
        this.customerRepository = customerRepository;
        this.warrantyCardServiceImp = warrantyCardServiceImp;
    }

    @GetMapping("/view-warranty")
    public ResponseEntity<?> viewWarrantyForOrder(@RequestParam int orderId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(warrantyCardServiceImp.viewAllWarrantyCardByOrderId(orderId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/view-warranty-customer")
    public ResponseEntity<?> viewWarrantyForOrder(@RequestParam int orderId, @RequestParam String customerPhoneNumber) {
        if (customerRepository.existsByPhoneNumber(customerPhoneNumber)) {
            ResponseData responseData = new ResponseData();
            responseData.setData(warrantyCardServiceImp.viewAllWarrantyForCustomer(orderId, customerPhoneNumber));

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
