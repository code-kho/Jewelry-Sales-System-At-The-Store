package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus,Integer> {

}
