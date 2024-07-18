package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.payload.request.ProductRequest;
import com.example.salesystematthestore.payload.request.TransferRequest;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ProductServiceImp {

    List<ProductDTO> getProductOutOfStock(int counterId);

    List<ProductDTO> showProduct(int counterId, int numberOfRecord, int page, String col, String typeSort, String categoryName, String searchKeyword);

    List<ProductDTO> showAllProductWithQuantityCounter();
    List<ProductTypeDTO> getProductType();

    ProductDTO getProductById(int productId, int countId);

    Boolean createProduct(ProductRequest productRequest);

    Boolean updateProduct(ProductRequest productRequest);

    Boolean deleteProduct(int productId);

    ProductDTO getProductInWarehouseById(int productId);

    List<ProductDTO> showProductWarehouse(int numberOfRecord, int page, String col, String typeSort, String categoryName, String searchKeyword);

    boolean importListProductFromWarehouse(@RequestBody TransferRequest transferRequest);

    boolean importProductToCounter(int quantity, int productId, int counterId);

    List<ProductDTO> getProductAvailableForAddPromotion(String name);

    ProductDTO getProductByBarcode(String barcode, int counterId);

    ProductDTO getTopSellProduct(String categoryName, int countId);

    List<ProductDTO> getProductAvailableBuyBack(int orderId);

    List<ProductDTO> getProductQuantityLessThan(int counterId, int quantity);

    List<ProductDTO> getProductCheckRequest(int counterId, List<Integer> listId);

    List<ProductDTO> showProductNotInCounter(int counterId);
}
