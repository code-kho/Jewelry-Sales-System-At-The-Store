package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Integer> {

    Optional<Collection> findById(Integer id);
}
