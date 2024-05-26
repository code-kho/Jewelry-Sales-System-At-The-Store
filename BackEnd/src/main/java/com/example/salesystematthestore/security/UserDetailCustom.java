package com.example.salesystematthestore.security;

import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;

@Component
public class UserDetailCustom implements UserDetailsService {
    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException("User can's exits");
        } else{
            return new User(username,user.getPassword(), new ArrayList<>());
        }
    }
}
