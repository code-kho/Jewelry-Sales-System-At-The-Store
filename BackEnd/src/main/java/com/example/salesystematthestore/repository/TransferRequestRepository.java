package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.TransferRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRequestRepository extends JpaRepository<TransferRequests, Integer> {
}
