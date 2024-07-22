package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.OrderItemDTO;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import com.example.salesystematthestore.payload.request.OrderRequest;
import com.example.salesystematthestore.payload.request.ProductItemRequest;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService implements OrderServiceImp {

    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final ProductCounterRepository productCounterRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final CustomerServiceImp customerServiceImp;
    private final ProductRepository productRepository;
    private final EmailServiceImp emailServiceImp;
    private final PdfServiceImp pdfServiceImp;
    private final VoucherRepository voucherRepository;
    @Value("${spring.mail.username}")
    private String fromMail;
    private WarrantyCardServiceImp warrantyCardServiceImp;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        OrderStatusRepository orderStatusRepository,
                        ProductCounterRepository productCounterRepository,
                        UserRepository userRepository,
                        CustomerRepository customerRepository,
                        CustomerServiceImp customerServiceImp,
                        ProductRepository productRepository,
                        EmailServiceImp emailServiceImp,
                        PdfServiceImp pdfServiceImp,
                        VoucherRepository voucherRepository,
                        WarrantyCardServiceImp warrantyCardServiceImp
    ) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.productCounterRepository = productCounterRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.customerServiceImp = customerServiceImp;
        this.emailServiceImp = emailServiceImp;
        this.pdfServiceImp = pdfServiceImp;
        this.voucherRepository = voucherRepository;
        this.warrantyCardServiceImp = warrantyCardServiceImp;
    }

    @Override
    public Double getTotalMoneyByDate(int counterId, String startDate, String endDate) {


        double totalMoney = 0;

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for (String date : dates) {
            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    System.out.println(order.getTotalPrice());
                    totalMoney += order.getTotalPrice();
                }
            }
        }

        return totalMoney;
    }

    @Override
    public LinkedHashMap<String, Double> getArrayMoneyByDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Double> result = new LinkedHashMap<>();

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for (String date : dates) {
            double totalMoney = 0;

            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    totalMoney += order.getTotalPrice();
                }
            }
            result.put(date, totalMoney);

        }

        return result;
    }

    @Override
    public LinkedHashMap<String, Double> getArrayProfitByDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Double> result = new LinkedHashMap<>();

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for (String date : dates) {
            double totalMoney = 0;

            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    totalMoney += getProfitByOrder(order);
                }
            }
            result.put(date, totalMoney);

        }

        return result;
    }

    private double getProfitByOrder(Order order) {
        double result = 0;

        for (OrderItem orderItem : order.getOrderItemList()) {
            double price = orderItem.getPrice() / (orderItem.getProduct().getRatioPrice() * (1 - order.getCustomer().getMemberShipTier().getDiscountPercent() + order.getVoucherPercent() + orderItem.getDiscountPercent()));

            double profit = orderItem.getPrice() - price;

            result += profit;

        }

        return result;
    }

    private List<String> getDatesInRange(String startDate, String endDate) {
        List<String> dates = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        LocalDate currentDate = start;
        while (!currentDate.isAfter(end)) {
            dates.add(currentDate.toString());
            currentDate = currentDate.plusDays(1);
        }


        return dates;
    }


    public Integer getNumberOfOrderByDate(int counterId, String startDate, String endDate) {

        int totalOfNumber = 0;

        List<String> dates = getDatesInRange(startDate, endDate);

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        for (String date : dates) {
            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    totalOfNumber++;
                }
            }
        }

        return totalOfNumber;
    }

    @Override
    public Integer getNumberOfItemByDate(int counterId, String startDate, String endDate) {

        int totalOfItem = 0;

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for (String date : dates) {
            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    totalOfItem += order.getOrderItemList().size();
                }
            }
        }

        return totalOfItem;
    }

    public LinkedHashMap<String, Integer> getNumberOfOrderEachDate(int counterId, String startDate, String endDate) {

        LinkedHashMap<String, Integer> result = new LinkedHashMap<>();

        List<String> dates = getDatesInRange(startDate, endDate);

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        for (String date : dates) {
            int numberOfOrder = 0;

            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                    numberOfOrder++;
                }
            }
            result.put(date, numberOfOrder);
        }

        return result;
    }

    private String getMonthStartDate(int year, int month) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, 1);

        int firstDay = calendar.get(Calendar.DAY_OF_MONTH);
        int firstMonth = calendar.get(Calendar.MONTH) + 1;
        int firstYear = calendar.get(Calendar.YEAR);

        return String.format("%04d-%02d-%02d", firstYear, firstMonth, firstDay);
    }


    private String getMonthEndDate(int year, int month) {
        Calendar calendar = Calendar.getInstance();

        calendar.set(year, month, 0);
        int lastDay = calendar.get(Calendar.DAY_OF_MONTH);
        int lastMonth = calendar.get(Calendar.MONTH) + 1;
        int lastYear = calendar.get(Calendar.YEAR);

        return String.format("%04d-%02d-%02d", lastYear, lastMonth, lastDay);
    }

    public LinkedHashMap<Integer, Double> getTotalMoneyEachMonth(int counterId, int year) {

        LinkedHashMap<Integer, Double> result = new LinkedHashMap<>();


        for (int i = 1; i < 13; i++) {

            String startDate = getMonthStartDate(year, i);

            String endDate = getMonthEndDate(year, i);


            result.put(i, getTotalMoneyByDate(counterId, startDate, endDate));

        }

        return result;
    }

    public LinkedHashMap<Integer, Double> getProfitEachMonth(int counterId, int year) {

        LinkedHashMap<Integer, Double> result = new LinkedHashMap<>();


        for (int i = 1; i < 13; i++) {

            double totalMoney = 0;

            String startDate = getMonthStartDate(year, i);
            String endDate = getMonthEndDate(year, i);

            List<String> dates = getDatesInRange(startDate, endDate);
            List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

            for (String date : dates) {

                for (Order order : orderList) {
                    if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
                        for (OrderItem orderItem : order.getOrderItemList()) {

                            double price = (orderItem.getPrice() / orderItem.getProduct().getRatioPrice()) * orderItem.getQuantity();
                            totalMoney += price;

                        }
                    }
                }
            }

            result.put(i, totalMoney);

        }

        return result;
    }


    @Override
    public OrderDTO transferOrder(Order order) {

        OrderDTO result = new OrderDTO();

        result.setOrderId(order.getId());
        result.setOrderDate(order.getOrderDate());
        result.setStatus(order.getOrderStatus().getName());
        result.setCustomerName(order.getCustomer().getName());
        result.setCustomerPhone(order.getCustomer().getPhoneNumber());
        result.setUserId(order.getUser().getId());
        result.setStaffName(order.getUser().getFullName());
        result.setTotalAmount(order.getTotalPrice());
        result.setTax(order.getTax());

        if (order.getVoucherPercent() != 0) {
            result.setVoucherPercent(order.getVoucherPercent());
        } else {
            result.setVoucherPercent(0);
        }

        if (order.getVoucherPercent() != 0) {
            result.setDiscountPercentForMemberShip(order.getDiscountPercentMembership());
        } else {
            result.setVoucherPercent(0);
        }

        result.setPriceBeforeVoucher(order.getTotalPrice());

        if (order.getPayments() != null) {
            result.setPaymentMethod(order.getPayments().getPaymentMode());
        }
        List<OrderItemDTO> orderItemDTOList = getOrderItemDTOS(order);

        result.setOrderItemList(orderItemDTOList);

        return result;

    }

    private static List<OrderItemDTO> getOrderItemDTOS(Order order) {
        List<OrderItemDTO> orderItemDTOList = new ArrayList<>();

        for (OrderItem orderItem : order.getOrderItemList()) {
            double discountPercent = orderItem.getDiscountPercent();

            double price = orderItem.getPrice() / ((1 - (discountPercent / 100)));

            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setProductId(orderItem.getProduct().getProductId());
            orderItemDTO.setProductName(orderItem.getProduct().getProductName());
            orderItemDTO.setQuantity(orderItem.getQuantity());
            orderItemDTO.setPrice(price);
            orderItemDTO.setPromotion(orderItem.getProduct().getPromotion() != null);
            orderItemDTO.setDiscountPrice(orderItem.getPrice());
            orderItemDTO.setAvailableBuyBack(orderItem.getAvalibleBuyBack());
            orderItemDTO.setImg(orderItem.getProduct().getImage());
            orderItemDTOList.add(orderItemDTO);
        }
        return orderItemDTOList;
    }

    @Override
    public String getInvoiceForOrder(Order order) throws IOException {

        return pdfServiceImp.createPdfAndUpload(order);
    }

    @Override
    public List<OrderDTO> getAllOrderForUser(int userId) {
        List<Order> orderList = orderRepository.findByUser_Id(userId);
        List<OrderDTO> result = new ArrayList<>();

        for(Order order : orderList){
            OrderDTO orderDTO = transferOrder(order);
            result.add(orderDTO);
        }
        return result;
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void cancelOldOrders() {
        Date tenMinutesAgo = new Date(System.currentTimeMillis() - 10 * 60 * 1000);
        List<Order> orders = orderRepository.findByOrderStatus_IdAndOrderDateBefore(1, tenMinutesAgo);
        for (Order order : orders) {
            cancelOrder(order.getId());
        }
    }

    @Override
    public List<OrderDTO> getAllOrder(int counterId) {
        List<OrderDTO> result = new ArrayList<>();
        List<Order> orderList;
        if (counterId != 0) {
            orderList = orderRepository.findByUser_Counter_Id(counterId);
        } else {
            orderList = orderRepository.findAll();
        }
        for (Order order : orderList) {
            OrderDTO orderDTO = transferOrder(order);
            result.add(orderDTO);
        }

        return result;
    }

    @Override
    public OrderDTO getOrder(int orderId) {
        Order order = orderRepository.findById(orderId);

        return transferOrder(order);
    }

    private boolean checkValidQuantity(ProductCounter productCounter, int quantityCheck) {

        return productCounter.getQuantity() >= quantityCheck;
    }


    @Override
    @Transactional
    public OrderDTO createOrder(OrderRequest orderRequest) {

        Order order = new Order();
        orderRepository.save(order);

        List<ProductItemRequest> productItemRequestList = orderRequest.getProductItemRequestList();

        List<OrderItem> orderItemList = new ArrayList<>();

        for (ProductItemRequest productItemRequest : productItemRequestList) {

            KeyProductCouter keyProductCouter = new KeyProductCouter();
            keyProductCouter.setProductId(productItemRequest.getProductId());
            keyProductCouter.setCouterId(userRepository.findById(orderRequest.getUserId()).getCounter().getId());
            ProductCounter productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

            if (!checkValidQuantity(productCounter, productItemRequest.getQuantity())) {
                throw new RuntimeException("Not enough quantity for product: " + productCounter.getQuantity());
            }

            productCounter.setQuantity(productCounter.getQuantity() - productItemRequest.getQuantity());
            productCounterRepository.save(productCounter);

            OrderItem orderItem = new OrderItem();
            KeyOrderItem keyOrderItem = new KeyOrderItem();

            keyOrderItem.setOrderId(order.getId());
            keyOrderItem.setProductId(productItemRequest.getProductId());
            orderItem.setKeys(keyOrderItem);

            if (checkValidPromotion(productCounter.getProduct())) {
                orderItem.setDiscountPercent(productCounter.getProduct().getPromotion().getDiscount());
            } else {
                orderItem.setDiscountPercent(0.0);
            }


            orderItem.setQuantity(productItemRequest.getQuantity());
            orderItem.setPrice(productItemRequest.getPrice());
            orderItem.setAvalibleBuyBack(productItemRequest.getQuantity());

            orderItemList.add(orderItem);
        }
        order.setOrderItemList(orderItemList);

        Customer customer = customerRepository.findById(orderRequest.getCustomerId());

        if (customer != null) {
            int point = (int) orderRequest.getAmount();
            customer.setLoyaltyPoints(customer.getLoyaltyPoints() + point);
            customerServiceImp.updateMembershipTier(customer.getLoyaltyPoints(), customer.getId());
            order.setCustomer(customer);
            customerRepository.save(customer);
        }

        assert customer != null;
        if (customer.getMemberShipTier().getId() == 6) {
            order.setOrderStatus(orderStatusRepository.findById(1));
        } else {
            order.setOrderStatus(orderStatusRepository.findById(2));
            for (ProductItemRequest productItemRequest : productItemRequestList) {
                Product product = productRepository.findByProductId(productItemRequest.getProductId());
                if (checkValidPromotion(product)) {
                    order.setOrderStatus(orderStatusRepository.findById(1));
                    break;
                }
            }
        }

        order.setDiscountPercentMembership(customer.getMemberShipTier().getDiscountPercent());


        Users user = userRepository.findById(orderRequest.getUserId());
        order.setUser(user);
        order.setTotalPrice(orderRequest.getAmount());
        order.setTax(8);
        order.setOrderDate(new Date());

        if (voucherRepository.findByCode(orderRequest.getCode()) != null) {
            Voucher voucher = voucherRepository.findByCode(orderRequest.getCode());
            voucher.setUsed(true);
            order.setVoucherPercent(voucher.getDiscountPercent());
        }
        orderRepository.save(order);

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setStatus(order.getOrderStatus().getName());
        orderDTO.setOrderId(order.getId());
        return orderDTO;

    }


    @Override
    public boolean cancelOrder(int orderId) {

        Order order = orderRepository.findById(orderId);


        List<OrderItem> orderItemList = order.getOrderItemList();

        for (OrderItem orderItem : orderItemList) {
            KeyProductCouter keyProductCouter = new KeyProductCouter();
            keyProductCouter.setCouterId(order.getUser().getCounter().getId());
            keyProductCouter.setProductId(orderItem.getProduct().getProductId());

            ProductCounter productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

            productCounter.setQuantity(productCounter.getQuantity() + orderItem.getQuantity());

            productCounterRepository.save(productCounter);
        }

        order.setOrderStatus(orderStatusRepository.findById(4));

        orderRepository.save(order);
        return true;
    }

    @Override
    public boolean confirmOrder(int orderId) {
        Order order = orderRepository.findById(orderId);

        order.setOrderStatus(orderStatusRepository.findById(2));
        orderRepository.save(order);

        return true;
    }

    private boolean checkValidPromotion(Product product) {
        if (product.getPromotion() == null) {
            return false;
        }
        Date endDate = product.getPromotion().getEndDate();
        return endDate.after(new Date());
    }


    @Override
    public List<OrderDTO> searchOrderBuyBack(int orderId, String productName, String customerEmail, String customerName, String customerPhoneNumber) {

        List<OrderDTO> result = new ArrayList<>();

        if (orderId != 0) {
            Order order = orderRepository.findById(orderId);
            OrderDTO orderDTO = transferOrder(order);
            result.add(orderDTO);
        } else {

            List<Order> orderPage = orderRepository.findByOrderStatus_IdAndOrderItemList_Product_ProductNameContainsAndCustomer_NameContainsAndCustomer_EmailContainsAndCustomer_PhoneNumberContains(3, productName, customerName, customerEmail, customerPhoneNumber);

            for (Order order : orderPage) {
                result.add(transferOrder(order));
            }

        }

        return result;
    }


    public void sendOrderEmail(Order order) throws MessagingException, IOException {

        Context context = new Context();
        Map<String, Object> values = new HashMap<>();
        int orderId = order.getId();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = order.getOrderDate();
        String orderDate = formatter.format(date);

        float amount = (float) order.getTotalPrice();
        OrderDTO orderDTO = transferOrder(order);
        List<OrderItemDTO> products = orderDTO.getOrderItemList();

        Customer customer = order.getCustomer();
        String customerName = customer.getName();
        String customerAddress = customer.getAddress();
        String customerEmail = customer.getEmail();
        float subtotal = (float) (amount / (1 + order.getTax()));

        values.put("orderId", orderId);
        values.put("orderDate", orderDate);
        values.put("amount", amount);
        values.put("products", products);
        values.put("customerName", customerName);
        values.put("customerAddress", customerAddress);
        values.put("customerEmail", customerEmail);
        values.put("subtotal", subtotal);
        values.put("discountPercent", order.getVoucherPercent());
        values.put("priceAfterVoucher", (float) (subtotal - subtotal * (order.getVoucherPercent() / 100)));

        values.put("invoice", pdfServiceImp.createPdfAndUpload(order));


        context.setVariables(values);
        emailServiceImp.sendThankYouOrder(fromMail, customerEmail, "Thank You For Your Order", context);
    }

}
