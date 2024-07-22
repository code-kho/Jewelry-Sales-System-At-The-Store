package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.entity.ProductType;
import com.example.salesystematthestore.repository.ProductTypeRepository;
import com.example.salesystematthestore.service.imp.ProductTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductTypeService implements ProductTypeServiceImp {

    @Autowired
    ProductTypeRepository  productTypeRepository;

    @Override
    public boolean createProductType(String name) {
        boolean result = true;
        try {
            ProductType productType = new ProductType();
            productType.setName(name);
            productType.setCreatedDate(new Date());
            productTypeRepository.save(productType);
        } catch (Exception e){
            result= false;
        }
        return result;
    }

    @Override
    public boolean updateProductType(int id, String name) {
        ProductType productType = productTypeRepository.findById(id);
        if(productType != null){
            productType.setName(name);
            productTypeRepository.save(productType);
            return true;
        }
        return false;
    }

    @Override
    public List<ProductTypeDTO> getAllProductTypes() {

        List<ProductType> productTypes = productTypeRepository.findAll();
        List<ProductTypeDTO> result = new ArrayList<>();

        for(ProductType productType : productTypes){
            result.add(getProductTypeById(productType.getId()));
        }

        return result;
    }

    @Override
    public ProductTypeDTO getProductTypeById(int id) {

        ProductType productType = productTypeRepository.findById(id);
        ProductTypeDTO productTypeDTO = new ProductTypeDTO();

        productTypeDTO.setName(productType.getName());
        productTypeDTO.setId(productType.getId());
        productTypeDTO.setCreatedDate(productType.getCreatedDate());

        return productTypeDTO;
    }
}
