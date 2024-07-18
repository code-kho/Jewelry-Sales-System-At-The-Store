package com.example.salesystematthestore.controller;


import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.payload.request.TransferRequest;
import com.example.salesystematthestore.service.imp.RequestTransferServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transfer-request")
public class TransferRequestController {

    @Autowired
    RequestTransferServiceImp requestTransferServiceImp;

    @PostMapping
    public ResponseEntity<?> createTransfer(@RequestBody TransferRequest transferRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.createTransferRequest(transferRequest));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/approve")
    public ResponseEntity<?> approveTransfer(@RequestParam int userId, @RequestParam int transferRequestId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.approveTransfer(userId, transferRequestId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> cancelTransfer(@RequestParam int userId, @RequestParam int transferRequestId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.cancelTransfer(userId, transferRequestId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/complete")
    public ResponseEntity<?> completeTransfer(@RequestParam int userId, @RequestParam int transferRequestId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.completeTransfer(userId, transferRequestId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-in-counter")
    public ResponseEntity<?> getAllRequestTransferByCounterId(@RequestParam int counterId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.getAllRequestTransfer(counterId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestTransferById(@PathVariable int transferRequestId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.getRequestTransferById(transferRequestId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-in-counter-received")
    public ResponseEntity<?> getAllRequestTransferInCounterReceived(@RequestParam int counterId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(requestTransferServiceImp.getAllRequestInCounterReceived(counterId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

}
