package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.CounterDTO;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CounterServiceImp {

    List<CounterDTO> showAllCounter();

    CounterDTO getCounterById(int counterId);

    List<CounterDTO>  GetByNotId(int counterId);
}
