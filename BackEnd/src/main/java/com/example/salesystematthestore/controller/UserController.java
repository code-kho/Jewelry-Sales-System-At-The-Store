package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.LoginServiceImp;
import com.example.salesystematthestore.service.imp.UserServiceImp;
import com.example.salesystematthestore.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    LoginServiceImp loginServiceImp;

    @Autowired
    JwtTokenHelper jwtTokenHelper;


    @Autowired
    UserRepository usersRepository;

    @Autowired
    UserServiceImp userServiceImp;

    @PostMapping("/get-user-information")
    public ResponseEntity getUserInformation(@RequestParam int userId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserInformation(userId));

        return new ResponseEntity(responseData, HttpStatus.OK);
    }


    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password) {
        ResponseData responseData = new ResponseData();
        boolean checkLogin = loginServiceImp.checkLogin(username, password);
        String token;

        if (checkLogin) {
            token = jwtTokenHelper.generateToken(usersRepository.findByUsername(username));
            responseData.setData(token);
        } else {
            responseData.setData("");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/get-info-by-token")
    public ResponseEntity<?> signin(@RequestParam String token) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserInformationByToken(token));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-staff-list")
    public ResponseEntity<?> signin(@RequestParam int countId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getStaffList(countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }



}
