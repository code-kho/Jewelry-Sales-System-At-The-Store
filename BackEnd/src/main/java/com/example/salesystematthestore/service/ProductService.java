package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.Counter;
import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.entity.ProductCounter;
import com.example.salesystematthestore.entity.ProductType;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import com.example.salesystematthestore.repository.CounterRepository;
import com.example.salesystematthestore.repository.ProductCounterRepository;
import com.example.salesystematthestore.repository.ProductRepository;
import com.example.salesystematthestore.repository.ProductTypeRepository;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    @Autowired
    ProductTypeRepository productTypeRepository;


    @Override
    public List<ProductDTO> getProductOutOfStock(int counterId) {

        Counter counter = counterRepository.findById(counterId);

        List<ProductCounter> productList = counter.getProductCounterList();

        List<ProductDTO> result = new ArrayList<>();

        for (ProductCounter productCounter : productList) {

            if (productCounter.getQuantity() == 0) {
                Product product = productCounter.getProduct();

                ProductDTO productDto = transferProduct(product, counterId);

                result.add(productDto);
            }
        }

        return result;
    }

    @Override
    public List<ProductDTO> showProduct(int counterId, int numberOfRecord, int page, String col, String typeSort, String categoryName, String searchKeyword) {

        Sort sort;
        List<ProductDTO> productDTOS = new ArrayList<>();
        List<Product> productsList = new ArrayList<>();

        if (typeSort.equals("DESC")) {
            sort = Sort.by(Sort.Direction.DESC, col);
        } else {
            sort = Sort.by(Sort.Direction.ASC, col);
        }

        if (searchKeyword.isEmpty()) {
            Page<Product> productsPage = productRepository.findByProductCounterList_Counter_Id(counterId, PageRequest.of(page, numberOfRecord, sort));

            for (Product products : productsPage) {
                productsList.add(products);
            }
        } else {

            Page<Product> productsPage = productRepository.findByProductNameContainsAndProductCounterList_Counter_Id(searchKeyword, counterId, PageRequest.of(page, numberOfRecord, sort));

            for (Product products : productsPage) {
                productsList.add(products);
            }

        }

        for (Product product : productsList) {

            if (categoryName.trim().length()!=0) {
                System.out.println(categoryName);


                if (product.getProductType().getName().equals(categoryName)) {

                    ProductDTO productDTO = transferProduct(product, counterId);

                    productDTOS.add(productDTO);

                }
            } else {

                ProductDTO productDTO = transferProduct(product, counterId);

                productDTOS.add(productDTO);
            }

        }

        return productDTOS;
    }

    @Override
    public List<ProductTypeDTO> getProductType() {
        List<ProductType> productTypeList = productTypeRepository.findAll();

        List<ProductTypeDTO> productTypeDTOList = new ArrayList<>();

        for(ProductType productType : productTypeList){

            ProductTypeDTO productTypeDTO = new ProductTypeDTO();
            productTypeDTO.setId(productType.getId());
            productTypeDTO.setName(productType.getName());

            productTypeDTOList.add(productTypeDTO);

        }


        return productTypeDTOList;
    }


    public ProductDTO transferProduct(Product product, int countId) {

        ProductDTO productDTO = new ProductDTO();



        KeyProductCouter keyProductCouter = new KeyProductCouter();

        keyProductCouter.setProductId(product.getProductId());
        keyProductCouter.setCouterId(countId);

        ProductCounter productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

        int quantityInStock = productCounter.getQuantity();


        productDTO.setProductId(product.getProductId());
        productDTO.setBarCode(product.getBarCode());
        productDTO.setProductName(product.getProductName());
        productDTO.setWeight(product.getWeight());
        productDTO.setPrice(product.getPrice());
        productDTO.setLaborCost(product.getLaborCost());
        productDTO.setCostPrice(product.getCostPrice());
        productDTO.setStonePrice(product.getStonePrice());
        productDTO.setGem(product.isGem());
        productDTO.setImage(product.getImage());
        productDTO.setQuantityInStock(quantityInStock);
        productDTO.setDescription(product.getDescription());

        return productDTO;
    }


}
