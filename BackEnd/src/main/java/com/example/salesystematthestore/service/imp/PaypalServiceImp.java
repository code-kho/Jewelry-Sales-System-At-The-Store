package com.example.salesystematthestore.service.imp;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface PaypalServiceImp {

    Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl
    ) throws PayPalRESTException;

    Payment executePayment(
            String paymentId,
            String payerId
    ) throws PayPalRESTException;
}
