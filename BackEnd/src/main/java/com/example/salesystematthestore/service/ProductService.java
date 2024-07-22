package com.example.salesystematthestore.service;


import com.example.salesystematthestore.dto.ProductTypeDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.Collection;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.ProductRequest;
import com.example.salesystematthestore.payload.request.ProductTransferRequest;
import com.example.salesystematthestore.payload.request.TransferRequest;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.GoldTokenServiceImp;
import com.example.salesystematthestore.service.imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

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

    @Autowired
    GoldTypeRepository goldTypeRepository;

    @Autowired
    CollectionRepository collectionRepository;

    @Autowired
    GoldTokenServiceImp goldTokenServiceImp;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    WarrantyRepository warrantyRepository;


    private boolean checkValidPromotion(Product product) {
        if (product.getPromotion() == null) {
            return false;
        }
        Date endDate = product.getPromotion().getEndDate();
        return endDate.after(getVietNameDateNow());
    }

    private Date getVietNameDateNow() {
        Date initialDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(initialDate);
        calendar.add(Calendar.HOUR_OF_DAY, 7);
        return calendar.getTime();
    }

    @Override
    public ProductDTO getProductByBarcode(String barcode, int counterId) {
        Product product = productRepository.findByBarCode(barcode);

        return transferProduct(product, counterId);
    }

    private int countNumberProductSell(Product product, Counter counter) {
        int count = 0;

        List<OrderItem> orderItemList = orderItemRepository.findByProduct_ProductIdAndProduct_ProductCounterList_Counter(product.getProductId(), counter);

        for (OrderItem orderItem : orderItemList) {
            count += orderItem.getQuantity();
        }

        return count;
    }


    @Override
    public ProductDTO getTopSellProduct(String categoryName, int countId) {
        List<Product> productList = productRepository.findByProductType_NameAndProductCounterList_Counter_Id(categoryName, countId);
        Product result = new Product();
        int count = 0;
        Counter counter = counterRepository.findById(countId);

        for (Product product : productList) {
            int countNumberProductSell = countNumberProductSell(product, counter);

            if (countNumberProductSell > count) {
                count = countNumberProductSell;
                result = product;
            }
        }
        return transferProduct(result, countId);
    }

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
    public List<ProductDTO> getProductAvailableForAddPromotion(String name) {

        List<Product> productList = new ArrayList<>();
        productList = productRepository.findByProductNameContains(name);

        List<ProductDTO> result = new ArrayList<>();

        for (Product product : productList) {
            if (checkValidPromotion(product)) {
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductId(product.getProductId());
                productDTO.setProductName(product.getProductName());
                result.add(productDTO);
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

            if (!categoryName.trim().isEmpty()) {

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
    public List<ProductDTO> showAllProductWithQuantityCounter() {

        List<Product> productList = productRepository.findAll();
        List<Counter> counterList = counterRepository.findAll();
        List<ProductDTO> result = new ArrayList<>();

        for (Product product : productList) {
            ProductDTO productDTO = getProductInWarehouseById(product.getProductId());
            LinkedHashMap<Integer, Integer> quantityInCounter = new LinkedHashMap<>();
            productDTO.setQuantityInCounter(quantityInCounter);
            result.add(productDTO);
        }

        for (Counter counter : counterList) {
            for (ProductDTO product : result) {
                KeyProductCouter keyProductCouter = new KeyProductCouter();
                keyProductCouter.setProductId(product.getProductId());
                keyProductCouter.setCouterId(counter.getId());

                LinkedHashMap<Integer, Integer> quantityInCounter = product.getQuantityInCounter();

                if (productCounterRepository.existsByKeyProductCouter(keyProductCouter)) {
                    ProductCounter productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);
                    quantityInCounter.put(counter.getId(), productCounter.getQuantity());

                } else {
                    quantityInCounter.put(counter.getId(), 0);
                }

                product.setQuantityInCounter(quantityInCounter);
            }

        }
        return result;
    }

    @Override
    public List<ProductTypeDTO> getProductType() {
        List<ProductType> productTypeList = productTypeRepository.findAll();

        List<ProductTypeDTO> productTypeDTOList = new ArrayList<>();

        for (ProductType productType : productTypeList) {

            ProductTypeDTO productTypeDTO = new ProductTypeDTO();
            productTypeDTO.setId(productType.getId());
            productTypeDTO.setName(productType.getName());

            productTypeDTOList.add(productTypeDTO);

        }


        return productTypeDTOList;
    }

    @Override
    public ProductDTO getProductById(int productId, int countId) {

        Product product = productRepository.findByProductId(productId);

        return transferProduct(product, countId);
    }

    public ProductDTO getProductInWarehouseById(int productId) {
        Product product = productRepository.findByProductId(productId);

        ProductDTO productDTO = new ProductDTO();

        productDTO.setProductId(product.getProductId());
        productDTO.setBarCode(product.getBarCode());
        productDTO.setProductName(product.getProductName());
        productDTO.setWeight(product.getWeight());
        productDTO.setPrice(product.getPrice());
        productDTO.setLaborCost(product.getLaborCost());
        productDTO.setCostPrice(product.getCostPrice());
        productDTO.setStonePrice(product.getStonePrice());
        productDTO.setRatioPrice(productDTO.getRatioPrice());
        productDTO.setGem(product.isGem());
        productDTO.setImage(product.getImage());
        productDTO.setQuantityInStock(product.getQuantityInStock());
        productDTO.setDescription(product.getDescription());
        productDTO.setCategoryName(product.getProductType().getName());
        productDTO.setGoldId(product.getGoldType().getId());
        productDTO.setTypeId(product.getProductType().getId());
        productDTO.setActive(product.isActive());
        productDTO.setGoldTypeName(product.getGoldType().getTypeName());

        double cost = product.getGoldType().getPrice() * product.getWeight() + product.getStonePrice() + product.getLaborCost();

        double totalPrice = (cost * product.getRatioPrice() / 100) + cost;

        productDTO.setPrice(totalPrice);

        return productDTO;
    }

    @Override
    public Boolean createProduct(ProductRequest productRequest) {

        boolean result = true;
        try {
            Product product = new Product();
            productRepository.save(product);

            product.setBarCode("");
            product.setProductName(productRequest.getProductName());
            product.setRatioPrice(productRequest.getRatioPrice());
            product.setWeight(productRequest.getWeight());
            product.setPrice(0.0);
            product.setLaborCost(productRequest.getLaborCost());
            product.setCostPrice(0.0);
            product.setStonePrice(productRequest.getStonePrice());

            product.setGem(productRequest.getIsGem() == 1);

            product.setActive(productRequest.getIsActive() == 1);

            product.setJewel(productRequest.getIsJewel() == 1);

            product.setBarCode(product.getProductId() + getRandomNumber());
            product.setImage(productRequest.getImage());
            product.setQuantityInStock(productRequest.getQuantityInStock());
            product.setDescription(productRequest.getDescription());

            GoldType goldType = goldTypeRepository.findById(productRequest.getGoldId());
            product.setGoldType(goldType);

            ProductType productType = productTypeRepository.findById(productRequest.getTypeId());
            product.setProductType(productType);

            if (productRequest.getCollectionId() != 0) {
                Optional<Collection> collection = collectionRepository.findById(productRequest.getCollectionId());
                collection.ifPresent(product::setCollection);
            }

            Warranty warranty = new Warranty();
            warranty.setProduct(product);
            warrantyRepository.save(warranty);
            warranty.setTerms(productRequest.getWarrantyYear());

            warrantyRepository.save(warranty);

            product.setWarranty(warranty);
            productRepository.save(product);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = false;
        }

        return result;
    }

    public String getRandomNumber() {
        Random random = new Random();
        int number = 1000 + random.nextInt(9000);
        return "" + number;
    }

    @Override
    public Boolean updateProduct(ProductRequest productRequest) {

        Product product = productRepository.findByProductId(productRequest.getProductId());

        boolean result = true;
        try {
            product.setProductName(productRequest.getProductName());
            product.setRatioPrice(productRequest.getRatioPrice());
            product.setWeight(productRequest.getWeight());
            product.setLaborCost(productRequest.getLaborCost());
            product.setStonePrice(productRequest.getStonePrice());

            product.setGem(productRequest.getIsGem() == 1);

            product.setJewel(productRequest.getIsJewel() == 1);

            product.setActive(productRequest.getIsActive() == 1);


            product.setImage(productRequest.getImage());
            product.setQuantityInStock(productRequest.getQuantityInStock());
            product.setDescription(productRequest.getDescription());

            GoldType goldType = goldTypeRepository.findById(productRequest.getGoldId());
            product.setGoldType(goldType);

            ProductType productType = productTypeRepository.findById(productRequest.getTypeId());
            product.setProductType(productType);

            if (productRequest.getCollectionId() != 0) {
                Optional<Collection> collection = collectionRepository.findById(productRequest.getCollectionId());
                collection.ifPresent(product::setCollection);
            }

            productRepository.save(product);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = false;
        }

        return result;
    }

    @Override
    public Boolean deleteProduct(int productId) {

        boolean result = true;

        try {
            productRepository.deleteById(productId);
        } catch (Exception e) {
            result = false;
        }

        return result;
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
        productDTO.setLaborCost(product.getLaborCost());
        productDTO.setCostPrice(product.getCostPrice());
        productDTO.setStonePrice(product.getStonePrice());
        productDTO.setRatioPrice(product.getRatioPrice());
        productDTO.setGem(product.isGem());
        productDTO.setImage(product.getImage());
        productDTO.setQuantityInStock(quantityInStock);
        productDTO.setDescription(product.getDescription());
        productDTO.setCategoryName(product.getProductType().getName());
        productDTO.setGoldId(product.getGoldType().getId());
        productDTO.setTypeId(product.getProductType().getId());
        productDTO.setActive(product.isActive());
        productDTO.setGoldTypeName(product.getGoldType().getTypeName());
        productDTO.setAvailableRotate(quantityInStock > 0);
        productDTO.setWarrantyYear(product.getWarranty().getTerms());

        if (checkValidPromotion(product)) {
            productDTO.setPromotion(true);
            productDTO.setDiscountPercent(product.getPromotion().getDiscount());
        } else {
            productDTO.setPromotion(false);
            productDTO.setDiscountPercent(0);
        }


        double cost = product.getGoldType().getPrice() * product.getWeight() + product.getStonePrice() + product.getLaborCost();

        double totalPrice = (cost * product.getRatioPrice() / 100) + cost;

        productDTO.setPrice(totalPrice);

        if (product.getPromotion() != null && checkValidPromotion(product)) {
            productDTO.setDiscountPrice(totalPrice - totalPrice * product.getPromotion().getDiscount() / 100);
        }

        return productDTO;
    }

    @Override
    public List<ProductDTO> getProductAvailableBuyBack(int orderId) {
        List<ProductDTO> result = new ArrayList<>();
        List<OrderItem> orderItemList = orderItemRepository.findByKeys_OrderId(orderId);

        for (OrderItem orderItem : orderItemList) {

            Product product = orderItem.getProduct();
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductId(product.getProductId());
            productDTO.setProductName(product.getProductName());
            productDTO.setWeight(product.getWeight());
            productDTO.setLaborCost(product.getLaborCost());
            productDTO.setStonePrice(product.getStonePrice());
            productDTO.setRatioPrice(productDTO.getRatioPrice());
            productDTO.setGem(product.isGem());
            productDTO.setImage(product.getImage());
            productDTO.setDescription(product.getDescription());
            productDTO.setCategoryName(product.getProductType().getName());
            productDTO.setGoldId(product.getGoldType().getId());
            productDTO.setTypeId(product.getProductType().getId());
            productDTO.setPrice(orderItem.getPrice());
            productDTO.setAvailableBuyBack(orderItem.getAvalibleBuyBack() > 0);

            result.add(productDTO);
        }
        return result;
    }

    @Override
    public List<ProductDTO> getProductQuantityLessThan(int counterId, int quantity) {

        List<ProductCounter> productList = productCounterRepository.findByCounter_IdAndQuantityLessThanEqual(counterId, quantity);

        List<ProductDTO> result = new ArrayList<>();

        for (ProductCounter productCounter : productList) {
            System.out.println(productCounter.getProduct().getProductName());
            ProductDTO productDTO = transferProduct(productCounter.getProduct(), counterId);
            result.add(productDTO);
        }

        return result;
    }

    @Override
    public List<ProductDTO> getProductCheckRequest(int counterId, List<Integer> listId) {

        List<ProductDTO> result = new ArrayList<>();

        for (int id : listId) {
            try {
                Product product = productRepository.findByProductId(id);
                ProductDTO productDTO = transferProduct(product, counterId);
                result.add(productDTO);
            } catch (Exception ignored) {

            }
        }

        return result;
    }

    @Override
    public List<ProductDTO> showProductNotInCounter(int counterId) {
        List<ProductCounter> productCounterList = productCounterRepository.findByKeyProductCouter_CouterId(counterId);
        List<Integer> idProductCouterList = new ArrayList<>();

        for (ProductCounter productCounter : productCounterList) {
            idProductCouterList.add(productCounter.getProduct().getProductId());
        }

        List<Product> productList = productRepository.findByProductIdNotIn(idProductCouterList);
        List<ProductDTO> result = new ArrayList<>();

        for (Product product : productList) {
            ProductDTO productDTO = getProductInWarehouseById(product.getProductId());
            result.add(productDTO);
        }

        return result;
    }

    @Override
    public List<ProductDTO> showProductWarehouse(int numberOfRecord, int page, String col, String typeSort, String categoryName, String searchKeyword) {

        Sort sort;
        List<ProductDTO> productDTOS = new ArrayList<>();
        List<Product> productsList = new ArrayList<>();

        if (typeSort.equals("DESC")) {
            sort = Sort.by(Sort.Direction.DESC, col);
        } else {
            sort = Sort.by(Sort.Direction.ASC, col);
        }

        if (searchKeyword.isEmpty()) {
            Page<Product> productsPage = productRepository.findByProductNameContains(searchKeyword, PageRequest.of(page, numberOfRecord, sort));

            for (Product products : productsPage) {
                productsList.add(products);
            }
        } else {

            Page<Product> productsPage = productRepository.findByProductNameContains(searchKeyword, PageRequest.of(page, numberOfRecord, sort));

            for (Product products : productsPage) {
                productsList.add(products);
            }

        }

        for (Product product : productsList) {

            if (!categoryName.trim().isEmpty()) {

                if (product.getProductType().getName().equals(categoryName)) {

                    ProductDTO productDTO = new ProductDTO();
                    productDTO.setProductId(product.getProductId());
                    productDTO.setBarCode(product.getBarCode());
                    productDTO.setProductName(product.getProductName());
                    productDTO.setWeight(product.getWeight());
                    productDTO.setPrice(product.getPrice());
                    productDTO.setLaborCost(product.getLaborCost());
                    productDTO.setCostPrice(product.getCostPrice());
                    productDTO.setStonePrice(product.getStonePrice());
                    productDTO.setRatioPrice(productDTO.getRatioPrice());
                    productDTO.setGem(product.isGem());
                    productDTO.setImage(product.getImage());
                    productDTO.setQuantityInStock(product.getQuantityInStock());
                    productDTO.setDescription(product.getDescription());
                    productDTO.setCategoryName(product.getProductType().getName());
                    productDTO.setGoldId(product.getGoldType().getId());
                    productDTO.setTypeId(product.getProductType().getId());
                    productDTO.setActive(product.isActive());
                    productDTO.setGoldTypeName(product.getGoldType().getTypeName());
                    double cost = product.getGoldType().getPrice() * product.getWeight() + product.getStonePrice() + product.getLaborCost();

                    double totalPrice = (cost * product.getRatioPrice() / 100) + cost;

                    productDTO.setPrice(totalPrice);

                    productDTOS.add(productDTO);

                }
            } else {

                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductId(product.getProductId());
                productDTO.setBarCode(product.getBarCode());
                productDTO.setProductName(product.getProductName());
                productDTO.setWeight(product.getWeight());
                productDTO.setPrice(product.getPrice());
                productDTO.setLaborCost(product.getLaborCost());
                productDTO.setCostPrice(product.getCostPrice());
                productDTO.setStonePrice(product.getStonePrice());
                productDTO.setRatioPrice(productDTO.getRatioPrice());
                productDTO.setGem(product.isGem());
                productDTO.setImage(product.getImage());
                productDTO.setQuantityInStock(product.getQuantityInStock());
                productDTO.setDescription(product.getDescription());
                productDTO.setCategoryName(product.getProductType().getName());
                productDTO.setGoldId(product.getGoldType().getId());
                productDTO.setTypeId(product.getProductType().getId());
                productDTO.setActive(product.isActive());

                productDTO.setGoldTypeName(product.getGoldType().getTypeName());

                double cost = product.getGoldType().getPrice() * product.getWeight() + product.getStonePrice() + product.getLaborCost();

                double totalPrice = (cost * product.getRatioPrice() / 100) + cost;

                productDTO.setPrice(totalPrice);

                productDTOS.add(productDTO);
            }

        }

        return productDTOS;
    }

    public boolean importProductToCounter(int quantity, int productId, int counterId) {

        boolean result = true;

        try {
            KeyProductCouter keyProductCouter = new KeyProductCouter();

            keyProductCouter.setProductId(productId);
            keyProductCouter.setCouterId(counterId);

            ProductCounter productCounter;
            Product product = productRepository.findByProductId(productId);

            if (productCounterRepository.existsByKeyProductCouter(keyProductCouter)) {
                productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

                productCounter.setQuantity(productCounter.getQuantity() + quantity);

            } else {
                productCounter = new ProductCounter();
                productCounter.setKeyProductCouter(keyProductCouter);
                productCounter.setQuantity(quantity);
            }

            product.setQuantityInStock(product.getQuantityInStock() - quantity);

            productRepository.save(product);
            productCounterRepository.save(productCounter);

        } catch (Exception e) {
            result = false;
        }

        return result;
    }


    @Override
    @Transactional
    public boolean importListProductFromWarehouse(@RequestBody TransferRequest transferRequest) {

        for (ProductTransferRequest productTransferRequest : transferRequest.getProductTransferRequestList()) {

            int productId = productTransferRequest.getProductId();
            KeyProductCouter keyProductCouter = new KeyProductCouter();

            keyProductCouter.setProductId(productId);
            keyProductCouter.setCouterId(transferRequest.getToCounterId());

            ProductCounter productCounter;
            Product product = productRepository.findByProductId(productId);

            if (productTransferRequest.getQuantity() > product.getQuantityInStock() || product.getQuantityInStock() == 0) {
                throw new RuntimeException("Invalid quantity");
            }

            if (productCounterRepository.existsByKeyProductCouter(keyProductCouter)) {
                productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

                productCounter.setQuantity(productCounter.getQuantity() + productTransferRequest.getQuantity());

            } else {
                productCounter = new ProductCounter();
                productCounter.setKeyProductCouter(keyProductCouter);
                productCounter.setQuantity(productTransferRequest.getQuantity());
            }

            product.setQuantityInStock(product.getQuantityInStock() - productTransferRequest.getQuantity());

            productRepository.save(product);
            productCounterRepository.save(productCounter);


        }

        return true;
    }


}
