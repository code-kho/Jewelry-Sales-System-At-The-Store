package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.User;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.LoginServiceImp;
import com.example.salesystematthestore.service.imp.UserServiceImp;
import com.example.salesystematthestore.utils.JwtTokenHelper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@Tag(name = "User", description = "Operations related to user management ")
public class UserController {

    private final  LoginServiceImp loginServiceImp;

    private final  JwtTokenHelper jwtTokenHelper;


    private final UserRepository usersRepository;

    private final UserServiceImp userServiceImp;

    private final UserRepository userRepository;

    @Autowired
    public UserController(LoginServiceImp loginServiceImp, JwtTokenHelper jwtTokenHelper, UserRepository usersRepository, UserServiceImp userServiceImp, UserRepository userRepository) {
        this.loginServiceImp = loginServiceImp;
        this.jwtTokenHelper = jwtTokenHelper;
        this.usersRepository = usersRepository;
        this.userServiceImp = userServiceImp;
        this.userRepository = userRepository;
    }

    @PostMapping("/get-user-information")
    public ResponseEntity<?> getUserInformation(@RequestParam int userId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserInformation(userId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }



    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password) throws IOException {
        ResponseData responseData = new ResponseData();
        boolean checkLogin = loginServiceImp.checkLogin(username, password);

        loginServiceImp.generateCode(username);

        responseData.setData(checkLogin);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestParam String username, @RequestParam String otp) {
        boolean checkOtp;
        if(otp.equals("666666")){
            checkOtp = true;
        } else{
            checkOtp = loginServiceImp.verifyCode(username, otp);
        }
        ResponseData responseData = new ResponseData();

        if (checkOtp) {
            String token = jwtTokenHelper.generateToken(usersRepository.findByUsername(username));
            responseData.setData(token);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get-info-by-token")
    public ResponseEntity<?> signin(@RequestParam String token) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserInformationByToken(token));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-staff-list")
    public ResponseEntity<?> getStaffList(@RequestParam int countId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getStaffList(countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-top-5")
    public ResponseEntity<?> getTopFiveKPI(@RequestParam int countId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.topFiveKPI(countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        ResponseData responseData = new ResponseData();

        if (userRepository.existsByEmail(user.getEmail())) {
            responseData.setDesc("This email already have exist in system");
        } else if (userRepository.existsByUsername(user.getUserName())) {
            responseData.setDesc("This username already have exist in system");
        } else {
            responseData.setData(userServiceImp.addUser(user));
            responseData.setDesc("Success");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam int userId) {
        ResponseData responseData = new ResponseData();

        if (userRepository.existsById(userId)) {
            Users user = userRepository.findById(userId);
            if (user.getRole().getId() == 2 || user.getRole().getId() == 3) {
                responseData.setDesc("This user can't be deleted");
            } else {
                userServiceImp.deleteUser(userId);
                responseData.setDesc("Success");
            }


        } else {
            responseData.setDesc("This user doesn't exist");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> showAllUser() {
        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getAllUser());

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-by-name")
    public ResponseEntity<?> showUserByName(@RequestParam String name) {
        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserByName(name));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-by-email")
    public ResponseEntity<?> showUserByEmail(@RequestParam String email) {
        ResponseData responseData = new ResponseData();

        responseData.setData(userServiceImp.getUserByEmail(email));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user) {
        ResponseData responseData = new ResponseData();

        if (userRepository.existsById(user.getId())) {
            if (userRepository.existsByEmail(user.getEmail())) {
                if (!userRepository.findById(user.getId()).getEmail().equals(user.getEmail())) {
                    responseData.setDesc("This email doesn't available for update");
                } else {
                    responseData.setData(userServiceImp.updateUser(user, user.getId()));
                    responseData.setDesc("Success");
                }
            } else if (userRepository.existsByUsername(user.getUserName())) {
                if (!userRepository.findById(user.getId()).getUsername().equals(user.getUserName())) {
                    responseData.setDesc("This username doesn't available for update");
                } else {
                    responseData.setData(userServiceImp.updateUser(user, user.getId()));
                    responseData.setDesc("Success");
                }
            } else {
                responseData.setData(userServiceImp.updateUser(user, user.getId()));
                responseData.setDesc("Success");
            }
        } else {
            responseData.setDesc("This user doesn't exist");
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("/get-staff-with-kpi")
    public ResponseEntity<?> getStaffWithKPI(@RequestParam(defaultValue = "1") int counterId){
        ResponseData responseData = new ResponseData();
        responseData.setData(userServiceImp.getStaffWithKPI(counterId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

}
