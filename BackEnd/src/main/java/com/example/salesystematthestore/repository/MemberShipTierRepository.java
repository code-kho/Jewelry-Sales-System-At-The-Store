package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.MemberShipTier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberShipTierRepository extends JpaRepository<MemberShipTier,Integer> {

    Optional<MemberShipTier> findById(Integer id);

}
