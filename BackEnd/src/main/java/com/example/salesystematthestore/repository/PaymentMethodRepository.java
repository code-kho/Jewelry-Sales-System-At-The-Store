package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends JpaRepository<Payments,Integer> {
}
