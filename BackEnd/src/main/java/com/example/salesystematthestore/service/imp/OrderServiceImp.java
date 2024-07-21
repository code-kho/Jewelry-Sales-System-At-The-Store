package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.payload.request.OrderRequest;
import jakarta.mail.MessagingException;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

public interface OrderServiceImp {

    Double getTotalMoneyByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfItemByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Double> getArrayMoneyByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Double> getArrayProfitByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Integer> getNumberOfOrderEachDate(int counterId, String startDate, String endDate);

    LinkedHashMap<Integer, Double> getTotalMoneyEachMonth(int counterId, int year);

    LinkedHashMap<Integer, Double> getProfitEachMonth(int counterId, int year);

    List<OrderDTO> getAllOrder(int counterId);

    OrderDTO getOrder(int orderId);

    OrderDTO createOrder(OrderRequest orderRequest);

    boolean cancelOrder(int orderId);

    boolean confirmOrder(int orderId);

    OrderDTO transferOrder(Order order);

    List<OrderDTO> searchOrderBuyBack(int orderId, String productName, String customerEmail, String customerName, String customerPhoneNumber);

    void sendOrderEmail(Order order) throws MessagingException, IOException;

    String getInvoiceForOrder(Order order) throws IOException;

    List<OrderDTO> getAllOrderForUser(int userId);
}
