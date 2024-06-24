package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion,Integer> {


    @Override
    Optional<Promotion> findById(Integer integer);

    Page<Promotion> findByDiscountLessThanEqualAndDescriptionContainsAndStartDateAfterAndEndDateBefore(double discount, String description, Date startDate, Date endDate, Pageable pageable);


}
