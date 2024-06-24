package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.entity.Verify;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.repository.VerifyRepository;
import com.example.salesystematthestore.service.imp.LoginServiceImp;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class LoginService implements LoginServiceImp {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    VerifyRepository verifyRepository;

    @Value("${sms.api.key}")
    private String keySms;

    @Value("${sms.api.url}")
    private String url;


    private String makeCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // Số ngẫu nhiên từ 100000 đến 999999
        return String.valueOf(code);
    }


    @Override
    public boolean checkLogin(String username, String password) {
        Users users = userRepository.findByUsername(username);
        boolean checklogin = false;

        if (users != null) {
            if (passwordEncoder.matches(password, users.getPassword())) {
                checklogin = true;
            }
        }
        return checklogin;
    }

    private void sendSms(String otp, String phoneNumber) throws IOException {
        String authorize = "App " + keySms;

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"messages\":[{\"destinations\":[{\"to\":\"84"+phoneNumber+"\"}],\"from\":\"ServiceSMS\",\"text\":\"Your OTP To FOUR_GEM is: " + otp + "\"}]}");
        Request request = new Request.Builder()
                .url(url)
                .method("POST", body)
                .addHeader("Authorization", authorize)
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json")
                .build();
        Response response = client.newCall(request).execute();
    }

    @Override
    public boolean generateCode(String username) {

        boolean result = true;

        try {
            String randomCode = makeCode();

            Users user = userRepository.findByUsername(username);
            Verify verify = user.getVerify();
            Verify verifyChoose = null;

            if (verify!=null) {
                verifyChoose = verify;
            } else {
                verifyChoose = new Verify();
                verifyChoose.setUser(user);
                verifyRepository.save(verifyChoose);
            }


            Date nowUTC = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(nowUTC);
            calendar.add(Calendar.MINUTE, 3);
            Date expired = calendar.getTime();

            verifyChoose.setCode(randomCode);
            verifyChoose.setExpiredDate(expired);
            verifyRepository.save(verifyChoose);
            String phoneNumber = user.getPhoneNumber();

            sendSms(randomCode, phoneNumber);
        } catch (IOException e) {
            result = false;
        }
        return result;
    }



    @Override
    public boolean verifyCode(String username, String otp) {
        Users user = userRepository.findByUsername(username);
        Verify verify = user.getVerify();
        boolean result = false;

        if (verify.getCode().equals(otp)) {
            Date now = new Date();
            if (now.before(verify.getExpiredDate())) {
                result = true;
            }
        }

        return result;
    }


}
