package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CounterRepository extends JpaRepository<Counter, Integer> {

    Counter findById(int id);

    List<Counter> findByIdNot(int id);

}
