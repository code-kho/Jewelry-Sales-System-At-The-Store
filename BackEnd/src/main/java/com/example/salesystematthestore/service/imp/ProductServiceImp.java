package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.ProductDTO;
import java.util.List;

public interface ProductServiceImp {

    List<ProductDTO> getProductOutOfStock(int counterId);

    List<ProductDTO> getProductByCategory(int categoryId);


}
