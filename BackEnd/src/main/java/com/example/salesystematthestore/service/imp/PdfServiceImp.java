package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.entity.Order;

import java.io.IOException;

public interface PdfServiceImp {

    String createPdfAndUpload(Order order) throws IOException;
}
