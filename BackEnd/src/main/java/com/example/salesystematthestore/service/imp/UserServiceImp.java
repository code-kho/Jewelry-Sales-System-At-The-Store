package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.payload.request.User;

import java.util.List;

public interface UserServiceImp {

     UserDTO getUserInformation(int userId);

     UserDTO getUserInformationByToken(String token);

     List<UserDTO> getStaffList(int counterId);

     List<UserDTO> topFiveKPI(int counterId);

     boolean addUser(User user);

     boolean updateUser(User user, int userId);

     boolean deleteUser(int userId);

     List<UserDTO> getUserByName(String name);

     List<UserDTO> getUserByEmail(String email);

     List<UserDTO> getAllUser();


    
}
