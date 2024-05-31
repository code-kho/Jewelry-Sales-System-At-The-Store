package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.UserDTO;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.Users;
import com.example.salesystematthestore.payload.request.User;
import com.example.salesystematthestore.repository.CounterRepository;
import com.example.salesystematthestore.repository.RoleRepository;
import com.example.salesystematthestore.repository.UserRepository;
import com.example.salesystematthestore.service.imp.UserServiceImp;
import com.example.salesystematthestore.utils.JwtTokenHelper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class UserService implements UserServiceImp {


    @Value("${jwt.secretkey}")
    private String key;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encodePasword;

    @Autowired
    private CounterRepository counterRepository;

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

    @Override
    public List<UserDTO> topFiveKPI(int counterId) {

        List<Users> userList = userRepository.findByCounter_Id(counterId);

        List<UserDTO> userDTOList = new ArrayList<>();

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


                userDTOList.add(userDTO);
            }
        }

        Collections.sort(userDTOList, new Comparator<UserDTO>() {
            @Override
            public int compare(UserDTO o1, UserDTO o2) {
                return -Double.compare(o1.getRevenue(), o2.getRevenue());
            }
        });

        return new ArrayList<>(userDTOList.subList(0, 5));
    }

    private void transferAndSave(Users userInput,User user){

        Users userAdd;
        if(userInput == null){
            userAdd = new Users();
        } else{
            userAdd = userRepository.findById(userInput.getId());
        }


        userAdd.setFullName(user.getName());
        userAdd.setUsername(user.getUserName());
        userAdd.setEmail(user.getEmail());
        userAdd.setPassword(encodePasword.encode(user.getPassword()));
        userAdd.setAddress(user.getAddress());
        userAdd.setPhoneNumber(user.getPhoneNumber());
        userAdd.setLoginCode("");
        userAdd.setRole(roleRepository.findById(user.getRoleId()));
        userAdd.setCounter(counterRepository.findById(user.getCounterId()));

        userRepository.save(userAdd);
    }

    @Override
    public boolean addUser(User user) {
        boolean result = true;

        try {
            transferAndSave(null, user);
        } catch (Exception e){
            result = false;
        }

        return result;
    }

    @Override
    public boolean updateUser(User user, int userId) {
        boolean result = true;

        try{
            Users users = userRepository.findById(userId);

            transferAndSave(users, user);
        } catch (Exception e){
            result = false;
        }

        return result;
    }


}
