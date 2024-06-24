package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, KeyOrderItem> {


}
