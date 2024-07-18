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
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/payment")
@Hidden
public class PaymentController {


    private final VNPayServiceImp paymentService;

    private final PaypalServiceImp paypalServiceImp;

    private final OrderStatusRepository orderStatusRepository;

    private final OrderServiceImp orderServiceImp;

    private final OrderRepository orderRepository;


    private final  PaymentMethodRepository paymentMethodRepository;

    public PaymentController(VNPayServiceImp paymentService,PaypalServiceImp paypalServiceImp,OrderStatusRepository orderStatusRepository,OrderServiceImp orderServiceImp,OrderRepository orderRepository,PaymentMethodRepository paymentMethodRepository){
        this.paymentService = paymentService;
        this.paypalServiceImp = paypalServiceImp;
        this.orderStatusRepository = orderStatusRepository;
        this.orderServiceImp = orderServiceImp;
        this.orderRepository = orderRepository;
        this.paymentMethodRepository = paymentMethodRepository;
    }

    private final String successUrl = "http://localhost:3000/order-success";

    private final String failureUrl = "https://www.facebook.com/";



    @PostMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request, @RequestParam int orderId) {

        ResponseData responseData = new ResponseData();

        responseData.setData(paymentService.createVnPayPayment(request, orderId));
        responseData.setStatus(200);
        responseData.setDesc("Success");

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/vn-pay-callback")
    public RedirectView payCallbackHandler(@RequestParam String vnp_TransactionStatus, @RequestParam String vnp_TransactionNo, @RequestParam int orderId) throws MessagingException, IOException {

        if (vnp_TransactionStatus.equals("00")) {

            Order order = orderRepository.findById(orderId);
            order.setPayTime(new Date());
            order.setExternalMomoTransactionCode(vnp_TransactionNo);
            OrderStatus orderStatus = orderStatusRepository.findById(3);
            order.setOrderStatus(orderStatus);
            Payments payments = paymentMethodRepository.findById(2);
            order.setPayments(payments);
            orderRepository.save(order);
            orderServiceImp.sendOrderEmail(order);

            return new RedirectView(successUrl);

        } else {
            return new RedirectView(failureUrl);
        }
    }


    @PostMapping("/cash")
    public ResponseEntity<?> paymentByCash(@RequestParam int orderId) throws MessagingException, IOException {

        Order order = orderRepository.findById(orderId);
        order.setPayTime(new Date());
        order.setExternalMomoTransactionCode("CASH" + orderId);
        OrderStatus orderStatus = orderStatusRepository.findById(3);
        order.setOrderStatus(orderStatus);
        Payments payments = paymentMethodRepository.findById(1);
        order.setPayments(payments);
        orderRepository.save(order);
        orderServiceImp.sendOrderEmail(order);
        ResponseData responseData = new ResponseData();
        responseData.setData(true);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }



    @PostMapping("/paypal")
    public ResponseEntity<?> createPayment(@RequestParam int orderId, @RequestParam double total) {

        ResponseData responseData = new ResponseData();

        try {
            String baseUrl = "https://four-gems-system-790aeec3afd8.herokuapp.com";
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
    public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam int orderId)throws  IOException {
        try {
            Payment payment = paypalServiceImp.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {

                Order order = orderRepository.findById(orderId);
                order.setPayTime(new Date());
                order.setExternalMomoTransactionCode(paymentId);
                OrderStatus orderStatus = orderStatusRepository.findById(3);
                order.setOrderStatus(orderStatus);
                Payments payments = paymentMethodRepository.findById(3);
                order.setPayments(payments);
                orderRepository.save(order);
                orderServiceImp.sendOrderEmail(order);

                return new RedirectView(successUrl);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return new RedirectView(failureUrl);
    }

    @GetMapping("/paypal/cancel")
    public String cancelPayment() {
        return "paymentcancel";
    }

}
