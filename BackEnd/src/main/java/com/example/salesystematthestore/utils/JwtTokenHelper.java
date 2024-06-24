package com.example.salesystematthestore.utils;

import com.example.salesystematthestore.entity.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenHelper {
    @Value("${jwt.secretkey}")
    private String key;

    public String generateToken(Users users) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        String token = Jwts.builder()
                .setIssuer("ATDStore")
                .setSubject("JWT Token")
                .claim("username", users.getUsername())
                .claim("role", users.getRole().getName())
                .claim("name", users.getFullName())
                .claim("address", users.getAddress())
                .claim("id", users.getId())
                .claim("couterAddress",users.getCounter().getAddress())
                .claim("phoneNumber", users.getPhoneNumber())
                .claim("counterId", users.getCounter().getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime()) + 300000000))
                .signWith(secretKey).compact();
        return token;
    }

    public boolean verifyToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
