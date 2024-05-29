package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    Page<Product> findByProductNameContainsAndProductCounterList_Counter_Id(String productName, int id, Pageable pageable);


    Page<Product> findByProductCounterList_Counter_Id(int id, Pageable pageable);


}
