package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.CustomerDTO;
import com.example.salesystematthestore.payload.request.CustomerRequest;

import java.util.List;

public interface CustomerServiceImp {

    int createCustomer(CustomerRequest customerRequest);

    CustomerDTO getCustomerById(int id);

    List<CustomerDTO> getAllCustomers();

    List<CustomerDTO> getCustomerByPhoneNumber(String phoneNumber);

    void updateMembershipTier(int point, int customerId);
}
