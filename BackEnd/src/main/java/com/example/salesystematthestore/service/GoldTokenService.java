package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.GoldToken;
import com.example.salesystematthestore.entity.GoldType;
import com.example.salesystematthestore.repository.GoldTokenRepository;
import com.example.salesystematthestore.repository.GoldTypeRepository;
import com.example.salesystematthestore.service.imp.GoldTokenServiceImp;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

@Service
public class GoldTokenService implements GoldTokenServiceImp {

    @Autowired
    GoldTokenRepository goldTokenRepository;

    @Autowired
    GoldTypeRepository goldTypeRepository;

    @Override
    public String getToken() {
        List<GoldToken> goldTokenList = goldTokenRepository.findByIsActive(true);

        if (!goldTokenList.isEmpty()) {
            return goldTokenList.get(0).getToken();
        }

        return "You don't have any available token";
    }

    @Override
    public String refreshToken(String token) {

        GoldToken goldToken = goldTokenRepository.findByToken(token);
        goldToken.setActive(false);
        goldTokenRepository.save(goldToken);

        return getToken();
    }

    @Override
    public Map<String, Object> getGoldPrice() {

        String token = getToken();

        GoldToken goldToken = goldTokenRepository.findByIsActive(true).get(0);

        if (goldToken.getNumberLeft() <= 0) {
            token = refreshToken(token);
            goldToken = goldTokenRepository.findByIsActive(true).get(0);
        }

        Map<String, Object> result = new HashMap<>();

        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.goldapi.io/api/XAU/USD"))
                .header("Content-Type", "application/json")
                .headers("x-access-token", token)
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            JsonObject jsonObject = new Gson().fromJson(response.body(), JsonObject.class);

            for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
                result.put(entry.getKey(), entry.getValue().toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        goldToken.setNumberLeft(goldToken.getNumberLeft() - 1);

        goldTokenRepository.save(goldToken);

        return result;
    }


    public void updateGoldPrice() {

            Map<String, Object> goldPrice = getGoldPrice();
            List<GoldType> goldTypeList = goldTypeRepository.findAll();

            for(String key : goldPrice.keySet()){
                System.out.println(key + " : " + goldPrice.get(key));
            }

            for (GoldType type : goldTypeList) {
                System.out.println(Double.parseDouble((goldPrice.get("price_gram_" + type.getTypeName().toLowerCase().trim()).toString())));

                type.setPrice(Double.parseDouble((goldPrice.get("price_gram_" + type.getTypeName().toLowerCase().trim()).toString())));
                type.setUpdateDate(new Date());
            }

            goldTypeRepository.saveAll(goldTypeList);

    }

    @Override
    public boolean addToken(String token) {

        boolean result = true;

        try {
            GoldToken goldToken = new GoldToken();

            goldToken.setActive(true);
            goldToken.setToken(token);
            goldToken.setNumberLeft(97);
            goldTokenRepository.save(goldToken);
        } catch (Exception e) {
            result = false;
        }

        return result;
    }


}
