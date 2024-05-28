package com.example.salesystematthestore.security;

import com.example.salesystematthestore.utils.JwtTokenHelper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtCustom extends OncePerRequestFilter {

    @Value("${jwt.secretkey}")
    private String key;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getTokenFromHeader(request);
        if(token!=null){
            if(jwtTokenHelper.verifyToken(token)){
                SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));

                Claims claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getPayload();
                String username = String.valueOf(claims.get("username"));
                String role = String.valueOf(claims.get("role"));
                ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                grantedAuthorities.add(new SimpleGrantedAuthority(role.toUpperCase()));
                Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username,"", grantedAuthorities);
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }

    protected String getTokenFromHeader(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        String token = "";
        if(StringUtils.hasText(header)&&header.startsWith("Bearer ")){
            token = header.substring(7);
        }
        return token;

    }
}
