package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.Product;
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


    @Override
    public List<ProductDTO> getProductOutOfStock(int counterId) {

        List<Product> productList= productRepository.findByQuantityInStockAndCounterList_Id(0, counterId);

        List<ProductDTO> result = new ArrayList<>();

        for(Product product: productList){

            ProductDTO productDto = new ProductDTO();
            System.out.println(product.getProductId());
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

        return result;
    }
}
