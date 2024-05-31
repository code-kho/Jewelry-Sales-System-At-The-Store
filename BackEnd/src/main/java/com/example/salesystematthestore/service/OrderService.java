package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService implements OrderServiceImp {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Double getTotalMoneyByDate(int counterId, String startDate, String endDate) {


        double totalMoney = 0;

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

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

    @Override
    public LinkedHashMap<String, Double> getArrayMoneyByDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Double> result = new LinkedHashMap<>();

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for(String date:dates){
            double totalMoney = 0;

            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    totalMoney += order.getTotalPrice();
                }
            }
            result.put(date,totalMoney);

        }

        return result;
    }

    @Override
    public LinkedHashMap<String, Double> getArrayProfitByDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Double> result = new LinkedHashMap<>();

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for(String date:dates){
            double totalMoney = 0;

            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    for(OrderItem orderItem : order.getOrderItemList()){
                        double price = (orderItem.getPrice()-(orderItem.getPrice()/orderItem.getProduct().getRatioPrice()))*orderItem.getQuantity();

                        totalMoney+=price;

                    }
                }
            }
            result.put(date,totalMoney);

        }

        return null;
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

        List<String> dates = getDatesInRange(startDate, endDate);

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

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

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

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

    public LinkedHashMap<String, Integer> getNumberOfOrderEachDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Integer> result = new LinkedHashMap<>();
        int totalOfNumber = 0;

        List<String> dates = getDatesInRange(startDate, endDate);

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        for(String date:dates){
            int numberOfOrder = 0;

            for(Order order: orderList){
                if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                    numberOfOrder++;
                }
            }
            result.put(date, numberOfOrder);
        }

        return result;
    }

    public String getMonthStartDate(int year, int month) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, 1);

        int firstDay = calendar.get(Calendar.DAY_OF_MONTH);
        int firstMonth = calendar.get(Calendar.MONTH) + 1;
        int firstYear = calendar.get(Calendar.YEAR);
        String startDate = String.format("%04d-%02d-%02d", firstYear, firstMonth, firstDay);

        return startDate;
    }

    public String getMonthEndDate(int year, int month) {
        Calendar calendar = Calendar.getInstance();

        calendar.set(year, month, 0);
        int lastDay = calendar.get(Calendar.DAY_OF_MONTH);
        int lastMonth = calendar.get(Calendar.MONTH) + 1;
        int lastYear = calendar.get(Calendar.YEAR);
        String endDate = String.format("%04d-%02d-%02d", lastYear, lastMonth, lastDay);

        return endDate;
    }

    public LinkedHashMap<Integer, Double> getTotalMoneyEachMonth(int counterId, int year) {

        LinkedHashMap<Integer, Double> result = new LinkedHashMap<>();


        for(int i = 1; i<13; i++){

            String startDate = getMonthStartDate(year,i);

            String endDate = getMonthEndDate(year,i);


            result.put(i, getTotalMoneyByDate(counterId,startDate,endDate));

        }

        return result;
    }

    public LinkedHashMap<Integer, Double> getProfitEachMonth(int counterId, int year) {

        LinkedHashMap<Integer, Double> result = new LinkedHashMap<>();


        for(int i = 1; i<13; i++){

            double totalMoney = 0;

            String startDate = getMonthStartDate(year,i);
            String endDate = getMonthEndDate(year,i);

            List<String> dates = getDatesInRange(startDate,endDate);
            List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

            for(String date:dates){

                for(Order order: orderList){
                    if(order.getOrderDate().toString().split(" ")[0].equals(date)){
                        for(OrderItem orderItem : order.getOrderItemList()){

                            double price = (orderItem.getPrice()/orderItem.getProduct().getRatioPrice())*orderItem.getQuantity();
                            totalMoney+=price;

                        }
                    }
                }
            }

            result.put(i, totalMoney);

        }

        return result;
    }


}
