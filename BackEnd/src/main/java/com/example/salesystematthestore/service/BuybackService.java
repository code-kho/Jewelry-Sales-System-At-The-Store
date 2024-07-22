package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.*;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.BuybackServiceImp;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public boolean saveBuyback(int orderId, int userId, int productId) {

        boolean result = true;
        try {
            BuyBack buyback = new BuyBack();
            Order order = orderRepository.findById(orderId);
            Users user = userRepository.findById(userId);
            double price = 0;

            KeyOrderItem keyOrderItem = new KeyOrderItem();
            keyOrderItem.setOrderId(orderId);
            keyOrderItem.setProductId(productId);

            OrderItem orderItem = orderItemRepository.findById(keyOrderItem).get();
            Product product = orderItem.getProduct();
            if (product.isGem()) {
                price = orderItem.getPrice() * 0.7;
            } else {
                price = product.getGoldType().getPrice() * product.getWeight();
            }

            buyback.setOrder(order);
            buyback.setUsers(user);
            buyback.setProduct(orderItem.getProduct());
            buyback.setBuyBackPrice(price);
            buyback.setTransactionDate(order.getOrderDate());
            buyback.setQuantity(1);
            orderItem.setAvalibleBuyBack(orderItem.getAvalibleBuyBack() - 1);


            buyBackRepository.save(buyback);
            orderItemRepository.save(orderItem);
        } catch (Exception e) {
            result = false;
        }
        return result;
    }

    @Override
    public BuyBackDTO getBuyBackDetails(int id) {

        BuyBackDTO result = new BuyBackDTO();

        Optional<BuyBack> buyBackFind = buyBackRepository.findById(id);

        if(buyBackFind.isPresent()) {
            BuyBack buyBack = buyBackFind.get();

            Order order = buyBack.getOrder();
            OrderDTO orderDTO = orderServiceImp.transferOrder(order);

            Product product = buyBack.getProduct();
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductId(product.getProductId());
            productDTO.setBarCode(product.getBarCode());
            productDTO.setProductName(product.getProductName());
            productDTO.setWeight(product.getWeight());
            productDTO.setLaborCost(product.getLaborCost());
            productDTO.setRatioPrice(product.getRatioPrice());
            productDTO.setStonePrice(product.getStonePrice());
            productDTO.setGem(product.isGem());
            productDTO.setImage(product.getImage());
            productDTO.setDescription(product.getDescription());
            productDTO.setCategoryName(product.getProductType().getName());
            productDTO.setGoldId(product.getGoldType().getId());
            productDTO.setTypeId(product.getProductType().getId());

            Users users = buyBack.getUsers();

            UserDTO usersDTO = new UserDTO();
            usersDTO.setId(users.getId());
            usersDTO.setFullName(users.getFullName());

            result.setOrder(orderDTO);
            result.setProduct(productDTO);
            result.setBuyBackPrice(buyBack.getBuyBackPrice());
            result.setTransactionDate(buyBack.getTransactionDate());
            result.setQuantity(buyBack.getQuantity());
            result.setUser(usersDTO);
        }

        return result;

    }



    @Override
    public List<BuyBackDTO> getByCustomerPhone(String phoneNumber) {
        List<BuyBackDTO> result = new ArrayList<>();

        List<BuyBack> buyBackList = buyBackRepository.findByOrder_Customer_PhoneNumberContains(phoneNumber);

        for(BuyBack buyBack : buyBackList){

            BuyBackDTO buyBackDTO = getBuyBackDetails(buyBack.getBuyBackId());
            result.add(buyBackDTO);
        }

        return result;
    }


}
