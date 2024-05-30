package com.example.salesystematthestore.service.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public interface OrderServiceImp {

    Double getTotalMoneyByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfItemByDate(int counterId, String startDate, String endDate);

    HashMap<String, Double> getArrayMoneyByDate(int counterId, String startDate, String endDate);

    HashMap<String, Double> getArrayProfitByDate(int counterId, String startDate, String endDate);

}
