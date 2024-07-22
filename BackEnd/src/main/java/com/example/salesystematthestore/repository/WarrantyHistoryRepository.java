package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.WarrantyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WarrantyHistoryRepository extends JpaRepository<WarrantyHistory,Integer> {
    List<WarrantyHistory> findByUser_IdAndWarrantyCard_Id(int id, UUID id1);


}
