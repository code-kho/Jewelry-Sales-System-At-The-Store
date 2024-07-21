package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.CustomerRequest;
import com.example.salesystematthestore.repository.CustomerRepository;
import com.example.salesystematthestore.service.imp.CustomerServiceImp;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@Tag(name = "Customer", description = "Operations related to customer management ")
public class CustomerController {

    private final CustomerServiceImp customerServiceImp;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerServiceImp customerServiceImp, CustomerRepository customerRepository) {
        this.customerServiceImp = customerServiceImp;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public ResponseEntity<?> getCustomers(@RequestParam(required = false) String phoneNumber) {
        ResponseData responseData = new ResponseData();
        if (phoneNumber != null) {
            responseData.setData(customerServiceImp.getCustomerByPhoneNumber(phoneNumber));
            responseData.setStatus(200);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            responseData.setData(customerServiceImp.getAllCustomers());
            responseData.setStatus(200);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody CustomerRequest customerRequest) {
        ResponseData responseData = new ResponseData();

        if (customerRepository.existsByEmailOrPhoneNumber(customerRequest.getEmail(), customerRequest.getPhoneNumber())) {
            responseData.setData(0);
            responseData.setDesc("Email or phone number already exists");
        } else {
            responseData.setData(customerServiceImp.createCustomer(customerRequest));
        }
        return new ResponseEntity<>(responseData, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();

        if (customerRepository.existsById(id)) {
            responseData.setData(customerServiceImp.getCustomerById(id));
        } else {
            responseData.setData("Not found");
            responseData.setStatus(404);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
