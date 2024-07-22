package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.TransferRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRequestRepository extends JpaRepository<TransferRequests, Integer> {
    List<TransferRequests> findByToCounter_Id(int id);

    List<TransferRequests> findByFromCounter_Id(int id);


}
