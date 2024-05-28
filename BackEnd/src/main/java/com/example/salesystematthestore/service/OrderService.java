package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements OrderServiceImp {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Double getTotalMoneyByDate(int counterId, String startDate, String endDate) {

        double totalMoney = 0;

        List<Order> orderList = orderRepository.findByCounterId(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for(String date:dates){
            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    totalMoney += order.getTotalPrice();
                }
            }
        }

        return totalMoney;
    }


    public List<String> getDatesInRange(String startDate, String endDate) {
        List<String> dates = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        LocalDate currentDate = start;
        while (!currentDate.isAfter(end)) {
            dates.add(currentDate.toString());
            currentDate = currentDate.plusDays(1);
        }



        return dates;
    }


    public Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate) {

        int totalOfNumber = 0;

        List<Order> orders = new ArrayList<>();

        List<Order> orderList = orderRepository.findByCounterId(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for(String date:dates){
            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    totalOfNumber++;
                }
            }
        }

        return totalOfNumber;
    }

    @Override
    public Integer getNumberOfItemByDate(int counterId, String startDate, String endDate) {
        int totalOfItem = 0;

        List<Order> orders = new ArrayList<>();

        List<Order> orderList = orderRepository.findByCounterId(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for(String date:dates){
            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    totalOfItem+= order.getOrderItemList().size();
                }
            }
        }

        return totalOfItem;
    }

}
