package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findByOrderDate(Date orderDate);

    List<Order> findByCounterId(int counterId);

}
