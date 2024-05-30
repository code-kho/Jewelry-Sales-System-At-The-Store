package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.payload.request.User;

import java.util.List;

public interface UserServiceImp {

    public UserDTO getUserInformation(int userId);

    public UserDTO getUserInformationByToken(String token);

    public List<UserDTO> getStaffList(int counterId);

    public List<UserDTO> topFiveKPI(int counterId);
    
}
