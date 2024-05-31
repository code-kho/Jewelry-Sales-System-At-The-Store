package com.example.salesystematthestore.service.imp;

import java.util.LinkedHashMap;

public interface OrderServiceImp {

    Double getTotalMoneyByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfItemByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Double> getArrayMoneyByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Double> getArrayProfitByDate(int counterId, String startDate, String endDate);

    LinkedHashMap<String, Integer> getNumberOfOrderEachDate(int counterId, String startDate, String endDate);

    LinkedHashMap<Integer, Double> getTotalMoneyEachMonth(int counterId, int year);

    LinkedHashMap<Integer, Double> getProfitEachMonth(int counterId, int year);

}
