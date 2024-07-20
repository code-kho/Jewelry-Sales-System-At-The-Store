package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.WarrantyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WarrantyCardRepository extends JpaRepository<WarrantyCard, UUID> {

}
