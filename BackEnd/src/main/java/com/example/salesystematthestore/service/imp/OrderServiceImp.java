package com.example.salesystematthestore.service.imp;

import java.util.Date;

public interface OrderServiceImp {

    Double getTotalMoneyByDate(int counterId, String startDate, String endDate);
}
