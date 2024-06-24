package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findByUser_Counter_Id(int id);


    @Override
    boolean existsById(Integer id);

    Page<Order> findByOrderItemList_Product_ProductNameContainsAndCustomer_NameContainsAndCustomer_EmailContainsAndCustomer_PhoneNumberContains(String productName, String name, String email, String phoneNumber, Pageable pageable);


}
