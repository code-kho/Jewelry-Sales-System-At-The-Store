package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.VoucherDTO;
import com.example.salesystematthestore.entity.Voucher;

import java.util.List;
import java.util.UUID;

public interface VoucherServiceImp {
    List<Voucher> getAllVoucher();

    boolean createVoucher(double discountPercent);

    VoucherDTO getVoucherByCode(UUID code);
}
