package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService implements UserServiceImp {


    @Autowired
    UserRepository userRepository;

    @Override
    public UserDTO getUserInformation(int userId) {

        Users user = userRepository.findById(userId);

        UserDTO userDTO = new UserDTO();



        double revenue = 0;

        if(user!=null){

            for(Order order : user.getOrder()){
                revenue+=order.getTotalPrice();
            }

        }

        userDTO.setId(user.getId());
        userDTO.setFullName(user.getFullName());
        userDTO.setUsername(user.getUsername());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRevenue(revenue);

        return userDTO;
    }

    private String makeCode(){
        return UUID.randomUUID().toString();
    }
}
