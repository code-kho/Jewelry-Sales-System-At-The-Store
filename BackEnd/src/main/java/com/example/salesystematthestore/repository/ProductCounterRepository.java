package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.ProductCounter;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCounterRepository extends JpaRepository<ProductCounter, KeyProductCouter> {
    ProductCounter findByKeyProductCouter(KeyProductCouter keyProductCouter);

    boolean existsByKeyProductCouter(KeyProductCouter keyProductCouter);

    List<ProductCounter> findByCounter_IdAndQuantityLessThanEqual(int id, int quantity);

    List<ProductCounter> findByKeyProductCouter_CouterId(int couterId);


}
