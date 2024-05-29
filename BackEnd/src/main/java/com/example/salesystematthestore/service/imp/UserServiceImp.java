package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.payload.request.User;

public interface UserServiceImp {

    public UserDTO getUserInformation(int userId);
}
