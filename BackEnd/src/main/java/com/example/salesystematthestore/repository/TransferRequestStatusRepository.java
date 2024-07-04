package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.TransferRequestStatus;
import com.example.salesystematthestore.payload.request.TransferRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRequestStatusRepository extends JpaRepository<TransferRequestStatus, Integer> {
}
