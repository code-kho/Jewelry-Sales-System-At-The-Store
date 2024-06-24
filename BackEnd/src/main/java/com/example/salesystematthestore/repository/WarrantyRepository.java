package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarrantyRepository extends JpaRepository<Warranty, Integer> {
}
