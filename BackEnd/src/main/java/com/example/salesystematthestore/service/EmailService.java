package com.example.salesystematthestore.service;

import com.example.salesystematthestore.service.imp.EmailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService implements EmailServiceImp {

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendEmail(String from, String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom((from));
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
    }
}
