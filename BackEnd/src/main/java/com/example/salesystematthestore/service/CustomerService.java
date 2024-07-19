package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.CustomerDTO;
import com.example.salesystematthestore.entity.Customer;
import com.example.salesystematthestore.entity.MemberShipTier;
import com.example.salesystematthestore.payload.request.CustomerRequest;
import com.example.salesystematthestore.repository.CustomerRepository;
import com.example.salesystematthestore.repository.MemberShipTierRepository;
import com.example.salesystematthestore.service.imp.CustomerServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService implements CustomerServiceImp {


    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    MemberShipTierRepository memberShipTierRepository;

    private CustomerDTO transferCustomer(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customer.getId());
        customerDTO.setName(customer.getName());
        customerDTO.setGender(customer.getGender());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        customerDTO.setLoyaltyPoints(customer.getLoyaltyPoints());
        customerDTO.setMemberShipTier(customer.getMemberShipTier().getMembershipName());
        customerDTO.setPrecent_discount(customer.getMemberShipTier().getDiscountPercent());
        return customerDTO;
    }

    @Override
    public int createCustomer(CustomerRequest customerRequest) {

        Customer customer = new Customer();

        customer.setName(customerRequest.getName());
        customer.setGender(customerRequest.getGender());
        customer.setEmail(customerRequest.getEmail());
        customer.setAddress(customerRequest.getAddress());
        customer.setPhoneNumber(customerRequest.getPhoneNumber());
        customer.setLoyaltyPoints(0);

        Optional<MemberShipTier> memberShipTier = memberShipTierRepository.findById(6);

        memberShipTier.ifPresent(customer::setMemberShipTier);

        customerRepository.save(customer);

        return customer.getId();
    }

    @Override
    public CustomerDTO getCustomerById(int id) {

        CustomerDTO customerDTO = new CustomerDTO();
        Customer customer = customerRepository.findById(id);

            customerDTO = transferCustomer(customer);


        return customerDTO;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {

        List<Customer> customerList = customerRepository.findAll();
        List<CustomerDTO> result = new ArrayList<>();

        for (Customer customer : customerList) {
            result.add(transferCustomer(customer));
        }

        return result;
    }

    @Override
    public List<CustomerDTO> getCustomerByPhoneNumber(String phoneNumber) {

        List<Customer> customerList = customerRepository.findByPhoneNumberContains(phoneNumber);
        List<CustomerDTO> result = new ArrayList<>();

        for (Customer customer : customerList) {
            result.add(transferCustomer(customer));
        }

        return result;

    }

    @Override
    public void updateMembershipTier(int point, int customerId) {
        Customer customer = customerRepository.findById(customerId);
        MemberShipTier memberShipTier;
        if (point >= 5000 && point<10000) {
            memberShipTier = memberShipTierRepository.findById(1).get();
        } else if (point >= 10000 && point<30000) {
            memberShipTier = memberShipTierRepository.findById(2).get();
        } else if (point >= 30000&&point<90000) {
            memberShipTier = memberShipTierRepository.findById(3).get();
        } else if (point >= 90000&&point<200000) {
            memberShipTier = memberShipTierRepository.findById(4).get();
        } else if (point >= 200000) {
            memberShipTier = memberShipTierRepository.findById(5).get();
        } else {
            memberShipTier = memberShipTierRepository.findById(6).get();
        }
        customer.setMemberShipTier(memberShipTier);
        customerRepository.save(customer);
    }
}
