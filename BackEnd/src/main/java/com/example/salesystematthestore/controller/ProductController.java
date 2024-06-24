package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.ProductRequest;
import com.example.salesystematthestore.repository.ProductRepository;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@Tag(name = "Product", description = "Operations related to product management ")
public class ProductController {

    @Autowired
    ProductServiceImp productServiceImp;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/get-product-out-of-stock")
    public ResponseEntity<?> getProductOutOfStock(@RequestParam int countId) {


        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductOutOfStock(countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/show-product")
    public ResponseEntity<?> showProduct(@RequestParam int countId, @RequestParam int pageSize, @RequestParam int page, @RequestParam String sortKeyword, @RequestParam String sortType, @RequestParam String categoryName, @RequestParam String searchKeyword) {

        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.showProduct(countId, pageSize, page, sortKeyword, sortType, categoryName, searchKeyword));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-product-by-barcode")
    public ResponseEntity<?> getProductOutOfStock(@RequestParam int countId, String barcode) {

        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductByBarcode(barcode, countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-product-type")
    public ResponseEntity<?> showProductType() {
        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductType());

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-product-by-id")
    public ResponseEntity<?> showProductDetailsById(@RequestParam int countId, @RequestParam int productId) {
        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductById(productId, countId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/create-product")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest productRequest) {
        ResponseData responseData = new ResponseData();

        if (productServiceImp.createProduct(productRequest)) {
            responseData.setDesc("Create Success");
            responseData.setData(true);
        } else {
            responseData.setDesc("Create Fail");
            responseData.setData(false);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/update-product")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest productRequest) {
        ResponseData responseData = new ResponseData();

        if (productRepository.existsByProductId(productRequest.getProductId())) {
            responseData.setData(productServiceImp.updateProduct(productRequest));
            responseData.setDesc("Update Success");
        } else {
            responseData.setData(false);
            responseData.setDesc("Invalid Product Id");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/delete-product")
    public ResponseEntity<?> deleteProduct(@RequestParam int productId) {
        ResponseData responseData = new ResponseData();

        if (productRepository.existsByProductId(productId)) {
            responseData.setData(productServiceImp.deleteProduct(productId));
            responseData.setDesc("Update Success");
        } else {
            responseData.setDesc("Invalid Product Id");
            responseData.setData(false);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-product-in-warehouse")
    public ResponseEntity<?> getProductInWarehouse(@RequestParam int productId) {
        ResponseData responseData = new ResponseData();

        if (productRepository.existsByProductId(productId)) {
            responseData.setData(productServiceImp.getProductInWarehouseById(productId));

        } else {
            responseData.setDesc("Invalid Product Id");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/import-product-from-warehouse")
    public ResponseEntity<?> importProductInWarehouse(@RequestParam int quantity, @RequestParam int productId, @RequestParam int counterId) {
        ResponseData responseData = new ResponseData();

        Product product = productRepository.findByProductId(productId);
        if (quantity > product.getQuantityInStock()) {
            responseData.setDesc("Quantity in stock is not enough");
            responseData.setData(false);
        } else {
            responseData.setDesc("Import Success");
            responseData.setData(productServiceImp.importProductToCounter(quantity, productId, counterId));
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/show-all-product-from-warehouse")
    public ResponseEntity<?> showAllProductFromWarehouse(@RequestParam int pageSize, @RequestParam int page, @RequestParam String sortKeyword, @RequestParam String sortType, @RequestParam String categoryName, @RequestParam String searchKeyword) {
        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.showProductWarehouse(pageSize, page, sortKeyword, sortType, categoryName, searchKeyword));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-product-available-for-add-promotion")
    public ResponseEntity<?> getProductAvailableForAddPromotion(@RequestParam(required = false, defaultValue = "") String name) {
        ResponseData responseData = new ResponseData();

        responseData.setData(productServiceImp.getProductAvailableForAddPromotion(name));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }




}
