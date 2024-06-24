package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.GoldType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoldTypeRepository extends JpaRepository<GoldType,Integer> {
    GoldType findById(int id);
}
