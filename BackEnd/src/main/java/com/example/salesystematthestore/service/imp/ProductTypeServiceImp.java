package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.entity.ProductType;

import java.util.List;

public interface ProductTypeServiceImp {

    boolean createProductType(String name);

    boolean updateProductType(int id, String name);


    List<ProductTypeDTO> getAllProductTypes();

    ProductTypeDTO getProductTypeById(int id);

}
