package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.payload.request.User;

public interface UserServiceImp {

    String UpdateUserInfomation(int id, String name, String address, String phoneNumber);

    String UpdateUserSecurity(String oldPassword,String newPassword, String oldUsername, String newUsername);

    boolean createUsers(User user);

}
