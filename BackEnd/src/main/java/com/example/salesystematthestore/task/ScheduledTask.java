package com.example.salesystematthestore.task;

import com.example.salesystematthestore.service.GoldTokenService;
import com.example.salesystematthestore.service.imp.GoldTokenServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTask {


    @Autowired
    GoldTokenServiceImp goldTokenServiceImp;

    @Scheduled(fixedRate = 1800000)
    public void performTask() {
        goldTokenServiceImp.updateGoldPrice();
    }

}
