package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType,Integer> {

    ProductType findById(int id);

}
