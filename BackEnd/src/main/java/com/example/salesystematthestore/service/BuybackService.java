package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.BuyBackDTO;
import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.OrderItemDTO;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.BuybackServiceImp;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuybackService implements BuybackServiceImp {

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    BuyBackRepository buyBackRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderServiceImp orderServiceImp;

    @Override
    public boolean saveBuyback(int orderId, int userId, int productId, int quantity) {

        boolean result = true;
        try {
            BuyBack buyback = new BuyBack();
            Order order = orderRepository.findById(orderId).get();
            Users user = userRepository.findById(userId);
            double price = 0;

            KeyOrderItem keyOrderItem = new KeyOrderItem();
            keyOrderItem.setOrderId(orderId);
            keyOrderItem.setProductId(productId);

            OrderItem orderItem = orderItemRepository.findById(keyOrderItem).get();
            Product product = orderItem.getProduct();
            if(product.isGem()){
                price = orderItem.getPrice()*0.7*quantity;
            } else{
                price = product.getGoldType().getPrice()*product.getWeight();
            }

            buyback.setOrder(order);
            buyback.setUsers(user);
            buyback.setProduct(orderItem.getProduct());
            buyback.setBuyBackPrice(price);
            buyback.setTransactionDate(order.getOrderDate());
            buyback.setQuantity(quantity);
            orderItem.setAvalibleBuyBack(orderItem.getAvalibleBuyBack() - quantity);


            buyBackRepository.save(buyback);
            orderItemRepository.save(orderItem);
        } catch (Exception e) {
            result = false;
        }
        return result;
    }

    @Override
    public BuyBackDTO getBuyBackDetails(int id) {
        return null;
    }


}
