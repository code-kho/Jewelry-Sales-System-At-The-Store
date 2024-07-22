package com.example.salesystematthestore.service;

import com.example.salesystematthestore.service.imp.EmailServiceImp;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@Service
public class EmailService implements EmailServiceImp {

    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public void sendEmail(String from, String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom((from));
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
    }


    public void sendThankYouOrder(String from, String to, String subject, Context context) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();

        String process = templateEngine.process("new-email.html", context);
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setTo(to);
        helper.setFrom(from);
        helper.setSubject(subject);
        helper.setText(process, true);


        emailSender.send(message);
    }


}
