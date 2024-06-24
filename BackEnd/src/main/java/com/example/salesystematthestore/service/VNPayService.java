package com.example.salesystematthestore.service;

import com.example.salesystematthestore.config.payment.vnpay.VNPayConfig;
import com.example.salesystematthestore.dto.PaymentDTO;
import com.example.salesystematthestore.service.imp.VNPayServiceImp;
import com.example.salesystematthestore.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class VNPayService implements VNPayServiceImp {


    private final VNPayConfig vnPayConfig;

    @Override
    public PaymentDTO createVnPayPayment(HttpServletRequest request, int orderId) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));

        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }

        String newReturnUrl = vnpParamsMap.get("vnp_ReturnUrl") + "?orderId=" + orderId;
        vnpParamsMap.put("vnp_ReturnUrl", newReturnUrl);

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

        PaymentDTO result = new PaymentDTO();
        result.setCode("ok");
        result.setMessage("success");
        result.setPaymentUrl(paymentUrl);

        return result;
    }
}
