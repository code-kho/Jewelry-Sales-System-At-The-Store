package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.GoldToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoldTokenRepository extends JpaRepository<GoldToken,Integer> {
    List<GoldToken> findByIsActive(boolean isActive);

    GoldToken findByToken(String token);

}
