package com.example.salesystematthestore.security;

import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserDetailCustom implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepository.findByUsername(username);
        if(users==null){
            throw new UsernameNotFoundException("User can's exits");
        } else{
            return new User(username,users.getPassword(), new ArrayList<>());
        }
    }
}
