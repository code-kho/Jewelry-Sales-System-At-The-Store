package com.example.salesystematthestore.service;

import com.example.salesystematthestore.dto.OrderDTO;
import com.example.salesystematthestore.dto.OrderItemDTO;
import com.example.salesystematthestore.dto.ProductDTO;
import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.key.KeyOrderItem;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import com.example.salesystematthestore.payload.request.OrderRequest;
import com.example.salesystematthestore.payload.request.ProductItemRequest;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.CustomerServiceImp;
import com.example.salesystematthestore.service.imp.EmailServiceImp;
import com.example.salesystematthestore.service.imp.OrderServiceImp;
import jakarta.mail.MessagingException;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService implements OrderServiceImp {

    @Autowired
    private OrderRepository orderRepository;

    @Value("${spring.mail.username}")
    private String fromMail;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    ProductCounterRepository productCounterRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WarrantyRepository warrantyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerServiceImp customerServiceImp;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmailServiceImp emailServiceImp;



    @Override
    public Double getTotalMoneyByDate(int counterId, String startDate, String endDate) {


        double totalMoney = 0;

        List<Order> orderList = orderRepository.findByUser_Counter_Id(counterId);

        List<String> dates = getDatesInRange(startDate, endDate);

        for (String date : dates) {
            for (Order order : orderList) {
                if (order.getOrderDate().toString().split(" ")[0].equals(date)) {
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
                    for (OrderItem orderItem : order.getOrderItemList()) {
                        double price = (orderItem.getPrice() - (orderItem.getPrice() / orderItem.getProduct().getRatioPrice())) * orderItem.getQuantity();

                        totalMoney += price;

                    }
                }
            }
            result.put(date, totalMoney);

        }

        return null;
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
        int totalOfNumber = 0;

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
        String startDate = String.format("%04d-%02d-%02d", firstYear, firstMonth, firstDay);

        return startDate;
    }


    private String getMonthEndDate(int year, int month) {
        Calendar calendar = Calendar.getInstance();

        calendar.set(year, month, 0);
        int lastDay = calendar.get(Calendar.DAY_OF_MONTH);
        int lastMonth = calendar.get(Calendar.MONTH) + 1;
        int lastYear = calendar.get(Calendar.YEAR);
        String endDate = String.format("%04d-%02d-%02d", lastYear, lastMonth, lastDay);

        return endDate;
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
        result.setVoucherPercent(0);
        result.setPriceBeforeVoucher(order.getTotalPrice());
        if(order.getPayments()!=null) {
            result.setPaymentMethod(order.getPayments().getPaymentMode());
        }
        List<OrderItemDTO> orderItemDTOList = new ArrayList<>();

        for (OrderItem orderItem : order.getOrderItemList()) {
            double discountPercent = orderItem.getDiscountPercent();

            double price = orderItem.getPrice()/((1-(discountPercent/100)));

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

        result.setOrderItemList(orderItemDTOList);


        return result;

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
        Order order = orderRepository.findById(orderId).get();
        OrderDTO result = transferOrder(order);

        return result;
    }


    @Override
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
            productCounter.setQuantity(productCounter.getQuantity() - productItemRequest.getQuantity());
            productCounterRepository.save(productCounter);

            OrderItem orderItem = new OrderItem();
            KeyOrderItem keyOrderItem = new KeyOrderItem();

            keyOrderItem.setOrderId(order.getId());
            keyOrderItem.setProductId(productItemRequest.getProductId());
            orderItem.setKeys(keyOrderItem);

            if(checkValidPromotion(productCounter.getProduct())){
                orderItem.setDiscountPercent(productCounter.getProduct().getPromotion().getDiscount());
            } else{
                orderItem.setDiscountPercent(0.0);
            }


            orderItem.setQuantity(productItemRequest.getQuantity());
            orderItem.setPrice(productItemRequest.getPrice());

            orderItemList.add(orderItem);
        }
        order.setOrderItemList(orderItemList);

        Optional<Customer> customer = customerRepository.findById(orderRequest.getCustomerId());

        if (customer.isPresent()) {
            int point = (int) orderRequest.getAmount();
            customer.get().setLoyaltyPoints(customer.get().getLoyaltyPoints() + point);
            customerServiceImp.updateMembershipTier(customer.get().getLoyaltyPoints(), customer.get().getId());
            order.setCustomer(customer.get());
            customerRepository.save(customer.get());
        }

        if (customer.get().getMemberShipTier().getId() == 6) {
            order.setOrderStatus(orderStatusRepository.findById(1).get());
        } else {
            order.setOrderStatus(orderStatusRepository.findById(2).get());
            for (ProductItemRequest productItemRequest : productItemRequestList) {
                Product product = productRepository.findByProductId(productItemRequest.getProductId());
                if (checkValidPromotion(product)) {
                    order.setOrderStatus(orderStatusRepository.findById(1).get());
                    break;
                }
            }
        }


        Users user = userRepository.findById(orderRequest.getUserId());
        order.setUser(user);
        order.setTotalPrice(orderRequest.getAmount());
        order.setTax(8);
        order.setOrderDate(new Date());
        orderRepository.save(order);

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setStatus(order.getOrderStatus().getName());
        orderDTO.setOrderId(order.getId());
        return orderDTO;

    }

    @Override
    public boolean cancelOrder(int orderId) {

        Optional<Order> order = orderRepository.findById(orderId);

        boolean result = false;

        if (order.isPresent()) {

            List<OrderItem> orderItemList = order.get().getOrderItemList();

            for (OrderItem orderItem : orderItemList) {
                KeyProductCouter keyProductCouter = new KeyProductCouter();
                keyProductCouter.setCouterId(order.get().getUser().getCounter().getId());
                keyProductCouter.setProductId(orderItem.getProduct().getProductId());

                ProductCounter productCounter = productCounterRepository.findByKeyProductCouter(keyProductCouter);

                productCounter.setQuantity(productCounter.getQuantity() + orderItem.getQuantity());

                productCounterRepository.save(productCounter);
            }

            order.get().setOrderStatus(orderStatusRepository.findById(4).get());

            orderRepository.save(order.get());
            result = true;
        }

        return result;
    }

    @Override
    public boolean confirmOrder(int orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        boolean result = false;

        if (order.isPresent()) {
            order.get().setOrderStatus(orderStatusRepository.findById(2).get());
            orderRepository.save(order.get());
            result = true;
        }

        return result;
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

        if(orderId!=0){
            Order order = orderRepository.findById(orderId).get();
            OrderDTO orderDTO = transferOrder(order);
            result.add(orderDTO);
        } else{

            List<Order> orderPage = orderRepository.findByOrderStatus_IdAndOrderItemList_Product_ProductNameContainsAndCustomer_NameContainsAndCustomer_EmailContainsAndCustomer_PhoneNumberContains(3,productName, customerName, customerEmail, customerPhoneNumber);

            for(Order order : orderPage){
                result.add(transferOrder(order));
            }

        }

        return result;
    }


    public void sendOrderEmail(Order order) throws MessagingException {

        Context context = new Context();
        Map<String, Object> values = new HashMap<>();
        int orderId = order.getId();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = order.getOrderDate();
        String orderDate = formatter.format(date);

        double amount = order.getTotalPrice();
        OrderDTO orderDTO = transferOrder(order);
        List<OrderItemDTO> products = orderDTO.getOrderItemList();

        Customer customer = order.getCustomer();
        String customerName = customer.getName();
        String customerAddress =customer.getAddress();
        String customerEmail = customer.getEmail();

        values.put("orderId", orderId);
        values.put("orderDate", orderDate);
        values.put("amount", amount);
        values.put("products", products);
        values.put("customerName", customerName);
        values.put("customerAddress", customerAddress);
        values.put("customerEmail", customerEmail);
        values.put("subtotal", amount/(1+order.getTax()));
        context.setVariables(values);
        emailServiceImp.sendThankYouOrder(fromMail,customerEmail,"Thank You For Your Order", context);
    }

}
