package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.UserServiceImp;
import com.example.salesystematthestore.utils.JwtTokenHelper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserServiceImp {


    @Value("${jwt.secretkey}")
    private String key;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDTO getUserInformation(int userId) {

        Users user = userRepository.findById(userId);

        UserDTO userDTO = new UserDTO();

        double revenue = 0;

        if (user != null) {

            for (Order order : user.getOrder()) {
                revenue += order.getTotalPrice();
            }

        }

        userDTO.setId(user.getId());
        userDTO.setFullName(user.getFullName());
        userDTO.setUsername(user.getUsername());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRevenue(revenue);

        return userDTO;
    }

    @Override
    public UserDTO getUserInformationByToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        Claims claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getPayload();
        int userId = Integer.parseInt(String.valueOf(claims.get("id")));
        String role = String.valueOf(claims.get("role"));

        UserDTO result = new UserDTO();

        result.setId(userId);
        result.setRoleName(role);

        return result;
    }

    @Override
    public List<UserDTO> getStaffList(int counterId) {

        List<Users> userList = userRepository.findByCounter_Id(counterId);

        List<UserDTO> result = new ArrayList<>();

        for (Users user : userList) {
            if (user.getRole().getName().equals("staff")) {
                UserDTO userDTO = new UserDTO();

                double revenue = 0;

                for (Order order : user.getOrder()) {
                    revenue += order.getTotalPrice();
                }

                userDTO.setId(user.getId());
                userDTO.setFullName(user.getFullName());
                userDTO.setUsername(user.getUsername());
                userDTO.setAddress(user.getAddress());
                userDTO.setPhoneNumber(user.getPhoneNumber());
                userDTO.setRevenue(revenue);
                userDTO.setRoleName(user.getRole().getName());

                result.add(userDTO);
            }
        }

        return result;
    }

    private String makeCode() {
        return UUID.randomUUID().toString();
    }
}
