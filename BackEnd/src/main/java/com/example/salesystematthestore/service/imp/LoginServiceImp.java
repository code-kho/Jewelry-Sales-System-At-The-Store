package com.example.salesystematthestore.service.imp;

import java.io.IOException;

public interface LoginServiceImp {

    boolean checkLogin(String username,String password);

    boolean generateCode(String username) throws IOException;

    boolean verifyCode(String username, String otp);

}
