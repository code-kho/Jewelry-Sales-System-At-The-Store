package com.example.salesystematthestore.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class CustomFilterSecurity {

    private final JwtCustom jwtCustom;

    @Autowired
    public CustomFilterSecurity(JwtCustom jwtCustom) {
        this.jwtCustom = jwtCustom;
    }


    public static final String[] url = {
            "/swagger-ui/**",
            "/api/v1/auth/**",
            "v3/api-docs/**",
            "v2/api-docs/**",
            "/swagger-resource/**",
            "/webjars/**"
    };


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).csrf(csrf -> csrf.disable()).authorizeHttpRequests(request -> {
            request.requestMatchers("/user/signin/**", "/payment/vn-pay-callback/**", "/payment/paypal/success/**", "/user/verify-code/**").permitAll();
            request.requestMatchers(url).permitAll();
            request.requestMatchers("/warranty-card/view-warranty-customer/**").permitAll();
            request.requestMatchers("/warranty-card/**").hasAnyAuthority("ADMIN", "MANAGER", "STAFF", "QC");
            request.requestMatchers("/product/**").hasAnyAuthority("ADMIN", "MANAGER", "STAFF", "QC");
            request.requestMatchers("/user/get-info-by-token").hasAnyAuthority("ADMIN", "MANAGER", "STAFF");
            request.requestMatchers("/user/get-staff-list").hasAnyAuthority("ADMIN", "MANAGER");
            request.requestMatchers("/user/signup/**").hasAnyAuthority("ADMIN");
            request.requestMatchers("/user/update/**").hasAnyAuthority("ADMIN");
            request.requestMatchers("transfer-request/**").hasAnyAuthority("ADMIN", "MANAGER");
            request.requestMatchers("counter/**").hasAnyAuthority("ADMIN", "MANAGER");
            request.requestMatchers("product-type/**").hasAnyAuthority("ADMIN", "MANAGER");
            request.requestMatchers("voucher/**").hasAnyAuthority("ADMIN", "MANAGER", "STAFF");
            request.anyRequest().hasAnyAuthority("STAFF", "ADMIN", "MANAGER", "QC");
        });
        http.addFilterBefore(jwtCustom, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
