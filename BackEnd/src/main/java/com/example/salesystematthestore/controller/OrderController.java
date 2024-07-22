package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.OrderRequest;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/order")
@Tag(name = "Order", description = "Operations related to order management ")
public class OrderController {


    private final OrderServiceImp orderServiceImp;

    private final OrderRepository orderRepository;

    public OrderController(OrderServiceImp orderServiceImp, OrderRepository orderRepository) {
        this.orderServiceImp = orderServiceImp;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestParam(required = false) Integer counterId) {
        ResponseData responseData = new ResponseData();

        responseData.setData(orderServiceImp.getAllOrder(Objects.requireNonNullElse(counterId, 0)));


        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/get-order-to-buy-back")
    public ResponseEntity<?> getOrdersByCustomer(@RequestParam(required = false, defaultValue = "0") int orderId,
                                                 @RequestParam(required = false, defaultValue = "") String productName,
                                                 @RequestParam(required = false, defaultValue = "") String customerEmail,
                                                 @RequestParam(required = false, defaultValue = "") String customerName,
                                                 @RequestParam(required = false, defaultValue = "") String customerPhoneNumber) {
        ResponseData responseData = new ResponseData();

        responseData.setData(orderServiceImp.searchOrderBuyBack(orderId, productName, customerEmail, customerName, customerPhoneNumber));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOrdersById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();

        if (!orderRepository.existsById(id)) {
            responseData.setData("Not Found!!!");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        } else {
            responseData.setData(orderServiceImp.getOrder(id));
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }


    @GetMapping("/status/{id}")
    public ResponseEntity<?> getOrderStatus(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(orderRepository.findById(id).getOrderStatus().getName());
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(@RequestParam int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(orderServiceImp.cancelOrder(id));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/confirm-order")
    public ResponseEntity<?> confirmOrder(@RequestParam int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(orderServiceImp.confirmOrder(id));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/get-money-by-date")
    public ResponseEntity<?> getOrder(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        Double totalMoney = orderServiceImp.getTotalMoneyByDate(countId, startDate, endDate);
        ResponseData responseData = new ResponseData();

        responseData.setData(totalMoney);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-number-order-by-date")
    public ResponseEntity<?> getNumberOfOrderByDate(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        int numberOfOrder = orderServiceImp.getNumberOfOrderByDate(countId, startDate, endDate);
        ResponseData responseData = new ResponseData();

        responseData.setData(numberOfOrder);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {

        ResponseData responseData = new ResponseData();
        try {
            responseData.setData(orderServiceImp.createOrder(orderRequest));
            return new ResponseEntity<>(responseData, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/get-order-by-user")
    public ResponseEntity<?> createOrder(@RequestParam int userId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(orderServiceImp.getAllOrderForUser(userId));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-number-item-by-date")
    public ResponseEntity<?> getNumberOfItemByDate(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        int numberOfItem = orderServiceImp.getNumberOfItemByDate(countId, startDate, endDate);

        ResponseData responseData = new ResponseData();

        responseData.setData(numberOfItem);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-money-each-day")
    public ResponseEntity<?> getMoneyEachDay(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        HashMap<String, Double> result = orderServiceImp.getArrayMoneyByDate(countId, startDate, endDate);

        ResponseData responseData = new ResponseData();

        responseData.setData(result);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-profit-each-day")
    public ResponseEntity<?> getProfitEachDay(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        HashMap<String, Double> result = orderServiceImp.getArrayProfitByDate(countId, startDate, endDate);

        ResponseData responseData = new ResponseData();

        responseData.setData(result);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-total-order-each-day")
    public ResponseEntity<?> getTotalOrderEachDay(@RequestParam int countId, @RequestParam String startDate, @RequestParam String endDate) {

        HashMap<String, Integer> result = orderServiceImp.getNumberOfOrderEachDate(countId, startDate, endDate);

        ResponseData responseData = new ResponseData();

        responseData.setData(result);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/total-money-each-month")
    public ResponseEntity<?> getTotalMoneyEachMonth(@RequestParam int countId, @RequestParam int year) {
        ResponseData responseData = new ResponseData();

        responseData.setData(orderServiceImp.getTotalMoneyEachMonth(countId, year));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/total-profit-each-month")
    public ResponseEntity<?> getTotalProfitEachMonth(@RequestParam int countId, @RequestParam int year) {
        ResponseData responseData = new ResponseData();

        responseData.setData(orderServiceImp.getProfitEachMonth(countId, year));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

}
