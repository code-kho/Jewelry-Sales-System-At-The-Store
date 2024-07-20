package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.dto.WarrantyCardDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.entity.WarrantyCard;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.repository.WarrantyCardRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import com.example.salesystematthestore.service.imp.WarrantyCardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class WarrantyCardService implements WarrantyCardServiceImp {

    private final WarrantyCardRepository warrantyCardRepository;
    private final ProductServiceImp productServiceImp;
    private final OrderServiceImp orderServiceImp;
    private final OrderRepository orderRepository;

    @Autowired
    public WarrantyCardService(WarrantyCardRepository warrantyCardRepository,ProductServiceImp productServiceImp,OrderServiceImp orderServiceImp,OrderRepository orderRepository) {
        this.warrantyCardRepository = warrantyCardRepository;
        this.productServiceImp = productServiceImp;
        this.orderServiceImp = orderServiceImp;
        this.orderRepository = orderRepository;
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
            warrantyCardDTO.setExpired(warrantyCard.getExpiredDate().after(warrantyCard.getOrderDate()));
            warrantyCardDTO.setUrl(warrantyCard.getUrlCard());
        }

        return warrantyCardDTOList;
    }

    private WarrantyCardDTO transferWarranty(WarrantyCard warrantyCard){
        WarrantyCardDTO result = new WarrantyCardDTO();

        result.setCode(warrantyCard.getId());
        result.setOrderDate(warrantyCard.getOrderDate().toString());
        result.setExpiredDate(warrantyCard.getExpiredDate().toString());
        result.setExpired(warrantyCard.getExpiredDate().after(warrantyCard.getOrderDate()));

        OrderDTO orderDTO = orderServiceImp.transferOrder(warrantyCard.getOrderItem().getOrder());
        ProductDTO productDTO = productServiceImp.getProductInWarehouseById(warrantyCard.getOrderItem().getProduct().getProductId());

        result.setOrder(orderDTO);
        result.setProduct(productDTO);
        result.setUrl(warrantyCard.getUrlCard());

        return result;
    }

}
