package com.example.salesystematthestore.repository;

import com.example.salesystematthestore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    Page<Product> findByProductNameContainsAndProductCounterList_Counter_Id(String productName, int id, Pageable pageable);

    Page<Product> findByProductNameContains(String productName, Pageable pageable);

    List<Product> findByProductNameContains(String productName);

    Page<Product> findByProductCounterList_Counter_Id(int id, Pageable pageable);

    Product findByProductId(int productId);

    boolean existsByProductId(int productId);

    List<Product> findByProductIdOrProductNameContains(int productId, String productName);

    Product findByBarCode(String barCode);

    List<Product> findByProductType_Name(String name);

    List<Product> findByProductType_NameAndProductCounterList_Counter_Id(String name, int counterId);

    @Query(value = "SELECT p.product_id, SUM(oi.quantity) AS total_quantity " +
            "FROM order_item oi " +
            "JOIN `order` o ON oi.order_id = o.order_id " +
            "JOIN product_counter pc ON oi.product_id = pc.product_id " +
            "JOIN product p ON oi.product_id = p.product_id " +
            "WHERE o.status_id = 3 AND pc.counter_id = :counterId " +
            "GROUP BY p.product_id, p.name " +
            "ORDER BY total_quantity DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<Object[]> findTopSellingProducts(@Param("counterId") int counterId, @Param("limit") int limit);

    List<Product> findByQuantityInStockLessThanEqual(int quantityInStock);


}
