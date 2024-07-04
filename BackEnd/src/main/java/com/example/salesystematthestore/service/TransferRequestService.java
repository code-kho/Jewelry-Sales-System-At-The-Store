package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.*;
import com.example.salesystematthestore.entity.key.KeyProductCouter;
import com.example.salesystematthestore.entity.key.KeyProductRequest;
import com.example.salesystematthestore.payload.request.ProductTransferRequest;
import com.example.salesystematthestore.payload.request.TransferRequest;
import com.example.salesystematthestore.repository.*;
import com.example.salesystematthestore.service.imp.RequestTransferServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransferRequestService implements RequestTransferServiceImp {

    @Autowired
    ProductCounterRepository productCounterRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CounterRepository counterRepository;

    @Autowired
    TransferRequestRepository transferRequestRepository;

    @Autowired
    TransferRequestStatusRepository transferRequestStatusRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public boolean createTransferRequest(TransferRequest transferRequest) {

        boolean result = true;

        int fromCounterId = transferRequest.getFromCounterId();
        int toCounterId = transferRequest.getToCounterId();
        List<ProductRequests> productRequestsList = new ArrayList<>();
        List<ProductCounter> productCounterToList = new ArrayList<>();
        List<ProductCounter> productCounterFromList = new ArrayList<>();

        TransferRequests transferRequests = new TransferRequests();
        transferRequests.setRequestDate(new Date());
        transferRequests.setToCounter(counterRepository.findById(toCounterId));
        transferRequests.setFromCounter(counterRepository.findById(fromCounterId));
        transferRequestRepository.save(transferRequests);

        for (ProductTransferRequest productTransferRequest : transferRequest.getProductTransferRequestList()) {
            KeyProductCouter keyProductCouter = new KeyProductCouter();
            keyProductCouter.setCouterId(fromCounterId);
            keyProductCouter.setProductId(productTransferRequest.getProductId());
            ProductCounter productCounterFrom = productCounterRepository.findByKeyProductCouter(keyProductCouter);

            if (productCounterFrom.getQuantity() < productTransferRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock for product ID: " + productTransferRequest.getProductId());
            }

            productCounterFrom.setQuantity(productCounterFrom.getQuantity() - productTransferRequest.getQuantity());
            productCounterFromList.add(productCounterFrom);

            KeyProductCouter keyProductCounterTo = new KeyProductCouter();
            keyProductCounterTo.setCouterId(toCounterId);
            keyProductCounterTo.setProductId(productTransferRequest.getProductId());

            ProductCounter productCounterTo = productCounterRepository.findByKeyProductCouter(keyProductCounterTo);

            if (productCounterTo != null) {
                productCounterTo.setQuantity(productCounterTo.getQuantity() + productTransferRequest.getQuantity());
            } else {
                productCounterTo = new ProductCounter();
                productCounterTo.setQuantity(productTransferRequest.getQuantity());
                productCounterTo.setKeyProductCouter(keyProductCounterTo);
            }

            productCounterToList.add(productCounterTo);
            productCounterTo.setQuantity(productTransferRequest.getQuantity());
            productCounterTo.setKeyProductCouter(keyProductCounterTo);
            productCounterToList.add(productCounterTo);

            KeyProductRequest keyProductRequest = new KeyProductRequest();
            keyProductRequest.setRequestId(transferRequests.getId());
            keyProductRequest.setProductId(productTransferRequest.getProductId());

            ProductRequests productRequests = new ProductRequests();
            productRequests.setKeyProductRequest(keyProductRequest);
            productRequests.setQuantity(productTransferRequest.getQuantity());
            productRequestsList.add(productRequests);
        }

        transferRequests.setProductRequestsList(productRequestsList);
        TransferRequestStatus transferRequestStatus = transferRequestStatusRepository.findById(1).get();
        transferRequests.setTransferRequestStatus(transferRequestStatus);

        transferRequestRepository.save(transferRequests);
        productCounterRepository.saveAll(productCounterFromList);
        productCounterRepository.saveAll(productCounterToList);


        return result;
    }

    @Override
    @Transactional
    public boolean approveTransfer(int userId, int transferRequestId) {

        boolean result = true;

        Users user = userRepository.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        Optional<TransferRequests> transferRequests = transferRequestRepository.findById(transferRequestId);

        if (transferRequests.isPresent()) {
            if (user.getRole().getId() == 2 && user.getCounter().getId() == transferRequests.get().getFromCounter().getId()) {

                TransferRequests transferRequestsEdit = transferRequests.get();
                transferRequestsEdit.setTransferRequestStatus(transferRequestStatusRepository.findById(2).get());
                transferRequestRepository.save(transferRequestsEdit);
            } else {
                result = false;
            }
        } else {
            throw new RuntimeException("Transfer request not found");
        }


        return result;
    }

    @Override
    @Transactional
    public boolean cancelTransfer(int userId, int transferRequestId) {

        boolean result = true;

        Users user = userRepository.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        Optional<TransferRequests> transferRequests = transferRequestRepository.findById(transferRequestId);

        if (transferRequests.isPresent()) {
            if (user.getRole().getId() == 2 && user.getCounter().getId() == transferRequests.get().getFromCounter().getId()) {

                TransferRequests transferRequestsEdit = transferRequests.get();
                transferRequestsEdit.setTransferRequestStatus(transferRequestStatusRepository.findById(3).get());
                List<ProductRequests> productRequestsList = transferRequestsEdit.getProductRequestsList();
                int toCounterId = transferRequestsEdit.getToCounter().getId();
                int fromCounterId = transferRequestsEdit.getFromCounter().getId();

                for (ProductRequests productRequests : productRequestsList) {
                    KeyProductCouter keyProductCouterFrom = new KeyProductCouter();
                    keyProductCouterFrom.setCouterId(fromCounterId);
                    keyProductCouterFrom.setProductId(productRequests.getKeyProductRequest().getProductId());
                    ProductCounter productCounterFrom = productCounterRepository.findByKeyProductCouter(keyProductCouterFrom);
                    productCounterFrom.setQuantity(productCounterFrom.getQuantity() + productRequests.getQuantity());

                    KeyProductCouter keyProductCouterTo = new KeyProductCouter();
                    keyProductCouterTo.setCouterId(toCounterId);
                    keyProductCouterTo.setProductId(productRequests.getKeyProductRequest().getProductId());
                    ProductCounter productCounterTo = productCounterRepository.findByKeyProductCouter(keyProductCouterTo);

                    productCounterTo.setQuantity(productCounterTo.getQuantity() - productRequests.getQuantity());

                    productCounterRepository.save(productCounterFrom);
                    productCounterRepository.save(productCounterTo);
                }

                transferRequestRepository.save(transferRequestsEdit);
            } else {
                result = false;
            }
        } else {
            throw new RuntimeException("Transfer request not found");
        }


        return result;
    }

    @Override
    @Transactional
    public boolean completeTransfer(int userId, int transferRequestId) {

        boolean result = true;

        Users user = userRepository.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        Optional<TransferRequests> transferRequests = transferRequestRepository.findById(transferRequestId);

        if (transferRequests.isPresent()) {
            if (user.getRole().getId() == 2 && user.getCounter().getId() == transferRequests.get().getToCounter().getId()) {

                TransferRequests transferRequestsEdit = transferRequests.get();
                transferRequestsEdit.setTransferRequestStatus(transferRequestStatusRepository.findById(4).get());
                transferRequestRepository.save(transferRequestsEdit);
            } else {
                result = false;
            }
        } else {
            throw new RuntimeException("Transfer request not found");
        }


        return result;
    }

}
