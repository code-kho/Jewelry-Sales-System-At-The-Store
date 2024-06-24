package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.Verify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyRepository extends JpaRepository<Verify,Integer> {
}
