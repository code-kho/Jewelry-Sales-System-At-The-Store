package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.VoucherDTO;
import com.example.salesystematthestore.entity.Voucher;
import com.example.salesystematthestore.repository.VoucherRepository;
import com.example.salesystematthestore.service.imp.VoucherServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VoucherService implements VoucherServiceImp {

    @Autowired
    VoucherRepository voucherRepository;

    @Override
    public List<Voucher> getAllVoucher() {
        return voucherRepository.findAll();
    }

    @Override
    public boolean createVoucher(double discountPercent) {
        try {
            Voucher voucher = new Voucher();
            voucher.setDiscountPercent(discountPercent);
            voucherRepository.save(voucher);
        }
        catch (Exception e){
            return false;
        }

        return true;
    }

    @Override
    public VoucherDTO getVoucherByCode(UUID code) {
        VoucherDTO voucherDTO = new VoucherDTO();
        if(voucherRepository.findByCode(code) == null){
            voucherDTO.setDiscountPercent(0);
        } else{
            voucherDTO = transferVoucher(voucherRepository.findByCode(code));
        }
        return voucherDTO;
    }

    private VoucherDTO transferVoucher(Voucher voucher){
        VoucherDTO voucherDTO = new VoucherDTO();
        voucherDTO.setCode(voucher.getCode());
        if(voucher.isUsed()) {
            voucherDTO.setDiscountPercent(0);
        } else{
            voucherDTO.setDiscountPercent(voucher.getDiscountPercent());
        }
        voucherDTO.setUsed(voucher.isUsed());
        return voucherDTO;
    }


}
