package com.example.salesystematthestore.service.imp;

import java.util.Date;

public interface OrderServiceImp {

    Double getTotalMoneyByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate);

    Integer getNumberOfItemByDate(int counterId, String startDate, String endDate);
}
