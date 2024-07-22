package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.BuyBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyBackRepository extends JpaRepository<BuyBack,Integer> {
    List<BuyBack> findByOrder_Customer_PhoneNumberContains(String phoneNumber);


}
