package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.Counter;
import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.entity.ProductCounter;
import com.example.salesystematthestore.repository.CounterRepository;
import com.example.salesystematthestore.repository.ProductCounterRepository;
import com.example.salesystematthestore.repository.ProductRepository;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService implements ProductServiceImp {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CounterRepository counterRepository;

    @Autowired
    ProductCounterRepository productCounterRepository;


    @Override
    public List<ProductDTO> getProductOutOfStock(int counterId) {

        Counter counter = counterRepository.findById(counterId);

        List<ProductCounter> productList= counter.getProductCounterList();

        List<ProductDTO> result = new ArrayList<>();

        for(ProductCounter productCounter: productList){

            if(productCounter.getQuantity()==0){
                Product product = productCounter.getProduct();

                ProductDTO productDto = new ProductDTO();

                productDto.setProductId(product.getProductId());
                productDto.setBarCode(product.getBarCode());
                productDto.setProductName(product.getProductName());
                productDto.setWeight(product.getWeight());
                productDto.setPrice(product.getPrice());
                productDto.setLaborCost(product.getLaborCost());
                productDto.setCostPrice(product.getCostPrice());
                productDto.setStonePrice(product.getStonePrice());
                productDto.setGem(product.isGem());
                productDto.setImage(product.getImage());
                productDto.setQuantityInStock(product.getQuantityInStock());
                productDto.setDescription(product.getDescription());

                result.add(productDto);
            }
        }

        return result;
    }

    @Override
    public List<ProductDTO> getProductByCategory(int categoryId) {


        return List.of();
    }


}
