package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.ProductRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRequestRepository extends JpaRepository<ProductRequests, Integer>{
}
