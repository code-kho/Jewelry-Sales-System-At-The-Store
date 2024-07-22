package com.example.salesystematthestore.service.imp;

import jakarta.mail.MessagingException;
import org.thymeleaf.context.Context;

public interface EmailServiceImp {

    public void sendEmail(String from, String to, String subject, String text);

    public void sendThankYouOrder(String from, String to, String subject, Context context) throws MessagingException;
}
