package com.example.salesystematthestore.repository;


import com.example.salesystematthestore.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    Users findByUsername(String username);

    Users findById(int userId);

    List<Users> findByCounter_Id(int id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsById(Integer id);

    void deleteById(Integer id);

    List<Users> findByFullNameContains(String fullName);

    Users findByCounter_IdAndRole_Id(int counterId, int roleId);

    Users findByRole_Id(int id);

    List<Users> findByEmailContains(String email);


}
