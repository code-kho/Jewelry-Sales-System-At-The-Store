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

    Order findById(int id);

    @Override
    boolean existsById(Integer id);

    List<Order> findByOrderStatus_IdAndOrderItemList_Product_ProductNameContainsAndCustomer_NameContainsAndCustomer_EmailContainsAndCustomer_PhoneNumberContains(int statusId, String productName, String name, String email, String phoneNumber);

    List<Order> findByUser_IdAndOrderStatus_Id(int userId, int statusId);

    List<Order> findByUser_Id(int id);

    List<Order> findByOrderStatus_IdAndOrderDateBefore(int id, Date orderDate);


}
