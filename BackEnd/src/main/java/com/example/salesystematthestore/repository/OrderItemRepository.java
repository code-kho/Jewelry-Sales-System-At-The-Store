package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Counter;
import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, KeyOrderItem> {
    List<OrderItem> findByProduct_ProductId(int productId);

    List<OrderItem> findByProduct_ProductIdAndProduct_ProductCounterList_Counter(int productId, Counter counter);

    List<OrderItem> findByKeys_OrderId(int orderId);


}
