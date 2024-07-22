package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoucherRepository extends JpaRepository<Voucher, Integer>{
    Voucher findByCode(UUID code);

}
