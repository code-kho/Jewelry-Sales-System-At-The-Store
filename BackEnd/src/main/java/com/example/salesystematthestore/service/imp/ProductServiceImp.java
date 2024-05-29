package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.dto.ProductDTO;

import java.util.List;

public interface ProductServiceImp {

    List<ProductDTO> getProductOutOfStock(int counterId);

    List<ProductDTO> showProduct(int counterId, int numberOfRecord, int page, String col, String typeSort, String categoryName, String searchKeyword);

    List<ProductTypeDTO> getProductType();
}
