package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.LoginServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements LoginServiceImp {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public boolean checkLogin(String username, String password) {
        Users users = userRepository.findByUsername(username);
        boolean checklogin = false;

        if(users!=null){
            if(passwordEncoder.matches(password,users.getPassword())){
                checklogin = true;
            }
        }
        return checklogin;
    }

}
