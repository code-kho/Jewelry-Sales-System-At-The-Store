package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.dto.WarrantyCardDTO;
import com.example.salesystematthestore.dto.WarrantyHistoryDTO;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.repository.WarrantyCardRepository;
import com.example.salesystematthestore.repository.WarrantyHistoryRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import com.example.salesystematthestore.service.imp.WarrantyCardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class WarrantyCardService implements WarrantyCardServiceImp {

    private final WarrantyCardRepository warrantyCardRepository;
    private final ProductServiceImp productServiceImp;
    private final OrderServiceImp orderServiceImp;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final WarrantyHistoryRepository warrantyHistoryRepository;

    @Autowired
    public WarrantyCardService(WarrantyCardRepository warrantyCardRepository, ProductServiceImp productServiceImp, @Lazy OrderServiceImp orderServiceImp, OrderRepository orderRepository, UserRepository userRepository,WarrantyHistoryRepository warrantyHistoryRepository) {
        this.warrantyCardRepository = warrantyCardRepository;
        this.productServiceImp = productServiceImp;
        this.orderServiceImp = orderServiceImp;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.warrantyHistoryRepository = warrantyHistoryRepository;
    }


    @Override
    @Transactional
    public void createWarrantyCardForOrder(Order order) {
        List<OrderItem> orderItemList = new ArrayList<>(order.getOrderItemList());

        for (OrderItem orderItem : orderItemList) {
            int quantity = orderItem.getQuantity();

            while (quantity > 0) {
                WarrantyCard warrantyCard = new WarrantyCard();
                warrantyCard.setOrderDate(order.getOrderDate());
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(order.getOrderDate());
                calendar.add(Calendar.YEAR, orderItem.getProduct().getWarranty().getTerms());
                warrantyCard.setExpiredDate(calendar.getTime());
                warrantyCard.setOrderItem(orderItem);

                warrantyCardRepository.save(warrantyCard);

                WarrantyCardCreator warrantyCardCreator = new WarrantyCardCreator();
                String url = warrantyCardCreator.createWarrantyCard(warrantyCard);
                warrantyCard.setUrlCard(url);
                warrantyCardRepository.save(warrantyCard);
                quantity--;
            }
        }

    }

    @Override
    public List<WarrantyCardDTO> viewAllWarrantyCardByOrderId(int orderId) {
        Order order = orderRepository.findById(orderId);
        List<WarrantyCardDTO> warrantyCardDTOList = new ArrayList<>();
        List<WarrantyCard> warrantyCards = new ArrayList<>();

        for(OrderItem orderItem : order.getOrderItemList()){
            warrantyCards.addAll(orderItem.getWarrantyCard());
        }

        for(WarrantyCard warrantyCard : warrantyCards){
            warrantyCardDTOList.add(transferWarranty(warrantyCard));
        }

        return warrantyCardDTOList;
    }

    @Override
    @Transactional
    public boolean makeWarranty(int userId, UUID warrantyCardCode) {
        WarrantyHistory warrantyHistory = new WarrantyHistory();

        if(userRepository.existsById(userId)){
            Users users = userRepository.findById(userId);
            if(!users.getRole().getName().equals("QC")){
                throw new RuntimeException("You are not allowed to make warranty");
            } else{

                Optional<WarrantyCard> warrantyCard = warrantyCardRepository.findById(warrantyCardCode);
                if(warrantyCard.isPresent()){
                    warrantyHistory.setWarrantyCard(warrantyCard.get());
                    warrantyHistory.setUser(users);
                    warrantyHistory.setWarrantyDate(new Date());
                    warrantyHistoryRepository.save(warrantyHistory);
                    return true;
                } else{
                    throw new RuntimeException("Warranty card not found");
                }
            }
        }
        return false;
    }

    @Override
    public List<WarrantyHistoryDTO> viewAllWarrantyHistory(int userId, UUID cardCode) {
        List<WarrantyHistory> warrantyHistories = warrantyHistoryRepository.findByUser_IdAndWarrantyCard_Id(userId, cardCode);
        List<WarrantyHistoryDTO> warrantyHistoryDTOS = new ArrayList<>();

        for(WarrantyHistory warrantyHistory : warrantyHistories){
            WarrantyHistoryDTO warrantyHistoryDTO = new WarrantyHistoryDTO();
            warrantyHistoryDTO.setDate(warrantyHistory.getWarrantyDate());
            warrantyHistoryDTO.setId(warrantyHistory.getId());

            warrantyHistoryDTOS.add(warrantyHistoryDTO);
        }
        return warrantyHistoryDTOS;
    }

    @Override
    public List<WarrantyCardDTO> viewAllWarrantyForCustomer(int orderId, String customerPhone){

        Order order = orderRepository.findById(orderId);
        List<WarrantyCardDTO> warrantyCardDTOList = new ArrayList<>();
        List<WarrantyCard> warrantyCards = new ArrayList<>();

        for(OrderItem orderItem : order.getOrderItemList()){
            warrantyCards.addAll(orderItem.getWarrantyCard());
        }

        for(WarrantyCard warrantyCard : warrantyCards){
            WarrantyCardDTO warrantyCardDTO = new WarrantyCardDTO();
            warrantyCardDTO.setCode(warrantyCard.getId());
            warrantyCardDTO.setOrderDate(warrantyCard.getOrderDate().toString());
            warrantyCardDTO.setExpiredDate(warrantyCard.getExpiredDate().toString());
            warrantyCardDTO.setExpired(!warrantyCard.getExpiredDate().after(new Date()));
            warrantyCardDTO.setUrl(warrantyCard.getUrlCard());

            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductName(warrantyCard.getOrderItem().getProduct().getProductName());
            warrantyCardDTO.setProduct(productDTO);
            warrantyCardDTOList.add(warrantyCardDTO);
        }

        return warrantyCardDTOList;
    }

    private WarrantyCardDTO transferWarranty(WarrantyCard warrantyCard){
        WarrantyCardDTO result = new WarrantyCardDTO();

        result.setCode(warrantyCard.getId());
        result.setOrderDate(warrantyCard.getOrderDate().toString());
        result.setExpiredDate(warrantyCard.getExpiredDate().toString());
        result.setExpired(!warrantyCard.getExpiredDate().after(new Date()));

        OrderDTO orderDTO = orderServiceImp.transferOrder(warrantyCard.getOrderItem().getOrder());
        ProductDTO productDTO = productServiceImp.getProductInWarehouseById(warrantyCard.getOrderItem().getProduct().getProductId());

        result.setOrder(orderDTO);
        result.setProduct(productDTO);
        result.setUrl(warrantyCard.getUrlCard());

        return result;
    }

}
