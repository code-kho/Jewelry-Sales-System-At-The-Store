package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    boolean existsByEmailOrPhoneNumber(String email, String phoneNumber);

    Customer findById(int id);

    @Override
    boolean existsById(Integer integer);

    List<Customer> findByPhoneNumberContains(String phoneNumber);

    boolean existsByPhoneNumber(String phoneNumber);


}
