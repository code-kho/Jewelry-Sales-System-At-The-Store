package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.OrderStatus;
import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.repository.OrderRepository;
import com.example.salesystematthestore.repository.OrderStatusRepository;
import com.example.salesystematthestore.repository.PaymentMethodRepository;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import com.example.salesystematthestore.service.imp.PaypalServiceImp;
import com.example.salesystematthestore.service.imp.VNPayServiceImp;
import com.example.salesystematthestore.entity.Payments;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Date;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@Hidden
public class PaymentController {


    @Autowired
    VNPayServiceImp paymentService;

    @Autowired
    PaypalServiceImp paypalServiceImp;


    @Autowired
    OrderStatusRepository orderStatusRepository;

    @Autowired
    OrderServiceImp orderServiceImp;

    @Autowired
    OrderRepository orderRepository;

    private final String successUrl = "http://localhost:3000/order-success";

    private final String failureUrl = "https://www.facebook.com/";

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @PostMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request, @RequestParam int orderId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(paymentService.createVnPayPayment(request, orderId));
        responseData.setStatus(200);
        responseData.setDesc("Success");

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/vn-pay-callback")
    public RedirectView payCallbackHandler(@RequestParam String vnp_TransactionStatus, @RequestParam String vnp_TransactionNo, @RequestParam int orderId) {
        ResponseData responseData = new ResponseData();

        if (vnp_TransactionStatus.equals("00")) {

            Order order = orderRepository.findById(orderId).get();
            order.setPayTime(new Date());
            order.setExternalMomoTransactionCode(vnp_TransactionNo);
            OrderStatus orderStatus = orderStatusRepository.findById(3).get();
            order.setOrderStatus(orderStatus);
            Payments payments = paymentMethodRepository.findById(2).get();
            order.setPayments(payments);
            orderRepository.save(order);

            return new RedirectView(successUrl);

        } else {
            responseData.setData(null);
            responseData.setDesc("Failed");
            responseData.setStatus(404);

            return new RedirectView(failureUrl);
        }
    }


    @PostMapping("/cash")
    public ResponseEntity<?> paymentByCash(@RequestParam int orderId) {

        Order order = orderRepository.findById(orderId).get();
        order.setPayTime(new Date());
        order.setExternalMomoTransactionCode("CASH" + orderId);
        OrderStatus orderStatus = orderStatusRepository.findById(3).get();
        order.setOrderStatus(orderStatus);
        Payments payments = paymentMethodRepository.findById(1).get();
        order.setPayments(payments);
        orderRepository.save(order);

        ResponseData responseData = new ResponseData();
        responseData.setData(true);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }



    @PostMapping("/paypal")
    public ResponseEntity<?> createPayment(@RequestParam int orderId, @RequestParam double total) {

        ResponseData responseData = new ResponseData();

        try {
            String baseUrl = "https://four-gems-api-c21adc436e90.herokuapp.com";
            String cancelUrl = baseUrl +"/payment/paypal/cancel";
            String successUrl = baseUrl +"/payment/paypal/success?orderId=" + orderId;
            Payment payments = paypalServiceImp.createPayment(total, "USD", "paypal", "sale", "description", cancelUrl, successUrl);

            for (Links links : payments.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    responseData.setData(links.getHref());
                    return new ResponseEntity<>(responseData, HttpStatus.OK);
                }
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }



    @GetMapping("/paypal/success")
    public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam int orderId) {
        try {
            Payment payment = paypalServiceImp.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {

                Order order = orderRepository.findById(orderId).get();
                order.setPayTime(new Date());
                order.setExternalMomoTransactionCode(paymentId);
                OrderStatus orderStatus = orderStatusRepository.findById(3).get();
                order.setOrderStatus(orderStatus);
                Payments payments = paymentMethodRepository.findById(3).get();
                order.setPayments(payments);
                orderRepository.save(order);

                return new RedirectView(successUrl);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return new RedirectView(failureUrl);
    }

    @GetMapping("/paypal/cancel")
    public String cancelPayment() {
        return "paymentcancel";
    }

}
