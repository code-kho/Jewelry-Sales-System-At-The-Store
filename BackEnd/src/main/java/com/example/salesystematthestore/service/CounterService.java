package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.CounterDTO;
import com.example.salesystematthestore.entity.Counter;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.CounterRepository;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.CounterServiceImp;
import groovy.transform.AutoFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CounterService implements CounterServiceImp {

    @Autowired
    CounterRepository counterRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<CounterDTO> showAllCounter() {
        List<CounterDTO> counterDTOList = new ArrayList<>();

        List<Counter> counterList = counterRepository.findAll();

        for (Counter counter : counterList) {
            CounterDTO counterDTO = new CounterDTO();
            counterDTO.setCounterId(counter.getId());
            counterDTO.setAddress(counter.getAddress());
            List<Users> userList = counter.getUsersList();

            for (Users user : userList) {
                if (user.getRole().getId() == 2) {
                    counterDTO.setManagerName(user.getFullName());
                    break;
                }
            }

            counterDTOList.add(counterDTO);
        }

        return counterDTOList;
    }


    @Override
    public CounterDTO getCounterById(int counterId) {

        Counter counter = counterRepository.findById(counterId);

        CounterDTO counterDTO = new CounterDTO();
        counterDTO.setCounterId(counter.getId());
        counterDTO.setAddress(counter.getAddress());
        List<Users> userList = counter.getUsersList();

        for (Users user : userList) {
            if (user.getRole().getId() == 2) {
                counterDTO.setManagerName(user.getFullName());
                break;
            }
        }


        return counterDTO;
    }

    @Override
    public List<CounterDTO> GetByNotId(int counterId) {

        List<CounterDTO> counterDTOList = new ArrayList<>();

        List<Counter> counterList = counterRepository.findByIdNot(counterId);

        for (Counter counter : counterList) {
            CounterDTO counterDTO = new CounterDTO();
            counterDTO.setCounterId(counter.getId());
            counterDTO.setAddress(counter.getAddress());
            List<Users> userList = counter.getUsersList();

            for (Users user : userList) {
                if (user.getRole().getId() == 2) {
                    counterDTO.setManagerName(user.getFullName());
                    break;
                }
            }

            counterDTOList.add(counterDTO);
        }

        return counterDTOList;
    }


}
