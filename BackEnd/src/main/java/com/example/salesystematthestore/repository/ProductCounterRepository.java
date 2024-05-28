package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.ProductCounter;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCounterRepository extends JpaRepository<ProductCounter, KeyProductCouter> {


}
